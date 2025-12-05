import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_API_KEY || '';

// Initialize only if key is present to avoid immediate crash, though usage will fail gracefully
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const summarizeContent = async (text: string): Promise<string> => {
  if (!genAI) {
    throw new Error("API Key not found in environment variables.");
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const prompt = `Summarize the following meetup description into a catchy, 2-sentence highlight suitable for social media sharing. Text: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return summary || "Could not generate summary.";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Error generating summary. Please try again later.";
  }
};
