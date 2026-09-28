const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://cfonvnppjxtwhfvcrrui.supabase.co";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_7X9v_dRvuGMRLUsDgqM2vA_Qzyd2xBc";
const headers = { apikey: SUPABASE_KEY, "Content-Type": "application/json" };

export type Product = { id:string; name:string; description:string|null; price:number; discount_percent:number; stock:number; category:string|null; image_url:string|null; available:boolean; created_at:string; updated_at:string };

export async function listProducts() {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*&available=eq.true&order=created_at.desc`, { headers });
  if (!r.ok) throw new Error("Não foi possível carregar os produtos.");
  return r.json() as Promise<Product[]>;
}

export async function listAdminProducts() {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*&order=created_at.desc`, { headers: authHeaders() });
  if (!r.ok) throw new Error("Não foi possível carregar o catálogo.");
  return r.json() as Promise<Product[]>;
}
export async function signIn(email:string,password:string) {
  const r=await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`,{method:"POST",headers,body:JSON.stringify({email,password})});
  const data=await r.json(); if(!r.ok) throw new Error(data.error_description || data.msg || "Login inválido.");
  localStorage.setItem("life_store_session",JSON.stringify(data)); return data;
}
export function session(){ try{return JSON.parse(localStorage.getItem("life_store_session")||"null")}catch{return null} }
export function signOut(){localStorage.removeItem("life_store_session")}
function authHeaders(){const s=session(); if(!s?.access_token) throw new Error("Sessão expirada."); return {...headers,Authorization:`Bearer ${s.access_token}`}}
export async function isAdmin(){
  const s=session(); if(!s?.access_token) return false;
  const r=await fetch(`${SUPABASE_URL}/rest/v1/admins?select=email&email=eq.${encodeURIComponent(s.user?.email||"")}`,{headers:authHeaders()});
  return r.ok && (await r.json()).length>0;
}
export async function saveProduct(p:Partial<Product>,id?:string){
  const r=await fetch(`${SUPABASE_URL}/rest/v1/products${id?`?id=eq.${id}`:""}`,{method:id?"PATCH":"POST",headers:{...authHeaders(),"Prefer":"return=representation"},body:JSON.stringify(p)});
  if(!r.ok) throw new Error(await r.text()); return (await r.json())[0];
}
export async function deleteProduct(id:string){
  const r=await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`,{method:"DELETE",headers:authHeaders()}); if(!r.ok) throw new Error(await r.text());
}
export async function uploadImage(file:File){
  const s=session(); if(!s?.access_token) throw new Error("Faça login novamente.");
  const path=`${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g,"-")}`;
  const r=await fetch(`${SUPABASE_URL}/storage/v1/object/product-images/${path}`,{method:"POST",headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${s.access_token}`, "Content-Type":file.type||"application/octet-stream","x-upsert":"false"},body:file});
  if(!r.ok) throw new Error(await r.text());
  return `${SUPABASE_URL}/storage/v1/object/public/product-images/${path}`;
}
