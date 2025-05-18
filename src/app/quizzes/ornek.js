"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Heart, Timer } from "lucide-react"

export default function QuizPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-3xl">
        {/* Quiz Başlık ve Bilgi Çubuğu */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Genel Kültür Quiz</h1>
          <div className="flex items-center gap-4">
            {/* Zaman Göstergesi */}
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-amber-500" />
              <div className="flex flex-col">
                <span className="text-xs text-slate-500">Kalan Süre</span>
                <span className="font-medium">00:45</span>
              </div>
            </div>

            {/* Can Göstergesi */}
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <div className="flex gap-1">
                <Badge variant="outline" className="bg-red-500 text-white">
                  <Heart className="mr-1 h-3 w-3 fill-current" />3
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* İlerleme Çubuğu */}
        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm">
            <span>Soru 5/10</span>
            <span>45 saniye</span>
          </div>
          <Progress value={45} className="h-2" />
        </div>

        {/* Soru Kartı */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardHeader className="bg-slate-50 pb-4 pt-6">
            <h2 className="text-center text-xl font-semibold text-slate-800">Türkiye'nin başkenti hangi şehirdir?</h2>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Button
                variant="outline"
                className="h-16 text-lg hover:bg-blue-50 hover:text-blue-700"
                onClick={() => {}}
              >
                İstanbul
              </Button>

              <Button
                variant="outline"
                className="h-16 text-lg hover:bg-blue-50 hover:text-blue-700"
                onClick={() => {}}
              >
                Ankara
              </Button>

              <Button
                variant="outline"
                className="h-16 text-lg hover:bg-blue-50 hover:text-blue-700"
                onClick={() => {}}
              >
                İzmir
              </Button>

              <Button
                variant="outline"
                className="h-16 text-lg hover:bg-blue-50 hover:text-blue-700"
                onClick={() => {}}
              >
                Bursa
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t bg-slate-50 p-4 text-sm text-slate-500">
            <div>Puan: 250</div>
            <div>Zorluk: Kolay</div>
          </CardFooter>
        </Card>

        {/* Bilgi Metni */}
        <p className="mt-4 text-center text-sm text-slate-500">
          Yanlış cevap verirseniz bir can kaybedersiniz. Doğru cevap verirseniz puan kazanırsınız.
        </p>
      </div>
    </main>
  )
}
