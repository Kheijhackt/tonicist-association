import './App.css'
import NavigationBar from './components/NavigationBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { getApi } from './utils/api'
import ContentContext from './utils/ContentContext'

import Home from './views/Home'
import Events from './views/Events'
import Recitals from './views/Recitals'
import Faqs from './views/Faqs'
import About from './views/About'
import { useEffect, useState } from 'react'

function App() {
  const [contents, setContents] = useState([]);
  const apiEndpoint = "https://gist.githubusercontent.com/akxin-laxinbault/d070cf044f5d695414171a8580669375/raw/tonicist-contents.json";

  useEffect(() => {
    async function fetchData  () {
      const data = await getApi(apiEndpoint);
      console.log(data);
      if(data) setContents(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <ContentContext.Provider value={contents}>
        <Router>
          <div className='App'>
            <NavigationBar />
            <div className='content'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/events' element={<Events />} />
                <Route path='/recitals' element={<Recitals />} />
                <Route path='/faqs' element={<Faqs />} />
                <Route path='/about' element={<About />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ContentContext.Provider>
    </>
  )
}

export default App
