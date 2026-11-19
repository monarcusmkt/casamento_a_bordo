import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "Como funciona um casamento no navio?",
    answer: "Os casamentos são realizados a partir do segundo dia de navegação. A cerimônia dura em torno de 1 hora, incluindo entradas, discursos, cumprimentos, brinde e sessão de fotos. Tudo acontece em um local interno, reservado e privativo a bordo.",
  },
  {
    question: "Posso levar convidados que não estejam fazendo o cruzeiro?",
    answer: "Não é permitido. Para assistir a cerimônia, todos os convidados precisam estar embarcados com cabine comprada e realizar o cruzeiro junto com o casal.",
  },
  {
    question: "A cerimônia é válida como casamento civil?",
    answer: "A cerimônia a bordo é simbólica, realizada por um membro da tripulação. Se os noivos desejarem uma cerimônia oficial, podem contratar um oficial do navio ou um celebrante ecumênico para oficializar a união.",
  },
  {
    question: "É o Comandante do navio que celebra o casamento?",
    answer: "Não, a cerimônia é realizada por um oficial do navio. Você também pode levar seu próprio padre, pastor ou juiz.",
  },
  {
    question: "Posso oferecer uma recepção depois da cerimônia?",
    answer: "Sim! Os navios oferecem opções de coquetéis, inclusive DJ ou musicos para seu evento. Serviços adicionais como duração extra e menu especial podem ser contratados à parte.",
  },
  {
    question: "Com quanto tempo de antecedência preciso reservar?",
    answer: "Sugerimos contratar com pelo menos 6 meses de antecedência para garantir disponibilidade e tempo suficiente para o planejamento perfeito.",
  },
  {
    question: "Como posso pagar?",
    answer: "Parcelado em até 12 vezes sem juros através de cartão de crédito. Também aceitamos PIX e transferência bancária.",
  },
  {
    question: "O que acontece se chover no dia do meu casamento?",
    answer: "O clima não interfere! As cerimônias são realizadas em salões internos e climatizados, garantindo o conforto a todos.",
  },
  {
    question: "É permitido casamento homoafetivo?",
    answer: "Sim! Por ser uma cerimônia simbólica, casamentos homoafetivos são bem-vindos e realizados com todo carinho.",
  },
  {
    question: "Há cabeleireiro e maquiador a bordo?",
    answer: "Sim, há salão de beleza a bordo com profissionais qualificados. Para maquiagem, recomendamos levar seus próprios produtos e pincéis.",
  },
];

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="section-padding bg-pearl text-primary relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-navy/5 to-transparent pointer-events-none" />

      <div className="container-custom max-w-4xl relative z-10">
        <motion.div
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-4">
            <div className="w-8 h-[1px] bg-secondary" />
            Concierge Digital
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            Tudo o que Você <br />
            <span className="text-gradient-sunset italic font-light">Precisa Saber</span>
          </h2>
          <p className="text-muted-foreground/80 text-lg font-medium leading-relaxed">
            Esclareça suas principais dúvidas e navegue com tranquilidade <br className="hidden md:block" /> em direção ao seu grande dia.
          </p>
        </motion.div>

        <motion.div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-3xl border border-border/50 px-8 shadow-soft data-[state=open]:shadow-elevated data-[state=open]:border-accent/30 transition-all duration-500 group overflow-hidden"
              >
                <AccordionTrigger className="text-left font-display text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors py-8 no-underline hover:no-underline">
                  <div className="flex items-center gap-6">
                    <span className="font-display text-navy/10 text-2xl group-data-[state=open]:text-accent/30 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground/80 text-base leading-relaxed pb-8 font-medium pl-14">
                  <div className="max-w-3xl">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Still have questions? */}
        <motion.div
          className="mt-20 text-center"
        >
          <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest mb-6">Ainda tem alguma dúvida específica?</p>
          <a
            href="https://wa.me/551938811824?text=Olá! Gostaria de transformar o meu casamento em uma experiência inesquecível em alto mar."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-accent text-white font-bold text-sm px-6 py-3 rounded-xl shadow-elevated hover:bg-accent/90 hover:scale-105 transition-all duration-300 group"
          >
            FALAR COM ESPECIALISTA <MessageCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
