/**
 * This file is a workaround for the issue with the AI SDK.
 */

// import { openai } from "@ai-sdk/openai";
// import { generateText } from "ai";
// import crypto from "crypto";
// import { config } from "dotenv";
// import { api } from "encore.dev/api";

// config();

// interface MessageData {
//   id: string;
//   role: "user" | "assistant" | "system";
//   content: string;
//   createdAt: Date;
// }

// interface UsageData {
//   promptTokens: number;
//   completionTokens: number;
//   totalTokens: number;
// }

// type FinishReasonType = "stop" | "length" | "content-filter" | "tool-calls" | "error" | "other" | "unknown";

// let chatHistory: MessageData[] = [];

// interface ChatRequest {
//   content: string;
// }

// interface ChatResponse {
//   message: MessageData;
//   usage: UsageData;
//   finishReason: FinishReasonType;
// }

// export const chat = api(
//   { expose: true, method: "POST", path: "/chat" },
//   async ({ content }: ChatRequest): Promise<ChatResponse> => {
//     const userMessage: MessageData = {
//       id: crypto.randomUUID(),
//       role: "user",
//       content,
//       createdAt: new Date(),
//     };

//     chatHistory.push(userMessage);

//     const result = await generateText({
//       model: openai("gpt-4o"),
//       messages: chatHistory,
//     });

//     const assistantMessage: MessageData = {
//       id: crypto.randomUUID(),
//       role: "assistant",
//       content: result.text,
//       createdAt: new Date(),
//     };

//     chatHistory.push(assistantMessage);

//     return {
//       message: assistantMessage,
//       usage: result.usage,
//       finishReason: result.finishReason,
//     };
//   },
// );
