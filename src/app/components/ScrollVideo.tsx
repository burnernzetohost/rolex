"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'

// Helper component for letter-by-letter animation
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
          <motion.span key={i} style={{ opacity, display: 'inline-block' }}>
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const firstSequenceY = useTransform(scrollYProgress, [0.65, 0.85], ["0vh", "-100vh"]);
  const secondSequenceY = useTransform(scrollYProgress, [0.65, 0.85], ["100vh", "0vh"]);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    gsap.registerPlugin(ScrollTrigger)
    
    const video1 = videoRef1.current
    const video2 = videoRef2.current
    if (!video1 || !video2) return

    const ctx = gsap.context(() => {
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
              end: "50% top",
              scrub: 0.5,
            },
          }
        )
      };

      const setupVideo2 = () => {
        if (!video2.duration) return;
        const startOffset = 0.0;
        const endOffset = 0.5;
        video2.currentTime = startOffset;

        gsap.fromTo(video2, 
          { currentTime: startOffset },
          {
            currentTime: video2.duration - endOffset,
            ease: "none",
            scrollTrigger: {
              trigger: ".scroll-container",
              start: "85% top",
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
    })

    return () => {
      ctx.revert()
      lenis.destroy()
    }
  }, [])

  return (
    <div ref={containerRef} className="scroll-container relative h-[1000vh] bg-black">
      {/* FIRST SEQUENCE */}
      <motion.div 
        className="fixed inset-0 w-full h-screen z-20"
      >
        <motion.div style={{ y: firstSequenceY }} className="w-full h-full">
          <video
            ref={videoRef1}
            src="/rolex11.mp4"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-contain mix-blend-screen"
          />

<div className="absolute left-[5%] top-[25%] z-30 max-w-[340px] text-white">
  <h2 className="text-[50px] mb-0" style={{ fontFamily: 'var(--Fontspring-theseasons-bd)', lineHeight: '0.9' }}>
    <CharacterAnimation text="Submariner" range={[0.05, 0.15]} scrollYProgress={scrollYProgress} />
  </h2>
  <p className="text-[22px] leading-[1.3] font-light mt-2" style={{ fontFamily: 'Times New Roman, serif' }}>
    <CharacterAnimation
      text="A Luxury Swiss dive watch introduced in 1953, known for its 300m water resistance, rotating bezel, and super durable design."
      range={[0.15, 0.35]}
      scrollYProgress={scrollYProgress}
    />
  </p>
</div>


          <div className="absolute right-[5%] bottom-[15%] z-30 max-w-[350px] text-white text-right">
            <p className="text-[22px] leading-[1.3] font-light" style={{ fontFamily: 'Times New Roman, serif' }}>
              <CharacterAnimation
                text="A refined mechanical timepiece crafted with meticulous detail, featuring a sleek silhouette and enduring design language."
                range={[0.40, 0.65]}
                scrollYProgress={scrollYProgress}
              />
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* SECOND SEQUENCE */}
      <motion.div 
        className="fixed inset-0 w-full h-screen z-10"
        style={{ y: secondSequenceY }}
      >
        <video
          ref={videoRef2}
          src="/rolex22.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain mx-auto ml-[10%]"
        />

        {/* Left side text for sequence 2 */}
        <div className="absolute left-[5%] top-[15%] z-30 max-w-[400px] text-white">
          <h2 className="text-[72px] mb-6" style={{ fontFamily: 'var(--Fontspring-theseasons-bd)' }}>
            <CharacterAnimation text="Born in 1953" range={[0.86, 0.90]} scrollYProgress={scrollYProgress} />
          </h2>
          <p className="text-[22px] leading-[1.3] font-light mb-6" style={{ fontFamily: 'Times New Roman, serif' }}>
            <CharacterAnimation
              text="From ocean depths to black-tie evenings, it became the symbol of effortless power and refined adventure."
              range={[0.90, 0.95]}
              scrollYProgress={scrollYProgress}
            />
          </p>
          <p className="text-[22px] leading-[1.3] font-light" style={{ fontFamily: 'Times New Roman, serif' }}>
            <CharacterAnimation
              text="Decades later, the Submariner still whispers the same promise: timeless design, built to conquer eternity."
              range={[0.95, 1.0]}
              scrollYProgress={scrollYProgress}
            />
          </p>
        </div>
      </motion.div>
    </div>
  )
}
