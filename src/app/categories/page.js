import Header from "@/components/constants/header";
import Footer from "@/components/constants/footer";
import { Badge } from "@/components/ui/badge";

import CategoryCard from "@/components/constants/category-card";
import Link from "next/link";
import {
  ArrowRight,
  Code,
  Globe,
  Lightbulb,
  BookOpen,
  Calculator,
  Music,
  Palette,
  Trophy,
  Film,
  Utensils,
  Cpu,
  Heart,
  BarChart3,
  Languages,
  Brain,
  Sparkles,
  Telescope,
  LandPlot,
  Leaf,
  HelpCircle,
  Share2,
  History,
  Gamepad2,
  Building2,
  GraduationCap,
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
export default function Categories() {
  return (
   <div>
    <Header />
 <section className="py-16">
      <div className="mx-auto max-w-[58rem] text-center mt-5">
        <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Tüm Kategoriler</h2>
        <p className="mt-4 text-muted-foreground">Geniş yelpazedeki konulardan birini seçin ve bilginizi test edin</p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto justify-center w-full max-w-7xl px-4">
        <CategoryCard
          icon={<Globe className="h-8 w-8" />}
          link="/quiz?category=coğrafya"
          title="Coğrafya"
          description="Dünya çapında ülkeler, başkentler ve turistik yerler hakkındaki bilginizi test edin."
          quizCount={42}
        />
        <CategoryCard
          icon={<Code className="h-8 w-8" />}
          link="/quiz?category=programlama"
          title="Programlama"
          description="Çeşitli programlama dilleri ve çerçeveler genelinde kodlama sorularıyla kendinize meydan okuyun."
          quizCount={38}
          
        />
        <CategoryCard
          icon={<Lightbulb className="h-8 w-8" />}
          link="/quiz?category=bilim"
          title="Bilim"
          description="Fizik, kimya, biyoloji ve daha birçok bilimsel konu hakkındaki soruları keşfedin."
          quizCount={56}
        />
        <CategoryCard
          icon={<History className="h-8 w-8" />}
          link="/quiz?category=tarih"
          title="Tarih"
          description="Antik çağlardan modern zamanlara kadar dünya tarihindeki olaylar ve kişiler hakkında bilginizi test edin."
          quizCount={64}
          
        />
        <CategoryCard
          icon={<Calculator className="h-8 w-8" />}
          link="/quiz?category=matematik"
          title="Matematik"
          description="Aritmetik, cebir, geometri ve daha fazlasıyla matematiksel becerilerinizi geliştirin."
          quizCount={45}
        />
        <CategoryCard
          icon={<BookOpen className="h-8 w-8" />}
          link="/quiz?category=edebiyat"
          title="Edebiyat"
          description="Klasik ve modern edebiyat, yazarlar ve edebi eserler hakkında sorularla kültürel bilginizi artırın."
          quizCount={37}
        />
        <CategoryCard
          icon={<Palette className="h-8 w-8" />}
          link="/quiz?category=sanat"
          title="Sanat"
          description="Resim, heykel, mimari ve sanat tarihi hakkında bilginizi test edin."
          quizCount={29}
        />
        <CategoryCard
          icon={<Music className="h-8 w-8" />}
          link="/quiz?category=müzik"
          title="Müzik"
          description="Farklı müzik türleri, ünlü müzisyenler ve müzik teorisi hakkında sorularla kulağınızı test edin."
          quizCount={48}
        />
        <CategoryCard
          icon={<Trophy className="h-8 w-8" />}
          link="/quiz?category=spor"
          title="Spor"
          description="Futbol, basketbol, tenis ve daha birçok spor dalı hakkında bilginizi ölçün."
          quizCount={52}
          
        />
        <CategoryCard
          icon={<Film className="h-8 w-8" />}
          link="/quiz?category=film"
          title="Film ve TV"
          description="Popüler filmler, TV şovları, aktörler ve sinema tarihi hakkında eğlenceli sorularla kendinizi sınayın."
          quizCount={61}
        />
        <CategoryCard
          icon={<Utensils className="h-8 w-8" />}
          link="/quiz?category=yemek"
          title="Yemek ve Mutfak"
          description="Dünya mutfakları, yemek tarifleri ve gastronomi hakkında iştah açıcı sorularla bilginizi test edin."
          quizCount={33}
        />
        <CategoryCard
          icon={<Cpu className="h-8 w-8" />}
          link="/quiz?category=teknoloji"
          title="Teknoloji"
          description="Bilgisayarlar, akıllı telefonlar ve teknolojik yenilikler hakkında güncel bilginizi ölçün."
          quizCount={47}
          
        />
        <CategoryCard
          icon={<Heart className="h-8 w-8" />}
          link="/quiz?category=sağlık"
          title="Sağlık ve Tıp"
          description="İnsan vücudu, hastalıklar ve sağlıklı yaşam hakkında bilginizi test edin."
          quizCount={39}
        />
        <CategoryCard
          icon={<BarChart3 className="h-8 w-8" />}
          link="/quiz?category=iş-ve-ekonomi"
          title="İş ve Ekonomi"
          description="Finans, pazarlama, yönetim ve ekonomi hakkında profesyonel bilginizi geliştirin."
          quizCount={31}
        />
        <CategoryCard
          icon={<Languages className="h-8 w-8" />}
          link="/quiz?category=dil-ve-dilbilgisi"
          title="Dil ve Dilbilgisi"
          description="Farklı diller, dilbilgisi kuralları ve kelime bilgisi hakkında sorularla dil becerilerinizi test edin."
          quizCount={36}
        />
        <CategoryCard
          icon={<Brain className="h-8 w-8" />}
          link="/quiz?category=psikoloji"
          title="Psikoloji"
          description="İnsan davranışı, zihin ve duygular hakkında psikolojik bilginizi ölçün."
          quizCount={28}
        />
        <CategoryCard
          icon={<Sparkles className="h-8 w-8" />}
          link="/quiz?category=mitoloji"
          title="Mitoloji"
          description="Antik Yunan, Roma, Norse ve diğer kültürlerin mitolojik hikayeleri hakkında bilginizi test edin."
          quizCount={25}
          
        />
        <CategoryCard
          icon={<Telescope className="h-8 w-8" />}
          link="/quiz?category=astronomi"
          title="Astronomi"
          description="Gezegenler, yıldızlar, galaksiler ve uzay keşifleri hakkında kozmik bilginizi ölçün."
          quizCount={34}
        />
        <CategoryCard
          icon={<LandPlot className="h-8 w-8" />}
          link="/quiz?category=politika"
          title="Politika"
          description="Hükümet sistemleri, uluslararası ilişkiler ve politik tarih hakkında bilginizi test edin."
          quizCount={27}
        />
        <CategoryCard
          icon={<Leaf className="h-8 w-8" />}
          link="/quiz?category=doğa-ve-çevre"
          title="Doğa ve Çevre"
          description="Hayvanlar, bitkiler, ekosistemler ve çevre sorunları hakkında bilginizi ölçün."
          quizCount={43}
        />
        <CategoryCard
          icon={<HelpCircle className="h-8 w-8" />}
          link="/quiz?category=genel-kültür"
          title="Genel Kültür"
          description="Çeşitli konularda genel bilginizi test eden karışık sorularla kendinizi sınayın."
          quizCount={72}
          
        />
        <CategoryCard
          icon={<Share2 className="h-8 w-8" />}
          link="/quiz?category=sosyal-medya"
          title="Sosyal Medya"
          description="Popüler platformlar, dijital pazarlama ve internet trendleri hakkında güncel bilginizi test edin."
          quizCount={30}
        />
        <CategoryCard
          icon={<Gamepad2 className="h-8 w-8" />}
          link="/quiz?category=oyunlar"
          title="Oyunlar"
          description="Video oyunları, masa oyunları ve oyun tarihi hakkında eğlenceli sorularla bilginizi ölçün."
          quizCount={49}
        />
        <CategoryCard
          icon={<Building2 className="h-8 w-8" />}
          link="/quiz?category=mimari"
          title="Mimari"
          description="Ünlü yapılar, mimari stiller ve dünya çapındaki mimari harikalar hakkında bilginizi test edin."
          quizCount={26}
        />
        <CategoryCard
          icon={<GraduationCap className="h-8 w-8" />}
          link="/quiz?category=eğitim"
          title="Eğitim"
          description="Öğretim yöntemleri, eğitim sistemleri ve öğrenme teorileri hakkında bilginizi ölçün."
          quizCount={32}
        />
      </div>
    </section>
    <Footer  />
   </div>
  );
}