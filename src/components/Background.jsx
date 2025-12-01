import { useEffect, useState } from "react";
import "../styles/Background.css";

// const notes = ["🎵", "🎶", "♩", "♪"]; // musical notes
const notes = ["🎵", "🎶", "♩", "♪", "🎼", "🎹", "🎷", "🎺", "🎻"];

function Background() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // create 10 musical notes initially
    const initial = Array.from({ length: 10 }, () => ({
      id: Math.random(),
      note: notes[Math.floor(Math.random() * notes.length)],
      left: Math.random() * 100, // horizontal position %
      delay: Math.random() * 5, // random start delay
      duration: 10 + Math.random() * 10, // fall duration 10-20s
      size: 20 + Math.random() * 20, // font size in px
    }));
    setParticles(initial);
  }, []);

  return (
    <div className="background-container">
      {particles.map((p) => (
        <span
          key={p.id}
          className="musical-note"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
            opacity: 0.2, // make it subtle
          }}
        >
          {p.note}
        </span>
      ))}
    </div>
  );
}

export default Background;
