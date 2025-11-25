// 仮データ

export type OptionDetail = {
  title: string;
  points: string[];
  image: string;
};

export type LandingOption = {
  id: string;
  name: string;
  description: string;
  targetUser: string;
  details: OptionDetail[];
};

export const optionData: LandingOption[] = [
  {
    id: "standard",
    name: "スタンダード",
    description: "最低限の予定管理をシンプルに実現",
    targetUser: "個人利用のライトユーザー向け",
    details: [
      {
        title: "基本機能",
        points: [
          "カレンダー管理",
          "リマインダー通知",
          "日別タスクの簡易管理"
        ],
        image: "/option_image.jpg"
      }
    ]
  },
  {
    id: "creator",
    name: "クリエイター",
    description: "複数人での予定共有とプロジェクト管理が可能",
    targetUser: "チーム利用向け",
    details: [
      {
        title: "チーム向け機能",
        points: [
          "メンバー共有カレンダー",
          "タスク割り当て",
          "進捗可視化"
        ],
        image: "/option_image.jpg"
      }
    ]
  },
  {
    id: "family",
    name: "ファミリー",
    description: "複数人での予定共有と管理に最適化",
    targetUser: "家族、友人グループ向け",
    details: [
      {
        title: "グループ向け機能",
        points: [
          "複数グループの作成",
          "予定の共有先の選択",
          "他ツールとの連携"
        ],
        image: "/option_image.jpg"
      }
    ]
  }
];
