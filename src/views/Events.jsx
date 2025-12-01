
function Events() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Timeline of Events</h1>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=Nzg3OWVmZjM3ZWY3MTM3NzY2M2I5NDA0YzRlYTgwYmY0NTc0NmNjYWZhNzdhZmQwNmFjMjk5OTEzZDIzOTQyZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&mode=MONTH&color=%2333b679&showTitle=1&showTz=0&showDate=1&showNav=1&showPrint=0&hl=en"
        style={{
          width: "100%",
          maxWidth: "800px",    // max width on large screens
          height: "500px",      // fixed height
          border: "0",
          borderRadius: "12px",
        }}
      ></iframe>
    </div>
  );
}

export default Events;
