import './App.css'
import NavigationBar from './components/NavigationBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <div className='app'>
          <NavigationBar />
          <div className='content'>
            <Routes>
              <Route path='/' element={<>Home</>} />
              <Route path='/about' element={<h1>About</h1>} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
