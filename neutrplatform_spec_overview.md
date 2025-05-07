# NeutrPlatform プロジェクト概要・仕様書（詳細版）

## 📌 プロジェクト全体概要

NeutrPlatformは、Web品質・アクセシビリティ・SEO・デザイン整合性・社内ルール準拠など、
Web制作・運用現場に必要なチェックや自動レポート、外部サービス連携機能を統合的に提供するモジュール型SaaSプラットフォームです。

### 🔧 技術スタック（共通）

#### フロントエンド
- Next.js（App Router）
- React 18 / TypeScript
- Tailwind CSS + shadcn/ui
- Zustand / SWR
- Chart.js / Recharts

#### バックエンド
- Node.js / Express
- Sequelize / MySQL（RDS）
- REST API構成（GraphQL将来的対応）
- Puppeteer / jsdom（静的HTML解析）

#### インフラ・CI/CD
- AWS（EC2, S3, RDS）
- Cloudflare
- GitHub Actions + Slack通知
- Playwright + VRT対応

#### 認証・課金
- Clerk（OAuth、組織管理、JWT）
- Stripe（Checkout、Webhook、プラン制御）

#### 外部API連携（プロジェクト単位でON/OFF）
- Notion, Figma, Slack, GitHub, MCP（Backlog）

---

## 📘 仕様書構成

### 1. プロジェクト概要
- NeutrPlatformの目的、特徴、対象ユーザー

### 2. 要件定義
- 機能要件（アクセシビリティ診断、SEOチェックなど）
- 非機能要件（CI/CD対応、認証、パフォーマンス）

### 3. 技術スタック
- 共通スタック表（カテゴリ／技術／用途）

### 4. アーキテクチャ図・構成図
- Mermaidまたは画像埋め込みによる構成図

### 5. API仕様
- `/api/v1/*` 系RESTエンドポイント
- 認証方式：JWT + Clerk

### 6. データモデル
- Prismaの `CheckResult`, `Violation` モデル等
- ER図 + テーブル定義一覧

### 7. UIワイヤーフレーム
- Next.js + Tailwindで構成するUI構成案
- Figma埋め込み or ページ構成テキスト

### 8. CLIコマンド一覧
```bash
pnpm exec neutr crawl [url]
pnpm exec neutr check [path]
pnpm exec neutr report [json]
pnpm exec neutr sync --notion
pnpm exec neutr notify --slack
```

### 9. 連携ガイド
- Notion/Figma/Slack/Clerk/Stripeの設定手順とAPI構成

### 10. CI/CDフロー
- GitHub Actionsでの自動チェック、レポート生成、Slack通知、PRコメント投稿など

### 11. 保守・運用手順
- バックアップ、アラート、環境変数、障害対応手順

---

## 🗂️ Notionテンプレ構造例

- トップページに概要＆リンク一覧
- 要件定義テーブル（テンプレート付き）
- UI仕様・API仕様はMarkdown & データベース連携

---

## 📅 開発ロードマップ（2025年5月〜7月）

### フェーズ1（5月中旬〜6月初旬）
- Crawler, RuleEngine, RendererのMVP
- Clerk, Stripeの導入
- CIの基本構成確立

### フェーズ2（6月）
- CLI + REST API整備
- UIのダッシュボード原型開発
- PR BotとSlack通知

### フェーズ3（7月上旬）
- Notion/Figma自動同期
- PlaywrightによるVRT
- PDFレポート・週次Slack通知完成

### フェーズ4（7月後半）
- 開発者向けドキュメント整備
- SaaS正式ローンチ・ステークホルダー公開

---

**以上がNeutrPlatformの開発全体像と仕様書の要約です。**
詳細は各NotionページまたはGitHub連携にて継続管理されます。
