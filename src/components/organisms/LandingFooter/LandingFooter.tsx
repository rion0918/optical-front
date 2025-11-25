import * as React from "react";
import Link from "next/link";
import { Text } from "@/components/atoms/Text/Text";

export const LandingFooter = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
        {/* 左側 */}
        <div className="flex flex-col items-center md:items-start">
          {/* チーム名 */}
          <Text as="div" size="lg" weight="bold" className="mb-1">
            特上海鮮どんぶり
          </Text>

          {/* コピーライト */}
          <Text as="p" size="sm">
            &copy; 2025 特上海鮮どんぶり.
          </Text>
        </div>

        {/* 右側：リンク群 */}
        <div className="flex flex-col sm:flex-row items-center md:items-end gap-4 sm:gap-6 text-sm">
          <Link href="/terms" className="hover:text-white transition-colors">
            <Text as="span" size="sm" className="cursor-pointer">
              利用規約
            </Text>
          </Link>
        </div>
      </div>
    </footer>
  );
};
