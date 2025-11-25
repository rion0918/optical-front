"use client";

import * as React from "react";
import { LandingOption, optionData as OPTIONS } from "./OptionData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/Dialog";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";

type Props = {
  option: LandingOption;
  onClose: () => void;
};

export const LandingOptionModal = ({ option, onClose }: Props) => {
  const [activeTabId, setActiveTabId] = React.useState(option.id);

  React.useEffect(() => {
    setActiveTabId(option.id);
  }, [option.id]);

  const currentOption = OPTIONS.find((opt) => opt.id === activeTabId);
  if (!currentOption) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-6">
        <DialogHeader className="flex justify-between items-center mb-4">
          <DialogTitle>{currentOption.name} の詳細</DialogTitle>
        </DialogHeader>

        {/* タブ */}
        <div className="flex border-b mb-6 space-x-2 overflow-x-auto">
          {OPTIONS.map((opt) => (
            <button
              key={opt.id}
              className={`px-4 py-2 rounded-t-lg font-medium whitespace-nowrap ${
                activeTabId === opt.id
                  ? "bg-white border border-b-0"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTabId(opt.id)}
            >
              {opt.name}
            </button>
          ))}
        </div>

        {/* 詳細表示 */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* 左：箇条書き */}
          <div className="flex-1">
            {currentOption.details.map((detail, idx) => (
              <div key={idx} className="mb-4">
                <Text as="h4" size="md" weight="bold" className="mb-2">
                  {detail.title}
                </Text>
                <ul className="list-disc list-inside text-gray-700">
                  {detail.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 右：画像 */}
          <div className="flex-1 flex justify-center items-center bg-gray-100">
            <img
              src={currentOption.details[0].image}
              alt={currentOption.name}
              className="rounded-lg w-80 h-64 object-contain"
            />
          </div>
        </div>

        {/* 閉じるボタン */}
        <div className="mt-6 text-right">
          <Button onClick={onClose}>閉じる</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
