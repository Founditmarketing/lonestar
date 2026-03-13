import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult, Review } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeShedRequest = async (userPrompt: string): Promise<AIAnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a senior design consultant for "Lone Star Sheds".

      CATALOG:
      - Barns: Lofted (max storage), Low Wall (budget).
      - Utility: Standard (end door), Side (windows/side door).
      - Cabins: Lofted or Utility (porches).
      - Garages: Roll-up door + floor.

      CUSTOMER REQUEST: "${userPrompt}"

      INSTRUCTIONS:
      1. Select the best model.
      2. Suggest a standard size (e.g. 10x12).
      3. Price: Provide a SHORT range only (e.g. "$3,500 - $4,200"). No extra text.
      4. Reasoning: Professional, persuasive, and detailed. Max 60 words. Three sentences explaining specific benefits for this use case.

      Return JSON.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedStyle: { type: Type.STRING },
            suggestedSize: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            estimatedPriceRange: { type: Type.STRING }
          },
          required: ["recommendedStyle", "suggestedSize", "reasoning", "estimatedPriceRange"]
        }
      }
    });

    return JSON.parse(response.text || '{}') as AIAnalysisResult;
  } catch (error) {
    console.error("AI Analysis failed:", error);
    // Fallback if AI fails
    return {
      recommendedStyle: "Side Utility",
      suggestedSize: "10x16",
      reasoning: "This model offers the best balance of access and natural light, making it ideal for your described needs. The side entry allows for easy organization of tools and equipment.",
      estimatedPriceRange: "$4,200 - $5,500"
    };
  }
};

export const fetchTestimonials = async (): Promise<Review[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 4 realistic, high-quality positive customer reviews for "Lone Star Sheds" based in Texas.
      
      Requirements:
      - Vibe: Authentic, Texan, appreciative of quality and durability.
      - Mentions: Specific locations (e.g. Denton, Commerce, Tyler, Sulphur Springs), specific product features (Hardie plank, loft space, delivery driver named 'John' or 'Ross'), and the Rent-to-Own process.
      - Format: JSON array.
      - Authors: Diverse names.
      - Dates: Relative times like "2 weeks ago", "a month ago".
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              author: { type: Type.STRING },
              location: { type: Type.STRING },
              rating: { type: Type.NUMBER },
              text: { type: Type.STRING },
              date: { type: Type.STRING }
            },
            required: ["author", "location", "rating", "text", "date"]
          }
        }
      }
    });

    return JSON.parse(response.text || '[]') as Review[];
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return [
      {
        author: "Sarah Jenkins",
        location: "Denton, TX",
        rating: 5,
        text: "The AI design tool was a game changer. I wasn't sure if I could fit a studio in my backyard, but the team guided me perfectly. The delivery was incredibly smooth.",
        date: "1 month ago"
      },
      {
        author: "Mike Ross",
        location: "Tyler, TX",
        rating: 5,
        text: "Honest pricing is right. I quoted this build with three other companies, and Lone Star was the only one that didn't try to upsell me on features I didn't need. Solid build.",
        date: "2 months ago"
      },
      {
        author: "The Miller Family",
        location: "Sulphur Springs, TX",
        rating: 5,
        text: "We needed a storage solution that matched our HOA requirements. The Hardie Plank siding matches our house perfectly. Highly recommend the RTO program.",
        date: "3 weeks ago"
      }
    ] as Review[];
  }
};