
import { FunctionDeclaration, Type } from "@google/genai";
import { pubMedService } from '@/services/pubmed.service';
import { ToolDefinition } from '../tool-registry';

export const pubMedToolDeclaration: FunctionDeclaration = {
  name: "searchPubMed",
  description: "Search PubMed for medical literature, clinical trials, and research papers to answer general medical questions or validate treatments.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: {
        type: Type.STRING,
        description: "Keywords to search for in the PubMed database (e.g., 'IBS low-FODMAP efficacy', 'Magnesium citrate constipation safety').",
      },
    },
    required: ["query"],
  },
};

export const pubMedTool: ToolDefinition = {
  declaration: pubMedToolDeclaration,
  executor: {
    execute: async (args: { query: string }) => {
      return await pubMedService.search(args.query);
    }
  }
};
