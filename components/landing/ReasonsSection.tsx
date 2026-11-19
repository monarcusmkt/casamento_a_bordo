import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  DollarSign,
  Plane,
  UtensilsCrossed,
  PartyPopper,
  MapPin,
  Palette,
  Users,
  Zap,
  Shield,
  ShoppingBag,
  Sparkles
} from "lucide-react";

const reasons = [
  {
    icon: DollarSign,
    title: "Custo-Benefício Incrível",
    description: "Mais econômico que um buffet tradicional. Local, menu, DJ, fotógrafo — tudo já está dentro do navio.",
  },
  {
    icon: Plane,
    title: "Casamento + Lua de Mel",
    description: "Combine cerimônia, recepção e lua de mel em uma única viagem extraordinária.",
  },
  {
    icon: UtensilsCrossed,
    title: "All Inclusive",
    description: "Todas as refeições inclusas. Com pacote de bebidas, ninguém precisa se preocupar se vai acabar.",
  },
  {
    icon: PartyPopper,
    title: "Vários Dias de Festa",
    description: "A comemoração continua por dias! Piscinas, teatros, cassino, baladas — diversão garantida.",
  },
  {
    icon: MapPin,
    title: "Destinos Paradisíacos",
    description: "Escolha roteiros nacionais ou internacionais e conheça lugares incríveis com quem você ama.",
  },
  {
    icon: Palette,
    title: "Original e Criativo",
    description: "Cerimônia à luz de velas com vista para o mar? Tudo é possível. Uma experiência única.",
  },
  {
    icon: Users,
    title: "Convidados Especiais",
    description: "Lista livre! Só vai quem realmente quer estar com você neste momento único.",
  },
  {
    icon: Zap,
    title: "Praticidade Total",
    description: "Deixe todo o planejamento conosco. Você só precisa se preocupar em ser feliz.",
  },
  {
    icon: Shield,
    title: "Segurança Garantida",
    description: "Câmeras, oficiais de segurança 24h, cofres nas cabines. Tranquilidade para você e seus convidados.",
  },
  {
    icon: ShoppingBag,
    title: "Compras Tax-Free",
    description: "Free shops a bordo com produtos importados até 30% mais baratos. Presentes de casamento!",
  },
];

export function ReasonsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="motivos" className="section-padding bg-navy text-pearl relative overflow-hidden" ref={ref}>
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 text-pearl/80 font-bold text-xs uppercase tracking-[0.3em] mb-4">
            <Sparkles className="w-4 h-4" />
            Por que escolher o mar?
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Motivos Incomparáveis para <br />
            <span className="text-pearl italic font-light">Casar em um Cruzeiro</span>
          </h2>
          <p className="text-pearl/60 max-w-2xl mx-auto text-lg font-medium">
            O equilíbrio perfeito entre aventura, luxo e praticidade para o dia mais importante da sua vida.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-accent/30 flex flex-col items-start"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white group-hover:text-navy transition-all duration-500 text-pearl">
                <reason.icon size={28} />
              </div>

              <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-white transition-colors">
                {reason.title}
              </h3>

              <p className="text-pearl/60 text-sm leading-relaxed font-medium">
                {reason.description}
              </p>

              <span className="absolute top-6 right-8 text-white/30 font-display text-5xl font-bold italic pointer-events-none group-hover:text-white/60 transition-colors">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>

        <motion.div
          className="mt-12 sm:mt-20 flex justify-center w-full px-4"
        >
          <Button
            variant="hero"
            size="xl"
            onClick={() => window.open("https://wa.me/551938811824?text=Olá! Gostaria de transformar o meu casamento em uma experiência inesquecível em alto mar.", "_blank")}
            className="animate-pulse-gold w-full sm:w-auto sm:min-w-[260px] h-12 sm:h-14 text-sm sm:text-base tracking-tight"
          >
            FALAR COM ESPECIALISTA
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
