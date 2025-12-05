import { GoogleGenAI, Type } from "@google/genai";
import { FilterState, Niche } from "../types";

// Helper to get AI instance safely
const getAi = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in process.env.API_KEY");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Optimizes an influencer's bio based on their niche and rough draft.
 */
export const optimizeBio = async (draft: string, niche: string): Promise<string> => {
  const ai = getAi();
  if (!ai) return "Error: AI Service Unavailable. Please check API Key.";

  try {
    const prompt = `
      You are an expert social media manager.
      Rewrite the following bio to be professional, engaging, and optimized for brand deals.
      The influencer's niche is: ${niche}.
      Keep it under 150 characters.
      Only return the bio text, nothing else.

      Original Bio: "${draft}"
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || draft;
  } catch (error) {
    console.error("Gemini Bio Error:", error);
    return draft; // Fallback to original
  }
};

/**
 * Parses a natural language search query into structured filters.
 */
export const parseSearchQuery = async (query: string): Promise<Partial<FilterState>> => {
  const ai = getAi();
  if (!ai) return {};

  try {
    const prompt = `
      Extract search filters from the user's query for an influencer marketplace.
      User Query: "${query}"

      Available Niches: ${Object.values(Niche).join(', ')}.

      Return a JSON object with optional properties:
      - minFollowers (number)
      - maxFollowers (number)
      - minRate (number)
      - maxRate (number)
      - niche (string, must be one of the Available Niches or null if unclear)
      - location (string or null)

      Example: "I want a tech reviewer in London under $500" -> {"niche": "Tech", "location": "London", "maxRate": 500}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            minFollowers: { type: Type.NUMBER },
            maxFollowers: { type: Type.NUMBER },
            minRate: { type: Type.NUMBER },
            maxRate: { type: Type.NUMBER },
            niche: { type: Type.STRING },
            location: { type: Type.STRING }
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return {};
    
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return {};
  }
};
