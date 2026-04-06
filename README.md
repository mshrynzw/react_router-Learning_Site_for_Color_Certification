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

## 本番ビルド（SSG）

Vite のクライアントビルドに加え、ビルド時プリレンダでルートごとの HTML を `dist/` に生成します。

```bash
npm run build
```

`pnpm` を使う場合は次のとおりです。

```bash
pnpm run build
```

成果物の `dist/` には、`/`・`/pccs`・`/jis-colors`・`/eye-structure` などの静的 HTML とアセットが含まれます。

## Cloudflare Pages へのデプロイ

[Cloudflare Pages](https://pages.cloudflare.com/) に Git リポジトリを接続するか、[Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/) で `dist/` をアップロードして公開できます。

### Git 連携（推奨）

1. Cloudflare ダッシュボードで **Workers & Pages** → **Create** → **Pages** → **Connect to Git** を選び、対象リポジトリとブランチを指定します。
2. **ビルド設定**は次のようにします（ロックファイルが `pnpm-lock.yaml` のため、Pages は多くの場合 `pnpm` を自動選択します）。

   | 項目 | 値 |
   |------|-----|
   | **Framework preset** | `None` |
   | **Build command** | `pnpm run build`（`npm` のみ使う場合は `npm run build`） |
   | **Build output directory** | `dist` |
   | **Root directory** | `/`（リポジトリ直下がプロジェクトの場合） |

3. **環境変数**（オプションだが推奨）で Node のメジャーバージョンを固定します。

   - 変数名: `NODE_VERSION`
   - 値: `20` または `22`（Vite 6 と互換性のある LTS）

4. 保存してデプロイすると、ビルドログで `vite build` → SSR 用プリレンダバンドル → `node scripts/prerender.mjs` が実行され、最終的に `dist` が公開されます。

`public/_redirects` はビルド時に `dist` にコピーされ、未定義パス向けのフォールバックに利用されます。

### ビルドだけ先に確認する

ローカルまたは CI で次を実行し、`dist/` の内容を確認してください。

```bash
pnpm install
pnpm run build
```

プレビューは `npx vite preview`（`dist` をプレビュー）で行えます。

### Wrangler CLI でアップロードする場合

[Wrangler](https://developers.cloudflare.com/workers/wrangler/) を入れたうえで、ビルド済みの `dist/` を直接デプロイできます。

```bash
pnpm run build
npx wrangler pages deploy dist --project-name=<プロジェクト名>
```

`<プロジェクト名>` は Cloudflare 上で作成した Pages プロジェクト名に置き換えてください。初回はブラウザまたは CLI で認証が必要です。

参考: [Cloudflare Pages — Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/)、[Vite を Pages にデプロイする](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite-site/)

## リポジトリ構成のメモ

- `.gitignore` … `node_modules`、`dist`、環境変数ファイルなどを除外
- `.vscode/` … エディタ向けの推奨拡張・共通設定（チームで揃えたい場合に利用）

## ライセンス

プライベートプロジェクト（`package.json` の `"private": true`）として扱われています。
