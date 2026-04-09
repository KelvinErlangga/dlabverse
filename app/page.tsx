// app/page.tsx
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      <Hero />
      <Services />
      
      {/* Nanti kita bisa tambahkan komponen Footer di sini */}
    </main>
  );
}