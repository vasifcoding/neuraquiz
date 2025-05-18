"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Timer } from "lucide-react";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  SendHorizontal,
} from "lucide-react";
import Link from "next/link";
import { Loader } from "@/components/constants/loader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
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
  const [quizCategory, setQuizCategory] = useState(null);
  const [quizAmount, setQuizAmount] = useState(null);
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
    setHearts((prev) => prev - 1);
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
    setQuizCategory(sessionStorage.getItem("quizCategory"));
    setQuizAmount(sessionStorage.getItem("quizAmount"));
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-4xl">
        {/* Quiz Başlık ve Bilgi Çubuğu */}

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

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">
            Quiz Konusu : {quizCategory}
          </h1>
          <div className="flex items-center gap-4">
            {/* Zaman Göstergesi */}
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-amber-500" />
              <div className="flex flex-col">
                <span className="text-xs text-slate-500">Kalan Süre</span>
                <span className="font-medium">
                  {minutes}:{seconds}
                </span>
              </div>
            </div>

            {/* Can Göstergesi */}
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <div className="flex gap-1">
                <Badge variant="outline" className="bg-red-500 text-white">
                  <Heart className="mr-1 h-3 w-3 fill-current" />
                  {hearts}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm">
            <span>
              Soru {quizQueue + 1}/{quizAmount}
            </span>
          </div>
          <Progress
            value={((quizQueue + 1) * 100) / quizAmount}
            className="h-2"
          />
        </div>

       <Card className="border-2 border-slate-200 shadow-lg">
          <CardHeader className="bg-slate-50 pb-4 pt-6">
            <h2 className="text-center text-xl font-semibold text-slate-800">
              {" "}
              {quizzes[quizQueue].question}
            </h2>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="flex flex-col  gap-2">
              {Object.entries(quizzes[quizQueue].options).map(
                ([key, option]) => {
                  const isSelected = selectedIndex === key;
                  const isCorrect = quizzes[quizQueue].answer === key;

                  let liClass =
                    "h-16 text-wrap   hover:cursor-pointer";

                  if (isSelected) {
                    liClass += isCorrect
                      ? "text-green-500 bg-green-100"
                      : "text-red-500 bg-red-100";
                  } else {
                    liClass += "hover:cursor-pointer";
                  }

                  return (
                    <Button
                      key={key}
                      onClick={() => choosenVariant(key, isCorrect)}
                      className={liClass}
                      variant="answerButton"
                    >
                      {option}
                    </Button>
                  );
                }
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t bg-slate-50 p-4 text-sm text-slate-500">
<div>
 {quizQueue === 0 ? null : (
          <Button className={"cursor-pointer float-end mt-2 mr-2"} onClick={prevQuiz}>
            <ArrowLeftFromLine /> Previous
          </Button>
        )}
</div>
            <div>Puan: { parseFloat((100 / quizAmount).toFixed(1)) }
</div>
            <div>Zorluk: Kolay</div>
<div>
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
          <Button onClick={nextQuiz} className={"float-end mt-2 cursor-pointer"}>
            <ArrowRightFromLine /> Next
          </Button>
        )}
        {loading ? (
          <Button disabled type="button" className="float-end p-4">
            <Loader variant="secondary" size="lg" className="mx-auto  " />{" "}
          </Button>
        ) : null}
       
</div>
          </CardFooter>
        </Card>
       
        
      </div>
    </main>
  );
}
