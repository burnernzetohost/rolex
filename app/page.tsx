'use client'

import { useEffect, useState } from 'react'
import ScrollVideo from '../components/ScrollVideo'
import ScrollVideoMobile from '../components/ScrollVideoMobile'

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevent hydration mismatch

  return (
    <main className="relative bg-black">
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-center py-8 mix-blend-difference">
        <h1 className="text-white text-3xl font-serif tracking-[0.2em] uppercase">
          Rolex
        </h1>
      </header>
      {isMobile ? <ScrollVideoMobile /> : <ScrollVideo />}
    </main>
  );
}
