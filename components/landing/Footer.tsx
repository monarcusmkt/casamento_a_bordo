import { Instagram, Facebook, Mail, Phone, MapPin, Heart } from "lucide-react";
import logoLovetrips from "@/assets/logo-lovetrips.png";

export function Footer() {
  return (
    <footer className="bg-navy text-pearl relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

      <div className="container-custom py-24 lg:pt-32 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-20">
          {/* Brand & Mission */}
          <div className="lg:col-span-2">
            <div className="mb-10">
              <img
                src={logoLovetrips}
                alt="LOVETRIPS On Board"
                className="h-10 brightness-0 invert object-contain"
              />
            </div>
            <p className="text-pearl/50 text-xl font-medium leading-relaxed max-w-md mb-10 italic">
              "Transformamos sonhos em histórias e memórias."
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-pearl/80 font-bold text-xs uppercase tracking-[0.3em] mb-8">Navegação</h4>
            <ul className="space-y-4">
              {[
                { label: "O Que É", href: "#o-que-e" },
                { label: "Motivos", href: "#motivos" },
                { label: "Casamento Íntimo", href: "#casamento-intimo" },
                { label: "LGBTQIAP+", href: "#lgbtq" },
                { label: "Sobre Nós", href: "#sobre" },
                { label: "Dúvidas", href: "#faq" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-pearl/60 hover:text-white font-bold text-sm tracking-tight transition-all duration-300 flex items-center gap-2 group"
                  >
                    <div className="w-0 h-[1px] bg-accent group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-pearl/80 font-bold text-xs uppercase tracking-[0.3em] mb-8">Fale Conosco</h4>
            <ul className="space-y-8">
              <li className="group">
                <a href="https://wa.me/551938811824" target="_blank" className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-pearl group-hover:bg-white group-hover:text-navy transition-all duration-500">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-pearl font-bold text-sm">(19) 3881-1824</p>
                    <p className="text-[10px] text-pearl/40 uppercase tracking-widest font-bold mt-1">Direct no WhatsApp</p>
                  </div>
                </a>
              </li>
              <li className="group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-pearl">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-pearl font-bold text-sm">São Paulo, SP</p>
                    <p className="text-[10px] text-pearl/40 uppercase tracking-widest font-bold mt-1">Base de Operações</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Credits */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-pearl/30 text-[10px] font-bold uppercase tracking-[0.2em]">
            © 2026 MONARCUS • TODOS OS DIREITOS RESERVADOS
          </div>
          <div className="flex items-center gap-6">
            <a href="/politica-de-privacidade" className="text-pearl/30 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">
              Política de Privacidade
            </a>
            <a href="/lgpd" className="text-pearl/30 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">
              LGPD
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
