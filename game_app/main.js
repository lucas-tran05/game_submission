import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_AI_API_KEY,
  });
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
  };
  const model = 'gemini-flash-latest';
  const contents = [
    {
      role: 'user',
      parts: [
        { text: `INSERT_INPUT_HERE` },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();
