import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Search, ShoppingBag } from "lucide-react";
import { useEffect,useMemo,useState } from "react";
import { listProducts, type Product } from "../lib/supabase";
export const Route=createFileRoute("/loja")({component:Loja});
const wa=(p:Product)=>`https://wa.me/5562993013945?text=${encodeURIComponent(`Olá, Life Store! Tenho interesse neste produto:

${p.name}
Preço: R$ ${(p.price*(1-p.discount_percent/100)).toFixed(2).replace(".",",")}

Gostaria de saber a disponibilidade.`)}`;
function Loja(){
 const [products,setProducts]=useState<Product[]>([]),[q,setQ]=useState(""),[cat,setCat]=useState("Todos"),[loading,setLoading]=useState(true);
 useEffect(()=>{listProducts().then(setProducts).finally(()=>setLoading(false))},[]);
 const cats=["Todos",...Array.from(new Set(products.map(p=>p.category).filter(Boolean) as string[]))];
 const filtered=useMemo(()=>products.filter(p=>(cat==="Todos"||p.category===cat)&&p.name.toLowerCase().includes(q.toLowerCase())),[products,q,cat]);
 return <main className="storefront"><header className="storefront-head"><a href="/" className="store-logo"><span>LS</span><b>LIFE STORE</b></a><div className="store-kicker">TECNOLOGIA · ANÁPOLIS / GO</div><a href="/admin" className="store-admin">ADMIN <ArrowUpRight size={15}/></a></header>
 <section className="store-hero"><div><span className="section-number">LIFE STORE / SHOP</span><h1>TECNOLOGIA<br/><em>DO SEU JEITO.</em></h1><p>Produtos selecionados pela Life Store. Consulte disponibilidade e fale conosco pelo WhatsApp.</p></div><div className="store-hero-art"><div className="store-orb"/><span>LS</span></div></section>
 <section className="catalog"><div className="catalog-tools"><div className="store-search"><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar produto"/></div><div className="store-filters">{cats.map(c=><button key={c} className={cat===c?"active":""} onClick={()=>setCat(c)}>{c}</button>)}</div></div>
 {loading?<div className="catalog-empty">Carregando catálogo…</div>:filtered.length===0?<div className="catalog-empty">Nenhum produto disponível no momento.</div>:<div className="product-grid">{filtered.map((p,i)=>{const final=p.price*(1-p.discount_percent/100);return <article className={`product-card product-card--${i%4}`} key={p.id}><div className="product-image">{p.image_url?<img src={p.image_url} alt={p.name}/>:<span>LS</span>}{p.discount_percent>0&&<b>-{p.discount_percent}%</b>}</div><div className="product-info"><span>{p.category||"LIFE STORE"}</span><h2>{p.name}</h2>{p.description&&<p>{p.description}</p>}<div className="product-price">{p.discount_percent>0&&<del>R$ {p.price.toFixed(2).replace(".",",")}</del>}<strong>R$ {final.toFixed(2).replace(".",",")}</strong></div><a href={wa(p)}>Falar no WhatsApp <ShoppingBag size={16}/></a></div></article>})}</div>}</section>
 <footer className="storefront-footer"><span>LIFE STORE · DESDE 2015</span><a href="/">Voltar para o site institucional</a></footer></main>
}