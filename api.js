import express from "express";
import OpenAI from "openai";
import { SYSTEM } from "./prompts.js";
const app = express();
app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});



app.post("/chat", async (req, res) => {
  const { message, history } = req.body;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");

  try {
    const stream = await client.chat.completions.create({
      model: "deepseek-chat",
      stream: true,
      messages: [
        { role: "system", content: SYSTEM },
        ...history,
        { role: "user", content: message },
      ],
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || "";
      if (text) res.write(`data: ${text}\n\n`);
    }
  } catch (error) {
    res.write(`data: 錯誤：${error.message}\n\n`);
  }

  res.end();
});

app.listen(3000, () => console.log("http://localhost:3000"));