import QuizForm from "@/components/constants/quiz-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftFromLine } from "lucide-react";
export default function QuizFormPage() {
  return (
    <div className=" p-3  container mx-auto py-10">
      <Link href="/">
        <ArrowLeftFromLine />
      </Link>
      <h1 className="mb-8 text-center text-3xl font-bold">
        Choose Quiz Settings
      </h1>
      <QuizForm />
    </div>
  );
}
