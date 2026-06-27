# AI Chat Interface 🤖

**AI Chat Interface** 是一個輕量級的網頁聊天應用程式

本專案的主要目的是展示如何快速整合不同的主流大型語言模型 (LLM)，提供一個乾淨、直覺的對話介面，並透過後端建立安全的 API 請求代理。

## 📸 專案截圖

![AI Chat Interface](assets/screenshot.jpg)

## ✨ 核心特色 (Features)

這個專案雖然小巧，但涵蓋了基礎 AI 應用的核心要素：

- **雙模型支援**：同時串接了 [OpenAI API](https://platform.openai.com/) 與 [Anthropic API](https://console.anthropic.com/)。
- **後端代理 (Proxy)**：透過 Express.js 處理 API 請求，避免在前端暴露敏感的 API Keys。
- **純粹的前端實作**：使用 Vanilla JavaScript 與 CSS 打造無框架的輕量級介面。
- **極簡安裝**：沒有複雜的環境依賴，幾行指令即可在本地端跑起來。

## 🛠️ 技術棧 (Tech Stack)

- **前端**：HTML5, CSS3, JavaScript (ES6+)
- **後端**：Node.js, Express.js
- **AI SDK**：`openai`, `@anthropic-ai/sdk`

## 🚀 快速啟動 (Getting Started)

請依照以下步驟在本地端運行此專案：

### 1. 安裝依賴套件

確保你已經安裝了 Node.js (建議 v18 以上版本)。在專案根目錄下執行：

```bash
npm install
```

### 2. 設定環境變數

在專案根目錄建立一個 `.env` 檔案，並填入你的 API Keys：

```env
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 3. 啟動伺服器

執行以下指令來啟動應用程式：

```bash
node index.js
```

### 4. 開始使用

打開瀏覽器並前往 [http://localhost:3000](http://localhost:3000)（如果你的程式碼中設定的 Port 不是 3000，請依實際情況調整）。
