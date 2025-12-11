
import { useState } from 'react';
import { FileData } from '@/types';

export const useFileUpload = (onFileProcessed: (file: FileData) => void) => {
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = (event.target?.result as string).split(',')[1];
      const fileData: FileData = {
        name: file.name,
        type: file.type,
        base64: base64
      };
      onFileProcessed(fileData);
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === "application/json" || file.type === "application/pdf")) {
      processFile(file);
    }
  };

  return {
    isDragging,
    handleFileUpload,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    processFile
  };
};
