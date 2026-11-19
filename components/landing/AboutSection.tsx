import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, MapPin, Ship, Users } from "lucide-react";
import lucianaPhoto from "@/assets/luciana-consultora.jpeg";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="section-padding bg-pearl text-primary relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-navy/[0.02] -skew-x-12 translate-x-1/3 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Image side */}
          <motion.div
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-elevated bg-gradient-cta p-1 max-w-[80%] sm:max-w-[70%] lg:max-w-[350px] mx-auto">
              <div className="w-full rounded-[2.3rem] bg-navy flex flex-col items-center overflow-hidden">
                <div className="w-full overflow-hidden">
                  <img src={lucianaPhoto} alt="Luciana Marçola" className="w-full h-auto block" />
                </div>
                <div className="pt-4 px-8 pb-8 sm:pt-5 sm:px-10 sm:pb-10 text-center">
                  <h3 className="font-display text-2xl sm:text-4xl font-bold text-pearl mb-3">Luciana Marçola</h3>
                  <div className="w-12 sm:w-16 h-1 bg-accent/30 mx-auto mb-4" />
                  <p className="text-pearl/70 text-base sm:text-lg font-medium leading-relaxed">
                    Gestora de Operação, Logística e Assessoria em Eventos
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <motion.div
              initial={{ opacity: 0, x: 19 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-20 -right-4 lg:-right-8 bg-white p-7 rounded-3xl shadow-elevated z-20 border border-border/50"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-navy shadow-gold">
                  <Award size={28} />
                </div>
                <div>
                  <p className="text-navy font-bold text-2xl leading-none italic">+35 Anos</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-1">De Experiência no Turismo</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <motion.div>
            <div className="mb-10">
              <span className="inline-flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-[0.2em] mb-4">
                <div className="w-8 h-[1px] bg-secondary" />
                Quem Somos
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-8 leading-tight">
                Especialistas em <br />
                <span className="text-gradient-sunset italic font-light">Casamentos a Bordo</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-medium">
                <p>
                  <span className="text-primary font-bold">Luciana Marçola</span> é turismóloga e atua na área de consultoria,
                  logística, operações e produtos turísticos desde 1989. Sua trajetória é marcada pela
                  <span className="text-primary italic"> maestria em grandes eventos</span> e Destination Weddings.
                </p>
                <p>
                  Com um repertório de mais de <span className="text-primary font-bold">50 navegações</span> pelos oceanos do Caribe,
                  América do Sul e Europa, ela lidera nossa equipe com um olhar atento a cada detalhe técnico e emocional.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <div className="p-6 rounded-2xl bg-white shadow-soft border border-border/50 flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-pearl flex items-center justify-center text-accent">
                  <Ship size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary leading-none">+50</p>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Navegações</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white shadow-soft border border-border/50 flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-pearl flex items-center justify-center text-accent">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary leading-none">Global</p>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Atendimento</p>
                </div>
              </div>
            </div>

            {/* Partner logos area - cleaner */}
            <div className="pt-10 border-t border-border/50">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6">Parceiro Oficial das Principais Companhias</p>
              <div className="flex flex-wrap gap-4">
                {["MSC CRUZEIROS", "COSTA CRUZEIROS", "ROYAL CARIBBEAN", "NCL"].map((partner, idx) => (
                  <span key={idx} className="px-5 py-2 rounded-full bg-navy/5 text-navy font-bold text-[10px] tracking-widest hover:bg-navy hover:text-pearl transition-all duration-300">
                    {partner}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <Button
                variant="hero"
                size="xl"
                onClick={() => window.open("https://wa.me/551938811824?text=Olá! Gostaria de transformar o meu casamento em uma experiência inesquecível em alto mar.", "_blank")}
                className="animate-pulse-gold min-w-full sm:min-w-[260px] h-12 sm:h-14 text-sm sm:text-base tracking-tight"
              >
                FALAR COM ESPECIALISTA
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
