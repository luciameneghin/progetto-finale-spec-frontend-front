import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AlbumDetail from './pages/AlbumDetail'
import Favorites from './pages/Favorites'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Compare from './pages/Compare'

const App = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='albums/:id' element={<AlbumDetail />} />
          <Route path='favorites' element={<Favorites />} />
          <Route path='compare/:id' element={<Compare />} />
        </Routes>

      </main>
      <Footer />
    </div>
  )
}

export default App

