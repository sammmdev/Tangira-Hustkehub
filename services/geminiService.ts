import { GoogleGenAI, Type } from "@google/genai";
import { Gig } from "../types";

// Safely retrieve API Key to prevent 'process is not defined' errors in browser
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    console.warn("process.env is not available");
    return '';
  }
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

// -- SME AI Task Shaper --
export const generateGigsFromDescription = async (description: string, language: string = 'English'): Promise<Gig[]> => {
  if (!apiKey) {
    console.error("API Key missing");
    return [];
  }

  const model = "gemini-2.5-flash";
  const prompt = `
    You are an expert Gig Structuring AI for Tangira in Zimbabwe. 
    A local SME owner will describe a task. The input language might be English, Shona, or Ndebele.
    Current Input Language Context: ${language}.
    
    Your job is to translate (if necessary) and break this down into 1-3 specific, actionable micro-gigs suitable for junior digital talent.
    
    The description is: "${description}"

    Return a JSON array of Gig objects.
    Each object must have:
    - title (short, professional, in English)
    - description (clear instructions in English, but mention if local language knowledge is required)
    - budget (in USD, assume $5-$50 range for micro tasks)
    - skills (array of strings, e.g. "Data Entry", "Canva", "Excel", "Shona Translation")
    - duration (estimated time)
    - difficulty (Beginner, Intermediate, Advanced)
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              budget: { type: Type.NUMBER },
              skills: { type: Type.ARRAY, items: { type: Type.STRING } },
              duration: { type: Type.STRING },
              difficulty: { type: Type.STRING, enum: ["Beginner", "Intermediate", "Advanced"] },
            },
            required: ["title", "description", "budget", "skills", "duration", "difficulty"],
          },
        },
      },
    });

    const jsonStr = response.text;
    if (!jsonStr) return [];
    
    const parsed = JSON.parse(jsonStr);
    // Add IDs manually since AI doesn't generate UUIDs reliably without help
    return parsed.map((g: any, index: number) => ({
      ...g,
      id: `generated-${Date.now()}-${index}`,
      status: 'Open'
    }));

  } catch (error) {
    console.error("Error shaping tasks:", error);
    return [];
  }
};

// -- Learner Micro-Coach --
export const getCoachResponse = async (userMessage: string): Promise<string> => {
  if (!apiKey) return "I'm having trouble connecting to the network right now.";

  const model = "gemini-2.5-flash";
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: userMessage,
      config: {
        systemInstruction: `
          You are 'Tangira Coach', a friendly, encouraging digital skills mentor for Zimbabwean youth. 
          Your goal is to help them learn, execute gigs, and improve their Skills Credit Score.
          
          Specific Duties:
          1. Provide specific feedback on gig tasks (e.g., "Your Excel formula looks wrong, try VLOOKUP").
          2. Explain concepts simply.
          3. Keep answers short and practical.
          4. Use local context (EcoCash, WhatsApp bundles, Econet) where relevant.
          
          Be motivating but professional.
        `,
      },
    });
    
    return response.text || "Keep going! You're doing great.";
  } catch (error) {
    console.error("Coach error:", error);
    return "Network error. Try again later!";
  }
};