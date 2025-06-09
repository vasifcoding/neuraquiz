import { Card, CardContent } from "@/components/ui/card"
export default function ResultCard({ icon, title, children }) {
  return (
    <Card className="overflow-hidden border-2 border-muted">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full bg-primary/10 p-3 mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="text-muted-foreground">{children}</div>
        </div>
      </CardContent>
    </Card>
  )
}