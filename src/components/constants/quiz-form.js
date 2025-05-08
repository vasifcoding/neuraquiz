"use client"
import axios from "axios"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import {Loader} from "@/components/constants/loader";
export default function QuizForm() {
const router = useRouter()
 const [loading , setLoading] = useState(false)
  const [formData, setFormData] = useState({
    number: "",
    text: "",
    difficulty: "normal",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRadioChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      difficulty: value,
    }))
  }

  const handleSubmit = (e) => {
 setLoading(true)
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
  }
 const handleClick = ()=>{
if(formData.number.trim() === "" || formData.text.trim() === ""){
  alert("Lütfen tüm alanları doldurun.")
  setLoading(false)
  return
}
else{ setLoading(true)
axios.post('/api/getquiz', {
difficulty : formData.difficulty,
category : formData.text,
amount : formData.number,
  })
  .then(function (response) {
const cleanData = response.data.content.replace(/```json|```/g, '')   // markdown bloklarını sil
      .replace(/\\n/g, '')           // \n kaçış karakterlerini sil
      .trim();
  sessionStorage.setItem("quizData", JSON.stringify(cleanData))
   router.push('/quizzes')
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
setLoading(false)}
 
}
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Quiz Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Number Input */}
            <div className="space-y-2">
              <Label htmlFor="number">Number of quizzes</Label>
              <Input
                id="number"
                name="number"
                type="number"
                placeholder=" Enter a number"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>

            {/* Text Input */}
            <div className="space-y-2">
              <Label htmlFor="text">Which subject do you want to make a quiz in?</Label>
              <Input
                id="text"
                name="text"
                placeholder="Physics, Chemistry, Biology, etc."
                value={formData.text}
                onChange={handleChange}
                required
              />
            </div>

            {/* Radio Selections */}
            <div className="space-y-2">
              <Label>Quiz Difficulty</Label>
              <RadioGroup
                defaultValue="normal"
                value={formData.difficulty}
                onValueChange={handleRadioChange}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hard" id="hard" />
                  <Label htmlFor="hard">Hard</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal">Normal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="easy" id="easy" />
                  <Label htmlFor="easy">Easy</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Confirm Button */}
         
         
          {loading ? <Loader size="lg" className="mx-auto mt-4" /> :  <Button onClick={handleClick} type="submit" className="w-full">
            Confirm
          </Button>}
        </form>
      </CardContent>
    </Card>
  )
}
