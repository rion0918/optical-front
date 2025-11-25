import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";

type LandingHeaderProps = {
  onLoginClick?: () => void;
};

export const LandingHeader = ({ onLoginClick }: LandingHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Text as="div" size="lg" weight="bold" className="text-xl">
          サービスロゴ
        </Text>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#features" className="hover:text-primary">
            <Text as="span" size="sm" className="font-medium">
              製品紹介
            </Text>
          </a>
          <a href="#options" className="hover:text-primary">
            <Text as="span" size="sm" className="font-medium">
              Option制
            </Text>
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <a href="/login" className="text-sm hover:underline">
            <Text as="span" size="sm">ログイン</Text>
          </a>
          <Button size="lg" className="px-8" asChild>
            <a href="/login">
              <Text as="span" size="sm" weight="medium">新規登録</Text>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
