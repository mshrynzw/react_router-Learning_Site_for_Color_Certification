import React, { useMemo, useState } from "react";
import { Link } from "react-router";

interface JISColor {
  group: string;
  name: string;
  hex: string;
}

// https://www.color-site.com
const jisColors: JISColor[] = [
  { group: "red", name: "桜色", hex: "#FEEEED" },
  { group: "red", name: "紅梅色", hex: "#F69C9F" },
  { group: "red", name: "珊瑚色", hex: "#F8A7A0" },
  { group: "red", name: "ベビーピンク", hex: "#FEE3D7" },
  { group: "red", name: "茜色", hex: "#B22D35" },
  { group: "red", name: "ワインレッド", hex: "#8D3043" },
  { group: "red", name: "朱色", hex: "#EF454A" },
  { group: "red", name: "ボルドー", hex: "#5F161D" },
  { group: "red", name: "カーマイン", hex: "#D11C2C" },
  { group: "red", name: "バーミリオン", hex: "#F26649" },
  { group: "red", name: "スカーレット", hex: "#F15B47" },
  { group: "red", name: "サーモンピンク", hex: "#EE7948" },
  { group: "orange", name: "煉瓦色", hex: "#AE5039" },
  { group: "orange", name: "栗色", hex: "#722F10" },
  { group: "orange", name: "チョコレート", hex: "#602D1D" },
  { group: "orange", name: "ピーチ", hex: "#FDD1B0" },
  { group: "yellow", name: "山吹色", hex: "#FCAF17" },
  { group: "yellow", name: "黄土色", hex: "#BA8448" },
  { group: "yellow", name: "芥子色", hex: "#C9AB53" },
  { group: "yellow", name: "マリーゴールド", hex: "#F79428" },
  { group: "yellow", name: "ベージュ", hex: "#E7D0A9" },
  { group: "yellow", name: "セピア", hex: "#6B4A2B" },
  { group: "yellow", name: "カーキー", hex: "#B18B55" },
  { group: "yellow", name: "ブロンド", hex: "#F3D18A" },
  { group: "yellow", name: "クリームイエロー", hex: "#FFEDB3" },
  { group: "yellow", name: "カナリア", hex: "#FFEF6C" },
  { group: "yellow", name: "オリーブ", hex: "#6D5F1A" },
  { group: "yellow", name: "レモンイエロー", hex: "#FFF450" },
  { group: "yellowGreen", name: "鶯色", hex: "#918D40" },
  { group: "yellowGreen", name: "萌黄", hex: "#A9D159" },
  { group: "yellowGreen", name: "松葉色", hex: "#74905D" },
  { group: "yellowGreen", name: "オリーブグリーン", hex: "#576128" },
  { group: "green", name: "若竹色", hex: "#65C294" },
  { group: "green", name: "青磁色", hex: "#60B49F" },
  { group: "green", name: "コバルトグリーン", hex: "#40BA8D" },
  { group: "green", name: "エメラルドグリーン", hex: "#00B379" },
  { group: "green", name: "ビリジアン", hex: "#00896B" },
  { group: "blue", name: "浅葱色", hex: "#00A4AC" },
  { group: "blue", name: "空色", hex: "#90D7EC" },
  { group: "blue", name: "藍色", hex: "#0F5474" },
  { group: "blue", name: "瑠璃色", hex: "#2A5CAA" },
  { group: "blue", name: "杜若色", hex: "#4B5EAA" },
  { group: "blue", name: "群青色", hex: "#465DAA" },
  { group: "blue", name: "ターコイズブルー", hex: "#00B7CE" },
  { group: "blue", name: "マリンブルー", hex: "#006881" },
  { group: "blue", name: "シアン", hex: "#00AEEF" },
  { group: "blue", name: "スカイブルー", hex: "#90D7EC" },
  { group: "blue", name: "ベビーブルー", hex: "#ADE0EE" },
  { group: "blue", name: "コバルトブルー", hex: "#0072BC" },
  { group: "blue", name: "ネービーブルー", hex: "#1F2F54" },
  { group: "blue", name: "ウルトラマリンブルー", hex: "#465DAA" },
  { group: "blueViolet", name: "桔梗色", hex: "#585EAA" },
  { group: "blueViolet", name: "バイオレット", hex: "#7159A6" },
  { group: "violet", name: "茄子紺", hex: "#451F49" },
  { group: "violet", name: "菖蒲色", hex: "#C77EB5" },
  { group: "violet", name: "ラベンダー", hex: "#B7A8CC" },
  { group: "violet", name: "モーブ", hex: "#855896" },
  { group: "violet", name: "パープル", hex: "#956DAF" },
  { group: "redViolet", name: "牡丹色", hex: "#E761A4" },
  { group: "redViolet", name: "マゼンタ", hex: "#EC008C" },
  { group: "gray", name: "生成り色", hex: "#FBFAF5" },
  { group: "gray", name: "アイボリー", hex: "#F3ECD8" },
  { group: "gray", name: "シルバーグレイ", hex: "#A1A3A6" },
  { group: "gray", name: "チャコールグレイ", hex: "#4C444D" },
];

const GROUP_LABELS: Record<string, string> = {
  red: "赤系",
  orange: "黄赤系",
  yellow: "黄系",
  yellowGreen: "黄緑系",
  green: "緑系",
  blue: "青系",
  blueViolet: "青紫系",
  violet: "紫系",
  redViolet: "赤紫系",
  gray: "無彩色系",
};

type ColorSection = {
  id: string;
  label: string;
  items: { color: JISColor; index: number }[];
};

function groupColorsByGroup(colors: JISColor[]): ColorSection[] {
  const sections: ColorSection[] = [];
  let lastGroup: string | null = null;

  colors.forEach((color, index) => {
    if (color.group !== lastGroup) {
      sections.push({
        id: color.group,
        label: GROUP_LABELS[color.group] ?? color.group,
        items: [],
      });
      lastGroup = color.group;
    }
    sections[sections.length - 1].items.push({ color, index });
  });

  return sections;
}

export default function JISColors() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const grouped = useMemo(() => groupColorsByGroup(jisColors), []);

  const toggleReveal = (index: number) => {
    setRevealed((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const toggleAll = () => {
    if (revealed.size === jisColors.length) {
      setRevealed(new Set());
    } else {
      setRevealed(new Set(jisColors.map((_, i) => i)));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← ホームに戻る
          </Link>
          <button
            onClick={toggleAll}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {revealed.size === jisColors.length ? "すべて隠す" : "すべて表示"}
          </button>
        </div>

        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl mb-3">
            JIS慣用色名（{jisColors.length}色）
          </h1>
          <p className="text-gray-600">
            各色をクリックして慣用色名を確認しましょう
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 space-y-10">
          {grouped.map((section, sectionIndex) => (
            <section
              key={`${section.id}-${sectionIndex}`}
              className="space-y-4"
            >
              <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                {section.label}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {section.items.map(({ color, index }) => {
                  const isRevealed = revealed.has(index);
                  const isLight =
                    color.hex === "#ffffff" ||
                    color.hex === "#fef4d0" ||
                    color.hex === "#fce4d6" ||
                    color.hex === "#f3e6d7";

                  return (
                    <div
                      key={index}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => toggleReveal(index)}
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className="w-20 h-20 rounded-lg shadow-md border-2"
                          style={{
                            backgroundColor: color.hex,
                            borderColor: isLight ? "#e5e7eb" : color.hex,
                          }}
                        ></div>

                        <div className="mt-2 text-center min-h-[3rem] flex items-center justify-center">
                          {isRevealed ? (
                            <div className="space-y-1">
                              <div className="text-sm px-2 py-1 bg-gray-100 rounded">
                                {color.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {color.hex}
                              </div>
                            </div>
                          ) : (
                            <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-300 transition-colors">
                              <span className="text-xl">？</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl mb-4">学習のヒント</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>各色をクリックして慣用色名を確認できます</li>
            <li>色と名前を関連付けて覚えましょう</li>
            <li>「すべて表示」ボタンで答え合わせができます</li>
            <li>繰り返し練習して、見ただけで名前が分かるようにしましょう</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
