import { GoogleGenAI } from "@google/genai";

// API key'i burada kullanıyoruz
const ai = new GoogleGenAI({ apiKey: "AIzaSyCqfSes7lD2MCPaSAQMQQrafcag8snqLdM" });

export async function POST(request) {
  try {
    const body = await request.json();
    const { difficulty, category, amount} = body; 

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Sen bir sınav (quiz) oluşturan bir yapay zekasın.
Kategori: ${category}
Zorluk seviyesi: ${difficulty}
Soru sayısı: ${amount}
"\n" ve "\t" gibi kaçış karakterlerini kaldır. Tüm kaçış karakterlerini sil.

Her soru için:
- "question": Soru metni
- "options": 5 seçenek: a, b, c, d, e
- "answer": Doğru seçenek (örneğin: "c")
- "explanation": Kısa açıklama

Aşağıdaki JSON dizi formatında oluştur:
[{"quizTime":"süreyi şu şekilde ayarla: dakika.saniye"}, {"question": "...","options": {"a": "...","b": "...","c": "...","d": "...","e": "..."},"answer": "b","explanation":"Doğru cevap b çünkü..."},]

SADECE JSON dizisini döndür.

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