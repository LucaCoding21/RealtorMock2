import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Marquee from "@/components/Marquee";
import Properties from "@/components/Properties";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <main className="relative">
        <Navigation />
        <Hero />
        <About />
        <Marquee />
        <Properties />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
