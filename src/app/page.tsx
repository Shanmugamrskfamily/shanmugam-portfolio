import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ScrollAnimations from '@/components/ScrollAnimations';

export const metadata: Metadata = {
  title: 'Shanmugam R | Full-Stack Developer — React.js, Next.js & Node.js',
};

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <ScrollAnimations />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
