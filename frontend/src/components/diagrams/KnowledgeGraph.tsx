import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const KnowledgeGraphDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  
  const nodes = [
    { id: 0, x: 50, y: 50, label: "Query", type: 'query' },
    { id: 1, x: 35, y: 35, label: "Past Visit", type: 'relevant' },
    { id: 2, x: 65, y: 40, label: "Lab Result", type: 'relevant' },
    { id: 3, x: 50, y: 25, label: "History", type: 'relevant' },
    { id: 4, x: 20, y: 70, label: "Unrelated", type: 'noise' },
    { id: 5, x: 80, y: 80, label: "Unrelated", type: 'noise' },
    { id: 6, x: 80, y: 20, label: "Unrelated", type: 'noise' },
  ];

  const connections = [
      { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 }
  ];

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-slate-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-slate-800">How it works: Semantic Vector Search</h3>
      <p className="text-sm text-slate-500 mb-6 text-center max-w-md">
        Traditional search matches keywords. MedAi uses <strong>Vector Embeddings</strong> to understand the question.
      </p>
      
      <div 
        className="relative w-72 h-72 bg-slate-50 rounded-lg border border-slate-200 p-4 shadow-inner overflow-hidden cursor-crosshair"
        onMouseEnter={() => setActiveNode(0)}
        onMouseLeave={() => setActiveNode(null)}
      >
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

         {activeNode === 0 && connections.map((conn, i) => {
             const from = nodes.find(n => n.id === conn.from)!;
             const to = nodes.find(n => n.id === conn.to)!;
             return (
                 <motion.svg key={i} className="absolute inset-0 w-full h-full pointer-events-none">
                     <motion.line 
                        x1={`${from.x}%`} y1={`${from.y}%`} 
                        x2={`${to.x}%`} y2={`${to.y}%`} 
                        stroke="#0D9488" strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                     />
                 </motion.svg>
             )
         })}
         {nodes.map((node) => {
             const isActive = activeNode === 0 && (node.id === 0 || node.type === 'relevant');
             return (
                 <div
                    key={node.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 flex flex-col items-center
                        ${node.type === 'query' ? 'z-20' : 'z-10'}
                        ${isActive ? 'opacity-100 scale-110' : node.type === 'query' ? 'opacity-100' : 'opacity-40 grayscale'}
                    `}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                 >
                    <div className={`w-4 h-4 rounded-full shadow-sm mb-1 ${node.type === 'query' ? 'bg-slate-900 border-2 border-white w-6 h-6' : node.type === 'relevant' ? 'bg-nobel-gold' : 'bg-slate-400'}`}></div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${node.type === 'query' ? 'bg-slate-900 text-white' : isActive ? 'bg-nobel-gold/10 text-nobel-gold' : 'text-slate-400'}`}>
                        {node.label}
                    </span>
                 </div>
             )
         })}
      </div>

      <div className="mt-6 flex items-center gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-slate-900"></div> Query</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-nobel-gold"></div> Context</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-slate-400"></div> Stuff that doesn't matter</div>
      </div>
    </div>
  );
};
