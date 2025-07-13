# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Mastra
- `npm run build` - Build the application using Mastra
- `npm run start` - Start the production application
- `npx mastra dev` - Alternative way to start development mode

## Architecture Overview

This is a Mastra-based AI application that integrates weather services with Ollama local LLM and MCP (Model Context Protocol) clients.

### Core Structure

- **Main Entry**: `src/mastra/index.ts` - Configures the Mastra instance with agents, workflows, and storage
- **Agents**: Two primary agents configured:
  - `weatherAgent` - OpenAI GPT-4o-mini powered weather assistant
  - `OllamaAgent` - Local Ollama model with MCP integration for dice rolling
- **Storage**: Uses LibSQLStore with in-memory database for development (url: ":memory:")
- **Logging**: Configured with PinoLogger at info level

### Agent Configuration

**Weather Agent** (`src/mastra/agents/weather-agent.ts`):
- Uses OpenAI GPT-4o-mini model
- Integrates `weatherTool` for fetching current weather data
- Persistent memory storage in `file:../mastra.db` (relative to .mastra/output directory)

**Ollama Agent** (`src/mastra/agents/mcpAgent.ts`):
- Uses local Ollama model (default: hf.co/mmnga/sarashina2.2-3b-instruct-v0.1-gguf:Q4_K_M)
- Integrates MCP client with dice-roller server via streamable HTTP
- **Enhanced Fork**: Uses `ollama-ai-provider-fork` with improved Tool+Streaming support
- Environment variables: `OLLAMA_BASE_URL` (default: http://localhost:11434/api), `OLLAMA_MODEL`

### Workflow System

**Weather Workflow** (`src/mastra/workflows/weather-workflow.ts`):
- Two-step workflow: `fetchWeather` → `planActivities`
- Fetches weather data from Open-Meteo API
- Generates location-specific activity recommendations based on weather conditions
- Uses detailed formatting with specific time slots and indoor/outdoor alternatives

### Tools

**Weather Tool** (`src/mastra/tools/weather-tool.ts`):
- Integrates with Open-Meteo geocoding and weather APIs
- Returns comprehensive weather data including temperature, humidity, wind conditions
- Maps weather codes to human-readable conditions

## Environment Setup

Required Node.js version: >=20.9.0

Optional environment variables:
- `OLLAMA_BASE_URL` - Ollama API endpoint (default: http://localhost:11434/api)  
- `OLLAMA_MODEL` - Ollama model to use (default: hf.co/mmnga/sarashina2.2-3b-instruct-v0.1-gguf:Q4_K_M)

## Key Dependencies

- **@mastra/core** (v0.10.12) - Core Mastra framework for agents and workflows
- **@mastra/mcp** (v0.10.6) - Model Context Protocol integration
- **@robustonian/ollama-ai-provider-fork** (v1.2.1) - Enhanced Ollama provider with Tool+Streaming support
- **@ai-sdk/openai** (v1.3.23) - OpenAI integration for weather agent
- **@mastra/libsql** (v0.11.0) - SQLite storage backend
- **@mastra/memory** (v0.11.2) - Agent memory management

## MCP Integration Details

The MCP client is configured to connect to a dice-roller server via streamable HTTP:
- Server endpoint: `https://streamable_http_mcp_test.robustonian.com/mcp`
- Uses `npx mcp-remote` for connection management
- Provides dice rolling capabilities to the Ollama agent

## Storage Configuration

- **Development**: In-memory storage (`:memory:`) for telemetry and evals
- **Production**: File-based storage (`file:../mastra.db`) for agent memory
- Agent memory is persistent and stored relative to `.mastra/output` directory