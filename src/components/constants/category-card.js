import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default function CategoryCard({
  icon,
  title,
  description,
  quizCount,
  featured = false,
  link,
}) {
  return (
<>

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
        <p className="text-sm text-muted-foreground">{quizCount} Quiz</p>
        <Button variant="ghost" size="sm" className="gap-1" asChild>
          <Link href={link}>
            Daha Fazla <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
</>
  );
}