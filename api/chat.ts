import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.API_KEY 
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a senior design consultant for "Lone Star Sheds".

      CATALOG:
      - Barns: Lofted (max storage), Low Wall (budget).
      - Utility: Standard (end door), Side (windows/side door).
      - Cabins: Lofted or Utility (porches).
      - Garages: Roll-up door + floor.

      CUSTOMER REQUEST: "${prompt}"

      INSTRUCTIONS:
      1. Select the best model.
      2. Suggest a standard size (e.g. 10x12).
      3. Price: Provide a SHORT range only (e.g. "$3,500 - $4,200"). No extra text.
      4. Reasoning: Professional, persuasive, and detailed. Max 60 words. Three sentences explaining specific benefits for this use case.

      Return JSON.`,
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

    const result = JSON.parse(response.text || '{}');
    return res.status(200).json(result);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return res.status(500).json({ 
      error: 'AI Analysis failed',
      fallback: {
        recommendedStyle: "Side Utility",
        suggestedSize: "10x16",
        reasoning: "This model offers the best balance of access and natural light, making it ideal for your described needs. The side entry allows for easy organization of tools and equipment.",
        estimatedPriceRange: "$4,200 - $5,500"
      }
    });
  }
}
