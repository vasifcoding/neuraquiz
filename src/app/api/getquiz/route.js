import { GoogleGenAI } from "@google/genai";
export async function GET(request) {
return new Response("Hello, Next.js!");
}

// export async function POST(request) {
//   const body = await request.json();
//   const { quizType, difficulty, category, amount } = body;
//   const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${quizType}`;
//   const res = await fetch(url);
//   const data = await res.json();
//   return new Response(JSON.stringify(data));
// }




// API key'i burada kullanıyoruz
const ai = new GoogleGenAI({ apiKey: "AIzaSyCqfSes7lD2MCPaSAQMQQrafcag8snqLdM" });

export async function POST(request) {
  try {
   const body = await request.json();
  const {  difficulty, category, amount } = body;
   console.log("Received data:", body); // Log the received data
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
Sen bir quiz oluşturma yapay zekasısın.
Kullanıcının belirlediği konu: ${category}
Zorluk seviyesi: ${difficulty}
Soru sayısı: ${amount}
"\ N" ve "\ t" gibi kaçış karakterlerini sil.
TUM Kaçış karakterlerini sil.
Her soru için:
- "question": Soru metni
- "options": a, b, c, d, e olmak üzere 5 şık
- "answer": Doğru şıkkın harfi (örn: "c")

 MARKDOWN ETIKETI YAZI VS EKLEME !!!!
Şu formatta JSON array olarak üret:
[{"question": "...","options": {"a": "...","b": "...","c": "...","d": "...","e": "..."},"answer": "b"},...]

Yalnızca JSON array döndür.
`,
    });

    return new Response(JSON.stringify({ content: response.text }), {
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
