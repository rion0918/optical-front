import { Text } from "@/components/atoms/Text";

type StepCardProps = {
  number: number;
  title: string;
  description: string;
};

export const StepCard = ({ number, title, description }: StepCardProps) => {
  return (
    <div className="p-6 border rounded-lg shadow-md hover:shadow-md transition-shadow">
        <div className="text-4xl font-bold text-blue-600 mb-4">{number}</div>
        <Text as="h3" size="lg" weight="bold" className="mb-2">
          {title}
        </Text>
        <Text className="text-gray-700">{description}</Text>
    </div>
  );
};