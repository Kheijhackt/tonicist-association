function Footer() {
  const footerStyle = {
    fontFamily: "'Nunito', sans-serif",
    // backgroundColor: "var(--green-dark)",
    color: "var(--white)",
    textAlign: "center",
    marginTop: "auto",
    fontWeight: 500,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: "1.0rem",
  };

  const linkStyle = {
    color: "var(--white)",
    textDecoration: "underline",
    margin: "0 8px",
  };

  return (
    <footer style={footerStyle}>
      <p>
        © {new Date().getFullYear()} Tonicist Association
      </p>
    </footer>
  );
}

export default Footer