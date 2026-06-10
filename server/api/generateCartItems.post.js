import OpenAI from "openai";

const config = useRuntimeConfig();

const openai = new OpenAI({
  baseURL: config.aiBaseURL,
  apiKey: config.aiApiKey,
});

export default defineEventHandler(async (event) => {
  try {
    const { prompt } = await readBody(event);

    if (!prompt) {
      return createError({ statusCode: 400, statusMessage: "Missing prompt" });
    }

    const response = await openai.chat.completions.create({
      // model: "z-ai/glm-5",
      model: "minimax/minimax-m2.5",
      response_format: { type: "json" },
      messages: [
        {
          role: "system",
          content: `
            Return ONLY a JSON array of cart items.
            Each item must only contains:
            {
              "isVeg": true | false,
              "itemType": "Max 2 words",
              "category": "max 2 words",
              "title": "Max 5 words",
              "srtdsc": "Max 25 words",
              "costs": [{ "size": "1pc", "price": 100 }],
            }

            Rules:
            - Max 5 items
            - Prices in INR (In indian context)
            - No extra text
          `
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.6,
      max_tokens: 20843
    });

    const raw = response.choices?.[0]?.message?.content;

    if (!raw) throw new Error("Empty AI response");

    function cleanJson(text) {
      return text.replace(/```json\s*/i, '').replace(/```\s*$/i, '').trim();
    }

    const items = JSON.parse(cleanJson(raw));

    return { 
      success: true, 
      data: items.map((item,index) => ({
        ...item, 
        id: Date.now() - 1770970161526 + index, 
        hide: false, 
        type: "cartItem", 
        image:{ src: "", alt: "item image" }
      })) 
    };

  } catch (err) {
    return createError({
      statusCode: 500,
      statusMessage: "AI cart item generation failed"
    });
  }
});
