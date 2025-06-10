import { Card, CardContent } from "@/components/ui/card"
export default function FeatureCard({ icon, title, children }) {
  return (
    <Card className="overflow-hidden border-none shadow-none bg-background">
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className=" text-primary">{icon}</div>
          <h3 className=" text-xs md:text-sm font-medium">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{children}</p>
      </CardContent>
    </Card>
  )
}