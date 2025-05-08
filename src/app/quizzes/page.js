'use client';
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {ArrowLeftFromLine ,ArrowRightFromLine, SendHorizontal } from "lucide-react";
import Link from "next/link";
import { Loader } from "@/components/constants/loader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function QuizzesPage() {
  const router = useRouter()
  const [quizzes, setQuizzes] = useState([]);
  const [checked, setChecked] = useState(false);
  const [quizQueue, setQuizQueue] = useState(0);
const [selectedIndex, setSelectedIndex] = useState(null);
const nextQuiz = () => {
setQuizQueue(quizQueue + 1)
setSelectedIndex(null)
setChecked(false)
}
const prevQuiz = () => {
setQuizQueue(quizQueue - 1)
setSelectedIndex(null)
setChecked(false)
}
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

const choosenVariant = (e,isCorrect) => {
 setSelectedIndex(e)
console.log("Seçilen:", e);
console.log("secilen", isCorrect);
isCorrect ? setChecked(true) : setChecked(false)
  // if (quizzes[quizQueue].answer === e) {
  //   setQuizQueue(quizQueue + 1);
  // } else {
  //   alert("Yanlış cevap! Doğru cevap: " + quizzes[quizQueue].answer.toUpperCase())
  // }
  // if (quizQueue === quizzes.length - 1) {
  //   alert("Quiz bitti!")
  //   setQuizQueue(0)
  // }

}

  return (
    <div className="p-4 container mx-auto py-10">
 <Link href="/quiz">
        <ArrowLeftFromLine />
      </Link>
      <h1 className="text-2xl font-bold text-center mb-4">Quiz Listesi</h1>
{/* <p className="my-2  ">
See the answers <Checkbox onClick={handleChange} />
</p> */}

      {/* {quizzes.map((quiz, index) => (
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
<div>
            <p className="mt-2  text-green-500">
              Correct Answer: {quiz.answer.toUpperCase()}
            </p>
           <p className="mt-2  text-green-700">
         {quiz.explanation}
</p>
</div>
            
          )}
        </div>
      ))} */}
<div key={quizQueue} className="mb-6 border p-4 rounded shadow">
<p className="font-semibold mb-2">
            {quizQueue + 1}. {quizzes[quizQueue].question}
          </p>
<ul className="list-disc pl-6">
  {Object.entries(quizzes[quizQueue].options).map(([key, option]) => {
    const isSelected = selectedIndex === key;
    const isCorrect = quizzes[quizQueue].answer === key ;

    let liClass = "cursor-pointer my-2 px-2 py-1 rounded ";

    if (isSelected) {
      
      liClass += isCorrect
        ? "text-green-500 bg-green-100"
        : "text-red-500 bg-red-100";
    } else {
      liClass += "hover:bg-gray-100";
    }

    return (
      <li
        key={key}
        onClick={() => choosenVariant(key,isCorrect)}
        className={liClass}
      >
        <strong>{key})</strong> {option}
      </li>
    );
  })}
</ul>
{checked && (
 <p className="mt-2  text-green-700">
         {quizzes[quizQueue].explanation}
</p>
)}
</div>
{quizQueue === quizzes.length - 1 ? (<Button variant="outline"  className={"cursor-pointer float-end "} onClick={()=>{router.push("/quiz-completed")}} ><SendHorizontal /> Finish</Button>): <Button onClick={nextQuiz} className={"float-end cursor-pointer"}><ArrowRightFromLine /> Next</Button>}
{quizQueue === 0 ? (null):<Button  className={"cursor-pointer"} onClick={prevQuiz} ><ArrowLeftFromLine /> Previous</Button>} 

    </div>
  );
}
