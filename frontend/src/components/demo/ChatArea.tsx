import React, { useRef, useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { Message } from '@/types';
import { ThinkingLoader } from '../ui/ThinkingLoader';
import { FormattedMessage } from '../ui/FormattedMessage';

interface ChatAreaProps {
  messages: Message[];
  loading: boolean;
  activeFile: boolean;
  onSendMessage: (message: string) => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  loading,
  activeFile,
  onSendMessage
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <main className="flex-1 flex flex-col relative bg-white">
      <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm
              ${msg.role === 'user'
                ? 'bg-slate-900 text-white rounded-br-none'
                : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-bl-none'}
            `}>
              {msg.role === 'user' ? msg.text : <FormattedMessage text={msg.text} />}
            </div>
          </div>
        ))}
        {loading && <ThinkingLoader />}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <div className="relative max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={activeFile ? "Ask a question about this patient" : "Upload a file to begin chat..."}
            disabled={!activeFile || loading}
            className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nobel-gold/20 focus:border-nobel-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 placeholder:text-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={!activeFile || loading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-nobel-gold text-white rounded-lg hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="text-center mt-3">
        </div>
      </div>
    </main>
  );
};
