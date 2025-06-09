"use client"
import { useState } from "react"
import Link from "next/link"
import { Brain, Coffee, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation"
export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
 const router = useRouter()
  return (
    <header className="sticky top-0 z-10 justify-center items-center border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <span onClick={()=>{router.push('/')}} className="text-xl font-bold cursor-pointer">NeuraQuiz</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Ana Sayfa
          </Link>
          <Link href="/categories" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Kategoriler
          </Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Hakkında
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="https://coff.ee/vasifgarayev"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <span className="flex gap-2">
              Buy me a Coffee <Coffee />
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between py-4 border-b">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span className="font-bold">NeuraQuiz</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <nav className="flex flex-col gap-4 py-6">
                <Link
                  href="/"
                  className="px-2 py-1 text-lg hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Ana Sayfa
                </Link>
                <Link
                  href="/categories"
                  className="px-2 py-1 text-lg text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Kategoriler
                </Link>
                <Link
                  href="/about"
                  className="px-2 py-1 text-lg text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Hakkında
                </Link>
              </nav>

              <div className="mt-auto border-t py-4">
                <Link
                  href="https://coff.ee/vasifgarayev"
                  className="flex items-center gap-2 px-2 py-1 text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Coffee className="h-4 w-4" />
                  <span>Buy me a Coffee</span>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
