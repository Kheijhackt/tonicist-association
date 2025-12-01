import './App.css'
import NavigationBar from './components/NavigationBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './views/Home'
import Events from './views/Events'
import Recitals from './views/Recitals'
import About from './views/About'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Router>
        <div className='App'>
          <NavigationBar />
          <div className='content'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/events' element={<Events />} />
              <Route path='/recitals' element={<Recitals />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
