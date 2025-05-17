// app/api/quiz/route.js
import OpenAI from "openai";

// API anahtarını buraya doğrudan yazma, .env dosyasından çek
const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

export async function POST(request) {
  try {
    const body = await request.json();
    const { difficulty, category, amount} = body;
  
   const prompt = `
You are an AI that creates quizzes.
Category: ${category}
Difficulty level: ${difficulty}
Number of questions: ${amount}
Remove escape characters like "\\n" and "\\t". Remove all escape characters.

For each question:
- "question": Question text
- "options": 5 options: a, b, c, d, e
- "answer": The correct option (e.g., "c")
- "explanation": Brief explanation
Generate in the following JSON array format:
[{"quizTime":"set a quiz time like : minutes.seconds "}{"question": "...","options": {"a": "...","b": "...","c": "...","d": "...","e": "..."},"answer": "b","explanation":"The correct answer is b because..."},]
ONLY return the JSON array.
`;


    const client = new OpenAI({
      baseURL: endpoint,
      apiKey: token,
    });

    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "" },
        { role: "user", content: prompt },
      ],
      temperature: 1,
      top_p: 1,
      model: model,
    });

    const result = response.choices[0].message.content;

    return new Response(JSON.stringify({ content: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Hata:", err);
    return new Response(JSON.stringify({ error: "Bir hata oluştu." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
