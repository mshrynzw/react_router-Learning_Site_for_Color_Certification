# 色彩検定学習サイト

色彩検定の学習用に作成した Web アプリケーションです。Figma のデザインをもとに、React と React Router で画面遷移できる構成になっています。

## デザイン

元デザイン（Figma）:

https://www.figma.com/design/DyBbX2KrUC5QPAim2PFFQ7/%E8%89%B2%E5%BD%A9%E6%A4%9C%E5%AE%9A%E5%AD%A6%E7%BF%92%E3%82%B5%E3%82%A4%E3%83%88%E4%BD%9C%E6%88%90

## 技術スタック

- [Vite](https://vitejs.dev/)（ビルド・開発サーバー）
- [React](https://react.dev/) 18
- [React Router](https://reactrouter.com/) 7
- [Tailwind CSS](https://tailwindcss.com/) 4
- UI: Material UI、Radix UI ほか（`package.json` 参照）

## 必要環境

- [Node.js](https://nodejs.org/)（LTS 推奨）
- パッケージマネージャ: `npm` または `pnpm`（リポジトリに `pnpm` の override 設定あり）

## セットアップ

依存関係をインストールします。

```bash
npm install
```

`pnpm` を使う場合は次のとおりです。

```bash
pnpm install
```

## 開発サーバー

開発モードで起動します（ホットリロードあり）。

```bash
npm run dev
```

ブラウザで表示される URL（通常は `http://localhost:5173`）を開いてください。

## 本番ビルド

静的ファイルを `dist/` に出力します。

```bash
npm run build
```

生成物は任意の静的ホスティングや CDN に配置できます。

## リポジトリ構成のメモ

- `.gitignore` … `node_modules`、`dist`、環境変数ファイルなどを除外
- `.vscode/` … エディタ向けの推奨拡張・共通設定（チームで揃えたい場合に利用）

## ライセンス

プライベートプロジェクト（`package.json` の `"private": true`）として扱われています。
