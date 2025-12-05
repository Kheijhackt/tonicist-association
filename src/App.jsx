import "./App.css";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContentContext from "./utils/ContentContext";
import Background from "./components/Background";

import Home from "./views/Home";
import Events from "./views/Events";
import Performances from "./views/Performances";
import Resources from "./views/Resources";
import Gallery from "./views/Gallery";
import Faqs from "./views/Faqs";
import About from "./views/About";
import Admin from "./views/Admin";
import { useEffect, useState } from "react";

function App() {
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/get-gist?timestamp=${Date.now()}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load content");
        setContents(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading || !contents) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: 600,
        }}
      >
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <ContentContext.Provider value={contents}>
      <Router>
        <Background />
        <div className="App" style={{ position: "relative", zIndex: 1 }}>
          <NavigationBar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/performances" element={<Performances />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ContentContext.Provider>
  );
}

export default App;
