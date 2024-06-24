import { useState } from 'react'
import './App.css'
import { Home } from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { VideoPage } from './components/VideoPage'
import { UploadPage } from './pages/UploadPage'
import { AuthProvider } from './context/authContext'
import { WebSocketProvider } from './context/useSocketContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthProvider>
      <WebSocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/watch' element={<VideoPage />}/>
          <Route path='/channel' element={<UploadPage />}/>
        </Routes>
      </BrowserRouter>
      </WebSocketProvider>
    </AuthProvider>
    </>
  )
}

export default App
