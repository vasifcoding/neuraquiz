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
import  Mycombobox  from "@/components/ui/combobox"
import { toast } from "react-toastify"
import ToastNotification from "@/components/ui/toastnotification"
import { Bounce } from "react-toastify";
export default function QuizForm({category}) {
const router = useRouter()

 const [loading , setLoading] = useState(false)
  const [formData, setFormData] = useState({
    number: "",
    text: category ||   "",
    difficulty: "",
    
  })
// const handleLanguageChange = (newLang) => {
//   setFormData((prev) => ({
//     ...prev,
//     language: newLang,
//   }))
// }

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(formData.number.trim() === "" || formData.text.trim() === ""){
      toast.error('Please fill in all required fields!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    else if(formData.number > 40 || formData.number < 1){
      toast.error('Sorular 1-40 arası olmalıdır!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
else if(!formData.difficulty){

 toast.error('Bir zorluk seviyesi seçiniz!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
}

    try {
      setLoading(true);
      console.log("Form submitted:", formData);
       sessionStorage.setItem("quizCategory", formData.text);
       sessionStorage.setItem("quizAmount", formData.number);
       sessionStorage.setItem("quizDifficulty", formData.difficulty);
      const response = await axios.post('/api/getquiz', {
        difficulty: formData.difficulty,
        category: formData.text,
        amount: formData.number,
      });

      const cleanData = response.data.content.replace(/```json|```/g, '')
        .replace(/\\n/g, '')
        .replace(/\\"/g, '"')
        .replace(/^"|"$/g, '')
        .trim();
      const parsedData = JSON.parse(cleanData);
      const [quizMeta, ...quizItems] = parsedData;

      sessionStorage.setItem("quizData", JSON.stringify(quizItems));
      sessionStorage.setItem("quizTime", JSON.stringify(quizMeta.quizTime));
      router.push('/quizzes');
    } catch (error) {
      console.error(error);
      toast.error('Quiz oluşturulurken bir hata oluştu , lütfen tekrar deneyiniz.');
    } finally {
      setLoading(false);
    }
  }
 const handleClick = ()=>{

 
}
  return (
    <Card className="w-full max-w-md mx-auto">
<ToastNotification />
      <CardHeader>
        <CardTitle className="text-center">Quiz Ayarları</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Number Input */}
            <div className="space-y-2">
              <Label htmlFor="number">Quiz Sayısı</Label>
              <Input
                min={1}
                id="number"
                name="number"
                type="number"
                placeholder=" Bir sayı giriniz"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>
{/* <div className="space-y-2">
<Label htmlFor="number">Select Quiz Language</Label>
  <Mycombobox value={formData.language} onChange={handleLanguageChange}/>

</div> */}

            {/* Text Input */}
            <div className="space-y-2">
              <Label htmlFor="text">Hangi konuda quiz yapmak istersiniz?</Label>
              <Input
                id="text"
                name="text"
                placeholder="Kuantum Dolanıklık ,CRISPR , Astrobiyoloji ..."
                value={formData.text}
                onChange={handleChange}
                required
              />
            </div>

            {/* Radio Selections */}
            <div className="space-y-2">
              <Label className="mb-4">Quiz Zorluk Seviyesi</Label>
              <RadioGroup
                defaultValue="Kolay"
                value={formData.difficulty}
                onValueChange={handleRadioChange}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Zor" id="Zor" />
                  <Label htmlFor="zor">Zor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Orta-zor" id="Orta-zor" />
                  <Label htmlFor="orta-zor">Orta - Zor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Normal" id="Normal" />
                  <Label htmlFor="normal">Normal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem  value="Kolay" id="Kolay" />
                  <Label htmlFor="Kolay">Kolay</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Confirm Button */}
         
         
          {loading ? <Button disabled type="button" className="w-full p-4"><Loader variant="secondary" size="lg" className="mx-auto  " /> </Button>:  <Button  type="submit" className="w-full">
            Gönder
          </Button>}
        </form>
      </CardContent>
    </Card>
  )
}
