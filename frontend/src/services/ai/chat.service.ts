import { GoogleGenAI, Chat } from "@google/genai";
import { FileData } from '@/types';
import { ToolRegistry } from './tool-registry';

export interface ChatConfig {
  model: string;
  systemInstruction: string;
  apiKey: string;
}

export class ChatService {
  private ai: GoogleGenAI;
  private toolRegistry: ToolRegistry;

  constructor(apiKey: string, toolRegistry: ToolRegistry) {
    this.ai = new GoogleGenAI({ apiKey });
    this.toolRegistry = toolRegistry;
  }

  createChatSession(file: FileData, config: Partial<ChatConfig> = {}): Chat {
    const history = this.buildInitialHistory(file);
    const tools = this.toolRegistry.getToolDeclarations();

    return this.ai.chats.create({
      model: config.model || 'gemini-2.5-flash',
      config: {
        systemInstruction: config.systemInstruction || this.getDefaultSystemInstruction(),
        tools: tools.length > 0 ? [{ functionDeclarations: tools }] : undefined,
      },
      history: history as any
    });
  }

  private buildInitialHistory(file: FileData) {
    return [
      {
        role: 'user',
        parts: [
          {
            inlineData: {
              mimeType: file.type === 'application/json' ? 'text/plain' : file.type,
              data: file.base64
            }
          },
          { text: "Analyze this patient record. You are a clinical assistant. Answer questions strictly based on this document." }
        ]
      },
      {
        role: 'model',
        parts: [{ text: `I have analyzed the record for ${file.name}. I am ready to answer clinical questions.` }]
      }
    ];
  }

  private getDefaultSystemInstruction(): string {
    return `You are MedAi, an advanced medical AI assistant.

CORE RULES:
1. For questions about the SPECIFIC PATIENT, use ONLY the provided patient record.
2. For GENERAL medical questions, research requests, or checking guidelines, use the available tools.
3. If you use external tools, you MUST format the response as follows:
   - Provide a summarized answer based on the information found.
   - At the very bottom, add a section titled "### Sources" and list the sources as markdown links.
4. Do not hallucinate external facts. If not in the record and not searchable via tool, state you don't know.
5. Maintain a professional, clinical tone. Use **bold** for key medical terms.`;
  }
}
