import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Properties from "@/components/Properties";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <>
      <Loader />
      <main className="relative">
        <Navigation />
        <Hero />
        <About />
        <Properties />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
