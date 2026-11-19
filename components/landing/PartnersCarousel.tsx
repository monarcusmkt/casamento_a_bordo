import nclLogo from "@/assets/partners/ncl.svg";
import mscLogo from "@/assets/partners/msc.svg";
import royalCaribbeanLogo from "@/assets/partners/royal-caribbean.svg";
import dclLogo from "@/assets/partners/dcl.svg";

const partners = [
    { name: "MSC Cruzeiros", logo: mscLogo, invertWhite: true },
    { name: "Royal Caribbean International", logo: royalCaribbeanLogo, invertWhite: true },
    { name: "Disney Cruise Line", logo: dclLogo, invertWhite: false },
    { name: "Norwegian Cruise Line", logo: nclLogo, invertWhite: false },
];

export function PartnersCarousel() {
    /* Duplicamos a lista para criar o loop contínuo */
    const logos = [...partners, ...partners];

    return (
        <section
            className="relative py-8 sm:py-10 overflow-hidden bg-white"
        >
            {/* Cabeçalho */}
            <div className="flex flex-col items-center mb-8">
                <div
                    className="w-10 h-[2px] rounded-full mb-5"
                    style={{ backgroundColor: "#B32B39" }}
                />
                <h3 className="text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em]">
                    Principais Parceiras
                </h3>
            </div>

            {/* Carrossel com CSS puro (GPU-accelerated, sem travamentos) */}
            <div
                className="relative"
                style={{
                    maskImage:
                        "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                }}
            >
                <div className="partners-track">
                    {logos.map((partner, i) => (
                        <div
                            key={`${partner.name}-${i}`}
                            className="flex-shrink-0 px-10 sm:px-16 flex items-center justify-center group"
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className={`
                  h-10 sm:h-12 md:h-14 w-auto object-contain
                  transition-transform duration-500 ease-out
                  hover:scale-110 
                  ${partner.invertWhite ? "brightness-0" : ""}
                  cursor-pointer select-none
                `}
                                loading="lazy"
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Animação CSS pura — roda na GPU, sem jank */}
            <style>{`
        .partners-track {
          display: flex;
          width: max-content;
          animation: partners-scroll 40s linear infinite;
          will-change: transform;
        }
        @keyframes partners-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </section>
    );
}
