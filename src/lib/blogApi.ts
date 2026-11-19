export type BlogPost = {id:string;title:string;slug:string;content:string;excerpt:string;cover_image:string;category:string;meta_title:string;meta_description:string;published:boolean;created_at:string;updated_at:string};
export type BlogUser = {id:string;email:string;role:'master'|'admin'};
let csrfToken:string|null=null;
async function request<T>(path:string,options:RequestInit={}):Promise<T>{
 const response=await fetch('/api'+path,{credentials:'same-origin',...options,headers:{...(options.body?{'Content-Type':'application/json'}:{}),...(csrfToken?{'X-CSRF-Token':csrfToken}:{}),...options.headers}});
 const data=await response.json().catch(()=>({error:'Resposta inválida do servidor'}));
 if(!response.ok)throw new Error(data.error||'Falha na solicitação');
 return data as T;
}
export const blogApi={
 session:async()=>{const result=await request<{user:BlogUser|null;csrf:string|null}>('/auth/me');csrfToken=result.csrf;return result.user;},
 login:async(email:string,password:string)=>{const result=await request<{user:BlogUser;csrf:string}>('/auth/login',{method:'POST',body:JSON.stringify({email,password})});csrfToken=result.csrf;return result.user;},
 logout:async()=>{await request('/auth/logout',{method:'POST'});csrfToken=null;},
 list:()=>request<BlogPost[]>('/posts'),
 get:(id:string)=>request<BlogPost>('/posts/'+encodeURIComponent(id)),
 create:(post:Partial<BlogPost>)=>request<BlogPost>('/posts',{method:'POST',body:JSON.stringify(post)}),
 update:(id:string,post:Partial<BlogPost>)=>request<BlogPost>('/posts/'+encodeURIComponent(id),{method:'PUT',body:JSON.stringify(post)}),
 remove:(id:string)=>request('/posts/'+encodeURIComponent(id),{method:'DELETE'}),
 upload:async(file:File)=>{
  const data=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=()=>reject(new Error('Erro ao ler imagem'));reader.readAsDataURL(file)});
  const result=await request<{url:string}>('/uploads',{method:'POST',body:JSON.stringify({data})});return result.url;
 }
};
