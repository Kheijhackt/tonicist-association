import Countdown from "react-countdown";

/**
 * CountdownTimer component
 * @param {string} goalDate - Date string for the countdown target in ISO 8601 format (ex: "2025-12-08T18:00:00+08:00")
 * @returns {React.ReactElement} - JSX element for the CountdownTimer component
 * @description
 * A component that displays a countdown timer for a specified goal date.
 * If the current time is within 2 hours after the event, it shows a text "The event has started!".
 * If more than 2 hours have passed since the event, it shows nothing.
 * Otherwise, it displays a countdown in the format "X days Y hours Z minutes W seconds".
 */
function CountdownTimer({ goalDate }) {
  // goalDate already includes timezone (ex: "2025-12-08T18:00:00+08:00")
  const eventTime = new Date(goalDate).getTime();
  const twoHours = 2 * 60 * 60 * 1000;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    const now = Date.now();

    // If it's within 2 hours after event → show text
    if (now >= eventTime && now <= eventTime + twoHours) {
      return (
        <span style={{ color: "var(--green-dark)", fontWeight: 700 }}>
          The event has started!
        </span>
      );
    }

    // If more than 2 hours past → show nothing
    if (now > eventTime + twoHours) {
      return null;
    }

    // Otherwise → countdown
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
  };

  return <Countdown date={goalDate} renderer={renderer} />;
}

export default CountdownTimer;
