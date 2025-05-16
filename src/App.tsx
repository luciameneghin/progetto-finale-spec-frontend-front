import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import TreeDetail from './pages/TreeDetail'
import Favorites from './pages/Favorites'
import Compare from './pages/Compare'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='trees/:id' element={<TreeDetail />} />
        <Route path='favorites' element={<Favorites />} />
        <Route path='compare' element={<Compare />} />
      </Routes>
    </>
  )
}

export default App

