import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Autoplay from "embla-carousel-autoplay";

export function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [dynamicImages, setDynamicImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  useEffect(() => {
    // Carrega dinamicamente todas as imagens da pasta assets/carousel
    const imageFiles = import.meta.glob("@/assets/carousel/*.avif", { eager: true });
    const imageUrls = Object.values(imageFiles).map((mod: any) => mod.default);
    setDynamicImages(imageUrls);
  }, []);

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? dynamicImages.length - 1 : prev! - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) =>
        prev === dynamicImages.length - 1 ? 0 : prev! + 1
      );
    }
  };

  return (
    <section id="galeria" className="section-padding bg-pearl relative overflow-hidden" ref={ref}>
      {/* Decoration */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-navy/5 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-[0.2em] mb-4">
            <div className="w-8 h-[1px] bg-secondary" />
            Galeria de Momentos
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-8 leading-tight">
            Sonhos Transformados em <br />
            <span className="text-gradient-sunset italic font-light">Realidade</span>
          </h2>
          <p className="text-muted-foreground/80 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Inspire-se com registros reais de casais que escolheram o azul infinito do mar
            como cenário para o seu "sim".
          </p>
        </motion.div>

        {/* Real Photos Carousel */}
        {dynamicImages.length > 0 && (
          <>
            <motion.div
              className="px-4 sm:px-12"
            >
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                  duration: 60,
                }}
                plugins={[autoplay.current]}
                className="w-full"
              >
                <CarouselContent className="-ml-4 sm:-ml-6">
                  {dynamicImages.map((src, index) => (
                    <CarouselItem key={index} className="pl-4 sm:pl-6 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                      <div
                        className="group relative overflow-hidden rounded-[2rem] aspect-[4/5] shadow-soft cursor-zoom-in bg-muted border border-border/50"
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <img
                          src={src}
                          alt={`Galeria Real ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="text-pearl/90 font-display text-sm tracking-widest uppercase font-bold">Ver Foto</span>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-4 bg-white border-border/50 hover:bg-pearl hover:text-accent transition-all duration-300" />
                <CarouselNext className="hidden md:flex -right-4 bg-white border-border/50 hover:bg-pearl hover:text-accent transition-all duration-300" />
              </Carousel>
            </motion.div>

            {/* Photographer Credit */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground/60 font-medium">
                <Camera className="inline-block w-4 h-4 mr-1.5 -mt-0.5" />
                Fotos por <span className="font-bold text-primary/70">Marcel Martins</span> —{" "}
                <a
                  href="https://www.instagram.com/marcelmartinsfotoefilme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-accent transition-colors font-bold"
                >
                  @marcelmartinsfotoefilme
                </a>
              </p>
            </div>
          </>
        )}


        {/* Lightbox Modal */}
        <Dialog open={selectedImageIndex !== null} onOpenChange={(open) => !open && setSelectedImageIndex(null)}>
          <DialogContent className="max-w-[100vw] w-full h-[100vh] p-0 bg-navy/95 backdrop-blur-md border-none overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              {selectedImageIndex !== null && (
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full h-full flex flex-col items-center justify-center p-4 group"
                >
                  {/* Modern Close Button */}
                  <button
                    onClick={() => setSelectedImageIndex(null)}
                    className="absolute top-8 right-8 p-3 rounded-full bg-white/10 text-pearl hover:bg-white/20 transition-all duration-300 z-50 group/close"
                  >
                    <X size={28} className="group-hover/close:rotate-90 transition-transform duration-500" />
                  </button>

                  <div className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center shadow-2xl">
                    <img
                      src={dynamicImages[selectedImageIndex]}
                      alt={`Foto Real ${selectedImageIndex + 1}`}
                      className="max-w-full max-h-full object-contain rounded-2xl shadow-elevated border border-white/10"
                    />

                    {/* Desktop Navigation */}
                    <button
                      onClick={handlePrevious}
                      className="absolute -left-20 p-4 rounded-full bg-white/10 text-pearl hover:bg-accent hover:text-navy transition-all duration-300 opacity-0 group-hover:opacity-100 hidden lg:flex"
                    >
                      <ChevronLeft size={36} />
                    </button>

                    <button
                      onClick={handleNext}
                      className="absolute -right-20 p-4 rounded-full bg-white/10 text-pearl hover:bg-accent hover:text-navy transition-all duration-300 opacity-0 group-hover:opacity-100 hidden lg:flex"
                    >
                      <ChevronRight size={36} />
                    </button>
                  </div>

                  {/* Navigation Area for Mobile */}
                  <div className="absolute inset-y-0 left-0 w-1/4 lg:hidden" onClick={handlePrevious} />
                  <div className="absolute inset-y-0 right-0 w-1/4 lg:hidden" onClick={handleNext} />

                  {/* Bottom Counter and Progress */}
                  <div className="absolute bottom-12 flex flex-col items-center gap-4">
                    <div className="px-6 py-2 rounded-full bg-white/10 border border-white/10 text-pearl/90 font-bold tracking-widest text-xs uppercase">
                      {String(selectedImageIndex + 1).padStart(2, '0')} — {String(dynamicImages.length).padStart(2, '0')}
                    </div>
                    <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${((selectedImageIndex + 1) / dynamicImages.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
