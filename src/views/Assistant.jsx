import { useContext, useMemo, useState } from "react";
import ContentContext from "../utils/ContentContext";
import "../styles/Assistant.css";

function Assistant() {
  const rawContents = useContext(ContentContext);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I’m your assistant for Tonicist Association. Ask me anything about the community.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const about = rawContents.about;
  const faqs = rawContents.faqs;

  const systemPrompt = useMemo(() => {
    const faqText = faqs.items
      .map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`)
      .join("\n\n");

    return `

You are an assistant for the Tonicist Association application.

You MUST follow these rules strictly:

- Only use information explicitly present in the provided About and FAQ content
- If a request is not directly answered in the provided content, respond with: "I don’t have information about that in the provided knowledge."
- Do NOT guess, assume, or complete missing information
- Do NOT invent names, lists, facts, or examples
- Do NOT answer questions outside the provided knowledge scope
- Do NOT use external knowledge or general world knowledge
- If the user asks for something not in the provided content, refuse clearly and redirect to supported topics
- Keep responses natural and conversational, but strictly grounded in provided data
- If you state that information is not available in the provided knowledge, you MUST stop immediately after that sentence.
- Do NOT continue the response.
- Do NOT add general knowledge.
- Do NOT provide partial lists, examples, or related information.
- You are NOT allowed to answer general knowledge questions (including math, music theory, facts, or common information) unless it is explicitly present in the provided knowledge base.
- If the question is not about the provided About or FAQ content, you must respond: "I only know about the FAQs and general information of the Tonicist Association."

ABOUT:
${JSON.stringify(about, null, 2)}

FAQS:
${faqText}
    `;
  }, [about, faqs]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const recentMessages = updatedMessages.slice(-20);

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

      const response = await fetch("/api/assistant-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
          systemPrompt,
        }),
      });

      const data = await response.json();

      const assistantReply = data?.reply || "I couldn't generate a response.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: assistantReply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong while contacting the assistant.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <>
      <h1>AI Assistant</h1>

      <div className="assistant-container">
        <div className="chat-history">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.role}`}>
              <strong>{message.role === "user" ? "You" : "Assistant"}</strong>
              <p style={{ whiteSpace: "pre-line" }}>{message.content}</p>
            </div>
          ))}

          {loading && (
            <div className="chat-message assistant">
              <p>Typing...</p>
            </div>
          )}
        </div>

        <div className="chat-input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />

          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
}

export default Assistant;
