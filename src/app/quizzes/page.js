'use client';
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {ArrowLeftFromLine} from "lucide-react";
import Link from "next/link";
import { Loader } from "@/components/constants/loader";
export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [checked, setChecked] = useState(false);
  const handleChange = (e) => {
    
    setChecked(!checked);
  }
useEffect(() => {
  const stored = sessionStorage.getItem("quizData");

  if (stored) {
    try {
      // Gelen stringin gerçekten JSON olup olmadığını kontrol ediyoruz
      const cleaned = stored
        .replace(/\\n/g, '')        // newline kaçışlarını temizle
        .replace(/\\"/g, '"')       // kaçışlı tırnakları düzelt
        .replace(/^"|"$/g, '');     // en baştaki ve sondaki çift tırnakları kaldır

      const parsed = JSON.parse(cleaned);
      setQuizzes(parsed);
    } catch (err) {
      console.error("JSON parse hatası:", err);
    }
  }
}, []);


  if (!quizzes || quizzes.length === 0) {
    return (
<div className="flex h-screen items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <Loader size="xl" />
</div>

);
  }

  return (
    <div className="p-4 container mx-auto py-10">
 <Link href="/quiz">
        <ArrowLeftFromLine />
      </Link>
      <h1 className="text-2xl font-bold text-center mb-4">Quiz Listesi</h1>
<p className="my-2  ">
See the answers <Checkbox onClick={handleChange} />
</p>

      {quizzes.map((quiz, index) => (
        <div key={index} className="mb-6 border p-4 rounded shadow">
          <p className="font-semibold mb-2">
            {index + 1}. {quiz.question}
          </p>
          <ul className="list-disc pl-6">
            {Object.entries(quiz.options).map(([key, option]) => (
              <li key={key}>
                <strong>{key})</strong> {option}
              </li>
            ))}
          </ul>

         {checked && (
            <p className="mt-2  text-green-500">
              Correct Answer: {quiz.answer.toUpperCase()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
