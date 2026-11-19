import http from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createReadStream, existsSync } from 'node:fs';
import { join, resolve, extname } from 'node:path';
import { randomUUID, randomBytes, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
import pg from 'pg';

const { Pool } = pg;
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL obrigatória');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
const root = resolve('/app/dist'), uploads = resolve('/data/uploads');
const port = Number(process.env.PORT || 80);
const sessionsHours = 12;
const hashPassword = (password) => {
  const salt = randomBytes(16).toString('hex');
  return salt + ':' + scryptSync(password, salt, 64).toString('hex');
};
const checkPassword = (password, stored) => {
  if (!stored) return false;
  const [salt, hex] = stored.split(':');
  if (!salt || !hex || hex.length !== 128) return false;
  return timingSafeEqual(Buffer.from(hex, 'hex'), scryptSync(password, salt, 64));
};
const sha = value => createHash('sha256').update(value).digest('hex');
const cookie = req => Object.fromEntries((req.headers.cookie || '').split(';').filter(Boolean).map(v => { const i = v.indexOf('='); return [v.slice(0,i).trim(),v.slice(i+1).trim()]; }));
const respond = (res, status, body, headers={}) => { res.writeHead(status, { 'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store', ...headers }); res.end(JSON.stringify(body)); };
const parseBody = async req => {
  let text='';
  for await (const chunk of req) { text+=chunk; if (text.length > 10_000_000) throw Object.assign(new Error('Arquivo muito grande'), {status:413}); }
  try { return JSON.parse(text || '{}'); } catch { throw Object.assign(new Error('JSON inválido'),{status:400}); }
};
const safePost = row => row;
const init = async () => {
 await mkdir(uploads,{recursive:true});
 await pool.query(`CREATE TABLE IF NOT EXISTS admin_users (
 id uuid PRIMARY KEY, email text NOT NULL UNIQUE, password_hash text NOT NULL,
 role text NOT NULL CHECK(role IN ('master','admin')), created_at timestamptz NOT NULL DEFAULT now())`);
 await pool.query(`CREATE TABLE IF NOT EXISTS admin_sessions (
 token_hash text PRIMARY KEY, user_id uuid NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
 csrf_token text NOT NULL, expires_at timestamptz NOT NULL)`);
 await pool.query(`CREATE TABLE IF NOT EXISTS posts (
 id uuid PRIMARY KEY, title varchar(200) NOT NULL, slug varchar(220) NOT NULL UNIQUE,
 content text NOT NULL, excerpt varchar(500) NOT NULL DEFAULT '', cover_image text NOT NULL DEFAULT '',
 category text NOT NULL DEFAULT '', meta_title text NOT NULL DEFAULT '', meta_description text NOT NULL DEFAULT '',
 published boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now())`);
 for (const role of ['master','admin']) {
  const email=process.env[role.toUpperCase()+'_EMAIL']?.toLowerCase().trim();
  const password=process.env[role.toUpperCase()+'_PASSWORD'];
  if (email && password && password.length >= 12) {
   await pool.query('INSERT INTO admin_users(id,email,password_hash,role) VALUES($1,$2,$3,$4) ON CONFLICT(email) DO NOTHING',
    [randomUUID(),email,hashPassword(password),role]);
  }
 }
};
const getUser = async req => {
 const token=cookie(req).session;
 if (!token) return null;
 const {rows}=await pool.query(`SELECT u.id,u.email,u.role,s.csrf_token
 FROM admin_sessions s JOIN admin_users u ON u.id=s.user_id
 WHERE s.token_hash=$1 AND s.expires_at>now()`,[sha(token)]);
 return rows[0]||null;
};
const postFields = body => {
 const title=String(body.title||'').trim(), slug=String(body.slug||'').trim();
 const content=String(body.content||'');
 if (!title || title.length>200 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length>220 || !content || content.length>100000)
 throw Object.assign(new Error('Título, slug ou conteúdo inválidos'),{status:400});
 return [title,slug,content,String(body.excerpt||'').slice(0,500),String(body.cover_image||'').slice(0,1000),
 String(body.category||'').slice(0,120),String(body.meta_title||'').slice(0,200),String(body.meta_description||'').slice(0,500),body.published===true];
};
const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.avif':'image/avif','.ico':'image/x-icon','.mp4':'video/mp4','.woff2':'font/woff2'};
const serveFile = async (res,path) => {
 try { const data=await readFile(path);res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(data); }
 catch { respond(res,404,{error:'Não encontrado'}); }
};
const app = async(req,res)=>{
 try {
 const url=new URL(req.url,'http://localhost'), path=url.pathname;
 res.setHeader('X-Content-Type-Options','nosniff');
 res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
 if(path==='/api/health') return respond(res,200,{ok:true});
 if(path.startsWith('/uploads/')) {
  const file=path.slice('/uploads/'.length);
  if(!/^[a-f0-9-]+\.(png|jpg|webp)$/.test(file)) return respond(res,404,{error:'Não encontrado'});
  return serveFile(res,join(uploads,file));
 }
 if(!path.startsWith('/api/')) {
  const requested=resolve(root,'.'+decodeURIComponent(path));
  if(!requested.startsWith(root+'/') && requested!==root) return respond(res,403,{error:'Proibido'});
  return serveFile(res,existsSync(requested)&&extname(requested)?requested:join(root,'index.html'));
 }
 const method=req.method;
 if(method==='GET' && path==='/api/posts') {
  const user=await getUser(req);
  const {rows}=await pool.query('SELECT * FROM posts '+(user?'':'WHERE published=true ')+'ORDER BY created_at DESC LIMIT 200');
  return respond(res,200,rows);
 }
 const postMatch=path.match(/^\/api\/posts\/([^/]+)$/);
 if(method==='GET' && postMatch) {
  const user=await getUser(req), id=postMatch[1];
  const {rows}=await pool.query('SELECT * FROM posts WHERE '+(/^[0-9a-f-]{36}$/.test(id)?'id::text=$1':'slug=$1')+(user?'':' AND published=true'),[id]);
  return respond(res,rows.length?200:404,rows[0]||{error:'Não encontrado'});
 }
 if(method==='POST' && path==='/api/auth/login') {
  const b=await parseBody(req), email=String(b.email||'').toLowerCase().trim();
  const ip=String(req.headers['x-forwarded-for']||req.socket.remoteAddress||'').split(',')[0].trim();
  const key=sha(ip+':'+email);
  const attempts=loginAttempts.get(key)||{count:0,until:0};
  if(attempts.until>Date.now()) return respond(res,429,{error:'Tente novamente mais tarde'});
  const {rows}=await pool.query('SELECT * FROM admin_users WHERE email=$1',[email]);
  const valid=rows[0]&&checkPassword(String(b.password||''),rows[0].password_hash);
  if(!valid){
   const count=attempts.count+1;loginAttempts.set(key,{count,until:count>=5?Date.now()+15*60_000:0});
   return respond(res,401,{error:'Credenciais inválidas'});
  }
  loginAttempts.delete(key);
  const token=randomBytes(32).toString('hex'),csrf=randomBytes(24).toString('hex');
  await pool.query('INSERT INTO admin_sessions(token_hash,user_id,csrf_token,expires_at) VALUES($1,$2,$3,now()+interval \'12 hours\')',[sha(token),rows[0].id,csrf]);
  return respond(res,200,{user:{id:rows[0].id,email:rows[0].email,role:rows[0].role},csrf},{'Set-Cookie':`session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${sessionsHours*3600}`});
 }
 const user=await getUser(req);
 if(method==='GET' && path==='/api/auth/me') return respond(res,200,{user:user?{id:user.id,email:user.email,role:user.role}:null,csrf:user?.csrf_token||null});
 if(!user) return respond(res,401,{error:'Acesso não autorizado'});
 if(!['GET','HEAD'].includes(method)){
  const origin=req.headers.origin,host=req.headers.host;
  if(origin && new URL(origin).host!==host) return respond(res,403,{error:'Origem inválida'});
  if(req.headers['x-csrf-token']!==user.csrf_token) return respond(res,403,{error:'CSRF inválido'});
 }
 if(method==='POST' && path==='/api/auth/logout'){
  const token=cookie(req).session;
  await pool.query('DELETE FROM admin_sessions WHERE token_hash=$1',[sha(token)]);
  return respond(res,200,{ok:true},{'Set-Cookie':'session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0'});
 }
 if(method==='POST' && path==='/api/posts'){
  const f=postFields(await parseBody(req)),id=randomUUID();
  const {rows}=await pool.query(`INSERT INTO posts(id,title,slug,content,excerpt,cover_image,category,meta_title,meta_description,published)
  VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,[id,...f]);
  return respond(res,201,rows[0]);
 }
 if(method==='PUT' && postMatch){
  const f=postFields(await parseBody(req));
  const {rows}=await pool.query(`UPDATE posts SET title=$1,slug=$2,content=$3,excerpt=$4,cover_image=$5,category=$6,
  meta_title=$7,meta_description=$8,published=$9,updated_at=now() WHERE id::text=$10 RETURNING *`,[...f,postMatch[1]]);
  return respond(res,rows.length?200:404,rows[0]||{error:'Não encontrado'});
 }
 if(method==='DELETE' && postMatch){
  await pool.query('DELETE FROM posts WHERE id::text=$1',[postMatch[1]]);
  return respond(res,200,{ok:true});
 }
 if(method==='POST' && path==='/api/uploads'){
  const b=await parseBody(req),match=String(b.data||'').match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/);
  if(!match) return respond(res,400,{error:'Imagem inválida'});
  const data=Buffer.from(match[2],'base64');
  if(data.length>5_000_000) return respond(res,413,{error:'Imagem excede 5 MB'});
  const ext=match[1]==='jpeg'?'jpg':match[1];
  const signature=ext==='png'?data.subarray(0,8).equals(Buffer.from('89504e470d0a1a0a','hex')):
   ext==='jpg'?data.subarray(0,3).equals(Buffer.from('ffd8ff','hex')):
   data.subarray(0,4).toString()==='RIFF'&&data.subarray(8,12).toString()==='WEBP';
  if(!signature)return respond(res,400,{error:'Formato inválido'});
  const name=randomUUID()+'.'+ext;await writeFile(join(uploads,name),data,{flag:'wx'});
  return respond(res,201,{url:'/uploads/'+name});
 }
 return respond(res,404,{error:'Rota não encontrada'});
 }catch(e){console.error(e);return respond(res,e.status||((e.code==='23505')?409:500),{error:e.status?e.message:e.code==='23505'?'Slug ou e-mail já existe':'Erro interno'});}
};
const loginAttempts=new Map();
setInterval(()=>{for(const [k,v] of loginAttempts)if(v.until && v.until<Date.now()-60_000)loginAttempts.delete(k)},3600_000).unref();
await init();
http.createServer(app).listen(port,'0.0.0.0',()=>console.log('Casamento a Bordo iniciado na porta',port));
