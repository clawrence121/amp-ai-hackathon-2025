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
        content: `Hey! Welcome to AMP, who are you?`,
      },
    ],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col w-full max-w-3xl py-8 mx-auto stretch">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          AMP AI Onboarding Assistant
        </h1>

        <div className="flex-1 space-y-6 mb-24">
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
                    ? "bg-white border border-gray-200"
                    : "bg-blue-600 text-white",
                )}
              >
                <div className="mb-1 text-xs font-semibold">
                  {m.role === "assistant" ? "AI Assistant" : "You"}
                </div>
                <div
                  className={clsx(
                    "prose prose-sm max-w-none",
                    m.role !== "assistant" && "text-white",
                  )}
                >
                  {m.content.length > 0 ? (
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  ) : (
                    <span className="italic font-light text-sm opacity-75">
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
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4"
        >
          <div className="max-w-3xl mx-auto flex">
            <input
              className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={input}
              placeholder="Type your message..."
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
