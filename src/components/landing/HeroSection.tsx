import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Heart, Anchor, Sparkles } from "lucide-react";
import heroImage from "@/assets/carousel/IMG_6671.avif";

export function HeroSection() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Casamento a bordo de navio"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-black/50"
        />
      </div>



      {/* Content */}
      <div className="relative z-10 text-center px-4 pt-20 max-w-5xl mx-auto">

        <h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6 sm:mb-8 font-bold max-w-5xl mx-auto"
        >
          Case em um navio e transforme seu casamento em uma{" "}
          <span className="italic font-light text-white drop-shadow-md">
            experiência inesquecível
          </span>
        </h1>

        <p
          className="text-base sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 sm:mb-12 font-medium leading-relaxed balance px-4 drop-shadow-sm"
        >
          Cerimônia, viagem e momentos únicos com quem você ama
        </p>

        <div
          className="flex flex-col gap-4 justify-center items-center w-full px-4 sm:px-0"
        >
          <Button
            variant="hero"
            size="xl"
            onClick={() => window.open("https://wa.me/551938811824?text=Olá! Gostaria de transformar o meu casamento em uma experiência inesquecível em alto mar.", "_blank")}
            className="h-14 sm:h-16 px-8 sm:px-10 w-full sm:w-auto text-base sm:text-lg group bg-secondary text-white hover:bg-secondary/90 hover:scale-105 transition-all shadow-elevated"
            style={{ backgroundColor: "#8B1D31" }}
          >
            Falar com especialista no WhatsApp
          </Button>

          <button
            onClick={() => scrollToSection("o-que-e")}
            className="text-white/80 hover:text-white text-sm hover:underline underline-offset-4 transition-all"
          >
            Ver como funciona
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-16 sm:mt-20 text-white/90 text-xs sm:text-sm md:text-sm font-medium tracking-wide text-center px-4"
        >
          Mais de 25 casamentos realizados <span className="mx-2 sm:mx-4 opacity-50">•</span> Parceria oficial com as melhores armadoras <span className="mx-2 sm:mx-4 opacity-50">•</span> Parcelamento facilitado
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={() => scrollToSection("o-que-e")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-pearl/40 hover:text-gold transition-all duration-300"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={36} />
        </motion.div>
      </motion.button>
    </section>
  );
}
