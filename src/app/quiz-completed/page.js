"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Share2, Trophy, Clock, Award, BarChart3, Repeat, Home, CheckCircle2, XCircle, ArrowLeftFromLine } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function QuizCompleted({
  score = 8,
  totalQuestions = 10,
  timeTaken = 245, // in seconds
  correctAnswers = 8,
  wrongAnswers = 2,
  quizTitle = "General Knowledge Quiz",
  userName = "Quiz Master",
}) {
    const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(false)
  const percentage = Math.round((score / totalQuestions) * 100)

  // Format time taken (seconds to minutes:seconds)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Determine performance message based on score percentage
  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding! You are a quiz genius!"
    if (percentage >= 80) return "Excellent work! You really know your stuff!"
    if (percentage >= 70) return "Great job! You have got solid knowledge!"
    if (percentage >= 60) return "Good effort! Keep learning and improving!"
    if (percentage >= 50) return "Not bad! You are on the right track."
    return "Keep practicing! You will improve with time."
  }

  // Determine badge based on score percentage
  const getBadge = () => {
    if (percentage >= 90) return { name: "Quiz Master", icon: <Trophy className="h-4 w-4" /> }
    if (percentage >= 80) return { name: "Scholar", icon: <Award className="h-4 w-4" /> }
    if (percentage >= 70) return { name: "Knowledge Seeker", icon: <CheckCircle2 className="h-4 w-4" /> }
    if (percentage >= 50) return { name: "Apprentice", icon: <BarChart3 className="h-4 w-4" /> }
    return { name: "Beginner", icon: <Clock className="h-4 w-4" /> }
  }

  // Trigger confetti effect on component mount
  useEffect(() => {
    if (percentage >= 60) {
      setShowConfetti(true)
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      const randomInRange = (min, max) => Math.random() * (max - min) + min

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)

        // Since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      }, 250)
    }
  }, [percentage])

  const badge = getBadge()

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
            >
              <Trophy className="h-10 w-10 text-primary" />
            </motion.div>
            <CardTitle className="text-3xl font-bold">Congratulations!</CardTitle>
            <CardDescription className="text-lg">You have completed the {quizTitle}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Score Section */}
            {/* <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Your Score</h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-4xl font-bold text-primary">{score}</span>
                <span className="text-xl text-muted-foreground">/ {totalQuestions}</span>
              </div>

              <div className="relative pt-1 px-8">
                <Progress value={percentage} className="h-3" />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <p className="mt-4 text-lg font-medium">{getPerformanceMessage()}</p>
            </div>

            <Separator />

            {/* Stats Section */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center p-4 rounded-lg bg-muted/50"
              >
                <Clock className="h-8 w-8 text-muted-foreground mb-2" />
                <h4 className="text-sm font-medium text-muted-foreground">Time Taken</h4>
                <p className="text-2xl font-bold">{formatTime(timeTaken)}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center p-4 rounded-lg bg-muted/50"
              >
                <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
                <h4 className="text-sm font-medium text-muted-foreground">Correct Answers</h4>
                <p className="text-2xl font-bold">{correctAnswers}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center p-4 rounded-lg bg-muted/50"
              >
                <XCircle className="h-8 w-8 text-red-500 mb-2" />
                <h4 className="text-sm font-medium text-muted-foreground">Wrong Answers</h4>
                <p className="text-2xl font-bold">{wrongAnswers}</p>
              </motion.div>
            </div> */}

            {/* <Separator /> */} 

            {/* Achievement Section */}
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col items-center"
            >
              <h3 className="text-lg font-medium mb-3">Achievement Unlocked</h3>
              <Badge variant="outline" className="px-4 py-2 text-base flex items-center gap-2 border-2">
                {badge.icon}
                {badge.name}
              </Badge>

              <p className="mt-4 text-center text-muted-foreground">
                Well done, {userName}! Keep challenging yourself with more quizzes to earn more badges.
              </p>
            </motion.div> */}
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button onClick={()=>{router.push('/')}} className="w-full sm:w-auto gap-2" variant="default">
             <ArrowLeftFromLine />
              Back to Home
            </Button>
            {/* <Button className="w-full sm:w-auto gap-2" variant="default">
              <Share2 className="h-4 w-4" />
              Share Results
            </Button> */}
            {/* <Button className="w-full sm:w-auto gap-2" variant="outline">
              <Repeat className="h-4 w-4" />
              Try Again
            </Button>
            <Button className="w-full sm:w-auto gap-2" variant="outline">
              <Home className="h-4 w-4" />
              Back to Home
            </Button> */}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
