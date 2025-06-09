"use client";
import CategoryCard from "@/components/constants/category-card.js";
import { Badge } from "@/components/ui/badge";
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
              <span className="text-primary">NeuraQuiz {" "}</span>
             ile Bilginizi Test Edin
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
             Çeşitli
kategorilerdeki sınırsız sayıda sınavla kendinize meydan okuyun. Öğrenin, yarışın ve eğlenin!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
             
                <Link className="p-3 flex items-center justify-center gap-2" href="/quiz" size="lg">
                <Button className="gap-2 cursor-pointer">
                  Quiz Oluştur <ArrowRight className="h-4 w-4" />
              </Button>
                </Link>
              <Button
                className="cursor-pointer"
                onClick={() => router.push("/#categories")}
                variant="outline"
                size="lg"
              >
               Ana Kategoriler
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
             Popüler Kategoriler
            </h2>
            <p className="mt-4 text-muted-foreground">
              Geniş yelpazedeki konulardan birini seçin ve bilginizi test edin
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-auto justify-center w-full max-w-5xl">
            <CategoryCard
              link="/quiz?category=coğrafya"
              icon={<Globe className="h-8 w-8" />}
              title="Coğrafya"
              description="Dünya çapında ülkeler, başkentler ve turistik yerler hakkındaki bilginizi test edin."
              quizCount={42}
            />
            <CategoryCard
              link="/quiz?category=programlama"
              icon={<Code className="h-8 w-8" />}
              title="Programlama"
              description="Çeşitli programlama dilleri ve çerçeveler genelinde kodlama sorularıyla kendinize meydan okuyun."
              quizCount={38}
              featured
            />
            <CategoryCard
              link="/quiz?category=bilim"
              icon={<Lightbulb className="h-8 w-8" />}
              title="Bilim"
              description="Fizik, kimya, biyoloji ve daha birçok bilimsel konu hakkındaki soruları keşfedin."
              quizCount={56}
            />
          </div>
          <div className="mt-12 text-center">
            <Link href="/categories">
            <Button variant="outline" size="lg">
              Tüm Kategoriler
            </Button>
</Link>
          </div>
        </section>

        {/* Stats Section */}
       <section className="bg-gradient-to-b from-muted/30 to-muted/60 py-16 md:py-24">
  <div className="container px-4 mx-auto">
    <div className="mx-auto max-w-[58rem] text-center mb-12">
      <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
        Neden NeuraQuiz?
      </h2>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
        Bilgilerini genişleten ve becerilerini yapay zeka tarafından oluşturulan sınavlarla test eden binlerce kullanıcıya katılın
      </p>
    </div>

    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-auto w-full max-w-5xl">
      <div className="flex flex-col items-center text-center bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/20 group">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-4">
          <Trophy className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">100+</h3>
        <p className="text-muted-foreground mt-2">Aktif Kullanıcı</p>
        <div className="w-16 h-1 bg-primary/30 rounded-full mt-4"></div>
      </div>

      <div className="flex flex-col items-center text-center bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/20 group">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-4">
          <Brain className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">5,000+</h3>
        <p className="text-muted-foreground mt-2">Yapay Zeka Tarafından Oluşturulan Sorular</p>
        <div className="w-16 h-1 bg-primary/30 rounded-full mt-4"></div>
      </div>

      <div className="flex flex-col items-center text-center bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/20 group">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-4">
          <Lightbulb className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">∞</h3>
        <p className="text-muted-foreground mt-2">Sınırsız Konu</p>
        <div className="w-16 h-1 bg-primary/30 rounded-full mt-4"></div>
      </div>
    </div>

    <div className="mt-12 text-center">
      <p className="text-muted-foreground mb-4">Quizini Kendi İhtiyaçlarınıza Göre Oluşturun</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Badge variant="outline" className="px-3 py-1 text-sm bg-background">
          Zorluk Seviyesi
        </Badge>
        <Badge variant="outline" className="px-3 py-1 text-sm bg-background">
          Soru Sayısı
        </Badge>
       
        <Badge variant="outline" className="px-3 py-1 text-sm bg-background">
          Konu Seçimi
        </Badge>
        <Badge variant="outline" className="px-3 py-1 text-sm bg-background">
          Öğrenme Hedefleri
        </Badge>
      </div>
    </div>
  </div>
</section>


        {/* CTA Section */}
        <section className="container mx-auto flex justify-center py-12 md:py-24">
          <div className="mx-auto max-w-[58rem] rounded-lg bg-primary/5 p-8 text-center md:p-12">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Bilginizi Test Etmeye Hazır mısınız?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Konularınızı seçin , zorluk seviyesini ayarlayın ve sınava başlayın.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/quiz" >
<Button size="lg" className="gap-2">
 Şimdi Başla <ArrowRight className="h-4 w-4" />
</Button>
               
              </Link>

              <Link href="/about">
              <Button variant="outline" size="lg">
                Daha Fazla 
              </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


