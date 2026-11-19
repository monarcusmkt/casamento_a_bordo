import { motion } from "framer-motion";
import { Heart, Rainbow, Sparkles, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Amor sem Barreiras",
    description: "Celebramos todas as formas de amor. Sua cerimônia será conduzida com todo o respeito, carinho e emoção que vocês merecem."
  },
  {
    icon: Shield,
    title: "Ambiente Seguro",
    description: "A bordo de um navio, vocês estarão em um ambiente acolhedor e seguro, cercados apenas por quem realmente ama vocês."
  },
  {
    icon: Sparkles,
    title: "Cerimônia Personalizada",
    description: "Criamos cerimônias únicas que refletem a história de vocês, com toda a liberdade para expressar seu amor."
  },
  {
    icon: Users,
    title: "Equipe Preparada",
    description: "Nossa equipe é treinada para garantir que todos os casais sejam tratados com igualdade e dignidade."
  }
];

export function LGBTQSection() {
  return (
    <section id="lgbtq" className="section-padding bg-pearl relative overflow-hidden">
      {/* Rainbow bridge - very subtle */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 opacity-40" />

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <Rainbow className="w-10 h-10 text-secondary opacity-60" />
            <span className="text-secondary font-bold text-xs uppercase tracking-[0.3em]">O Amor é o Nosso Norte</span>
            <Rainbow className="w-10 h-10 text-secondary opacity-60" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-8 leading-tight">
            Celebrações <br />
            <span className="text-gradient-sunset italic font-light">LGBTQIAP+</span>
          </h2>

          <p className="text-muted-foreground/80 max-w-3xl mx-auto text-lg font-medium leading-relaxed">
            Na LOVETRIPS, acreditamos que <span className="text-primary font-bold">todo amor merece ser exaltado</span>.
            Garantimos um ambiente de absoluto acolhimento e sofisticação para o seu "sim".
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-[2rem] p-8 shadow-soft border border-border/50 hover:shadow-elevated hover:border-accent/30 transition-all duration-500 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-pearl flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-500 text-accent">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-muted-foreground/80 text-sm leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Professional Statement Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="bg-navy rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-elevated group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <Heart className="w-14 h-14 mx-auto mb-10 text-accent group-hover:scale-110 transition-transform duration-700" fill="currentColor" />
              <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl italic text-pearl/90 leading-tight mb-10 max-w-4xl mx-auto font-light">
                "O amor que une dois corações não conhece fronteiras nem rótulos.
                A bordo, celebramos a liberdade de sentir."
              </blockquote>
              <div className="w-20 h-0.5 bg-accent/30 mx-auto mb-8" />
              <p className="text-pearl/50 text-base max-w-2xl mx-auto font-medium leading-relaxed">
                Nossas cerimônias simbólicas são plenamente realizadas com maestria em todos os cruzeiros,
                garantindo validade emocional para todos os casais.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
