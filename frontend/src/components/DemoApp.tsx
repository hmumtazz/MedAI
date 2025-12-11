/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { FileData } from '@/types';
import { ChatService } from '@/services/ai/chat.service';
import { ToolRegistry } from '@/services/ai/tool-registry';
import { pubMedTool } from '@/services/ai/tools/pubmed.tool';
import { useChat } from '@/hooks/useChat';
import { Sidebar } from './demo/Sidebar';
import { ChatArea } from './demo/ChatArea';
import { loadSampleFHIRData } from '@/utils/sampleData';

interface DemoAppProps {
  onBack: () => void;
}

export const DemoApp: React.FC<DemoAppProps> = ({ onBack }) => {
  const [activeFile, setActiveFile] = useState<FileData | null>(null);

  const toolRegistry = useMemo(() => {
    const registry = new ToolRegistry();
    registry.registerTool('searchPubMed', pubMedTool);
    return registry;
  }, []);

  const chatService = useMemo(() => {
    return new ChatService(process.env.API_KEY || '', toolRegistry);
  }, [toolRegistry]);

  const { messages, loading, initChat, sendMessage, resetChat } = useChat(chatService, toolRegistry);

  const handleFileProcessed = (file: FileData) => {
    setActiveFile(file);
    initChat(file);
  };

  const handleRemoveFile = () => {
    setActiveFile(null);
    resetChat();
  };

  const handleLoadSample = () => {
    const sampleData = loadSampleFHIRData();
    handleFileProcessed(sampleData);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      <Sidebar
        activeFile={activeFile}
        loading={loading}
        onFileProcessed={handleFileProcessed}
        onRemoveFile={handleRemoveFile}
        onLoadSample={handleLoadSample}
        onSendMessage={sendMessage}
        onBack={onBack}
      />
      <ChatArea
        messages={messages}
        loading={loading}
        activeFile={!!activeFile}
        onSendMessage={sendMessage}
      />
    </div>
  );
};