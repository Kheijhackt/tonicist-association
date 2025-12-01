function Home() {
  const homeContent = {
    minHeight: "100vh",  // full viewport height
    width: "100%",       // full width
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // horizontal centering
    justifyContent: "center", // vertical centering
    minHeight: "calc(100vh - 200px)" // Because of the navbar
  }

  return (
    <div style={homeContent}>
      <h1>Hello! Welcome to Tonicist Association! </h1>
      <h4>Short description about the Tonicist Association.</h4>
    </div>
  )
}

export default Home