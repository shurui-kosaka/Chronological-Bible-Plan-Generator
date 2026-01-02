
import { GoogleGenAI, Type } from "@google/genai";
import { ReadingDay, PlanConfig } from "../types";

// Always initialize GoogleGenAI with process.env.API_KEY as a named parameter.
export const generateChronologicalPlan = async (config: PlanConfig): Promise<ReadingDay[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a full 365-day chronological Bible reading plan starting on ${config.startDate}. 
    The plan should follow a standard chronological order (e.g., Genesis, Job, Exodus, etc.). 
    Format each day as an object with: day number, date, and the specific passages (e.g. "Genesis 1-3"). 
    Ensure it covers the entire Bible.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            day: { type: Type.INTEGER },
            date: { type: Type.STRING },
            passages: { type: Type.STRING }
          },
          required: ["day", "date", "passages"]
        }
      }
    }
  });

  try {
    // response.text is a getter, used correctly here.
    const rawData = JSON.parse(response.text || "[]");
    return rawData.map((item: any) => ({
      ...item,
      completed: false
    }));
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("Could not parse the reading plan data.");
  }
};
