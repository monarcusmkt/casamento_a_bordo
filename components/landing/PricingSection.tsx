import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Ship, Download, CheckCircle2, User, Mail, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";
import receptionImage from "@/assets/carousel/FGnavio-1450.avif";

// ─── EmailJS Config ────────────────────────────────────────
const EMAILJS_SERVICE_ID = "service_u6rk34c";
const EMAILJS_TEMPLATE_ID = "template_r4sryvk";   // ← Preencha
const EMAILJS_PUBLIC_KEY = "_3KklHj1EtIpggT0j";      // ← Preencha
// ────────────────────────────────────────────────────────────

// Máscara de telefone brasileiro: (99) 99999-9999
const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

export function PricingSection() {
  const ref = useRef(null);
  const [formData, setFormData] = useState({ user_name: "", user_email: "", user_phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleWhatsApp = () => {
    window.open("https://wa.me/551938811824?text=Olá! Gostaria de transformar o meu casamento em uma experiência inesquecível em alto mar.", "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "user_phone") {
      setFormData({ ...formData, user_phone: formatPhone(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = "/briefing-casamento-a-bordo.pdf";
    link.download = "Briefing - Casamento a Bordo.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const form = e.currentTarget;
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        EMAILJS_PUBLIC_KEY
      );

      // Dispara download do PDF após sucesso
      triggerDownload();
      setLoading(false);
      setSubmitted(true);
    } catch (err: any) {
      console.error("EmailJS error:", err);
      const msg = err?.text || err?.message || "Erro desconhecido";
      setError(`Erro ao enviar: ${msg}`);
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="section-padding bg-navy text-pearl relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <img src={receptionImage} alt="" className="w-full h-full object-cover opacity-10 brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/40" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          {/* Content Left */}
          <motion.div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-pearl">
                <Ship size={20} />
              </div>
              <span className="text-pearl/80 font-bold tracking-[0.2em] uppercase text-xs">
                Inicie Seu Sonho
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
              O Horizonte <br />
              <span className="text-pearl italic font-light">é Apenas o Começo</span>
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-pearl/70 leading-relaxed mb-8 sm:mb-10 font-medium max-w-xl">
              <p>
                Contrate seu <span className="text-pearl font-semibold">pacote completo personalizado</span>,
                baixe o PDF com todas as informações ou
                <span className="text-pearl italic"> fale com nossa consultoria</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="hero"
                size="xl"
                onClick={handleWhatsApp}
                className="animate-pulse-gold h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base tracking-tight group w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                FALAR COM ESPECIALISTA
              </Button>
            </div>
          </motion.div>

          {/* Lead Capture Card Right */}
          <motion.div
            className="bg-white rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 shadow-elevated relative"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-[10px] font-bold text-navy uppercase tracking-widest mb-3">
                      <Download size={12} />
                      Briefing Gratuito
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-navy leading-tight">
                      Receba sua Proposta Digital
                    </h3>
                    <p className="text-muted-foreground/60 text-xs sm:text-sm mt-2">
                      Preencha seus dados e baixe o briefing completo
                    </p>
                  </div>

                  {/* Campo oculto p/ EmailJS */}
                  <input type="hidden" name="to_email" value="contato@casamentoabordo.com.br" />

                  {/* Nome */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Seu nome completo"
                      required
                      value={formData.user_name}
                      onChange={handleChange}
                      className="w-full h-12 sm:h-14 pl-11 pr-4 rounded-xl bg-pearl/50 border border-border/50 text-navy text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                    <input
                      type="email"
                      name="user_email"
                      placeholder="Seu melhor e-mail"
                      required
                      value={formData.user_email}
                      onChange={handleChange}
                      className="w-full h-12 sm:h-14 pl-11 pr-4 rounded-xl bg-pearl/50 border border-border/50 text-navy text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
                    />
                  </div>

                  {/* WhatsApp com máscara */}
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                    <input
                      type="tel"
                      name="user_phone"
                      placeholder="(00) 00000-0000"
                      required
                      value={formData.user_phone}
                      onChange={handleChange}
                      className="w-full h-12 sm:h-14 pl-11 pr-4 rounded-xl bg-pearl/50 border border-border/50 text-navy text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
                    />
                  </div>

                  {/* Erro */}
                  {error && (
                    <p className="text-red-500 text-xs text-center font-medium">{error}</p>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="default"
                    size="xl"
                    disabled={loading}
                    className="w-full h-14 sm:h-16 text-base sm:text-lg tracking-tight rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300"
                    style={{ backgroundColor: "#B32B39", color: "#fff" }}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        Solicitar Proposta & Baixar PDF
                      </span>
                    )}
                  </Button>

                  <p className="text-center text-[9px] font-medium text-muted-foreground/40 mt-3 uppercase tracking-wider">
                    Seus dados estão seguros e não serão compartilhados
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8 sm:py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-3">
                    Briefing Enviado!
                  </h3>
                  <p className="text-muted-foreground/70 text-sm sm:text-base max-w-sm mx-auto mb-8">
                    Nossa consultoria entrará em contato em breve. Enquanto isso, confira o briefing baixado.
                  </p>
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleWhatsApp}
                    className="rounded-xl"
                    style={{ backgroundColor: "#B32B39", color: "#fff" }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    FALAR COM ESPECIALISTA
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
