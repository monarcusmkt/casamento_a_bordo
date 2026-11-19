import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoLovetrips from "@/assets/logo-lovetrips.png";

const navLinks = [
  { label: "O que é", href: "#o-que-e" },
  { label: "Motivos", href: "#motivos" },
  { label: "LGBTQIAP+", href: "#lgbtq" },
  { label: "Casamento Íntimo", href: "#casamento-intimo" },
  { label: "FAQ", href: "#faq" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Only update state if value actually changes to avoid re-renders
      if (scrollY > 50 && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollY <= 50 && isScrolled) {
        setIsScrolled(false);
      }
    };

    // Add passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const scrollToSection = (href: string) => {
    if (!isHomePage) {
      // If not on homepage, navigate to homepage with anchor
      window.location.href = "/" + href;
      return;
    }
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "glass shadow-soft py-4"
          : "bg-transparent py-4 sm:py-7"
          }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group transition-transform hover:scale-105 duration-300">
            <img
              src={logoLovetrips}
              alt="LOVETRIPS On Board"
              className={`transition-all duration-500 ${isScrolled ? "h-9" : "h-11 brightness-0 invert"
                }`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link, index) => {
              const isExternal = link.href.startsWith("http");
              const isInternalRoute = link.href.startsWith("/");

              const className = `text-sm font-semibold tracking-wide uppercase transition-all duration-300 relative group ${isScrolled
                ? "text-muted-foreground hover:text-primary"
                : "text-pearl/90 hover:text-pearl"
                }`;

              if (isExternal) {
                return (
                  <a key={index} href={link.href} className={className}>
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                  </a>
                );
              }

              const LinkComponent = isInternalRoute ? Link : "button";
              return (
                <LinkComponent
                  key={index}
                  to={isInternalRoute ? link.href : undefined}
                  onClick={() => !isInternalRoute && scrollToSection(link.href)}
                  className={className}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </LinkComponent>
              );
            })}
            <Button
              variant="default"
              size="sm"
              onClick={() => window.open("https://wa.me/551938811824?text=Olá! Gostaria de transformar o meu casamento em uma experiência inesquecível em alto mar.", "_blank")}
              className="px-4 text-xs font-bold tracking-tight bg-accent text-white hover:bg-accent/90 border-none shadow-elevated"
            >
              FALAR COM ESPECIALISTA
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-full transition-colors ${isScrolled
              ? "text-primary hover:bg-primary/5"
              : "text-pearl hover:bg-pearl/10"
              }`}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-navy/95 backdrop-blur-xl flex items-center justify-center"
          >
            <nav className="flex flex-col items-center justify-center gap-8 p-8">
              {navLinks.map((link, index) => {
                const isExternal = link.href.startsWith("http");
                const isInternalRoute = link.href.startsWith("/");
                const className = "font-display text-3xl text-pearl hover:text-accent transition-colors block text-center";

                if (isExternal) {
                  return (
                    <motion.a
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={index}
                      href={link.href}
                      className={className}
                    >
                      {link.label}
                    </motion.a>
                  );
                }

                const MobileLinkComponent = isInternalRoute ? Link : motion.button;
                const linkProps = isInternalRoute
                  ? { to: link.href, onClick: () => setIsMobileMenuOpen(false) }
                  : { onClick: () => scrollToSection(link.href) };

                return (
                  // @ts-ignore
                  <MobileLinkComponent
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index}
                    {...linkProps}
                    className={className}
                  >
                    {link.label}
                  </MobileLinkComponent>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-4"
              >
                <Button
                  variant="hero"
                  size="xl"
                  onClick={() => window.open("https://wa.me/551938811824?text=Olá! Gostaria de transformar o meu casamento em uma experiência inesquecível em alto mar.", "_blank")}
                  className="px-12"
                >
                  FALAR COM ESPECIALISTA
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
