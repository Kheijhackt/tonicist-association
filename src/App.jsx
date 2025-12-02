import './App.css'
import NavigationBar from './components/NavigationBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { getApi } from './utils/api'
import ContentContext from './utils/ContentContext'
import Background from './components/Background'

import Home from './views/Home'
import Events from './views/Events'
import Recitals from './views/Recitals'
import Forms from './views/Forms'
import Faqs from './views/Faqs'
import About from './views/About'
import { useEffect, useState } from 'react'

function App() {
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiEndpoint = 
    `${import.meta.env.VITE_CONTENTS_API}?timestamp=${Date.now()}`;

  useEffect(() => {
    async function fetchData() {
      const data = await getApi(apiEndpoint);
      if (data) {
        setContents(data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // DO NOT RENDER ANY PAGE UNTIL CONTENTS EXIST
  if (loading || !contents) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.5rem",
        fontWeight: 600
      }}>
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
              <Route path="/recitals" element={<Recitals />} />
              <Route path="/forms" element={<Forms />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ContentContext.Provider>
  );
}

export default App;
