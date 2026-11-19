import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Ship, Heart, Sparkles } from "lucide-react";
import cruiseImage from "@/assets/carousel/FGnavio-1466.avif";

export function WhatIsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="o-que-e" className="section-padding bg-pearl relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-navy/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <div className="relative lg:order-last">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-elevated aspect-[4/5] lg:aspect-auto">
              <img
                src={cruiseImage}
                alt="Celebração de casamento no navio"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>

            {/* Floating Info card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 md:-left-12 bg-white p-8 rounded-3xl shadow-elevated z-20 max-w-[240px] border border-border/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Heart fill="currentColor" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary italic leading-none">+50</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Navegações</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-semibold leading-relaxed">
                Especialistas em realizar sonhos em alto mar.
              </p>
            </motion.div>
          </div>

          {/* Content side */}
          <div>
            <div className="mb-10">
              <span className="inline-flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-[0.2em] mb-4">
                <div className="w-8 h-[1px] bg-secondary" />
                A Nova Maneira de Celebrar
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-8 leading-tight">
                Seu Casamento em <br />
                <span className="text-gradient-sunset italic font-light">Grande Estilo</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-medium">
                <p>
                  Casamento a bordo nada mais é do que realizar a cerimônia do seu casamento dentro de um
                  <span className="text-primary font-bold"> luxuoso navio de cruzeiro</span>. É uma experiência única onde você e seus convidados vivem momentos inesquecíveis juntos.
                </p>
                <p className="hidden sm:block">
                  Imagine suas fotos de casamento com o <span className="text-primary font-bold">azul infinito do mar</span> como cenário, a brisa suave nos cabelos e um pôr do sol dourado pintando o horizonte.
                </p>
                <p>
                  E depois da cerimônia? A lua de mel já começa! Com gastronomia gourmet, entretenimento de primeira classe e destinos paradisíacos — tudo incluído na mesma viagem.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Sparkles, title: "Experiência All-Inclusive", desc: "Cerimônia, festa e lua de mel integradas." },
                { icon: Ship, title: "Destinos Incríveis", desc: "Acorde em um lugar novo a cada dia." }
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white shadow-soft border border-border/50 group hover:shadow-elevated transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-pearl flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                    <item.icon size={24} />
                  </div>
                  <h3 className="font-bold text-primary mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
