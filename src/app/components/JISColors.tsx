import { useState } from "react";
import { Link } from "react-router";

interface JISColor {
  name: string;
  hex: string;
  rgb: string;
}

const jisColors: JISColor[] = [
  { name: "紅色", hex: "#d93448", rgb: "rgb(217, 52, 72)" },
  { name: "赤", hex: "#ea5550", rgb: "rgb(234, 85, 80)" },
  { name: "朱色", hex: "#eb6a4d", rgb: "rgb(235, 106, 77)" },
  { name: "黄赤", hex: "#ee7948", rgb: "rgb(238, 121, 72)" },
  { name: "樺色", hex: "#c46243", rgb: "rgb(196, 98, 67)" },
  { name: "赤茶", hex: "#a24f46", rgb: "rgb(162, 79, 70)" },
  { name: "赤褐色", hex: "#6e3b3b", rgb: "rgb(110, 59, 59)" },
  { name: "栗色", hex: "#6a4028", rgb: "rgb(106, 64, 40)" },
  { name: "黄茶", hex: "#c98a3c", rgb: "rgb(201, 138, 60)" },
  { name: "茶色", hex: "#965036", rgb: "rgb(150, 80, 54)" },
  { name: "煉瓦色", hex: "#aa4f37", rgb: "rgb(170, 79, 55)" },
  { name: "肌色", hex: "#fce4d6", rgb: "rgb(252, 228, 214)" },
  { name: "橙色", hex: "#f08300", rgb: "rgb(240, 131, 0)" },
  { name: "黄", hex: "#ffd900", rgb: "rgb(255, 217, 0)" },
  { name: "卵色", hex: "#fbd26b", rgb: "rgb(251, 210, 107)" },
  { name: "クリーム色", hex: "#fef4d0", rgb: "rgb(254, 244, 208)" },
  { name: "ベージュ", hex: "#e0c9a6", rgb: "rgb(224, 201, 166)" },
  { name: "カーキー色", hex: "#a58f55", rgb: "rgb(165, 143, 85)" },
  { name: "黄緑", hex: "#c3d825", rgb: "rgb(195, 216, 37)" },
  { name: "草色", hex: "#7b9a3b", rgb: "rgb(123, 154, 59)" },
  { name: "緑", hex: "#00a960", rgb: "rgb(0, 169, 96)" },
  { name: "深緑", hex: "#00543d", rgb: "rgb(0, 84, 61)" },
  { name: "青緑", hex: "#00a497", rgb: "rgb(0, 164, 151)" },
  { name: "青竹色", hex: "#00a38b", rgb: "rgb(0, 163, 139)" },
  { name: "エメラルドグリーン", hex: "#00aa90", rgb: "rgb(0, 170, 144)" },
  { name: "青磁色", hex: "#89c3a5", rgb: "rgb(137, 195, 165)" },
  { name: "ミントグリーン", hex: "#b3d9c5", rgb: "rgb(179, 217, 197)" },
  { name: "鶸色", hex: "#d7e566", rgb: "rgb(215, 229, 102)" },
  { name: "若草色", hex: "#c5d938", rgb: "rgb(197, 217, 56)" },
  { name: "うぐいす色", hex: "#928c36", rgb: "rgb(146, 140, 54)" },
  { name: "モスグリーン", hex: "#616e47", rgb: "rgb(97, 110, 71)" },
  { name: "オリーブ色", hex: "#726d40", rgb: "rgb(114, 109, 64)" },
  { name: "オリーブグリーン", hex: "#58753e", rgb: "rgb(88, 117, 62)" },
  { name: "シアン", hex: "#00a9cf", rgb: "rgb(0, 169, 207)" },
  { name: "空色", hex: "#70b9d9", rgb: "rgb(112, 185, 217)" },
  { name: "水色", hex: "#a0d5e5", rgb: "rgb(160, 213, 229)" },
  { name: "青", hex: "#0085ca", rgb: "rgb(0, 133, 202)" },
  { name: "紺色", hex: "#00428a", rgb: "rgb(0, 66, 138)" },
  { name: "鉄紺", hex: "#262e49", rgb: "rgb(38, 46, 73)" },
  { name: "藍色", hex: "#00437b", rgb: "rgb(0, 67, 123)" },
  { name: "青紫", hex: "#5e4a9e", rgb: "rgb(94, 74, 158)" },
  { name: "菫色", hex: "#68549f", rgb: "rgb(104, 84, 159)" },
  { name: "紫", hex: "#9f5ba3", rgb: "rgb(159, 91, 163)" },
  { name: "古代紫", hex: "#8f6a89", rgb: "rgb(143, 106, 137)" },
  { name: "赤紫", hex: "#bb5c8f", rgb: "rgb(187, 92, 143)" },
  { name: "マゼンタ", hex: "#d7006d", rgb: "rgb(215, 0, 109)" },
  { name: "ピンク", hex: "#f5b2b7", rgb: "rgb(245, 178, 183)" },
  { name: "桃色", hex: "#f2aab4", rgb: "rgb(242, 170, 180)" },
  { name: "サーモンピンク", hex: "#f29e9d", rgb: "rgb(242, 158, 157)" },
  { name: "コーラルレッド", hex: "#f07480", rgb: "rgb(240, 116, 128)" },
  { name: "ローズ", hex: "#e95384", rgb: "rgb(233, 83, 132)" },
  { name: "白", hex: "#ffffff", rgb: "rgb(255, 255, 255)" },
  { name: "灰色", hex: "#888888", rgb: "rgb(136, 136, 136)" },
  { name: "ねずみ色", hex: "#707070", rgb: "rgb(112, 112, 112)" },
  { name: "黒", hex: "#000000", rgb: "rgb(0, 0, 0)" },
  { name: "銀色", hex: "#b8b8b8", rgb: "rgb(184, 184, 184)" },
  { name: "金色", hex: "#caac7e", rgb: "rgb(202, 172, 126)" },
  { name: "象牙色", hex: "#f3e6d7", rgb: "rgb(243, 230, 215)" },
  { name: "亜麻色", hex: "#d7b98e", rgb: "rgb(215, 185, 142)" },
  { name: "ラベンダー", hex: "#a89bcf", rgb: "rgb(168, 155, 207)" },
  { name: "藤色", hex: "#a39abe", rgb: "rgb(163, 154, 190)" },
  { name: "スカイブルー", hex: "#7eb6d9", rgb: "rgb(126, 182, 217)" },
  { name: "ターコイズブルー", hex: "#00afb8", rgb: "rgb(0, 175, 184)" },
  { name: "紺青", hex: "#163970", rgb: "rgb(22, 57, 112)" },
];

export default function JISColors() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

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
          <h1 className="text-3xl md:text-4xl mb-3">JIS慣用色名（64色）</h1>
          <p className="text-gray-600">各色をクリックして慣用色名を確認しましょう</p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {jisColors.map((color, index) => {
              const isRevealed = revealed.has(index);
              const isLight = color.hex === "#ffffff" || color.hex === "#fef4d0" || color.hex === "#fce4d6" || color.hex === "#f3e6d7";

              return (
                <div
                  key={index}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => toggleReveal(index)}
                >
                  <div className="flex flex-col items-center">
                    {/* 色のサンプル */}
                    <div
                      className="w-20 h-20 rounded-lg shadow-md border-2"
                      style={{
                        backgroundColor: color.hex,
                        borderColor: isLight ? "#e5e7eb" : color.hex,
                      }}
                    ></div>

                    {/* 色名表示エリア */}
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
