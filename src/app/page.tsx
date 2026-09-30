import FigureCanvasHost from '@/components/figures/FigureCanvasHost';
import About from '@/components/sections/About';
import Capabilities from '@/components/sections/Capabilities';
import Contact from '@/components/sections/Contact';
import DemosSection from '@/components/sections/DemosSection';
import Deploy from '@/components/sections/Deploy';
import Hero from '@/components/sections/Hero';
import Seo from '@/components/sections/Seo';
import Work from '@/components/sections/Work';
import Writing from '@/components/sections/Writing';
import Nav from '@/components/site/Nav';
import PageShell from '@/components/site/PageShell';
import TitleBlock from '@/components/site/TitleBlock';

export default function Home() {
  return (
    <>
      {/* One shared WebGL canvas behind the page; desktop only */}
      <FigureCanvasHost />
      <PageShell>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main">
          <Hero />
          <Capabilities />
          <Work />
          <DemosSection />
          <Deploy />
          <Seo />
          <Writing />
          <About />
          <Contact />
        </main>
        <TitleBlock />
      </PageShell>
    </>
  );
}
