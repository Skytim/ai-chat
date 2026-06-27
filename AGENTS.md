# AGENTS.md — AI Chat (Java Code Review)

## Entry points

- **Web server**: `api.js` — Express server on port 3000, serves `public/`, SSE endpoint at `POST /chat`
- **CLI**: `chat.js` — stdin/stdout chat loop
- **Frontend**: `public/index.html` — vanilla JS, no framework

**`package.json` `"main"` and `README.md` both reference `index.js` which does not exist.** The real server entry is `api.js`.

## Running

```bash
# no start script in package.json; run manually:
node api.js          # web UI at http://localhost:3000
node chat.js         # CLI mode

# no test / lint / typecheck scripts configured
```

## Environment

- `DEEPSEEK_API_KEY` — the only required env var (not `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` as README claims)
- Create `.env` in project root; loaded implicitly only if you wire it up (dotenv is **not** installed)

## Quirks

- **README is stale**: says "OpenAI + Anthropic" and `node index.js`. Actual code uses **DeepSeek** (OpenAI-compatible SDK, `baseURL: https://api.deepseek.com`) and entry is `api.js`.
- **ESM** (`"type": "module"`) — use `import`/`export`, not `require`.
- **No dotenv package** — if `.env` loading is needed, add `dotenv` or inline it.
- System prompt (`prompts.js`) is a Traditional Chinese Java code review prompt — do not treat as a generic chat prompt.
- Streaming: SSE format (`data: <text>\n\n`). Frontend reads with `response.body.getReader()`.

## Architecture

```
api.js       — Express routes (single POST /chat)
chat.js      — CLI alternate entry
prompts.js   — SYSTEM prompt export
public/
  index.html — browser UI
```

Two commits only; no CI, no test suite, no linter config.
