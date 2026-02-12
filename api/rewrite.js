// api/rewrite.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    // Call the GROQ API
    const response = await fetch("https://api.groq.com/rewrite", { 
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();

    // Adjust based on how GROQ API returns rewritten text
    // Assuming it returns { rewritten: "..." }
    return res.status(200).json({ rewritten: data.rewritten });

  } catch (err) {
    console.error("GROQ API error:", err);
    return res.status(500).json({ error: "Failed to call GROQ API" });
  }
}
