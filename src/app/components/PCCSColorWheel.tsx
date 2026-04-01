import { useState } from "react";
import { Link } from "react-router";

interface ColorHue {
  number: number;
  symbol: string;
  englishName: string;
  japaneseName: string;
  hex: string;
  angle: number;
}

const pccsColors: ColorHue[] = [
  { number: 1, symbol: "pR", englishName: "purplish Red", japaneseName: "紫みの赤", hex: "#e5004f", angle: 0 },
  { number: 2, symbol: "R", englishName: "Red", japaneseName: "赤", hex: "#ea5532", angle: 15 },
  { number: 3, symbol: "yR", englishName: "yellowish Red", japaneseName: "黄みの赤", hex: "#ea6505", angle: 30 },
  { number: 4, symbol: "rO", englishName: "reddish Orange", japaneseName: "赤みのだいだい", hex: "#eb6d00", angle: 45 },
  { number: 5, symbol: "O", englishName: "Orange", japaneseName: "だいだい", hex: "#ee7700", angle: 60 },
  { number: 6, symbol: "yO", englishName: "yellowish Orange", japaneseName: "黄みのだいだい", hex: "#f39700", angle: 75 },
  { number: 7, symbol: "rY", englishName: "reddish Yellow", japaneseName: "赤みの黄", hex: "#f7b500", angle: 90 },
  { number: 8, symbol: "Y", englishName: "Yellow", japaneseName: "黄", hex: "#ffd900", angle: 105 },
  { number: 9, symbol: "gY", englishName: "greenish Yellow", japaneseName: "緑みの黄", hex: "#f8e700", angle: 120 },
  { number: 10, symbol: "yG", englishName: "yellowish Green", japaneseName: "黄みの緑", hex: "#d9e021", angle: 135 },
  { number: 11, symbol: "yG", englishName: "yellowish Green", japaneseName: "黄緑", hex: "#c1d82f", angle: 150 },
  { number: 12, symbol: "G", englishName: "Green", japaneseName: "緑", hex: "#00a960", angle: 165 },
  { number: 13, symbol: "bG", englishName: "bluish Green", japaneseName: "青みの緑", hex: "#009e96", angle: 180 },
  { number: 14, symbol: "gB", englishName: "greenish Blue", japaneseName: "緑みの青", hex: "#0095b5", angle: 195 },
  { number: 15, symbol: "B", englishName: "Blue", japaneseName: "青", hex: "#0086c5", angle: 210 },
  { number: 16, symbol: "pB", englishName: "purplish Blue", japaneseName: "紫みの青", hex: "#0075c5", angle: 225 },
  { number: 17, symbol: "V", englishName: "Violet", japaneseName: "青紫", hex: "#0068b6", angle: 240 },
  { number: 18, symbol: "bP", englishName: "bluish Purple", japaneseName: "青みの紫", hex: "#59499b", angle: 255 },
  { number: 19, symbol: "P", englishName: "Purple", japaneseName: "紫", hex: "#84329b", angle: 270 },
  { number: 20, symbol: "rP", englishName: "reddish Purple", japaneseName: "赤みの紫", hex: "#a0208f", angle: 285 },
  { number: 21, symbol: "RP", englishName: "Red Purple", japaneseName: "赤紫", hex: "#c8197d", angle: 300 },
  { number: 22, symbol: "pRP", englishName: "purplish Red Purple", japaneseName: "紫みの赤紫", hex: "#d41c5c", angle: 315 },
  { number: 23, symbol: "rRP", englishName: "reddish Red Purple", japaneseName: "赤みの赤紫", hex: "#de1f55", angle: 330 },
  { number: 24, symbol: "pR", englishName: "purplish Red", japaneseName: "紫赤", hex: "#e4004f", angle: 345 },
];

export default function PCCSColorWheel() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const toggleReveal = (number: number) => {
    setRevealed((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(number)) {
        newSet.delete(number);
      } else {
        newSet.add(number);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← ホームに戻る
          </Link>
        </div>

        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl mb-3">PCCS色相環（24色相）</h1>
          <p className="text-gray-600">各色をクリックして、色相記号・英語名・日本語名を確認しましょう</p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 mb-8">
          <div className="relative mx-auto" style={{ width: "min(90vw, 600px)", height: "min(90vw, 600px)" }}>
            {/* 中心の円 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center">
              <span className="text-gray-600 text-sm md:text-base">PCCS</span>
            </div>

            {/* 色相環 */}
            {pccsColors.map((color) => {
              const radius = 45; // パーセント
              const x = 50 + radius * Math.cos((color.angle - 90) * (Math.PI / 180));
              const y = 50 + radius * Math.sin((color.angle - 90) * (Math.PI / 180));
              const isRevealed = revealed.has(color.number);

              return (
                <div
                  key={color.number}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                  onClick={() => toggleReveal(color.number)}
                >
                  <div className="flex flex-col items-center">
                    {/* 色のサンプル */}
                    <div
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform"
                      style={{ backgroundColor: color.hex }}
                    ></div>

                    {/* 番号 */}
                    <div className="mt-1 text-xs md:text-sm bg-white px-2 py-0.5 rounded shadow">
                      {color.number}
                    </div>

                    {/* 情報カード */}
                    {isRevealed && (
                      <div className="mt-2 bg-white border-2 border-gray-300 rounded-lg p-2 md:p-3 shadow-xl z-10 min-w-[120px] md:min-w-[150px]">
                        <div className="text-xs md:text-sm space-y-1">
                          <div>
                            <span className="text-gray-600">記号: </span>
                            <span>{color.symbol}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">英: </span>
                            <span className="text-xs">{color.englishName}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">日: </span>
                            <span>{color.japaneseName}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">HEX: </span>
                            <span className="text-xs">{color.hex}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 「？」表示 */}
                    {!isRevealed && (
                      <div className="mt-2 bg-gray-200 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-gray-300 transition-colors">
                        <span className="text-lg md:text-xl">？</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl mb-4">一覧表</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
            {pccsColors.map((color) => (
              <div
                key={color.number}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                onClick={() => toggleReveal(color.number)}
              >
                <div
                  className="w-10 h-10 rounded border-2 border-gray-200 flex-shrink-0"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm">
                    <span className="font-semibold">{color.number}:</span> {revealed.has(color.number) ? color.symbol : "？"}
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {revealed.has(color.number) ? color.japaneseName : "？"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
