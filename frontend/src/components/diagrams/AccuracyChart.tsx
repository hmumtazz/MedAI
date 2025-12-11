import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';

export const AccuracyChartDiagram: React.FC = () => {
    // Comparison data
    const metrics = [
        { label: "MedAI", value: 93.2, color: "bg-nobel-gold" },
        { label: "GPT-5", value: 74.5, color: "bg-slate-400" },
        { label: "Claude 4.5", value: 71.1, color: "bg-slate-300" }
        
    ];

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-slate-900 text-slate-100 rounded-xl my-8 border border-slate-800 shadow-lg">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-xl mb-2 text-nobel-gold">USMLE Benchmark</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    MedAi achieves better performance on the USMLE questions outperforming other basic LLM models on the market.
                </p>
                <div className="mt-6 font-mono text-xs text-slate-500 flex items-center gap-2">

                </div>
            </div>
            
            <div className="w-full md:w-64 flex flex-col gap-4">
                {metrics.map((m, i) => (
                    <div key={i} className="relative">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1">
                            <span className={m.label === "MedAi RAG" ? "text-nobel-gold" : "text-slate-400"}>{m.label}</span>
                            <span className="font-mono">{m.value}%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div 
                                className={`h-full rounded-full ${m.color}`}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${m.value}%` }}
                                transition={{ duration: 1, delay: i * 0.2 }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};
