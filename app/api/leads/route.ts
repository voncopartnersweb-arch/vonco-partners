import { Resend } from 'resend';

import { createLeadPostHandler } from '@/lib/lead-handler';

export const maxDuration = 15;

export const POST = createLeadPostHandler({
  from: process.env.RESEND_FROM_EMAIL || '',
  sendEmail: async (message) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error('RESEND_API_KEY is not configured.');

    const { data, error } = await new Resend(apiKey).emails.send(message);
    if (error) throw new Error(`Resend rejected the email: ${error.message}`);
    if (!data?.id) throw new Error('Resend returned no email id.');

    return { id: data.id };
  },
  onError: (error) => {
    console.error(
      'Vonco lead email error:',
      error instanceof Error ? error.message : 'Unknown error',
    );
  },
});
