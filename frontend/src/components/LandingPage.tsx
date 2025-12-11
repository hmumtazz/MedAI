import React, { useState, useEffect } from 'react';
import { HeroScene, DnaScene } from './LandingPageBackdrop';
import { KnowledgeGraphDiagram } from './diagrams/KnowledgeGraph';
import { RagPipelineDiagram } from './diagrams/RagPipeline';
import { AccuracyChartDiagram } from './diagrams/AccuracyChart';
import { ArrowDown, Menu, X, Database } from 'lucide-react';

interface LandingPageProps {
  onStartDemo: () => void;
}

const TeamCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-2xl text-slate-900 text-center mb-3">{name}</h3>
      <div className="w-12 h-0.5 bg-nobel-gold mb-4 opacity-60"></div>
      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest text-center leading-relaxed">{role}</p>
    </div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onStartDemo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-nobel-cream text-slate-800 selection:bg-nobel-gold selection:text-white">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-nobel-cream/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-nobel-gold rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1">M</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              MedAi <span className="font-normal text-slate-500">Health</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-slate-600">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Mission</a>
            <a href="#technology" onClick={scrollToSection('technology')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Technology</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Impact</a>
            <a href="#team" onClick={scrollToSection('team')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Team</a>
            <button 
              onClick={onStartDemo}
              className="px-5 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
            >
              Demo For Free
            </button>
          </div>

          <button className="md:hidden text-slate-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-nobel-cream flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Mission</a>
            <a href="#technology" onClick={scrollToSection('technology')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Technology</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Impact</a>
            <a href="#team" onClick={scrollToSection('team')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Team</a>
            <button 
              onClick={() => { setMenuOpen(false); onStartDemo(); }} 
              className="px-6 py-3 bg-slate-900 text-white rounded-lg shadow-lg cursor-pointer"
            >
              Request Demo
            </button>
        </div>
      )}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(240,253,250,0.85)_0%,rgba(240,253,250,0.5)_50%,rgba(240,253,250,0.2)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium leading-tight md:leading-[0.9] mb-8 text-slate-900 drop-shadow-sm">
            MedAi <br/><span className="italic font-normal text-slate-500 text-3xl md:text-5xl block mt-4">AI for Healthcare</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 font-light leading-relaxed mb-12">
            Solving the "Hallucination Problem" in medical AI. We combine the reasoning power of LLMs with the factual authority of curated medical journals.
          </p>
          
          <div className="flex justify-center">
             <a href="#introduction" onClick={scrollToSection('introduction')} className="group flex flex-col items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">
                <span>LEARN MORE</span>
                <span className="p-2 border border-slate-300 rounded-full group-hover:border-slate-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        <section id="introduction" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-400 uppercase">The Problem</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-slate-900">Doctors are drowning in patient charts and information overloaded</h2>
              <div className="w-16 h-1 bg-nobel-gold mb-6"></div>
            </div>
            <div className="md:col-span-8 text-lg text-slate-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold">M</span>edical knowledge is expanding exponentially. Over 5,000 biomedical papers are published every single day. No physician can keep up.
              </p>
              <p>
                Gen AI models like ChatGPT and Claude often "hallucinate" information, making them COMPLETELY unsafe for clinical use. <strong className="text-slate-900 font-medium">MedAi</strong> bridges this gap. </p>
              <p>
                We use Retrieval-Augmented Generation (RAG) to fact check every AI response in verified, peer-reviewed clinical data, providing instant, accurate answers doctors can trust, and this is completely based off the patients charts.
              </p>
            </div>
          </div>
        </section>
        <section id="technology" className="py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-slate-900">Semantic Search</h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                          MedAi converts millions of patient records and medical journals into a high dimensional vectors, allowing the RAG to score searches on context, similarity and relevance.
                        </p>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            When a physician asks a question, our AI understands the clinical intent, instantly finding the relevant case studies and protocols, even if they use different terminology.
                        </p>
                    </div>
                    <div>
                        <KnowledgeGraphDiagram />
                    </div>
                </div>
            </div>
        </section>
        <section className="py-24 bg-slate-900 text-slate-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-slate-600 blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-nobel-gold blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <RagPipelineDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Trust.</h2>
                        <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                            Regular non RAG LLMs guess. They use their old training data to provide you useless answers. MedAi understands, searches, thinks, formats and gives a resonse based on facts. 
                        </p>
                        <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                          Our pipeline retrieves specific paragraphs from medical journals and forces the AI to use <em>only</em> that information to construct an answer once it consults with patient records as well..
                        </p>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            The result is an answer that comes with citations. Click any claim to see the original paper it came from.
                        </p>
                     </div>
                </div>
            </div>
        </section>
        <section className="py-24 bg-nobel-cream">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-slate-900"> Physician Grade Accuracy</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <AccuracyChartDiagram />
                </div>
            </div>
        </section>
        <section id="impact" className="py-24 bg-white border-t border-slate-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-square bg-[#F0FDFA] rounded-xl overflow-hidden relative border border-slate-200 shadow-inner">
                        <DnaScene />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-slate-400 font-serif italic"></div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-400 uppercase">IMPACT</div>
                    <h2 className="font-serif text-4xl mb-6 text-slate-900">Saving Time, Saving Lives</h2>
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">We instantly surface the latest clinical trials and drug interaction data relevant to the specific patient.
                    </p>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        Private Practice Doctors  using MedAi report a 60% reduction reading charts and were able to see more patients. 
                    </p>
                    
                    <div className="p-6 bg-nobel-cream border border-slate-200 rounded-lg border-l-4 border-l-nobel-gold">
                        <p className="font-serif italic text-xl text-slate-800 mb-4">
                            "MedAi has completely transformed our morning rounds. It's like having the world's best medical librarian sitting in the room with us, ready to answer any question instantly."
                        </p>
                        <span className="text-sm font-bold text-slate-500 tracking-wider uppercase">— Dr. Elena, Chief of Internal Medicine</span>
                    </div>

                </div>
             </div>
        </section>
        <section id="team" className="py-24 bg-slate-50 border-t border-slate-200">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-slate-900">THE TEAM</h2>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    <TeamCard 
                        name="Sahithi Matta" 
                        role="CEO " 
                        delay="0s" 
                    />
                    <TeamCard 
                        name="Hashim Mumtaz" 
                        role="CTO" 
                        delay="0.1s" 
                    />
                    <TeamCard 
                        name="Harshini Sarraff"
                        role="CMO" 
                        delay="0.2s" 
                    />
                    <TeamCard 
                        name="Bhavana Ramkumar" 
                        role="CFO" 
                        delay="0.3s" 
                    /><TeamCard 
                        name="Henry Purceill" 
                        role="COO" 
                        delay="0.3s" 
                    />
                </div>
           </div>
        </section>

      </main>
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
            </div>
            <div className="flex gap-8 text-sm">
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-slate-600">
        </div>
      </footer>
    </div>
  );
};
