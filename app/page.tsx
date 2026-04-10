import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Clients from "@/components/sections/Clients";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Team from "@/components/sections/Team";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      <Hero />
      <Clients />
      <Services />
      <Portfolio />
      <Team />
      <Footer />
      <ScrollToTop />
    </main>
  );
}