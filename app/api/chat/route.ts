import { NextResponse } from 'next/server';

import { generateText } from 'ai';
import 'dotenv/config';
import { AI_SYSTEM_PROMPT, COMPANY_POLICY } from '@/data/ai';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const message =
      typeof data?.message === 'string' ? data.message.trim() : '';
    const history = Array.isArray(data?.history)
      ? data.history
          .filter(
            (item: unknown): item is { role: 'user' | 'assistant'; content: string } =>
              !!item &&
              typeof item === 'object' &&
              typeof (item as { role?: unknown }).role === 'string' &&
              ['user', 'assistant'].includes((item as { role: string }).role) &&
              typeof (item as { content?: unknown }).content === 'string'
          )
          .slice(-12)
      : [];

    if (!message) {
      return NextResponse.json(
        { error: 'Повідомлення порожнє' },
        { status: 400 }
      );
    }

    const cityHint = /катов|katow/i.test(message)
      ? '\n\nДОДАТКОВО: якщо питання про Катовіце, використовуй контакт +48 572 867 193.'
      : '';

    const result = await generateText({
      model: 'google/gemini-2.5-flash-lite',
      system: AI_SYSTEM_PROMPT + COMPANY_POLICY + cityHint,

      messages: [
        ...history,
        { role: 'user', content: message },
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
