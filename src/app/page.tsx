import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Services from "@/components/Services"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-100 overflow-clip">
      <Navbar />
      <Hero />
      <Services />
    </main>
  )
}
