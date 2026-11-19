import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, Users, Calendar, CheckCircle } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Briefing Inicial",
    icon: ClipboardList,
    items: [
      "Avaliação do perfil do casal e estilo do casamento",
      "Definição do orçamento a ser investido",
      "Plataforma de Gestão do Evento (Web e App)",
      "Site personalizado + Save the Date",
    ],
  },
  {
    number: 2,
    title: "Reunião de Planejamento",
    subtitle: "4-6 meses antes",
    icon: Users,
    items: [
      "Indicação dos fornecedores necessários",
      "Cronograma de contratações mês a mês",
      "Negociação para garantir melhores valores",
      "Alinhamento de foto, filmagem e celebrante",
    ],
  },
  {
    number: 3,
    title: "Planejamento Final",
    subtitle: "4-6 meses antes",
    icon: Calendar,
    items: [
      "Reunião final para cronograma e check-list",
      "Orientação de como proceder no embarque",
      "Definição do roteiro da cerimônia",
      "Definição das músicas do cerimonial",
      "Roteiro de fotos pré e pós evento",
    ],
  },
  {
    number: 4,
    title: "Entrega a Bordo",
    icon: CheckCircle,
    items: [
      "Reunião com coordenador de eventos",
      "Agendamento salão de beleza",
      "Reunião com técnico de som, celebrante, restaurante",
      "Coordenação do cerimonial completa",
      "Coordenação de desembarque",
    ],
  },
];

export function AdvisorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="assessoria" className="section-padding bg-pearl relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-navy/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-4">
            <div className="w-8 h-[1px] bg-secondary" />
            Assessoria Completa
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-8 leading-tight">
            Do Sonho à Realização <br />
            <span className="text-gradient-sunset italic font-light">Cuidamos de Tudo</span>
          </h2>
          <p className="text-muted-foreground/80 max-w-3xl mx-auto text-lg font-medium leading-relaxed">
            Nossa equipe especializada orquestra cada detalhe técnico e emocional, para que você possa apenas
            viver o momento mais importante da sua vida.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group h-full">
              {/* Connector dot (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-[60px] -right-4 w-8 h-0.5 bg-border z-0" />
              )}

              <div className="h-full bg-white rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-elevated hover:border-accent/30 transition-all duration-500 flex flex-col relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-pearl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <step.icon size={28} />
                  </div>
                  <span className="font-display text-4xl font-bold text-navy/5 select-none">{step.number}</span>
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-primary mb-2 tracking-tight">{step.title}</h3>
                  {step.subtitle && (
                    <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-6">{step.subtitle}</p>
                  )}

                  <ul className="space-y-4">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground font-medium leading-relaxed group/item">
                        <CheckCircle className="w-4 h-4 text-accent mt-0.5 opacity-40 group-hover/item:opacity-100 transition-opacity" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
