export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function getGroqResponse(
  messages: ChatMessage[],
  apiKey: string
): Promise<string> {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant for WomenPreneur, a platform empowering women entrepreneurs. You help users with questions about entrepreneurship, business, schemes, courses, mentorship, and platform features. Be friendly, supportive, and provide practical advice. Keep responses concise and helpful.'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('Groq API error:', error);
    throw error;
  }
}

