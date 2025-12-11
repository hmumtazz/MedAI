import React from 'react';
import { Upload, FileText, FileJson, Database } from 'lucide-react';
import { FileData } from '@/types';
import { useFileUpload } from '@/hooks/useFileUpload';

interface FileUploadZoneProps {
  activeFile: FileData | null;
  onFileProcessed: (file: FileData) => void;
  onRemoveFile: () => void;
  onLoadSample: () => void;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  activeFile,
  onFileProcessed,
  onRemoveFile,
  onLoadSample
}) => {
  const {
    isDragging,
    handleFileUpload,
    handleDragOver,
    handleDragLeave,
    handleDrop
  } = useFileUpload(onFileProcessed);

  if (activeFile) {
    return (
      <div className="p-4 bg-nobel-cream border border-nobel-gold/30 rounded-lg animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          {activeFile.type.includes('pdf') ? <FileText className="text-nobel-gold" /> : <FileJson className="text-nobel-gold" />}
          <div className="overflow-hidden">
            <div className="text-sm font-bold text-slate-800 truncate">{activeFile.name}</div>
            <div className="text-xs text-slate-500 uppercase">Active Context</div>
          </div>
        </div>
        <button
          onClick={onRemoveFile}
          className="text-xs text-red-400 hover:text-red-600 underline mt-1 ml-9"
        >
          Remove File
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <label
        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${isDragging ? 'border-nobel-gold bg-nobel-gold/5' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className={`w-8 h-8 mb-2 ${isDragging ? 'text-nobel-gold' : 'text-slate-400'}`} />
          <p className="text-sm text-slate-500 font-medium">{isDragging ? 'Drop file here' : 'Upload PDF or JSON'}</p>
          <p className="text-xs text-slate-400">FHIR Exports supported</p>
        </div>
        <input type="file" className="hidden" accept=".json,.pdf" onChange={handleFileUpload} />
      </label>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-slate-200"></div>
        <span className="flex-shrink mx-4 text-slate-300 text-xs">OR</span>
        <div className="flex-grow border-t border-slate-200"></div>
      </div>

      <button
        onClick={onLoadSample}
        className="w-full py-2 px-4 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 hover:text-nobel-gold transition-colors flex items-center justify-center gap-2"
      >
        <Database size={14} />
        Import Sample FHIR (Sarah M.)
      </button>
    </div>
  );
};
