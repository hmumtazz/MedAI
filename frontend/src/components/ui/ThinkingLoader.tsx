import React, { useState, useEffect } from 'react';
import { FileText, Search, Database, Brain, FileCheck } from 'lucide-react';

export const ThinkingLoader = () => {
    const steps = [
        { text: "Retreiving", icon: FileText },
        { text: "Augmenting", icon: Database },
        { text: "Generating", icon: Brain },
        { text: "Formatting Output", icon: FileCheck },
    ];
    const [stepIndex, setStepIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStepIndex((prev) => (prev + 1) % steps.length);
        }, 2000); 
        return () => clearInterval(interval);
    }, []);

    const CurrentIcon = steps[stepIndex].icon;

    return (
        <div className="flex justify-start animate-fade-in">
             <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-3 w-fit">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-nobel-cream text-nobel-gold">
                    <CurrentIcon size={16} className="animate-pulse" />
                    <div className="absolute inset-0 border-2 border-nobel-gold/20 rounded-full animate-ping opacity-20"></div>
                </div>
                <div className="flex flex-col">
                    <span className="text-slate-700 text-sm font-medium min-w-[180px] transition-all duration-300">
                        {steps[stepIndex].text}
                    </span>
                    <div className="flex gap-1 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-nobel-gold animate-bounce" style={{ animationDelay: '0s'}}></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-nobel-gold animate-bounce" style={{ animationDelay: '0.1s'}}></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-nobel-gold animate-bounce" style={{ animationDelay: '0.2s'}}></div>
                    </div>
                </div>
             </div>
        </div>
    );
};
