"use client";


import { LandingHeader } from "@/components/organisms/LandingHeader";
import { LandingHero } from "@/components/organisms/LandingHero";
import { FeaturesSection } from "@/components/organisms/FeaturesSection";
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

      {/* ダミーコンテンツ */}
      <main className="container mx-auto px-6 py-20 space-y-20">
        <FeaturesSection />

          <section id="options" className="h-[80vh] flex items-center justify-center bg-gray-100">
            <h2 className="text-3xl font-semibold">Option 制セクション</h2>
          </section>

          <section id="pricing" className="h-[80vh] flex items-center justify-center bg-gray-50">
            <h2 className="text-3xl font-semibold">料金プランセクション</h2>
          </section>
        </main>
      </div>
    );
  }

  return null;
};

export default LandingPage;