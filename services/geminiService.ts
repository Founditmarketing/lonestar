import { AIAnalysisResult, Review } from "../types";

export const analyzeShedRequest = async (userPrompt: string): Promise<AIAnalysisResult> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.fallback) {
        return errorData.fallback as AIAnalysisResult;
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data as AIAnalysisResult;
  } catch (error) {
    console.error("AI Analysis failed:", error);
    // Fallback if AI or network fails
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