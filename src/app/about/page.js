import Header from "@/components/constants/header";
import Footer from "@/components/constants/footer";
import { Brain, Clock, Award, BarChart3, Target, Lightbulb, Sparkles, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ResultCard from "@/components/constants/resultcard"
import FeatureCard from "@/components/constants/feature-card"
import Link from "next/link"
export default function About() {
  return (
<>
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container max-w-5xl mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
          <Brain className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">NeuraQuiz Hakkında</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Yapay zeka destekli modern quiz platformu ile bilginizi test edin ve geliştirin
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-16">
        {/* What is NeuraQuiz */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">NeuraQuiz Nedir?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-lg">
                <span className="font-bold text-primary">NeuraQuiz</span>, yapay zeka destekli modern bir quiz
                platformudur. Amacı; sınavlara hazırlanan, belirli konularda kendini test etmek isteyen ya da genel
                kültürünü geliştirmek isteyen herkes için hızlı, etkili ve kişiselleştirilmiş bir sınav deneyimi
                sunmaktır.
              </p>
              <p className="text-lg">
                Gelişmiş yapay zeka algoritmaları sayesinde, her kullanıcının ihtiyaçlarına ve bilgi seviyesine göre
                özelleştirilmiş sorular oluşturur ve öğrenme sürecinizi hızlandırır.
              </p>
            </div>
            <div className="bg-muted/50 p-6 rounded-xl">
              <div className="grid grid-cols-2 gap-4">
                <FeatureCard icon={<Target className="h-6 w-6" />} title="Kişiselleştirilmiş">
                  Sizin için özel hazırlanmış sınavlar
                </FeatureCard>
                <FeatureCard icon={<Clock className="h-6 w-6" />} title="Zaman Yönetimi">
                  İçeriğe uygun önerilen süreler
                </FeatureCard>
                <FeatureCard icon={<Lightbulb className="h-6 w-6" />} title="Çeşitli Konular">
                  Sınırsız konu ve kategori seçeneği
                </FeatureCard>
                <FeatureCard icon={<Sparkles className="h-6 w-6" />} title="Yapay Zeka">
                  Gelişmiş AI teknolojisiyle oluşturulan sorular
                </FeatureCard>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Nasıl Çalışır?</h2>
          <div className="bg-muted/30 rounded-xl p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Quiz Oluşturma</h3>
                <p>
                  Kullanıcılar, ister önceden tanımlanmış kategorilerden seçim yapabilir, isterlerse kendi quizlerini
                  oluşturabilir. Quiz oluşturma ekranında:
                </p>
                <ul className="space-y-3 pl-5">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>
                      <strong>Konu:</strong> İstediğiniz gibi detaylı yazabilirsiniz
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>
                      <strong>Soru sayısı:</strong> 1-40 arasında
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>
                      <strong>Zorluk seviyesi:</strong> Kolay, Orta, Orta-Zor, Zor
                    </span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Kişiselleştirilmiş Deneyim</h3>
                <p>
                  NeuraQuiz, belirlediğiniz bilgiler doğrultusunda sizin için özel bir deneme sınavı hazırlar. Her
                  sınav, içeriğine uygun olarak yapay zeka tarafından önerilen süreyle birlikte gelir.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="text-sm py-1">
                    Matematik
                  </Badge>
                  <Badge variant="outline" className="text-sm py-1">
                    Tarih
                  </Badge>
                  <Badge variant="outline" className="text-sm py-1">
                    Fen Bilimleri
                  </Badge>
                  <Badge variant="outline" className="text-sm py-1">
                    Edebiyat
                  </Badge>
                  <Badge variant="outline" className="text-sm py-1">
                    Genel Kültür
                  </Badge>
                  <Badge variant="outline" className="text-sm py-1">
                    Yabancı Dil
                  </Badge>
                  <Badge variant="outline" className="text-sm py-1">
                    ve daha fazlası...
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Results */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Sınav Sonunda Neler Var?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ResultCard icon={<BarChart3 className="h-8 w-8 text-primary" />} title="Detaylı Sonuçlar">
              <ul className="space-y-2 mt-2">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span>Doğru ve yanlış sayısı</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <span>Boş bırakılan sorular</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span>Toplam puan</span>
                </li>
              </ul>
            </ResultCard>

            <ResultCard icon={<Clock className="h-8 w-8 text-primary" />} title="Zaman Analizi">
              <p className="mt-2">Ne kadar sürede tamamladığınızı görün ve zamanınızı daha iyi yönetmeyi öğrenin.</p>
            </ResultCard>

            <ResultCard icon={<Award className="h-8 w-8 text-primary" />} title="Özel Unvanlar">
              <p className="mt-2">
                Performansınıza göre verilen özel bir unvan kazanın (örneğin Quiz Ustası veya Çaylak 😊)
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">Quiz Ustası</Badge>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">Bilgi Avcısı</Badge>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">Uzman</Badge>
              </div>
            </ResultCard>
          </div>
        </section>
<div className="flex flex-col items-center justify-center bg-muted/50 p-4 rounded-xl">
Not: Sorular yapay zeka tarafından oluşturulduğu için bazı sorular yanlış veya kusurlu olabilir.
</div>
        {/* CTA */}
        <div className="text-center pt-8">
          <div className="max-w-2xl mx-auto bg-primary/5 rounded-xl p-8 border border-primary/10">
            <h2 className="text-2xl font-bold mb-4">Hemen Başlayın</h2>
            <p className="text-lg mb-6">
              NeuraQuiz ile bilginizi test edin, yeni konular öğrenin ve kendinizi geliştirin.
            </p>
            <Link href="/quiz">
            <Button size="lg" className="gap-2">
              İlk Quiz&apos;inizi Oluşturun <ArrowRight className="h-4 w-4" />
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
      <Footer />
    </div>
</>
  );
}






