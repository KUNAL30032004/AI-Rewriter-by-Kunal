import Groq from "groq-sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Rewrite this assignment in human natural style and remove AI plagiarism:\n\n${text}`
        }
      ],
      model: "llama-3.3-70b-versatile",
    });

    res.status(200).json({
      result: completion.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
