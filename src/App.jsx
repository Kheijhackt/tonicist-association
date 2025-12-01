import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <div className='app'>
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
