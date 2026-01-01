/**
 * Footer component
 * NOT IN USE
 * @returns {React.ReactElement} - JSX element for the Footer component
 * @description
 * A component that displays the footer of the website, including the copyright information.
 */
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
