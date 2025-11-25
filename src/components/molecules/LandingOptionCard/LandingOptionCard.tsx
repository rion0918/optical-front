"use client";

import { LandingOption } from "@/components/organisms/LandingOption/OptionData";
import { Card } from "@/components/atoms/Card";
import { Text } from "@/components/atoms/Text";

type Props = {
  option: LandingOption;
  onClick: (id: string) => void;
};

export const LandingOptionCard = ({ option, onClick }: Props) => {
  return (
    <Card
      className="p-6 cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg"
      onClick={() => onClick(option.id)}
    >
      <Text as="h3" size="lg" weight="bold" className="mb-2">
        {option.name}
      </Text>

      <Text as="p" size="md" className="text-gray-600 mb-3">
        {option.description}
      </Text>

      <Text as="p" size="sm" weight="medium" className="text-blue-600">
        {option.targetUser}
      </Text>
    </Card>
  );
};
