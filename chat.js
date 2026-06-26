// chat.js
import OpenAI from "openai";
import * as readline from "readline";
import { SYSTEM } from "./prompts.js";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const history = [];

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function chat(userMessage) {
  history.push({ role: "user", content: userMessage });

  const response = await client.chat.completions.create({
    model: "deepseek-chat",
    max_tokens: 1024,
    messages: [
      { role: "system", content: SYSTEM },
      ...history,
    ],
  });

  const assistantMessage = response.choices[0].message.content;
  history.push({ role: "assistant", content: assistantMessage });

  return assistantMessage;
}

async function main() {
  console.log("AI 助手已啟動（輸入 exit 離開）\n");

  while (true) {
    const input = await ask("你: ");

    if (input.trim().toLowerCase() === "exit") {
      console.log("再見！");
      rl.close();
      break;
    }

    if (!input.trim()) continue;

    try {
      const reply = await chat(input.trim());
      console.log(`\nAI: ${reply}\n`);
    } catch (error) {
      if (error.status === 429) {
        console.log("錯誤：請求太頻繁，請稍後再試。\n");
      } else if (error.status === 401) {
        console.log("錯誤：API key 無效，請檢查環境變數。\n");
      } else {
        console.log(`錯誤：${error.message}\n`);
      }
    }
  }
}

main();