"use client";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Code,
  Globe,
  Lightbulb,
  Trophy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/constants/header";
import Footer from "@/components/constants/footer";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="flex  min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto flex justify-center py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight sm:text-5xl md:text-6xl">
              <span className="text-primary">QuizAI {" "}</span>
             ile Bilgiinizi Test Edin
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Challenge yourself with thousands of quizzes across various
              categories. Learn, compete, and have fun!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
             
                <Link className="p-3 flex items-center justify-center gap-2" href="/quiz" size="lg">
                <Button className="gap-2 cursor-pointer">
                  Start a Quiz <ArrowRight className="h-4 w-4" />
              </Button>
                </Link>
              <Button
                className="cursor-pointer"
                onClick={() => router.push("/#categories")}
                variant="outline"
                size="lg"
              >
                Explore Categories
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section
          id="categories"
          className="container mx-auto flex flex-col items-center py-12 md:py-24"
        >
          <div className="mx-auto max-w-[58rem] text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Popular Categories
            </h2>
            <p className="mt-4 text-muted-foreground">
              Choose from a wide range of topics and test your knowledge
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-auto justify-center w-full max-w-5xl">
            <CategoryCard
              icon={<Globe className="h-8 w-8" />}
              title="Geography"
              description="Test your knowledge of countries, capitals, and landmarks around the world."
              quizCount={42}
            />
            <CategoryCard
              icon={<Code className="h-8 w-8" />}
              title="Programming"
              description="Challenge yourself with coding questions across various languages and frameworks."
              quizCount={38}
              featured
            />
            <CategoryCard
              icon={<Lightbulb className="h-8 w-8" />}
              title="Science"
              description="Explore questions about physics, chemistry, biology, and more scientific topics."
              quizCount={56}
            />
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              View All Categories
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-muted/50 py-12 md:py-24">
          <div className="container mx-auto flex flex-col items-center">
            <div className="mx-auto max-w-[58rem] text-center">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                Why QuizAI?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Join thousands of users who are expanding their knowledge every
                day
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-auto w-full max-w-5xl">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold">10,000+</h3>
                <p className="text-muted-foreground">Active Users</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold">5,000+</h3>
                <p className="text-muted-foreground">Quizzes Available</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold">20+</h3>
                <p className="text-muted-foreground">Categories</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto flex justify-center py-12 md:py-24">
          <div className="mx-auto max-w-[58rem] rounded-lg bg-primary/5 p-8 text-center md:p-12">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Ready to Test Your Knowledge?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Create an account to track your progress, compete with friends,
              and earn achievements.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="gap-2">
                Sign Up Now <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function CategoryCard({
  icon,
  title,
  description,
  quizCount,
  featured = false,
}) {
  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-md ${
        featured ? "border-primary/50 bg-primary/5" : ""
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div
            className={`rounded-full p-2 ${
              featured ? "bg-primary/10" : "bg-muted"
            }`}
          >
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="min-h-[80px]">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <p className="text-sm text-muted-foreground">{quizCount} quizzes</p>
        <Button variant="ghost" size="sm" className="gap-1">
          Explore <ArrowRight className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
}
