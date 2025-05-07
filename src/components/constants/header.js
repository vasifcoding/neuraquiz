import Link from "next/link"
import { Brain} from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Header (){

return (
 <header className="sticky  top-0 z-10 justify-center items-center border-b bg-background/95 backdrop-blur">
        <div className=" flex h-16 items-center justify-between container mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Quiz AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Categories
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Leaderboard
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Log in
            </Button>
            <Button size="sm">Sign up</Button>
          </div>
        </div>
      </header>

)
}