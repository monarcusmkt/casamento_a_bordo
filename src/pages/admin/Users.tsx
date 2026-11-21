import {useEffect,useState} from 'react';
import {useAuth} from '@/contexts/AuthContext';
import {Link} from 'react-router-dom';
type Account={id:string;email:string;role:string};
export default function Users(){
 const {user}=useAuth();const [users,setUsers]=useState<Account[]>([]),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 const [csrf,setCsrf]=useState('');
 const load=async()=>{const me=await fetch('/api/auth/me',{credentials:'same-origin'}).then(r=>r.json());setCsrf(me.csrf||'');const r=await fetch('/api/admin/users',{credentials:'same-origin'});if(r.ok)setUsers(await r.json())};
 useEffect(()=>{void load()},[]);
 if(user?.role!=='master')return <p>Acesso exclusivo da Monarcus.</p>;
 const create=async(e:React.FormEvent)=>{e.preventDefault();setBusy(true);setError('');try{const r=await fetch('/api/admin/users',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json','X-CSRF-Token':csrf},body:JSON.stringify({email,password})});const data=await r.json();if(!r.ok)throw Error(data.error||'Erro ao criar usuário');setEmail('');setPassword('');await load()}catch(e){setError(String(e))}finally{setBusy(false)}};
 const reset=async(id:string)=>{const password=window.prompt('Nova senha do administrador (mínimo 12 caracteres):');if(!password)return;const r=await fetch('/api/admin/users/'+id+'/reset-password',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json','X-CSRF-Token':csrf},body:JSON.stringify({password})});if(!r.ok){setError((await r.json()).error)}else{setError('Senha alterada e sessões revogadas.')}};
 return <div className="max-w-3xl mx-auto p-6 space-y-6"><Link to="/admin" className="underline">Voltar ao painel</Link><h1 className="text-3xl font-bold">Contas administrativas</h1><form onSubmit={create} className="space-y-3"><label className="block">E-mail do administrador<input className="border rounded p-2 w-full" type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label className="block">Senha inicial (12+ caracteres)<input className="border rounded p-2 w-full" type="password" minLength={12} required value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="bg-primary text-white rounded p-3" disabled={busy}>Criar administrador</button></form>{error&&<p role="alert">{error}</p>}<div className="space-y-2">{users.map(u=><div key={u.id} className="border rounded p-3 flex justify-between items-center"><span>{u.email} — {u.role}</span>{u.role==='admin'&&<button className="underline" onClick={()=>reset(u.id)}>Redefinir senha</button>}</div>)}</div></div>
}
