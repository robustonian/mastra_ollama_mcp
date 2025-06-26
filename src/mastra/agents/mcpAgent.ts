import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { MCPClient } from "@mastra/mcp";
import { createOllama } from 'ollama-ai-provider-fork';
import 'dotenv/config';

const ollama = createOllama({
  baseURL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434/api',
});

const mcp = new MCPClient({
  servers: {
    // stdio example
    // "mastra-docs": {
    //   "command": "npx",
    //   "args": [
    //     "-y",
    //     "@mastra/mcp-docs-server"
    //   ],
    // },
    // streamable http example
    "dice-roller": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote", "https://streamable_http_mcp_test.robustonian.com/mcp"
      ],
    },
  },
});

export const OllamaAgent = new Agent({
  name: 'Ollama Agent',
//   instructions: `
//       あなたはmastra-docsツールを介して、MastraのDocumentsにアクセスできるAIエージェントです。
// `,
  instructions: `
      あなたはサイコロを振るスキルを持った特別なAIエージェントです。
`,
  model: ollama(process.env.OLLAMA_MODEL || 'hf.co/mmnga/sarashina2.2-3b-instruct-v0.1-gguf:Q4_K_M'),
  tools: await mcp.getTools(),
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
});
