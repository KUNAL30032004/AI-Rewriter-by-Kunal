// api/rewrite.js
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Get the text to rewrite from the request body
  const { text } = req.body;
  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "No text provided" });
  }

  // Get your GROQ API key from environment variables (safe, not exposed to frontend)
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ API key is missing" });
  }

  try {
    // Call the GROQ API
    const response = await fetch("https://api.groq.com/rewrite", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    // If GROQ returns an error
    if (!response.ok) {
      const errorText = await response.text();
      console.error("GROQ API error:", errorText);
      return res.status(response.status).json({ error: errorText });
    }

    // Parse the GROQ response
    const data = await response.json();
    console.log("GROQ response:", data);

    // Adjust this depending on how GROQ returns the rewritten text
    // Commonly it might be data.rewritten or data.output
    const rewrittenText = data.rewritten || data.output || "No output returned";

    return res.status(200).json({ rewritten: rewrittenText });

  } catch (err) {
    console.error("Fetch to GROQ failed:", err);
    return res.status(500).json({ error: "Failed to call GROQ API" });
  }
}
