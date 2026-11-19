import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { Anchor, Play, Pause, ExternalLink } from "lucide-react";
import YouTube from "react-youtube";

const VIDEO_ID = "otSOel-IO3M";
const START_TIME = 477;
const END_TIME = 583;

export function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const playerRef = useRef<any>(null);

  // Detecta se é mobile (< 768px)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const togglePlayPause = useCallback(() => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
      setHasStarted(true);
    }
  }, [isPlaying]);

  return (
    <section id="trajetoria" className="section-padding bg-pearl relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <Anchor className="absolute -top-12 -right-12 w-64 h-64 text-navy rotate-12" />
        <Anchor className="absolute -bottom-24 -left-24 w-96 h-96 text-navy -rotate-12" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-4">
            <div className="w-8 h-[1px] bg-secondary" />
            Nossa Trajetória
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-8 leading-tight">
            Mais de Uma Década <br />
            <span className="text-gradient-sunset italic font-light">Realizando Sonhos</span>
          </h2>
          <p className="text-muted-foreground/80 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Já realizamos centenas de casamentos a bordo, criando memórias que navegam para sempre no coração dos casais.
          </p>
        </motion.div>

        {/* Video Embed */}
        <motion.div
          className="max-w-4xl mx-auto"
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-elevated border-4 border-white mb-4">
            <div className="absolute inset-0 w-full h-full scale-105">
              <YouTube
                videoId={VIDEO_ID}
                opts={{
                  height: '100%',
                  width: '100%',
                  playerVars: {
                    autoplay: isMobile ? 0 : 1,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    loop: 1,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    mute: 1,
                    start: START_TIME,
                    end: END_TIME,
                    playlist: VIDEO_ID,
                  },
                }}
                className="w-full h-full pointer-events-none"
                onReady={(event) => {
                  playerRef.current = event.target;
                  if (!isMobile) {
                    setIsPlaying(true);
                    setHasStarted(true);
                  }
                }}
                onEnd={(event) => {
                  event.target.seekTo(START_TIME);
                  event.target.playVideo();
                }}
                onStateChange={(event) => {
                  if (event.data === 1) {
                    const currentTime = event.target.getCurrentTime();
                    if (currentTime >= END_TIME || currentTime < START_TIME) {
                      event.target.seekTo(START_TIME);
                    }
                  }
                }}
              />
            </div>

            {/* Mobile: Big centered play overlay (before user taps) */}
            {isMobile && !hasStarted && (
              <button
                onClick={togglePlayPause}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all"
                aria-label="Reproduzir vídeo"
              >
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-elevated mb-3">
                  <Play size={36} className="text-accent ml-1" />
                </div>
                <span className="text-white text-sm font-semibold tracking-wide">Toque para assistir</span>
              </button>
            )}

            {/* Play/Pause Button (small, corner) */}
            {hasStarted && (
              <button
                onClick={togglePlayPause}
                className="absolute bottom-4 left-4 z-20 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
                aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
              </button>
            )}
          </div>

          {/* Watch on YouTube link */}
          <div className="flex justify-center">
            <a
              href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors duration-300 group"
            >
              <ExternalLink size={16} className="group-hover:scale-110 transition-transform" />
              Assistir no YouTube
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
