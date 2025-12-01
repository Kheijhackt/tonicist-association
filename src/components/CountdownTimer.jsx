import Countdown from "react-countdown";

// Reusable Countdown Component
function CountdownTimer({ goalDate }) {
  // Renderer function for custom display
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span style={{ color: "var(--green-dark)", fontWeight: 700 }}>The event has started!</span>;
    } else {
      return (
        <div style={{
          display: "flex",
          gap: "15px",
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 800,
          color: "var(--green-dark)",
          fontSize: "2rem",
        }}>
          <span>{days}d</span>
          <span>{hours}h</span>
          <span>{minutes}m</span>
          <span>{seconds}s</span>
        </div>
      );
    }
  };

  return (
    <Countdown date={new Date(goalDate)} renderer={renderer} />
  );
}

export default CountdownTimer;
