import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.post("/rewrite", async (req, res) => {
  try {
    const { text, mode } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "user",
          content: `Rewrite the following assignment in a ${mode} tone so that it becomes natural, human written and plagiarism safe. Do not shorten the content:\n\n${text}`
        }
      ]
    });

    res.json({ output: completion.choices[0].message.content });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI failed" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
