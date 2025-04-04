import { openai } from "@ai-sdk/openai";
import { generateText, type FinishReason, type LanguageModelUsage, type Message } from "ai";
import crypto from "crypto";
import { config } from "dotenv";
import { api } from "encore.dev/api";

config();

let chatHistory: Message[] = [];

interface ChatRequest {
  content: string;
}

interface ChatResponse {
  message: Message;
  usage: LanguageModelUsage;
  finishReason: FinishReason;
}

export const chat = api(
  { expose: true, method: "POST", path: "/chat" },
  async ({ content }: ChatRequest): Promise<ChatResponse> => {
    chatHistory.push({
      id: crypto.randomUUID(),
      role: "user" as const,
      content,
      createdAt: new Date(),
    });

    const result = await generateText({
      model: openai("gpt-4o"),
      messages: chatHistory,
    });

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant" as const,
      content: result.text,
      createdAt: new Date(),
    };

    chatHistory.push(assistantMessage);

    return {
      message: assistantMessage,
      usage: result.usage,
      finishReason: result.finishReason,
    };
  },
);
