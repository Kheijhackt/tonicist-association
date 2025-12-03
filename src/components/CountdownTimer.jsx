import Countdown from "react-countdown";

// Reusable Countdown Component
function CountdownTimer({ goalDate }) {
  // Convert goalDate (assumed to be UTC+8) to actual UTC
  const goalDateUTC = new Date(
    new Date(goalDate).getTime() - 8 * 60 * 60 * 1000
  );

  // Renderer function for custom display
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <span style={{ color: "var(--green-dark)", fontWeight: 700 }}>
          The event has started!
        </span>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            gap: "15px",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800,
            color: "var(--green-dark)",
            fontSize: "2rem",
          }}
        >
          <span>{days}d</span>
          <span>{hours}h</span>
          <span>{minutes}m</span>
          <span>{seconds}s</span>
        </div>
      );
    }
  };

  return <Countdown date={goalDateUTC} renderer={renderer} />;
}

export default CountdownTimer;
