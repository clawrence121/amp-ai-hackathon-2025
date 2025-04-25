"use client";

import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 3,
    initialMessages: [
      {
        id: "default",
        role: "assistant",
        content: `Hey! Welcome to AMP, I'm your onboarding buddy! To get started, can you tell me who you are and about your store?`,
      },
    ],
  });

  return (
    <div className="relative min-h-screen bg-[hsl(var(--amp-onyx-10))] px-2 md:px-0">
      <div className="mx-auto flex w-full max-w-3xl flex-col stretch py-8">
        <h1 className="mb-8 text-center text-2xl font-bold text-[hsl(var(--amp-onyx-75))]">
          AMP Onboarding Assistant
        </h1>

        <div className="mb-24 flex-1 space-y-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={clsx(
                "flex w-full",
                m.role === "assistant" ? "justify-start" : "justify-end",
              )}
            >
              <div
                className={clsx(
                  "max-w-[80%] rounded-lg px-4 py-3 shadow-sm",
                  m.role === "assistant"
                    ? "border border-[hsl(var(--amp-onyx-25))] bg-[hsl(var(--amp-white-100))]"
                    : "bg-[hsl(var(--amp-darkviolet))] text-[hsl(var(--amp-white-100))]",
                )}
              >
                <div className="mb-1 text-xs font-semibold">
                  {m.role === "assistant" ? "AI Assistant" : "You"}
                </div>
                <div
                  className={clsx(
                    "prose prose-sm max-w-none",
                    m.role !== "assistant" &&
                      "text-[hsl(var(--amp-white-100))]",
                  )}
                >
                  {m.content.length > 0 ? (
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  ) : (
                    <span className="text-sm font-light italic opacity-75">
                      {"Calling tool: " + m?.toolInvocations?.[0].toolName}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="absolute bottom-0 left-0 right-0 border-t border-[hsl(var(--amp-onyx-25))] bg-[hsl(var(--amp-white-100))] p-4"
        >
          <div className="mx-auto flex max-w-3xl">
            <input
              className="flex-1 rounded-l-lg border border-[hsl(var(--amp-onyx-25))] p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[hsl(var(--amp-darkviolet))]"
              value={input}
              placeholder="Type your message..."
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="rounded-r-lg bg-[hsl(var(--amp-darkviolet))] px-6 py-3 text-[hsl(var(--amp-white-100))] transition-colors hover:bg-[hsl(var(--amp-darkviolet)/_0.9)]"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
