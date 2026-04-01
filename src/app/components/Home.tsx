import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">色彩検定 3級 学習サイト</h1>
          <p className="text-gray-600 text-lg">クリックで答えを確認しながら学習できます</p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/pccs"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 mb-4"></div>
              <h2 className="text-2xl mb-3">PCCS色相環</h2>
              <p className="text-gray-600">
                日本色研配色体系の24色相環を学習します
              </p>
            </div>
          </Link>

          <Link
            to="/jis-colors"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform"
          >
            <div className="flex flex-col items-center text-center">
              <div className="grid grid-cols-4 gap-1 w-20 h-20 mb-4">
                <div className="bg-red-400"></div>
                <div className="bg-blue-400"></div>
                <div className="bg-green-400"></div>
                <div className="bg-yellow-400"></div>
                <div className="bg-purple-400"></div>
                <div className="bg-pink-400"></div>
                <div className="bg-indigo-400"></div>
                <div className="bg-orange-400"></div>
                <div className="bg-teal-400"></div>
                <div className="bg-cyan-400"></div>
                <div className="bg-lime-400"></div>
                <div className="bg-rose-400"></div>
                <div className="bg-amber-400"></div>
                <div className="bg-emerald-400"></div>
                <div className="bg-violet-400"></div>
                <div className="bg-fuchsia-400"></div>
              </div>
              <h2 className="text-2xl mb-3">JIS慣用色名</h2>
              <p className="text-gray-600">
                日本産業規格の慣用色名64色を学習します
              </p>
            </div>
          </Link>

          <Link
            to="/eye-structure"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 border-4 border-blue-400 flex items-center justify-center mb-4">
                <div className="w-8 h-8 rounded-full bg-black"></div>
              </div>
              <h2 className="text-2xl mb-3">眼のしくみ</h2>
              <p className="text-gray-600">
                眼の構造と各部位の名称を学習します
              </p>
            </div>
          </Link>
        </div>

        <footer className="text-center mt-12 text-gray-500">
          <p>各カードをクリックして学習を始めましょう</p>
        </footer>
      </div>
    </div>
  );
}
