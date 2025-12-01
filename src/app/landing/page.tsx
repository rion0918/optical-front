"use client";

import { useRouter } from "next/navigation";
import { LandingFooter } from "@/components/organisms/LandingFooter";
import { LandingHeader } from "@/components/organisms/LandingHeader";
import { LandingHero } from "@/components/organisms/LandingHero";
import { LandingStepSection } from "@/components/organisms/LandingStepSection";
import { LandingTemplateSection } from "@/components/organisms/LandingTemplateSection";
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  // 未認証の場合のみランディングページを表示
  if (!user) {
    return (
      <div className="min-h-screen">
        {/* 固定ヘッダー */}
        <LandingHeader />

        {/* Heroセクション */}
        <LandingHero />

      {/* 利用ステップ */}
      <LandingStepSection />

      

      <main className="container mx-auto px-6 py-20 space-y-20">
        <section id="step" className="scroll-mt-20">
          {/* 利用ステップ */}
          <LandingStepSection />
        </section>

        <section id="template" className="scroll-mt-20">
          {/* テンプレート */}
          <LandingTemplateSection />
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