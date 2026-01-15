import { NextRequest, NextResponse } from "next/server";

// Lazy-load OpenAI only when needed
let openai: any = null;

function getOpenAI() {
  if (!openai && process.env.OPENAI_API_KEY) {
    const OpenAI = require("openai").default;
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

const SYSTEM_PROMPT = `You are Bobo, a warm and knowledgeable AI parenting assistant. You help parents with questions about:
- Baby sleep schedules and sleep training
- Feeding (breastfeeding, formula, solids, weaning)
- Developmental milestones
- Baby health and wellness
- Parenting tips and strategies
- Work-life balance with children

Guidelines:
1. Be warm, supportive, and non-judgmental - parenting is hard!
2. Provide evidence-based advice when possible
3. Always recommend consulting a pediatrician for medical concerns
4. Acknowledge that every baby is different
5. Keep responses concise but helpful (aim for 2-3 paragraphs max)
6. Use emojis sparingly to be friendly but professional
7. If asked about something outside parenting, gently redirect to parenting topics

You are NOT a replacement for medical advice. Always encourage parents to consult healthcare professionals for medical concerns.`;

export async function POST(request: NextRequest) {
  try {
    const { messages, babyInfo } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "AI service not configured. Please add OPENAI_API_KEY to environment variables." },
        { status: 500 }
      );
    }

    // Add baby context if available
    let contextualPrompt = SYSTEM_PROMPT;
    if (babyInfo) {
      contextualPrompt += `\n\nContext about the user's baby:
- Name: ${babyInfo.name || "Unknown"}
- Age: ${babyInfo.ageMonths || "Unknown"} months old
- Gender: ${babyInfo.gender || "Unknown"}`;
    }

    const client = getOpenAI();
    if (!client) {
      return NextResponse.json(
        { error: "AI service not configured. Please add OPENAI_API_KEY to enable AI chat." },
        { status: 500 }
      );
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: contextualPrompt },
        ...messages,
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const assistantMessage = response.choices[0].message.content;

    return NextResponse.json({ message: assistantMessage });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate response" },
      { status: 500 }
    );
  }
}
