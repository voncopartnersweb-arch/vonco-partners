import { NextResponse } from 'next/server';

import { generateText } from 'ai';
import 'dotenv/config';
import { AI_SYSTEM_PROMPT, COMPANY_POLICY } from '@/data/ai';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const result = await generateText({
      model: 'google/gemini-2.5-flash-lite',
      system: AI_SYSTEM_PROMPT + COMPANY_POLICY,

      messages: [
        ...(data.history || []),
        { role: 'user', content: data.message },
      ],
    });

    return NextResponse.json({
      status: 'ok',
      text: result.text,
    });
  } catch (err) {
    console.error('AI Error:', err);
    return NextResponse.json({ error: 'Помилка генерації' }, { status: 500 });
  }
}
