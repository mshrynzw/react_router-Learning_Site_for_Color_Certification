import { useState } from "react";
import { Link } from "react-router";

interface EyePart {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
}

const eyeParts: EyePart[] = [
  { id: "cornea", name: "角膜", description: "眼球の前面を覆う透明な膜", x: 70, y: 50 },
  { id: "iris", name: "虹彩", description: "瞳孔の大きさを調節する色のついた部分", x: 55, y: 50 },
  { id: "pupil", name: "瞳孔", description: "光が入る中央の黒い部分", x: 50, y: 50 },
  { id: "lens", name: "水晶体", description: "光を屈折させてピントを調節するレンズ", x: 45, y: 50 },
  { id: "vitreous", name: "硝子体", description: "眼球内部を満たす透明なゲル状の物質", x: 30, y: 50 },
  { id: "retina", name: "網膜", description: "光を感じる神経細胞が並ぶ内側の膜", x: 15, y: 50 },
  { id: "optic", name: "視神経", description: "網膜の情報を脳に伝える神経", x: 5, y: 50 },
  { id: "sclera", name: "強膜", description: "眼球を保護する白い外壁", x: 20, y: 30 },
  { id: "choroid", name: "脈絡膜", description: "網膜に栄養を供給する血管の膜", x: 18, y: 60 },
  { id: "ciliary", name: "毛様体", description: "水晶体の厚さを調節する筋肉", x: 40, y: 35 },
];

export default function EyeStructure() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const toggleReveal = (id: string) => {
    setRevealed((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
    setSelectedPart(id);
  };

  const toggleAll = () => {
    if (revealed.size === eyeParts.length) {
      setRevealed(new Set());
    } else {
      setRevealed(new Set(eyeParts.map((part) => part.id)));
    }
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
            {revealed.size === eyeParts.length ? "すべて隠す" : "すべて表示"}
          </button>
        </div>

        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl mb-3">眼のしくみ</h1>
          <p className="text-gray-600">各部位をクリックして名称と説明を確認しましょう</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 眼の構造図 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl mb-4 text-center">眼の断面図</h2>
            <div className="relative mx-auto" style={{ maxWidth: "500px", aspectRatio: "16/10" }}>
              <svg viewBox="0 0 100 70" className="w-full h-full">
                {/* 眼球の外形 */}
                <ellipse cx="40" cy="35" rx="38" ry="32" fill="#f0f0f0" stroke="#666" strokeWidth="0.5" />

                {/* 強膜（白目） */}
                <ellipse cx="40" cy="35" rx="36" ry="30" fill="#ffffff" />

                {/* 脈絡膜 */}
                <ellipse cx="40" cy="35" rx="34" ry="28" fill="#8b4513" opacity="0.3" />

                {/* 網膜 */}
                <ellipse cx="40" cy="35" rx="32" ry="26" fill="#ffebcd" />

                {/* 硝子体 */}
                <ellipse cx="45" cy="35" rx="20" ry="20" fill="#e6f2ff" opacity="0.7" />

                {/* 水晶体 */}
                <ellipse cx="52" cy="35" rx="6" ry="10" fill="#b3d9ff" stroke="#4a90e2" strokeWidth="0.3" />

                {/* 角膜 */}
                <ellipse cx="60" cy="35" rx="8" ry="12" fill="#cce5ff" opacity="0.6" stroke="#4a90e2" strokeWidth="0.3" />

                {/* 虹彩 */}
                <circle cx="58" cy="35" r="7" fill="#4a90e2" />

                {/* 瞳孔 */}
                <circle cx="58" cy="35" r="3.5" fill="#000000" />

                {/* 視神経 */}
                <rect x="2" y="32" width="12" height="6" fill="#d4a373" rx="2" />
                <circle cx="14" cy="35" r="4" fill="#d4a373" />

                {/* 毛様体 */}
                <path d="M 48 27 Q 52 32 48 35" fill="none" stroke="#8b7355" strokeWidth="1.5" />
                <path d="M 48 43 Q 52 38 48 35" fill="none" stroke="#8b7355" strokeWidth="1.5" />

                {/* ラベル用のマーカー */}
                {eyeParts.map((part) => (
                  <g key={part.id}>
                    <circle
                      cx={part.x}
                      cy={part.y}
                      r="2"
                      fill={revealed.has(part.id) ? "#22c55e" : "#ef4444"}
                      className="cursor-pointer hover:opacity-75 transition-opacity"
                      onClick={() => toggleReveal(part.id)}
                    />
                    <circle
                      cx={part.x}
                      cy={part.y}
                      r="2.5"
                      fill="transparent"
                      stroke={selectedPart === part.id ? "#fbbf24" : "transparent"}
                      strokeWidth="0.8"
                      className="cursor-pointer"
                      onClick={() => toggleReveal(part.id)}
                    />
                  </g>
                ))}
              </svg>
            </div>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>赤いマーカーをクリックすると部位名が表示されます</p>
            </div>
          </div>

          {/* 部位一覧 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl mb-4">眼の各部位</h2>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {eyeParts.map((part) => {
                const isRevealed = revealed.has(part.id);
                const isSelected = selectedPart === part.id;

                return (
                  <div
                    key={part.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-yellow-400 bg-yellow-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => toggleReveal(part.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isRevealed ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {isRevealed ? (
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <span className="text-white text-xl">？</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1">
                          {isRevealed ? (
                            <span className="text-lg">{part.name}</span>
                          ) : (
                            <span className="text-gray-400">？？？</span>
                          )}
                        </h3>
                        {isRevealed && (
                          <p className="text-sm text-gray-600">{part.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl mb-4">眼の働き</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-semibold">光の通り道：</span>
              角膜 → 瞳孔 → 水晶体 → 硝子体 → 網膜 → 視神経 → 脳
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>角膜と水晶体が光を屈折させてピントを合わせる</li>
              <li>虹彩が瞳孔の大きさを調節して光の量を調整する</li>
              <li>網膜の視細胞（錐体・桿体）が光を感知する</li>
              <li>視神経が電気信号として脳に情報を伝える</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
