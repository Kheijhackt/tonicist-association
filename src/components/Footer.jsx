function Footer() {
  const footerStyle = {
    fontFamily: "'Nunito', sans-serif",
    color: "var(--white)",
    textAlign: "center",
    fontWeight: 500,
    fontSize: "1rem",
    padding: "20px 0",
  };

  return (
    <footer style={footerStyle}>
      <p>© {new Date().getFullYear()} Tonicist Association</p>
    </footer>
  );
}

export default Footer;
