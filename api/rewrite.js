import Groq from "groq-sdk";

export const config = {
  runtime: "nodejs"
};

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Rewrite this assignment in human natural style and remove AI plagiarism:\n\n${text}`
        }
      ],
      model: "llama-3.3-70b-versatile",
    });

    return res.status(200).json({
      result: completion.choices[0].message.content
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
