import { Card } from "@/components/atoms/Card";
import { Text } from "@/components/atoms/Text";

export type FeatureCardProps = {
  title: string;
  description: string;
};

export const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <Card className="p-6">
      <Text as="h3" size="lg" weight="bold" className="mb-2">{title}</Text>
      <Text className="text-gray-700 mb-4">{description}</Text>
    </Card>
  );
};

