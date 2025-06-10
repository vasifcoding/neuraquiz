import {Brain} from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <>
       <footer className="   w-full border-t bg-muted/50">
        <div className="py-8 md:py-12 flex justify-center">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row max-w-5xl w-full">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">NeuraQuiz</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NeuraQuiz. Tüm Hakları Saklıdır. | v1.2.1
            </p>
            <div className="flex gap-4">
              
             
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}