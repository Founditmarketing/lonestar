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
  return [
    {
      author: "Donald J. Hollow",
      location: "Mt. Pleasant, TX",
      rating: 5,
      text: "We knew we would need a storage shed for all our extra stuff, so we went to Lonestar Sheds on hwy. 271 in Mt. Pleasant. We were pleasantly surprised when they listened to what our needs were and showed us various sheds that would solve our problems.",
      date: "Verified Customer"
    },
    {
      author: "David Spence",
      location: "Athens, TX",
      rating: 5,
      text: "I am very pleased with my storage buildings. From my saleslady Mary in Athens to my delivery and setup by Steven. I shopped many places and many prices and options over a year before deciding on your product. I feel it's the best by far...",
      date: "Verified Customer"
    },
    {
      author: "Sarah Parker",
      location: "Commerce, TX",
      rating: 5,
      text: "We love our shed that we got from Lonestar, my husband could tell right away that it was built with quality and would last a long time. Another thing we were thankful for is that the shed was delivered to our home at no extra cost.",
      date: "Verified Customer"
    }
  ] as Review[];
};