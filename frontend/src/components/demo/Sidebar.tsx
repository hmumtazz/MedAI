import React from 'react';
import { ArrowLeft, Database, AlertCircle, Sparkles, BookOpen } from 'lucide-react';
import { FileData } from '@/types';
import { FileUploadZone } from './FileUploadZone';
import { SAMPLE_FHIR } from '@backend/data/patientData';

interface SidebarProps {
  activeFile: FileData | null;
  loading: boolean;
  onFileProcessed: (file: FileData) => void;
  onRemoveFile: () => void;
  onLoadSample: () => void;
  onSendMessage: (message: string) => void;
  onBack: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeFile,
  loading,
  onFileProcessed,
  onRemoveFile,
  onLoadSample,
  onSendMessage,
  onBack
}) => {
  return (
    <aside className="w-80 bg-white border-r border-slate-200 flex flex-col z-10 shadow-sm">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-nobel-gold rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl">M</div>
          <span className="font-serif font-bold text-lg">MedAi <span className="text-slate-400 font-sans font-normal text-xs uppercase tracking-wider">Workspace</span></span>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="mb-8">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Input Patient Chart or Connect to your EHR using FHIR API </h3>

          <FileUploadZone
            activeFile={activeFile}
            onFileProcessed={onFileProcessed}
            onRemoveFile={onRemoveFile}
            onLoadSample={onLoadSample}
          />
        </div>

        {activeFile && (
          <div className="mb-8 animate-fade-in">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Sparkles size={12} /> Suggested Queries
            </h3>
            <div className="flex flex-col gap-2">
              {SAMPLE_FHIR.ai_demo_queries.query_examples.map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => onSendMessage(query)}
                  disabled={loading}
                  className="text-left text-xs p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-nobel-gold/10 hover:text-nobel-gold border border-slate-100 hover:border-nobel-gold/30 transition-all duration-200"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
          <div className="flex items-start gap-2">
            <AlertCircle size={14} className="text-slate-400 mt-0.5" />
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong>Privacy:</strong> Data is processed in temporary memory and is not stored nor sent to our servers
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-200">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Homepage
        </button>
      </div>
    </aside>
  );
};
