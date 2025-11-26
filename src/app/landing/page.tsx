"use client";

import { LandingHeader } from "@/components/organisms/LandingHeader";
import { LandingHero } from "@/components/organisms/LandingHero";
import { LandingStepSection } from "@/components/organisms/LandingStepSection";
import { LandingFeaturesSection } from "@/components/organisms/LandingFeaturesSection";
import { LandingOptionSection} from "@/components/organisms/LandingOption";
import { LandingFooter } from "@/components/organisms/LandingFooter";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const LandingPage = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // 既に認証済みの場合はカレンダーページにリダイレクト
  useEffect(() => {
    if (!isLoading && user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  // ローディング中
  if (isLoading) {
    return (
      <div className="min-h-screen">
        {/* 固定ヘッダー */}
        <LandingHeader />

      {/* Heroセクション */}
      <LandingHero />

      {/* 利用ステップ */}
      <LandingStepSection />

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
  return null;
};

export default LandingPage;