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
import { FaHeart } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  const [quizTime, setQuizTime] = useState(null);
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

  const removeHeart = () => {
    setHearts((prev) => prev-1);
  };

  useEffect(() => {
    hearts === 0 ? setOpenHeartModal(true) : setOpenHeartModal(false);
  }, [hearts]);

  useEffect(() => {
    setHearts(6);

    const stored = sessionStorage.getItem("quizData");
    if (stored) {
      try {
        const cleaned = stored
          .replace(/\\n/g, "")
          .replace(/\\"/g, '"')
          .replace(/^"|"$/g, "");
        const parsed = JSON.parse(cleaned);
        setQuizzes(parsed);
      } catch (err) {
        console.error("JSON parse hatası:", err);
      }
    }

    const time = sessionStorage.getItem("quizTime");
    if (time) {
      try {
        // time string olarak "mm.ss" formatındaysa parse et
        const parsedTime = JSON.parse(time);
        if (typeof parsedTime === "string") {
          const [min, sec] = parsedTime.split(".").map(Number);
          setQuizTime(min * 60 + sec);
        } else if (typeof parsedTime === "number") {
          setQuizTime(parsedTime);
        } else {
          setQuizTime(300); // Default 5 dakika (300 saniye)
        }
      } catch {
        setQuizTime(300); // Default zaman
      }
    } else {
      setQuizTime(300);
    }
  }, []);

  useEffect(() => {
    if (quizTime === null) return;
    if (quizTime <= 0) {
      setOpenTimeModal(true);
      return;
    }
    const timer = setInterval(() => {
      setQuizTime((t) => {
        const newTime = t - 1;
        sessionStorage.setItem("quizTime", JSON.stringify(newTime));
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quizTime]);

  const minutes = String(Math.floor((quizTime || 0) / 60)).padStart(2, "0");
  const seconds = String((quizTime || 0) % 60).padStart(2, "0");

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <Loader size="xl" />
      </div>
    );
  }

  const choosenVariant = (e, isCorrect) => {
    setSelectedIndex(e);
    isCorrect ? setChecked(true) : setChecked(false);
    isCorrect ? null : removeHeart();
  };

  const refreshQuiz = () => {
    setOpenHeartModal(false);
    setHearts(6);
    setQuizQueue(0);
    setChecked(false);
    setSelectedIndex(null);
    setQuizTime(300);
    sessionStorage.setItem("quizTime", JSON.stringify(300));
  };

  return (
    <div className="p-4 container mx-auto py-10">
      <Dialog open={openHeartModal}>
        <DialogContent closable={false}>
          <DialogHeader>
            <DialogTitle>Üzgünüz tüm canlarınızı bitirdiniz 😢</DialogTitle>
            <DialogDescription>
              Yeniden başlamak için tıklayınız{" "}
              <Button
                className="mx-3"
                onClick={() => {
                  refreshQuiz();
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
              Sonuçları görüntülemek için tıklayınız{" "}
              <Button
                className="mx-3"
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
{hearts === 0 ? null : (
  <div className="flex justify-end mb-4">
    <p className="border-2 border-gray-300 rounded-full p-2 flex gap-1">
      {Array.from({ length: hearts }).map((_, i) => (
        <FaHeart className="mx-1" key={i} color="red" size={24} />
      ))}
    </p>
  </div>
)}
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
          <p className="mt-2  text-green-700">{quizzes[quizQueue].explanation}</p>
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
