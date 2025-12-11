import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Database, Brain, CheckCircle } from 'lucide-react';

export const RagPipelineDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-slate-50 rounded-xl border border-slate-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-slate-900">Our AI Pipeline</h3>
      <p className="text-sm text-slate-600 mb-6 text-center max-w-md">
        Our RAG pipeline ensures every AI response is verified medical literature, eliminating hallucinations.
      </p>

      <div className="w-full max-w-lg flex flex-col gap-4">
        

        <div className={`flex items-center gap-4 p-3 rounded-lg border transition-all duration-500 ${step === 0 ? 'bg-white border-nobel-gold shadow-md scale-105' : 'bg-transparent border-transparent opacity-50'}`}>
            <div className="p-2 bg-slate-200 rounded text-slate-700"><Search size={20} /></div>
            <div className="flex-1">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Step 1: Retrieval</div>
                <div className="text-sm font-medium text-slate-800">Vector search locates vectors closest to their query.</div>
            </div>
            {step === 0 && <motion.div layoutId="active-dot" className="w-2 h-2 rounded-full bg-nobel-gold" />}
        </div>


        <div className={`flex items-center gap-4 p-3 rounded-lg border transition-all duration-500 ${step === 1 ? 'bg-white border-nobel-gold shadow-md scale-105' : 'bg-transparent border-transparent opacity-50'}`}>
            <div className="p-2 bg-slate-200 rounded text-slate-700"><Database size={20} /></div>
            <div className="flex-1">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Step 2: Augmentation</div>
                <div className="text-sm font-medium text-slate-800">Pipeline picks the most important parts from the sources gathered</div>
            </div>
            {step === 1 && <motion.div layoutId="active-dot" className="w-2 h-2 rounded-full bg-nobel-gold" />}
        </div>


        <div className={`flex items-center gap-4 p-3 rounded-lg border transition-all duration-500 ${step === 2 ? 'bg-white border-nobel-gold shadow-md scale-105' : 'bg-transparent border-transparent opacity-50'}`}>
            <div className="p-2 bg-slate-200 rounded text-slate-700"><Brain size={20} /></div>
            <div className="flex-1">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Step 3: Generation</div>
                <div className="text-sm font-medium text-slate-800">MedAi responds with a accurate response.</div>
            </div>
            {step === 2 && <motion.div layoutId="active-dot" className="w-2 h-2 rounded-full bg-nobel-gold" />}
        </div>

        <div className={`flex items-center gap-4 p-3 rounded-lg border transition-all duration-500 ${step === 3 ? 'bg-white border-green-500 shadow-md scale-105' : 'bg-transparent border-transparent opacity-50'}`}>
            <div className="p-2 bg-green-100 rounded text-green-700"><CheckCircle size={20} /></div>
            <div className="flex-1">
                <div className="text-xs font-bold uppercase tracking-wider text-green-600">Step 4: Citation</div>
                <div className="text-sm font-medium text-slate-800">Answer delivered with links to sources. So docotrs can double check. </div>
            </div>
             {step === 3 && <motion.div layoutId="active-dot" className="w-2 h-2 rounded-full bg-green-500" />}
        </div>

      </div>
    </div>
  );
};
