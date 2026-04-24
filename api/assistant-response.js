export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, systemPrompt } = req.body;

    const recentMessages = messages.slice(-20);

    const payload = {
      model: "adamo1139/Hermes-3-Llama-3.1-8B-FP8-Dynamic",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...recentMessages,
      ],
      temperature: 0.2,
      max_tokens: 500,
    };

    const response = await fetch(
      "https://hermes.ai.unturf.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Any",
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content || "I couldn't generate a response.";

    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
}
