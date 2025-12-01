import { LandingHeader } from "@/components/organisms/LandingHeader";
import { LandingHero } from "@/components/organisms/LandingHero";
import { LandingStepSection } from "@/components/organisms/LandingStepSection";
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
        <section id="step" className="scroll-mt-20">
          {/* 利用ステップ */}
          <LandingStepSection />
        </section>

        <section id="template" className="scroll-mt-20">
          {/* テンプレート */}
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
