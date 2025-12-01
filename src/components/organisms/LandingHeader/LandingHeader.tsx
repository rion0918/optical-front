import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";

type LandingHeaderProps = {
  onLoginClick?: () => void;
};

export const LandingHeader = ({ onLoginClick }: LandingHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Text as="div" size="lg" weight="bold" className="text-xl">
          OptiCal
        </Text>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#step" className="hover:text-primary">
            <Text as="span" size="sm" className="font-medium">
              始め方
            </Text>
          </a>
          <a href="#template" className="hover:text-primary">
            <Text as="span" size="sm" className="font-medium">
              テンプレート
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
