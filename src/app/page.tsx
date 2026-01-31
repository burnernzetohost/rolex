import ScrollVideo from "@/app/components/ScrollVideo";

export default function Home() {
  return (
    <main className="relative bg-black">
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-center py-8 mix-blend-difference">
        <h1 className="text-white text-3xl font-serif tracking-[0.2em] uppercase">
          Rolex
        </h1>
      </header>
      <ScrollVideo />
    </main>
  );
}
