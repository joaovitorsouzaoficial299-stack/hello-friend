import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Instagram, MapPin, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

const whatsapp = "https://wa.me/5562993013945";
const instagram = "https://www.instagram.com/lifestoreanps/";
const maps =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    "Rua Aleixo Rodrigues de Queiroz, 701, Vila Industrial / Jundiaí Industrial, Anápolis - GO",
  );

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Life Store — Tecnologia e assistência em Anápolis" },
      {
        name: "description",
        content:
          "Life Store: loja física de tecnologia e assistência técnica em Anápolis desde 2015. Solicite um orçamento pelo WhatsApp e venha nos conhecer.",
      },
      { property: "og:title", content: "Life Store — Tecnologia e assistência em Anápolis" },
      {
        property: "og:description",
        content:
          "Tecnologia, assistência técnica e seu próximo aparelho. Loja física em Anápolis desde 2015.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Wordmark({ large = false }: { large?: boolean }) {
  return (
    <span className={`wordmark ${large ? "wordmark-large" : ""}`}>
      <span className="wordmark-icon" aria-hidden="true">
        L<span>.</span>
      </span>
      <span className="wordmark-name">
        LIFE<span>STORE</span>
      </span>
    </span>
  );
}

function GlassLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <Button asChild variant="ghost" className={`glass-button ${className}`}>
      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        <ArrowUpRight aria-hidden="true" />
      </a>
    </Button>
  );
}

function Phone({ className = "", variant = "" }: { className?: string; variant?: string }) {
  return (
    <div className={`device-phone ${variant} ${className}`} aria-hidden="true">
      <div className="device-phone-inner">
        <span className="device-camera" />
        <span className="device-glow" />
        <span className="device-line" />
        <span className="device-orbit" />
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <a href="#inicio" className="header-logo" aria-label="Life Store — início" onClick={close}>
        <Wordmark />
      </a>
      <nav className={`site-nav ${open ? "site-nav-open" : ""}`} aria-label="Navegação principal">
        <a href="#inicio" onClick={close}>
          INÍCIO
        </a>
        <a href="#orcamento" onClick={close}>
          ORÇAMENTO
        </a>
        <a href="#experiencia" onClick={close}>
          EXPERIÊNCIA
        </a>
        <a href="#a-loja" onClick={close}>
          A LOJA
        </a>
        <a href="#instagram" onClick={close}>
          INSTAGRAM
        </a>
        <span className="nav-soon" aria-label="Loja em breve">
          LOJA <span>EM BREVE</span>
        </span>
      </nav>
      <Button
        variant="ghost"
        size="icon"
        className="menu-toggle"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </Button>
    </header>
  );
}

function Quote() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [problem, setProblem] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!brand || !model.trim() || !problem) return;
    const message = `Olá, Life Store! Gostaria de solicitar um orçamento.\n\nMarca: ${brand}\nModelo: ${model.trim()}\nProblema: ${problem}`;
    window.open(`${whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }
  return (
    <section id="orcamento" className="quote-section section-pad">
      <div className="section-grid wrap">
        <div className="quote-intro">
          <span className="eyebrow">
            <span className="eyebrow-line" /> 01 / ORÇAMENTO
          </span>
          <h2>
            Seu aparelho
            <br />
            precisa de <em>atenção?</em>
          </h2>
          <p>
            Conte o que aconteceu com seu aparelho e envie as informações diretamente para a Life
            Store.
          </p>
          <div className="quote-detail">
            <span className="detail-cross">✳</span>
            <span>
              O primeiro passo para colocar
              <br />
              tudo de volta no lugar.
            </span>
          </div>
        </div>
        <form className="quote-form" onSubmit={submit}>
          <div className="form-topline">
            <span>FALE COM A LIFE STORE</span>
            <span>ANÁPOLIS · GO</span>
          </div>
          <label htmlFor="brand">01 / MARCA</label>
          <select id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required>
            <option value="" disabled>
              Selecione a marca
            </option>
            <option>Apple</option>
            <option>Samsung</option>
            <option>Motorola</option>
            <option>Xiaomi</option>
            <option>Outra</option>
          </select>
          <label htmlFor="model">02 / MODELO</label>
          <input
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Qual é o modelo?"
            required
            maxLength={100}
          />
          <label htmlFor="problem">03 / PROBLEMA</label>
          <select
            id="problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            required
          >
            <option value="" disabled>
              O que aconteceu?
            </option>
            <option>Tela</option>
            <option>Bateria</option>
            <option>Conector</option>
            <option>Face ID / Biometria</option>
            <option>Software</option>
            <option>Outro</option>
          </select>
          <Button type="submit" className="glass-button form-submit">
            SOLICITAR ORÇAMENTO <ArrowUpRight aria-hidden="true" />
          </Button>
          <p className="form-note">
            Sua mensagem será aberta no WhatsApp para você revisar antes de enviar.
          </p>
        </form>
      </div>
    </section>
  );
}

const chapters = ["TECNOLOGIA", "ASSISTÊNCIA", "PERFORMANCE", "SEU PRÓXIMO\nAPARELHO"];
function Experience() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const distance = Math.max(1, rect.height - window.innerHeight);
        setProgress(Math.max(0, Math.min(1, -rect.top / distance)));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  const active = Math.min(3, Math.floor(progress * 4));
  return (
    <section id="experiencia" className="experience" ref={ref}>
      <div className="experience-sticky" style={{ "--scroll": progress } as CSSProperties}>
        <div className="experience-top wrap">
          <span className="eyebrow">
            <span className="eyebrow-line" /> 02 / EXPERIÊNCIA LIFE
          </span>
          <span className="experience-counter">
            0{active + 1} <span>/ 04</span>
          </span>
        </div>
        <div className="experience-visual" aria-hidden="true">
          <div
            className="experience-halo"
            style={{
              transform: `translate(-50%, -50%) scale(${0.75 + progress * 0.6})`,
              opacity: 0.25 + progress * 0.35,
            }}
          />
          <div
            className="experience-laptop"
            style={{
              transform: `translate(-50%, -50%) translateY(${90 - progress * 150}px) rotateX(${8 - progress * 7}deg) scale(${0.82 + progress * 0.25})`,
              opacity: Math.min(1, progress * 4),
            }}
          >
            <div className="laptop-screen">
              <span className="laptop-symbol">L.</span>
            </div>
            <div className="laptop-base" />
          </div>
          <Phone variant="phone-silver" className="experience-phone-back" />
          <Phone variant="phone-gold" className="experience-phone-front" />
        </div>
        <div className="experience-copy wrap">
          <div className="experience-label">
            A VIDA EM MOVIMENTO <span>↗</span>
          </div>
          <div className="chapter-stack">
            {chapters.map((chapter, i) => (
              <h2
                key={chapter}
                className={`chapter ${active === i ? "chapter-active" : ""}`}
                aria-hidden={active !== i}
              >
                {chapter.split("\n").map((line, j) => (
                  <span key={j}>{line}</span>
                ))}
              </h2>
            ))}
          </div>
          <p>O que importa para você, em primeiro plano.</p>
        </div>
        <div className="experience-bottom wrap">
          <div className="progress-track">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
          <span>SCROLL PARA EXPLORAR</span>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="life-site">
      <Header />
      <main>
        <section id="inicio" className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-top wrap">
            <span>ANÁPOLIS · GO</span>
            <span>DESDE 2015</span>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-ring" />
            <Phone variant="phone-silver" className="hero-phone-back" />
            <Phone variant="phone-gold" className="hero-phone-front" />
            <span className="hero-art-index">LS / 001</span>
          </div>
          <div className="hero-content wrap">
            <span className="eyebrow">
              <span className="eyebrow-line" /> TECNOLOGIA PARA A VIDA REAL
            </span>
            <h1>
              TECNOLOGIA.
              <br />
              ASSISTÊNCIA.
              <br />
              <span>SEU PRÓXIMO</span>
              <br />
              <span>APARELHO.</span>
            </h1>
            <div className="hero-lower">
              <p>
                Loja física em Anápolis desde 2015. Assistência técnica, smartphones, acessórios e
                tecnologia.
              </p>
              <div className="hero-actions">
                <GlassLink href="#orcamento">Solicitar orçamento</GlassLink>
                <a className="text-link" href="#a-loja">
                  Conhecer a Life Store <ArrowRight size={17} />
                </a>
              </div>
            </div>
          </div>
          <a className="hero-scroll" href="#orcamento" aria-label="Rolar para orçamento">
            <ArrowDown size={17} /> DESCUBRA MAIS
          </a>
        </section>
        <Quote />
        <Experience />
        <section className="facts-section section-pad">
          <div className="wrap facts-grid">
            <div className="fact">
              <span className="eyebrow">03 / NOSSA HISTÓRIA</span>
              <h2>
                DESDE
                <br />
                <em>2015</em>
              </h2>
              <p>
                A Life Store tem loja física em Anápolis desde 2015. Um lugar para encontrar
                tecnologia e assistência técnica de perto.
              </p>
            </div>
            <div className="fact">
              <span className="eyebrow">04 / ONDE VOCÊ ESTÁ</span>
              <h2>
                ENTREGA EM
                <br />
                <em>ANÁPOLIS</em>
              </h2>
              <p>A Life Store realiza entregas em Anápolis. Fale com a equipe para saber mais.</p>
              <GlassLink href={whatsapp} external>
                Fale com a gente
              </GlassLink>
            </div>
          </div>
        </section>
        <section id="a-loja" className="store-section section-pad">
          <div className="wrap store-grid">
            <div className="store-art" aria-hidden="true">
              <span className="store-art-outline">L.</span>
              <span className="store-art-caption">LIFE STORE / ANÁPOLIS</span>
              <span className="store-art-line" />
            </div>
            <div className="store-content">
              <span className="eyebrow">
                <span className="eyebrow-line" /> 05 / A LOJA
              </span>
              <h2>
                VENHA
                <br />
                CONHECER
                <br />A <em>LIFE STORE</em>
              </h2>
              <p>
                Mais do que tecnologia na tela. Um espaço físico para você nos encontrar em
                Anápolis. Aceitamos aparelhos Apple na troca.
              </p>
              <address>
                <MapPin size={21} strokeWidth={1.4} />
                <span>
                  Rua Aleixo Rodrigues de Queiroz, 701
                  <br />
                  Vila Industrial / Jundiaí Industrial
                  <br />
                  Anápolis - GO
                </span>
              </address>
              <GlassLink href={maps} external>
                COMO CHEGAR
              </GlassLink>
            </div>
          </div>
        </section>
        <section id="instagram" className="instagram-section section-pad">
          <div className="wrap instagram-inner">
            <div>
              <span className="eyebrow">
                <span className="eyebrow-line" /> 06 / CONECTE-SE
              </span>
              <h2>
                ACOMPANHE
                <br />A <em>LIFE STORE</em>
              </h2>
            </div>
            <div className="instagram-side">
              <Instagram size={46} strokeWidth={1} />
              <p>@lifestoreanps</p>
              <GlassLink href={instagram} external>
                VER INSTAGRAM
              </GlassLink>
            </div>
          </div>
        </section>
        <section className="final-section section-pad">
          <div className="wrap final-inner">
            <Wordmark large />
            <span className="eyebrow">SEU PRÓXIMO PASSO COMEÇA AQUI</span>
            <h2>
              PRECISA DE
              <br />
              <em>ASSISTÊNCIA?</em>
            </h2>
            <p>Fale com a Life Store e conte o que aconteceu com seu aparelho.</p>
            <GlassLink href={whatsapp} external>
              FALAR NO WHATSAPP
            </GlassLink>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="wrap footer-main">
          <div>
            <Wordmark />
            <p>
              Tecnologia para a vida real.
              <br />
              Anápolis - GO · Desde 2015
            </p>
          </div>
          <div>
            <span className="footer-label">ENCONTRE A GENTE</span>
            <p>
              Rua Aleixo Rodrigues de Queiroz, 701
              <br />
              Vila Industrial / Jundiaí Industrial
              <br />
              Anápolis - GO
            </p>
          </div>
          <div>
            <span className="footer-label">CONTATO</span>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp <ArrowUpRight size={15} />
            </a>
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              Instagram <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© LIFE STORE · DESDE 2015</span>
          <a href="#inicio">VOLTAR AO TOPO ↑</a>
        </div>
      </footer>
    </div>
  );
}
