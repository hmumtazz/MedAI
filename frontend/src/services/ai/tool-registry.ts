import { FunctionDeclaration, Type } from "@google/genai";

export interface ToolExecutor {
  execute: (args: any) => Promise<any>;
}

export interface ToolDefinition {
  declaration: FunctionDeclaration;
  executor: ToolExecutor;
}

export class ToolRegistry {
  private tools: Map<string, ToolDefinition> = new Map();

  registerTool(name: string, definition: ToolDefinition): void {
    this.tools.set(name, definition);
  }

  getToolDeclarations(): FunctionDeclaration[] {
    return Array.from(this.tools.values()).map(tool => tool.declaration);
  }

  async executeTool(name: string, args: any): Promise<any> {
    const tool = this.tools.get(name);
    if (!tool) {
      throw new Error(`Tool not found: ${name}`);
    }
    return tool.executor.execute(args);
  }

  hasTool(name: string): boolean {
    return this.tools.has(name);
  }
}
