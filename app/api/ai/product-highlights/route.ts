import { OpenAI } from "openai";
import { NextResponse } from "next/server";

// We use the OpenAI package but point it at Groq's high-speed API
const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
    console.log(">>> AI HIGHLIGHTS ROUTE CALLED");
    try {
        const body = await req.json();
        console.log(">>> REQUEST BODY:", body);
        const { productName, productDescription, productTags } = body;

        if (!productName || !productDescription) {
            return NextResponse.json(
                { error: "Product name and description are required" },
                { status: 400 }
            );
        }

        const prompt = `
      As a premium personal shopper for the fashion brand "Ribbentrop", analyze the following product:
      Name: ${productName}
      Description: ${productDescription}
      Tags: ${productTags?.join(", ")}

      Create 3 highly persuasive bullet points that focus on style, utility, and emotion. 
      Keep each bullet point under 15 words. 
      
      CRITICAL: Return ONLY a JSON object with a single key "highlights" which is an array of strings.
      Example: { "highlights": ["Point 1", "Point 2", "Point 3"] }
    `;

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: "You are a luxury fashion expert and premium copywriter. You must respond in valid JSON." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" },
        });

        console.log(">>> GROQ RESPONSE RECEIVED");
        const content = response.choices[0].message.content;
        console.log(">>> CONTENT:", content);
        return NextResponse.json(JSON.parse(content || "{}"));

    } catch (error: any) {
        console.error("Groq/AI Error:", error);
        return NextResponse.json(
            {
                error: "Failed to generate AI highlights",
                details: error.message || "Unknown error"
            },
            { status: 500 }
        );
    }
}
