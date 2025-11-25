import { LandingHeader } from "@/components/organisms/LandingHeader";
import { LandingHero } from "@/components/organisms/LandingHero";
import { LandingFeaturesSection } from "@/components/organisms/LandingFeaturesSection";
import { LandingOptionSection} from "@/components/organisms/LandingOption";
import { LandingFooter } from "@/components/organisms/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* 固定ヘッダー */}
      <LandingHeader />

      {/* Heroセクション */}
      <LandingHero />

      <main className="container mx-auto px-6 py-20 space-y-20">
        <section id="features" className="scroll-mt-20">
          {/* 商品紹介 */}
          <LandingFeaturesSection />
        </section>

        <section id="options" className="scroll-mt-20">
          {/*オプション概要 */}
          <LandingOptionSection />
        </section>
      </main>

      {/*フッター */}
      <div className="mt-20">
        <LandingFooter />
      </div>
    </div>
  );
}