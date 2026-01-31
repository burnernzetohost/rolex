"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'

// Helper component for letter-by-letter animation
// Helper component for letter-by-letter animation - FIXED
const CharacterAnimation = ({ text, range, scrollYProgress }: { text: string, range: [number, number], scrollYProgress: any }) => {
  const characters = text.split('');
  const amount = range[1] - range[0];
  const step = characters.length > 0 ? amount / characters.length : amount;

  return (
    <>
      {characters.map((char, i) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;
        const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
        return (
          <motion.span key={`char-${i}-${char.charCodeAt(0)}`} style={{ opacity, display: 'inline-block' }}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </>
  );
};


export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef1 = useRef<HTMLVideoElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)
  const videoRef3 = useRef<HTMLVideoElement>(null)
  const videoRef4 = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transitions with TINY 1% dead scroll
  const firstSequenceY = useTransform(scrollYProgress, [0.19, 0.23], ["0vh", "-100vh"]);
  const secondSequenceY = useTransform(scrollYProgress, [0.19, 0.23], ["100vh", "0vh"]);
  
  const secondSequenceY2 = useTransform(scrollYProgress, [0.44, 0.48], ["0vh", "-100vh"]);
  const thirdSequenceY = useTransform(scrollYProgress, [0.44, 0.48], ["100vh", "0vh"]);
  
  const thirdSequenceY2 = useTransform(scrollYProgress, [0.70, 0.74], ["0vh", "-100vh"]);
  const fourthSequenceY = useTransform(scrollYProgress, [0.70, 0.74], ["100vh", "0vh"]);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    gsap.registerPlugin(ScrollTrigger)
    
    const video1 = videoRef1.current
    const video2 = videoRef2.current
    const video3 = videoRef3.current
    const video4 = videoRef4.current
    if (!video1 || !video2 || !video3 || !video4) return

    const ctx = gsap.context(() => {
      // SEQUENCE 1 (0-18% scroll) - WITH 0.5s delay
      const setupVideo1 = () => {
        if (!video1.duration) return;
        const startOffset = 0.5;
        const endOffset = 0.5;
        video1.currentTime = startOffset;

        gsap.fromTo(video1, 
          { currentTime: startOffset },
          {
            currentTime: video1.duration - endOffset,
            ease: "none",
            scrollTrigger: {
              trigger: ".scroll-container",
              start: "top top",
              end: "18% top",
              scrub: 0.5,
            },
          }
        )
      };

      // SEQUENCE 2 (23-43% scroll) - NO delay
      const setupVideo2 = () => {
        if (!video2.duration) return;
        const startOffset = 0.0;
        const endOffset = 0.0;
        video2.currentTime = startOffset;

        gsap.fromTo(video2, 
          { currentTime: startOffset },
          {
            currentTime: video2.duration - endOffset,
            ease: "none",
            scrollTrigger: {
              trigger: ".scroll-container",
              start: "23% top",
              end: "43% top",
              scrub: 0.5,
            },
          }
        )
      };

      // SEQUENCE 3 (48-68% scroll) - NO delay
      const setupVideo3 = () => {
        if (!video3.duration) return;
        const startOffset = 0.0;
        const endOffset = 0.0;
        video3.currentTime = startOffset;

        gsap.fromTo(video3, 
          { currentTime: startOffset },
          {
            currentTime: video3.duration - endOffset,
            ease: "none",
            scrollTrigger: {
              trigger: ".scroll-container",
              start: "48% top",
              end: "68% top",
              scrub: 0.5,
            },
          }
        )
      };

      // SEQUENCE 4 (73-100% scroll) - NO delay
      const setupVideo4 = () => {
        if (!video4.duration) return;
        const startOffset = 0.0;
        const endOffset = 0.0;
        video4.currentTime = startOffset;

        gsap.fromTo(video4, 
          { currentTime: startOffset },
          {
            currentTime: video4.duration - endOffset,
            ease: "none",
            scrollTrigger: {
              trigger: ".scroll-container",
              start: "74% top",
              end: "bottom bottom",
              scrub: 0.5,
            },
          }
        )
      };

      if (video1.readyState >= 1) setupVideo1();
      else video1.onloadedmetadata = setupVideo1;
      
      if (video2.readyState >= 1) setupVideo2();
      else video2.onloadedmetadata = setupVideo2;

      if (video3.readyState >= 1) setupVideo3();
      else video3.onloadedmetadata = setupVideo3;

      if (video4.readyState >= 1) setupVideo4();
      else video4.onloadedmetadata = setupVideo4;
    })

    return () => {
      ctx.revert()
      lenis.destroy()
    }
  }, [])

  return (
    <div ref={containerRef} className="scroll-container relative h-[4000vh] bg-black">
      {/* SEQUENCE 1 - rolex11.mp4 */}
      <motion.div className="fixed inset-0 w-full h-screen z-40">
        <motion.div style={{ y: firstSequenceY }} className="w-full h-full">
          <video
            ref={videoRef1}
            src="/rolex11.mp4"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-contain mix-blend-screen"
          />

          {/* Top Left Text */}
          <div className="absolute left-[5%] top-[25%] z-30 max-w-[340px] text-white">
            <h2 className="text-[40px] mb-0" style={{ fontFamily: 'var(--Fontspring-theseasons-bd)', lineHeight: '0.9' }}>
              <CharacterAnimation text="Submariner" range={[0.01, 0.05]} scrollYProgress={scrollYProgress} />
            </h2>
            <p className="text-[22px] leading-[1.3] font-light mt-2" style={{ fontFamily: 'Times New Roman, serif' }}>
              <CharacterAnimation
                text="A Luxury Swiss dive watch introduced in 1953, known for its 300m water resistance, rotating bezel, and super durable design."
                range={[0.05, 0.12]}
                scrollYProgress={scrollYProgress}
              />
            </p>
          </div>

          {/* Bottom Right Text */}
          <div className="absolute right-[5%] bottom-[15%] z-30 max-w-[350px] text-white text-right">
            <p className="text-[22px] leading-[1.3] font-light" style={{ fontFamily: 'Times New Roman, serif' }}>
              <CharacterAnimation
                text="A refined mechanical timepiece crafted with meticulous detail, featuring a sleek silhouette and enduring design language."
                range={[0.12, 0.18]}
                scrollYProgress={scrollYProgress}
              />
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* SEQUENCE 2 - rolex22.mp4 */}
      <motion.div className="fixed inset-0 w-full h-screen z-30">
        <motion.div style={{ y: secondSequenceY }} className="w-full h-full">
          <motion.div style={{ y: secondSequenceY2 }} className="w-full h-full">
            <video
              ref={videoRef2}
              src="/rolex22.mp4"
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-contain mx-auto ml-[10%]"
            />

            {/* Left side text */}
            <div className="absolute left-[5%] top-[15%] z-30 max-w-[400px] text-white">
              <h2 className="text-[40px] mb-0" style={{ fontFamily: 'var(--Fontspring-theseasons-bd)', lineHeight: '0.9' }}>
                <CharacterAnimation text="Born in 1953" range={[0.24, 0.28]} scrollYProgress={scrollYProgress} />
              </h2>
              <p className="text-[22px] leading-[1.3] font-light mt-2 mb-6" style={{ fontFamily: 'Times New Roman, serif' }}>
                <CharacterAnimation
                  text="From ocean depths to black-tie evenings, it became the symbol of effortless power and refined adventure."
                  range={[0.28, 0.35]}
                  scrollYProgress={scrollYProgress}
                />
              </p>
              <p className="text-[22px] leading-[1.3] font-light" style={{ fontFamily: 'Times New Roman, serif' }}>
                <CharacterAnimation
                  text="Decades later, the Submariner still whispers the same promise: timeless design, built to conquer eternity."
                  range={[0.35, 0.43]}
                  scrollYProgress={scrollYProgress}
                />
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* SEQUENCE 3 - rolex33.mp4 */}
      <motion.div className="fixed inset-0 w-full h-screen z-20">
        <motion.div style={{ y: thirdSequenceY }} className="w-full h-full">
          <motion.div style={{ y: thirdSequenceY2 }} className="w-full h-full">
            <video
              ref={videoRef3}
              src="/rolex33.mp4"
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-contain"
            />

            {/* Right side text for sequence 3 */}
            <div className="absolute left-[5%] top-[15%] z-30 max-w-[400px] text-white text-left">
              <h2 className="text-[40px] mb-0" style={{ fontFamily: 'var(--Fontspring-theseasons-bd)', lineHeight: '0.9' }}>
                <CharacterAnimation text="Premium Build" range={[0.49, 0.53]} scrollYProgress={scrollYProgress} />
              </h2>
              <p className="text-[22px] leading-[1.3] font-light mt-2" style={{ fontFamily: 'Times New Roman, serif' }}>
                <CharacterAnimation
                  text="Engineered like armor, finished like art."
                  range={[0.53, 0.68]}
                  scrollYProgress={scrollYProgress}
                />
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* SEQUENCE 4 - rolex44.mp4 */}
      <motion.div className="fixed inset-0 w-full h-screen z-10">
        <motion.div style={{ y: fourthSequenceY }} className="w-full h-full">
          <video
            ref={videoRef4}
            src="/rolex44.mp4"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-contain mx-auto ml-[10%]"
          />

          {/* Left side text for sequence 4 */}
          <div className="absolute left-[5%] bottom-[15%] z-30 max-w-[400px] text-white">
            <h2 className="text-[40px] mb-0" style={{ fontFamily: 'var(--Fontspring-theseasons-bd)', lineHeight: '0.9' }}>
              <CharacterAnimation text="Contact" range={[0.74, 0.79]} scrollYProgress={scrollYProgress} />
            </h2>
            <p className="text-[22px] leading-[1.3] font-light mt-2" style={{ fontFamily: 'Times New Roman, serif' }}>
              <CharacterAnimation
                text="aryanp.5501@gmail.com"
                range={[0.79, 1.0]}
                scrollYProgress={scrollYProgress}
              />
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}