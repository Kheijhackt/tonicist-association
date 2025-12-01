
function Home() {
  const homeContent = {
    minHeight: "100vh",  // full viewport height
    width: "100%",       // full width
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // horizontal centering
    justifyContent: "center", // vertical centering
    minHeight: "calc(100vh - 200px)" // Because of the navbar and footer
  }

  return (
    <>
      <h1 style={homeContent}>Hello! Welcome to Tonicist Association! </h1>
    </>
  )
}

export default Home