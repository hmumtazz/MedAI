import { useState, useCallback } from 'react';
import { Chat } from "@google/genai";
import { Message, FileData } from '@/types';
import { ChatService } from '@/services/ai/chat.service';
import { ToolRegistry } from '@/services/ai/tool-registry';

export const useChat = (chatService: ChatService, toolRegistry: ToolRegistry) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Welcome to the MedAi Workspace. Please upload a patient record (PDF/JSON) or load our sample FHIR data to being your demo.' }
  ]);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [loading, setLoading] = useState(false);

  const initChat = useCallback(async (file: FileData) => {
    const chat = chatService.createChatSession(file);
    setChatSession(chat);
    setMessages(prev => [...prev, {
      role: 'model',
      text: `Document '${file.name}' loaded successfully. What would you like to know?`
    }]);
  }, [chatService]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || !chatSession) return;

    setMessages(prev => [...prev, { role: 'user', text }]);
    setLoading(true);

    try {
      let response = await chatSession.sendMessage({ message: text });
      while (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls[0];

        if (toolRegistry.hasTool(call.name)) {
          setMessages(prev => [...prev, {
            role: 'model',
            text: `*Executing ${call.name}...*`
          }]);

          const args = call.args as any;
          const toolResult = await toolRegistry.executeTool(call.name, args);

          response = await chatSession.sendMessage({
            message: [{
              functionResponse: {
                name: call.name,
                id: call.id,
                response: { result: toolResult }
              }
            }]
          });
        }
      }

      const finalText = response.text;
      if (finalText) {
        setMessages(prev => {
          const filtered = prev.filter(m => !m.text.startsWith('*Executing'));
          return [...filtered, { role: 'model', text: finalText }];
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: "Error: Unable to process request. Please try again."
      }]);
    } finally {
      setLoading(false);
    }
  }, [chatSession, toolRegistry]);

  const resetChat = useCallback(() => {
    setChatSession(null);
    setMessages([{ role: 'model', text: 'Context cleared and res. Please upload a new record.' }]);
  }, []);

  return {
    messages,
    loading,
    chatSession,
    initChat,
    sendMessage,
    resetChat
  };
};
