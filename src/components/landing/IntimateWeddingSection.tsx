import { motion } from "framer-motion";
import { Heart, Sunset, Ship, Sparkles, Camera, Wine } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Só Vocês Dois",
    description: "Uma cerimônia íntima e exclusiva, focada totalmente no casal."
  },
  {
    icon: Sunset,
    title: "Cenário dos Sonhos",
    description: "Cerimônia com vista para o mar, pôr do sol e a imensidão do oceano."
  },
  {
    icon: Camera,
    title: "Fotos Incríveis",
    description: "Sem pressa, sem filas. Fotos exclusivas apenas do casal."
  },
  {
    icon: Wine,
    title: "Celebração Privada",
    description: "Champagne, jantar romântico e toda atenção só para vocês."
  }
];

export function IntimateWeddingSection() {
  return (
    <section id="casamento-intimo" className="section-padding bg-navy text-pearl relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-pearl">
                <Heart size={20} fill="currentColor" />
              </div>
              <span className="text-pearl/80 font-bold tracking-[0.2em] uppercase text-xs">
                A Dois & Inesquecível
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Casamento <br />
              <span className="text-pearl italic font-light">Só para o Casal</span>
            </h2>

            <div className="space-y-6 text-lg text-pearl/70 leading-relaxed mb-10 font-medium">
              <p>
                Nem todo mundo sonha com uma grande festa. Se vocês preferem algo
                <span className="text-pearl font-bold"> íntimo, romântico e exclusivo</span>,
                o casamento a bordo apenas para o casal é a escolha perfeita.
              </p>

              <p>
                Imaginem: vocês dois trocando votos com a brisa do mar e o <span className="text-pearl italic">horizonte infinito</span> como testemunhas. Uma celebração sem pressa, focada inteiramente na conexão de vocês.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { title: "Lua de Mel Imediata", desc: "Após a cerimônia, vocês já estão no destino dos sonhos." },
                { title: "Luxo na Medida Certa", desc: "Invista na melhor cabine e experiências exclusivas." },
                { title: "Zero Estresse", desc: "Sem listas complexas. Apenas o que realmente importa." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-pearl group-hover:bg-white group-hover:text-navy transition-all duration-300 flex-shrink-0 mt-1">
                    <Sparkles size={12} />
                  </div>
                  <div>
                    <h4 className="font-bold text-pearl mb-1">{item.title}</h4>
                    <p className="text-pearl/50 text-sm font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Benefits grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-white/10 hover:shadow-elevated transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-500 text-accent">
                  <benefit.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3 tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed font-medium">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-24"
        >
          <div className="relative bg-gradient-cta rounded-[3rem] p-12 md:p-16 overflow-hidden shadow-elevated">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

            <div className="relative z-10 text-center">
              <Heart className="w-12 h-12 text-pearl/60 mx-auto mb-8 drop-shadow-sm" fill="currentColor" />
              <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl italic text-pearl/90 leading-tight max-w-4xl mx-auto font-light">
                "O casamento mais perfeito é aquele que reflete quem vocês são como casal.
                Se o sonho é algo íntimo, façam dele realidade."
              </blockquote>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
