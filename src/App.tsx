import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AlbumDetail from './pages/AlbumDetail'
import Favorites from './pages/Favorites'
import Compare from './pages/Compare'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='albums/:id' element={<AlbumDetail />} />
        <Route path='favorites' element={<Favorites />} />
        <Route path='compare' element={<Compare />} />
      </Routes>
    </>
  )
}

export default App

