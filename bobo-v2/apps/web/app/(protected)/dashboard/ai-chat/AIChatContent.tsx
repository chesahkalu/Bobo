"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Baby {
  id: string;
  name: string;
  birth_date: string;
  gender: string | null;
}

interface AIChatPageProps {
  babies: Baby[];
}

const suggestedQuestions = [
  "My baby won't sleep through the night. Any tips?",
  "When should I start introducing solid foods?",
  "How do I know if my baby is getting enough milk?",
  "What are the signs of teething?",
  "My baby is very fussy, is this normal?",
  "How can I establish a bedtime routine?",
];

export default function AIChatContent({ babies }: AIChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedBaby, setSelectedBaby] = useState<string>(babies[0]?.id || "");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedBabyData = babies.find((b) => b.id === selectedBaby);
  
  const getBabyAge = () => {
    if (!selectedBabyData) return null;
    const birth = new Date(selectedBabyData.birth_date);
    const months = Math.floor((Date.now() - birth.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
    return months;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          babyInfo: selectedBabyData
            ? {
                name: selectedBabyData.name,
                ageMonths: getBabyAge(),
                gender: selectedBabyData.gender,
              }
            : null,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Sorry, I encountered an error: ${data.error}. Please try again later.`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't connect to the AI service. Please check your internet connection and try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>
          {babies.length > 0 && (
            <select
              value={selectedBaby}
              onChange={(e) => setSelectedBaby(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm"
            >
              {babies.map((baby) => (
                <option key={baby.id} value={baby.id}>
                  {baby.gender === "male" ? "👦" : baby.gender === "female" ? "👧" : "👶"} {baby.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-6 flex flex-col">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#425a51] to-[#364842] flex items-center justify-center text-4xl mb-6">
              🤖
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Hi! I'm Bobo, your AI parenting assistant
            </h1>
            <p className="text-gray-500 mb-8 max-w-md">
              Ask me anything about baby care, sleep, feeding, development, or parenting tips.
              {selectedBabyData && (
                <span className="block mt-2 text-[#425a51]">
                  I'll personalize my advice for {selectedBabyData.name} ({getBabyAge()} months old).
                </span>
              )}
            </p>

            {/* Suggested Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg">
              {suggestedQuestions.slice(0, 4).map((question, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(question)}
                  className="p-3 text-left text-sm bg-white rounded-xl border border-gray-200 hover:border-[#425a51] hover:bg-[#f4f6f5] transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <div className="flex-1 space-y-4 pb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.role === "user"
                      ? "bg-[#425a51] text-white rounded-br-md"
                      : "bg-white border border-gray-100 text-gray-900 rounded-bl-md"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
                      <span>🤖</span>
                      <span>Bobo</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-md">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#425a51] rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-[#425a51] rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-[#425a51] rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Input Area */}
      <div className="border-t border-gray-100 bg-white p-4">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about parenting..."
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-3 rounded-xl bg-[#425a51] text-white font-medium disabled:opacity-50 hover:bg-[#364842] transition-colors"
            >
              Send
            </button>
          </form>
          <p className="text-xs text-gray-400 text-center mt-3">
            💡 Bobo provides general parenting guidance. Always consult a pediatrician for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
