import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import TreeDetail from './pages/TreeDetail'
import Favorites from './pages/Favorites'
import Compare from './pages/Compare'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='trees/:id' element={<TreeDetail />} />
        <Route path='favorites' element={<Favorites />} />
        <Route path='compare' element={<Compare />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

