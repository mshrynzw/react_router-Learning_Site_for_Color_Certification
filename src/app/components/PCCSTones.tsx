import React, { useMemo, useState } from "react";
import { Link } from "react-router";

type Tone = {
  id: string; // 例: "p"
  labelJa: string; // 例: "ペール"
  hintJa: string; // 例: "うすい"
  colors: string[]; // hex のみ
};

type NeutralStep = {
  id: "W" | "ltGy" | "mGy" | "dkGy" | "Bk";
  labelEn: string;
  labelJa: string;
  hex: string;
};

const neutralSteps: NeutralStep[] = [
  { id: "W", labelEn: "White", labelJa: "ホワイト", hex: "#FFFFFF" },
  { id: "ltGy", labelEn: "light gray", labelJa: "ライトグレイ", hex: "#D3D3D3" },
  { id: "mGy", labelEn: "medium gray", labelJa: "ミディアムグレイ", hex: "#A9A9A9" },
  { id: "dkGy", labelEn: "dark gray", labelJa: "ダークグレイ", hex: "#696969" },
  { id: "Bk", labelEn: "Black", labelJa: "ブラック", hex: "#000000" },
];

const tones: Tone[] = [
  {
    id: "V",
    labelJa: "ビビッド",
    hintJa: "あざやか",
    // 参考: https://qiita.com/lookman/items/efae7683703b62ebfe9d
    // V の偶数番 (2,4,...,24) のみ
    colors: [
      "#EE0026",
      "#FE4118",
      "#FF7F00",
      "#FFE600",
      "#99CF15",
      "#33A23D",
      "#008678",
      "#055D87",
      "#0F218B",
      "#281285",
      "#56007D",
      "#AF0065",
    ],
  },
  {
    id: "b",
    labelJa: "ブライト",
    hintJa: "あかるい",
    // b の偶数番 (2,4,...,24) のみ
    colors: [
      "#FA344D",
      "#FC4E33",
      "#FF9913",
      "#FFF231",
      "#99D02C",
      "#32A65D",
      "#1AA28E",
      "#1C86AE",
      "#396BB0",
      "#6A64AE",
      "#A459AB",
      "#DF4C93",
    ],
  },
  {
    id: "s",
    labelJa: "ストロング",
    hintJa: "つよい",
    // s の偶数番 (2,4,...,24) のみ
    colors: [
      "#CA1028",
      "#CC4613",
      "#D97610",
      "#CCB914",
      "#8CA114",
      "#28853F",
      "#297364",
      "#205B85",
      "#243B8B",
      "#3D1C84",
      "#5F2883",
      "#9A0F50",
    ],
  },
  {
    id: "dp",
    labelJa: "ディープ",
    hintJa: "こい",
    // dp の偶数番 (2,4,...,24) のみ
    colors: [
      "#9D002B",
      "#A51200",
      "#A24A02",
      "#A48204",
      "#518517",
      "#306F42",
      "#025865",
      "#04436E",
      "#073E74",
      "#232266",
      "#531560",
      "#75004F",
    ],
  },
  {
    id: "lt",
    labelJa: "ライト",
    hintJa: "あさい",
    // lt の偶数番 (2,4,...,24) のみ
    colors: [
      "#FB7482",
      "#FB8071",
      "#FDB56D",
      "#FEF27A",
      "#B3DE6A",
      "#7FC97E",
      "#66C1AF",
      "#67B1CA",
      "#689ECA",
      "#817DBA",
      "#B173B6",
      "#E170A4",
    ],
  },
  {
    id: "sf",
    labelJa: "ソフト",
    hintJa: "やわらかい",
    // sf の偶数番 (2,4,...,24) のみ
    colors: [
      "#C95F6B",
      "#D77957",
      "#D89048",
      "#CCBA4C",
      "#B3B140",
      "#66AC78",
      "#4E9B87",
      "#4F8B96",
      "#516691",
      "#5C5791",
      "#8B5587",
      "#B05076",
    ],
  },
  {
    id: "d",
    labelJa: "ダル",
    hintJa: "にぶい",
    // d の偶数番 (2,4,...,24) のみ
    colors: [
      "#994052",
      "#B24443",
      "#B25939",
      "#997F42",
      "#757E47",
      "#5A814C",
      "#2A6A69",
      "#1D6283",
      "#214275",
      "#39367B",
      "#5F3179",
      "#802A69",
    ],
  },
  {
    id: "dk",
    labelJa: "ダーク",
    hintJa: "くらい",
    // dk の偶数番 (2,4,...,24) のみ
    colors: [
      "#632A31",
      "#743526",
      "#6B4919",
      "#6A5B18",
      "#56561A",
      "#355935",
      "#1E4B44",
      "#0E4250",
      "#163450",
      "#312C4C",
      "#4A304B",
      "#643142",
    ],
  },
  {
    id: "p",
    labelJa: "ペール",
    hintJa: "うすい",
    // 参考: https://qiita.com/lookman/items/efae7683703b62ebfe9d
    // p の偶数番 (2,4,...,24) のみ
    colors: [
      "#FBB4C4",
      "#FDCDB7",
      "#FEE6AA",
      "#FEFFB3",
      "#E6F5B0",
      "#CCEAC4",
      "#B3E2D8",
      "#B4D7DD",
      "#B3CEE3",
      "#B2B6D9",
      "#CAB2D6",
      "#E4ADD5",
    ],
  },
  {
    id: "ltg",
    labelJa: "ライトグレイッシュ",
    hintJa: "あかるいはいみの",
    // ltg の偶数番 (2,4,...,24) のみ
    colors: [
      "#D7A4B5",
      "#D7AFA7",
      "#D8BA96",
      "#D9C69B",
      "#AAC09A",
      "#9EBCA4",
      "#92B8AD",
      "#91AFBA",
      "#91A4B5",
      "#9191AD",
      "#A997B1",
      "#C09FB4",
    ],
  },
  {
    id: "g",
    labelJa: "グレイッシュ",
    hintJa: "はいみの",
    // g の偶数番 (2,4,...,24) のみ
    colors: [
      "#7D4F5A",
      "#7D5F61",
      "#7C6764",
      "#7E6F5A",
      "#636F5B",
      "#476C5B",
      "#395B64",
      "#384E5C",
      "#394158",
      "#3F3051",
      "#4A3753",
      "#5B3A55",
    ],
  },
  {
    id: "dkg",
    labelJa: "ダークグレイッシュ",
    hintJa: "くらいはいみの",
    // dkg の偶数番 (2,4,...,24) のみ
    colors: [
      "#3A2B2E",
      "#3A2C2B",
      "#463B35",
      "#47402C",
      "#3E3F31",
      "#24332C",
      "#253532",
      "#283639",
      "#212832",
      "#282530",
      "#2D2A31",
      "#392D31",
    ],
  },
];

const leftGridToneIds = ["p", "lt", "ltg", "sf", "g", "d", "dkg", "dk"] as const;
const floatingToneLayout: Record<string, { column: 3 | 4; y: number }> = {
  // 右側4枚だけ絶対配置で微調整（column は 3列目 or 4列目）
  b: { column: 3, y: 10 },
  s: { column: 3, y: 31 },
  V: { column: 4, y: 31 },
  dp: { column: 3, y: 52 },
};

const neutralStepLayout: Record<NeutralStep["id"], { y: number }> = {
  // 1段目, 1.5段目, 2.5段目, 3.5段目, 4段目
  W: { y: 3 },
  ltGy: { y: 23 },
  mGy: { y: 43 },
  dkGy: { y: 66 },
  Bk: { y: 88 },
};

export default function PCCSTones() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [neutralRevealed, setNeutralRevealed] = useState<Set<string>>(new Set());

  const allToneIds = useMemo(() => tones.map((t) => t.id), []);
  const allNeutralIds = useMemo(() => neutralSteps.map((n) => n.id), []);
  const toneById = useMemo(() => new Map(tones.map((t) => [t.id, t])), []);
  const isAllRevealed = revealed.size === allToneIds.length && allToneIds.length > 0;
  const isAllNeutralRevealed =
    neutralRevealed.size === allNeutralIds.length && allNeutralIds.length > 0;

  const toggleTone = (id: string) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    const nextIsAll = isAllRevealed && isAllNeutralRevealed;
    setRevealed(nextIsAll ? new Set() : new Set(allToneIds));
    setNeutralRevealed(nextIsAll ? new Set() : new Set(allNeutralIds));
  };

  const toggleNeutral = (id: string) => {
    setNeutralRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderToneCard = (
    tone: Tone,
    className: string,
    style?: React.CSSProperties,
  ) => {
    const isRevealed = revealed.has(tone.id);
    return (
      <button
        key={tone.id}
        type="button"
        onClick={() => toggleTone(tone.id)}
        className={className}
        style={style}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm mb-1">
              {isRevealed ? (
                <>
                  <span className="font-semibold">{tone.id}</span>
                  <span className="text-gray-500 mx-2">/</span>
                  <span>{tone.labelJa}</span>
                  <span className="text-gray-500 mx-2">/</span>
                  <span>{tone.hintJa}</span>
                </>
              ) : (
                <span className="font-semibold">？</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-6 gap-1.5">
          {tone.colors.map((hex) => (
            <div
              key={hex}
              className="aspect-square rounded border border-gray-200 shadow-sm"
              style={{ backgroundColor: hex }}
              title={hex}
              aria-label={hex}
            />
          ))}
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← ホームに戻る
          </Link>
          <button
            onClick={toggleAll}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {isAllRevealed ? "すべて隠す" : "すべて表示"}
          </button>
        </div>

        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl mb-3">PCCSトーン</h1>
          <p className="text-gray-600">
            各トーンをクリックして、記号・名称・印象語を表示します
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-lg md:text-xl">トーン分類（明度×彩度）</h2>
          </div>

          <div className="relative flex items-stretch gap-4 md:gap-6">
            {/* 中性色スケール（W, ltGy, mGy, dkGy, Bk） */}
            <div className="w-24 shrink-0 self-stretch border border-gray-200 rounded-lg p-2 md:p-3 bg-gray-50">
              <div className="relative h-full min-h-[900px]">
                {neutralSteps.map((step) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => toggleNeutral(step.id)}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center"
                    style={{ top: `${neutralStepLayout[step.id].y}%` }}
                  >
                    <div
                      className="w-7 h-7 md:w-8 md:h-8 rounded border border-gray-300 shadow-sm"
                      style={{ backgroundColor: step.hex }}
                      title={`${step.id} ${step.hex}`}
                      aria-label={`${step.id} ${step.hex}`}
                    />
                    <div className="leading-tight mt-1">
                      <div className="text-[11px] md:text-xs font-semibold">
                        {neutralRevealed.has(step.id) ? step.id : "？"}
                      </div>
                      <div className="text-[10px] md:text-[11px] text-gray-600">
                        {neutralRevealed.has(step.id) ? step.labelJa : "？"}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex-1">
            {/* 縦軸（明度） */}
            <div className="absolute -left-2 top-0 bottom-0 flex flex-col items-center justify-between text-xs text-gray-500">
              <div className="[writing-mode:vertical-rl]">明度</div>
              <div className="text-[10px]">高い</div>
              <div className="text-[10px]">低い</div>
            </div>

            {/* 横軸（彩度） */}
            <div className="absolute left-0 right-0 bottom-1 flex items-center justify-center text-xs text-gray-500">
              <span>彩度（低い → 高い）</span>
            </div>

            {/* ハイブリッド: 左8枚はグリッド、右4枚だけ絶対配置 */}
            <div className="pl-8 pb-16">
              <div
                className="relative min-h-[900px]"
                style={{ ["--tone-col-w" as string]: "calc((100% - 3rem) / 4)" }}
              >
                <div
                  className="grid grid-cols-2 gap-4"
                  style={{ width: "calc((var(--tone-col-w) * 2) + 1rem)" }}
                >
                  {leftGridToneIds.map((id) => {
                    const tone = toneById.get(id);
                    if (!tone) return null;
                    return renderToneCard(
                      tone,
                      "w-full text-left bg-white rounded-lg border border-gray-200 shadow-sm p-3 hover:shadow-md transition-shadow",
                    );
                  })}
                </div>

                {Object.entries(floatingToneLayout).map(([id, pos]) => {
                  const tone = toneById.get(id);
                  if (!tone) return null;
                  const cardWidth = "var(--tone-col-w)";
                  const col3Left = "calc((var(--tone-col-w) * 2) + 2rem)";
                  const col4Left = "calc((var(--tone-col-w) * 3) + 3rem)";
                  return renderToneCard(
                    tone,
                    "absolute text-left bg-white rounded-lg border border-gray-200 shadow-sm p-3 hover:shadow-md transition-shadow",
                    {
                      // 4カラム共通幅で厳密に揃える（はみ出し防止）
                      width: cardWidth,
                      left: pos.column === 3 ? col3Left : col4Left,
                      top: `${pos.y}%`,
                    },
                  );
                })}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

