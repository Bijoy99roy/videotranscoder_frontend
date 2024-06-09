import { useState } from 'react'
import './App.css'
import { Home } from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './components/HomePage'
import { VideoPage } from './components/VideoPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/watch' element={<VideoPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
