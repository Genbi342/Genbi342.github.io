// GENBI model routes
const ROUTES = [
  {
    id: "route-001",
    title: "厳美渓2時間コース",
    duration: "約2時間",
    description: "初めて厳美渓を訪れる人向け。渓谷散策と名物「郭公だんご」を楽しむ定番コース。",
    spots: ["spot-001", "spot-002", "spot-004"],
    target: "初めて厳美渓へ来る人",
    season: "通年(冬期は一部通行止めに注意)",
    caution: "冬期は御覧場橋・散策路が通行止めの場合があります"
  },
  {
    id: "route-002",
    title: "厳美渓 半日ドライブ",
    duration: "約4時間",
    description: "厳美渓を中心に、道の駅や博物館を巡るゆったりコース。",
    spots: ["spot-001", "spot-002", "spot-003", "spot-005"],
    target: "半日で厳美を楽しみたい人",
    season: "通年",
    caution: ""
  },
  {
    id: "route-003",
    title: "国道342号・須川温泉1日コース",
    duration: "約8時間",
    description: "厳美渓から国道342号を通り、須川温泉まで足を延ばす1日ドライブコース。",
    spots: ["spot-001", "spot-002", "spot-006", "spot-007"],
    target: "ドライブと秘湯を楽しみたい人",
    season: "須川方面は冬期(11月上旬〜4月下旬)通行止め",
    caution: "国道342号は冬期に須川方面が通行止めになります。事前に道路状況を確認してください"
  }
];
