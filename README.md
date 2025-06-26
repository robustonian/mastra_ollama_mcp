# Mastra Ollama MCP エージェント

Ollama（ローカルLLM）とMCP（Model Context Protocol）を統合したMastraベースのAIエージェントアプリケーションです。

## 機能

- **Ollamaエージェント**: MCPクライアント統合によるローカルLLMエージェント（サイコロ機能付き）
- **MCP統合**: Model Context Protocolによる拡張可能なツール連携
- **メモリ機能**: LibSQLStoreを使用した永続的なエージェントメモリ
- **ローカル実行**: 完全にローカル環境で動作するAIエージェント

## 必要環境

- Node.js >= 20.9.0
- npm または yarn
- Ollama（ローカルLLMの実行環境）

## セットアップ

1. 依存関係のインストール:
```bash
npm install
```

2. Ollamaのセットアップ:
```bash
# Ollamaのインストール（macOS/Linux）
curl -fsSL https://ollama.ai/install.sh | sh

# モデルのダウンロード
ollama pull qwen3:8b
```

3. 環境変数の設定（オプション）:
```bash
$ cp .env.example .env
```

```text: .env
# Ollama APIエンドポイント（デフォルト: http://localhost:11434/api）
OLLAMA_BASE_URL=http://localhost:11434/api

# 使用するOllamaモデル（デフォルト: qwen3:8b）
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

### Ollamaエージェント

**Ollamaエージェント** (`src/mastra/agents/mcpAgent.ts`):
- ローカルOllamaモデル（デフォルト: sarashina2.2-3b-instruct）を使用
- MCP（Model Context Protocol）クライアント統合
- サイコロ機能付きダイスローラーサーバーとの連携
- 日本語での対話が可能
- 永続的なメモリストレージ

### MCP統合

**MCPクライアント**:
- Streamable HTTP経由でMCPサーバーと通信
- dice-rollerサーバーによるサイコロ機能
- 拡張可能なツールシステム

### 主要コンポーネント

**メインエントリー** (`src/mastra/index.ts`):
- Mastraインスタンスの設定
- エージェントとストレージの構成
- PinoLoggerによるログ管理

## 使用方法

1. 開発サーバーを起動:
```bash
npm run dev
```

2. Ollamaエージェントとの対話:
   - エージェントは日本語で応答
   - サイコロ機能が利用可能
   - 会話履歴は永続化される

## ストレージとログ

- **開発環境**: インメモリデータベース (`:memory:`)
- **プロダクション環境**: SQLiteファイルストレージ (`file:../mastra.db`)
- **ログ**: PinoLoggerによるinfoレベルでの記録

## ライセンス

ISC
