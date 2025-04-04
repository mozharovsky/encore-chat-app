# Encore + Vercel AI SDK Type Issue

This repository demonstrates an issue with using Vercel AI SDK types in Encore API schemas.

## The Issue

When trying to use types imported from the Vercel AI SDK (`ai` package) in Encore API request or response schemas, the Encore parser fails with "object not found" errors.

## Steps to Reproduce

1. Clone this repository
2. Run `bun i` to install dependencies
3. Run `encore run` to see the error

## Error Details

The error occurs because Encore's API type system doesn't recognize external types from the Vercel AI SDK:

```
❌ Building Encore application graph... Failed: parse error
⠙ Analyzing service topology...
error: object not found: Message
error: unknown identifier
error: object not found: LanguageModelUsage
error: unknown identifier
error: object not found: FinishReason
error: unknown identifier
```

## Expected Behavior

Encore should either:

1. Support external types in API schemas
2. Provide clearer error messages about this limitation
3. Document a recommended workaround for using external types

## Workaround

Until this is fixed, you need to define your own interface types that mirror the external types but don't reference them directly:

```typescript
// Instead of directly using Message from the AI SDK:
interface ChatResponse {
  message: {
    id: string;
    role: string;
    content: string;
    createdAt: Date;
  };
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finishReason: string;
}
```

## Environment

- Encore version: 1.46.16
- Vercel AI SDK version: 4.2.11
- Node.js version: 22.14.0
