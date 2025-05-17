"use client";
import { useEffect, useState } from "react";

import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  SendHorizontal,
} from "lucide-react";
import Link from "next/link";
import { Loader } from "@/components/constants/loader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {

  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function QuizzesPage() {
  const [hearts, setHearts] = useState([]);
  const router = useRouter();
  const [openHeartModal, setOpenHeartModal] = useState(false); 
  const [openTimeModal, setOpenTimeModal] = useState(false); 
  const [quizzes, setQuizzes] = useState([]);
  const [checked, setChecked] = useState(false);
  const [quizQueue, setQuizQueue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [quizTime, setQuizTime] = useState();
  const [loading, setLoading] = useState(false);
  const nextQuiz = () => {
    setQuizQueue(quizQueue + 1);
    setSelectedIndex(null);
    setChecked(false);
  };


  const prevQuiz = () => {
    setQuizQueue(quizQueue - 1);
    setSelectedIndex(null);
    setChecked(false);
  };
  const handleChange = (e) => {
    setChecked(!checked);
  };
  const removeHeart = () => {
    setHearts(hearts.slice(0, -1));
  };
  useEffect(() => {
    hearts.length === 0 ? setOpenHeartModal(true) : setOpenHeartModal(false);

}, [hearts]);
  useEffect(() => {
    setHearts(["❤️", "❤️", "❤️", "❤️", "❤️", "❤️"]);
    const time = sessionStorage.getItem("quizTime");
    setQuizTime(time.replace(/"/g, ""));

    if (time) {
      const [min, sec] = JSON.parse(time).split(".").map(Number);
      setQuizTime(min * 60 + sec);
    }

    const stored = sessionStorage.getItem("quizData");
    if (stored) {
      try {
        // Gelen stringin gerçekten JSON olup olmadığını kontrol ediyoruz
        const cleaned = stored
          .replace(/\\n/g, "") // newline kaçışlarını temizle
          .replace(/\\"/g, '"') // kaçışlı tırnakları düzelt
          .replace(/^"|"$/g, ""); // en baştaki ve sondaki çift tırnakları kaldır

        const parsed = JSON.parse(cleaned);
        setQuizzes(parsed);
      } catch (err) {
        console.error("JSON parse hatası:", err);
      }
    }
    const storedTime = sessionStorage.getItem("quiztime");

    if (storedTime) {
      try {
        const parsedTime = JSON.parse(storedTime);
        setQuizTime(parsedTime);
      } catch (error) {}
    } else {
      setQuizTime(sessionStorage.getItem("quizTime"));
    }
  }, []);
  useEffect(() => {
    if (quizTime <= 0) {
      setOpenTimeModal(true);
      return;
    }
    const timer = setInterval(() => setQuizTime((t) => t - 1), 1000);
    sessionStorage.setItem("quiztime", JSON.stringify(quizTime));
    return () => clearInterval(timer);
  }, [quizTime]);

  const minutes = String(Math.floor(quizTime / 60)).padStart(2, "0");
  const seconds = String(quizTime % 60).padStart(2, "0");

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <Loader size="xl" />
      </div>
    );
  }

  const choosenVariant = (e, isCorrect) => {
    setSelectedIndex(e);
    console.log("Seçilen:", e);
    console.log("secilen", isCorrect);
    isCorrect ? setChecked(true) : setChecked(false);
    isCorrect ? null : removeHeart();
    // if (quizzes[quizQueue].answer === e) {
    //   setQuizQueue(quizQueue + 1);
    // } else {
    //   alert("Yanlış cevap! Doğru cevap: " + quizzes[quizQueue].answer.toUpperCase())
    // }
    // if (quizQueue === quizzes.length - 1) {
    //   alert("Quiz bitti!")
    //   setQuizQueue(0)
    // }
  };
const refreshQuiz = () => {
  setOpenHeartModal(false);
  setHearts(["❤️", "❤️", "❤️", "❤️", "❤️", "❤️"]);
  setQuizQueue(0);
  setChecked(false);
  setSelectedIndex(null);
}
  return (
    <div className="p-4 container mx-auto py-10">
      <Dialog open={openHeartModal}>
        <DialogContent closable={false}>
          <DialogHeader>
            <DialogTitle>Üzgünüz tüm canlarınızı bitirdiniz 😢</DialogTitle>
            <DialogDescription>
              Yeniden başlamak için tıklayınız 
              <Button className="mx-3"
                onClick={() => {
                  refreshQuiz()
                }}
              >
                Yeniden Başla
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={openTimeModal}>
        <DialogContent closable={false}>
          <DialogHeader>
            <DialogTitle>Üzgünüz tüm zamanınız bitti 😢</DialogTitle>
            <DialogDescription>
             Sonuçları görüntülemek için tıklayınız 
              <Button className="mx-3"
                onClick={() => {
                 router.push("/quiz-completed");
                }}
              >
                Sonuçları Görüntüle
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Link href="/quiz">
        <ArrowLeftFromLine />
      </Link>
      <h1 className="text-2xl font-bold text-center">Quiz Listesi</h1>
      {hearts.length === 0 ? null : <div className="flex justify-end  mb-4">
        <p className="border-2  border-gray-300 rounded-full p-2">
          {hearts.map((heart, index) => (
            <span className="text-2xl mx-2" key={index}>
              {heart}
            </span>
          ))}
        </p>
      </div>}
      <p className="text-center text-2xl font-bold mb-4">
        Kalan Süre:
        <span
          className={`ml-2 ${
            quizTime <= 30
              ? "text-red-500"
              : quizTime <= 60
              ? "text-yellow-500"
              : "text-green-500"
          }`}
        >
          {minutes}:{seconds}
        </span>
      </p>
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
            const isCorrect = quizzes[quizQueue].answer === key;

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
                onClick={() => choosenVariant(key, isCorrect)}
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
      {loading ? null : quizQueue === quizzes.length - 1 ? (
        <Button
          variant="outline"
          className={"cursor-pointer float-end "}
          onClick={() => {
            setLoading(true);
            router.push("/quiz-completed");
          }}
        >
          <SendHorizontal /> Finish
        </Button>
      ) : (
        <Button onClick={nextQuiz} className={"float-end cursor-pointer"}>
          <ArrowRightFromLine /> Next
        </Button>
      )}
      {loading ? (
        <Button disabled type="button" className="float-end p-4">
          <Loader variant="secondary" size="lg" className="mx-auto  " />{" "}
        </Button>
      ) : null}
      {quizQueue === 0 ? null : (
        <Button className={"cursor-pointer"} onClick={prevQuiz}>
          <ArrowLeftFromLine /> Previous
        </Button>
      )}
    </div>
  );
}
