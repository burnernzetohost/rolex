"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useScroll, useTransform } from 'framer-motion'

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
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const video = videoRef.current
    if (!video) return

    const ctx = gsap.context(() => {
      const setupAnimation = () => {
        if (!video.duration) return;

        // Configuration: Adjust these values (in seconds)
        const startOffset = 0.5; // Starts at 0.5 seconds
        const endOffset = 0.5;   // Ends 0.5 seconds before the actual end
        
        // 1. Set the initial frame so it doesn't "jump" when scrolling starts
        video.currentTime = startOffset;

        gsap.fromTo(video, 
          { currentTime: startOffset }, // Starting frame
          {
            currentTime: video.duration - endOffset, // Ending frame
            ease: "none",
            scrollTrigger: {
              trigger: ".scroll-container",
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        )
      };

      if (video.readyState >= 1) setupAnimation();
      else video.onloadedmetadata = setupAnimation;
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="scroll-container relative h-[500vh] bg-black">
      <video
        ref={videoRef}
        src="/rolex11.mp4"
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-contain mix-blend-screen"
      />

      {/* Top Left Text - Animates from 5% to 30% of scroll */}
      <div className="fixed left-[5%] top-[15%] z-10 max-w-[340px] text-white">
        <h2
          className="text-7xl mb-6"
          style={{ fontFamily: 'var(--Fontspring-theseasons-bd)' }}
        >
          <CharacterAnimation
            text="Submariner"
            range={[0.05, 0.15]}
            scrollYProgress={scrollYProgress}
          />
        </h2>
        <p
          className="text-[22px] leading-[1.3] font-light"
          style={{ fontFamily: 'Times New Roman, serif' }}
        >
          <CharacterAnimation
            text="A Luxury Swiss dive watch introduced in 1953, known for its 300m water resistance, rotating bezel, and super durable design."
            range={[0.15, 0.35]}
            scrollYProgress={scrollYProgress}
          />
        </p>
      </div>

      {/* Bottom Right Text - Animates from 40% to 70% of scroll */}
      <div className="fixed right-[5%] bottom-[15%] z-10 max-w-[350px] text-white text-right">
        <p
          className="text-[22px] leading-[1.3] font-light"
          style={{ fontFamily: 'Times New Roman, serif' }}
        >
          <CharacterAnimation
            text="A refined mechanical timepiece crafted with meticulous detail, featuring a sleek silhouette and enduring design language."
            range={[0.40, 0.75]}
            scrollYProgress={scrollYProgress}
          />
        </p>
      </div>
    </div>
  )
}
