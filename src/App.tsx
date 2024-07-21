import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { VideoPage } from './pages/VideoPage'
import { UploadPage } from './pages/UploadPage'
import { AuthProvider } from './context/authContext'
import { WebSocketProvider } from './context/useSocketContext'
import { PrivateRoutes } from './utils/PrivateRoutes'
import { ChannelPage } from './pages/ChannelPage'
import { LikedVideoPage } from './pages/LikedVideoPage'
import { SubscriptionPage } from './pages/SubscriptionPage'

function App() {

  return (
    <>
    <AuthProvider>
      <WebSocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/watch/:videoId' element={<VideoPage />}/>
          <Route path='/account/:channelId' element={<ChannelPage />}/>
          <Route path='/channel' element={<PrivateRoutes children={<UploadPage />} />}/>
          <Route path='/liked-videos' element={<PrivateRoutes children={<LikedVideoPage />} />}/>
          <Route path='/subscriptions' element={<PrivateRoutes children={<SubscriptionPage />} />}/>
        </Routes>
      </BrowserRouter>
      </WebSocketProvider>
    </AuthProvider>
    </>
  )
}

export default App
