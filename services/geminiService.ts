import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize only if key is present to avoid immediate crash, though usage will fail gracefully
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const summarizeContent = async (text: string): Promise<string> => {
  if (!ai) {
    throw new Error("API Key not found in environment variables.");
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Summarize the following meetup description into a catchy, 2-sentence highlight suitable for social media sharing. Text: "${text}"`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Error generating summary. Please try again later.";
  }
};
