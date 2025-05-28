const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/speech", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    console.log('No text provided in request');
    return res.status(400).json({ error: "No text provided" });
  }


  try {
    Console.log('Generating OpenAI API speech for text:', text);
    const mp3 = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: text,
    });
console.log('OpenAI API speech generation successful');    

    const buffer = Buffer.from(await mp3.arrayBuffer());
    console.log('Buffer created, size:', buffer.length);;
    res.setHeader("Content-Type", "audio/mpeg");
    res.send(buffer);
    console.log('Response sent successfully to client');
  } catch (err) {
    console.error("Error generating speech:", err);
    res.status(500).json({ error: "Failed to generate speech" });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Speech API running on port ${PORT}`);
  console.log('Available on:');
  console.log(`  http://localhost:${PORT}`);
  console.log(`  http://YOUR_IP:${PORT}`);
});