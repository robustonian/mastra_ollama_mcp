# Mastra 天気AI アプリケーション

OpenAI GPT-4o-miniとOllama（ローカルLLM）を使用した天気情報とAIエージェントのMastraベース統合アプリケーションです。

## 機能

- **天気エージェント**: OpenAI GPT-4o-miniを使用した天気情報アシスタント
- **Ollamaエージェント**: MCPクライアント統合によるローカルLLMエージェント（サイコロ機能付き）
- **天気ワークフロー**: 天気データに基づく活動提案システム
- **メモリ機能**: LibSQLStoreを使用した永続的なエージェントメモリ

## 必要環境

- Node.js >= 20.9.0
- npm または yarn

## セットアップ

1. 依存関係のインストール:
```bash
npm install
```

2. 環境変数の設定（オプション）:
```bash
# Ollama APIエンドポイント（デフォルト: http://localhost:11434/api）
OLLAMA_BASE_URL=http://localhost:11434/api

# 使用するOllamaモデル（デフォルト: hf.co/mmnga/sarashina2.2-3b-instruct-v0.1-gguf:Q4_K_M）
OLLAMA_MODEL=your-model-name
```

## 開発コマンド

```bash
# 開発サーバーの起動
npm run dev

# または
npx mastra dev

# アプリケーションのビルド
npm run build

# プロダクション環境での起動
npm run start
```

## アーキテクチャ

### エージェント

1. **天気エージェント** (`src/mastra/agents/weather-agent.ts`)
   - OpenAI GPT-4o-miniモデルを使用
   - 天気ツールとの統合
   - 永続的なメモリストレージ

2. **Ollamaエージェント** (`src/mastra/agents/mcpAgent.ts`)
   - ローカルOllamaモデルを使用
   - MCP（Model Context Protocol）クライアント統合
   - サイコロ機能付きダイスローラーサーバー

### ワークフロー

**天気ワークフロー** (`src/mastra/workflows/weather-workflow.ts`):
- 2段階のワークフロー: `fetchWeather` → `planActivities`
- Open-Meteo APIから天気データを取得
- 天気条件に基づく場所固有の活動提案

### ツール

**天気ツール** (`src/mastra/tools/weather-tool.ts`):
- Open-Meteo地理コーディングおよび天気APIとの統合
- 温度、湿度、風況を含む包括的な天気データ
- 天気コードから人間が読める状態への変換

## ストレージ

- 開発環境: インメモリデータベース (`:memory:`)
- プロダクション環境: SQLiteファイルストレージ (`file:../mastra.db`)

## ログ

PinoLoggerを使用してinfoレベルでログを記録

## ライセンス

ISC