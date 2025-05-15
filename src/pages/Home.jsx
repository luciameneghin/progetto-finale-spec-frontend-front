import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FilteredModal from '../components/FilteredModal.jsx'

const Home = () => {
  const [trees, setTrees] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortOption, setSortOption] = useState('')

  async function fetchTrees() {
    try {
      const response = await fetch('http://localhost:3001/trees')
      const data = await response.json()
      console.log(data)
      setTrees(data)
    } catch (error) {
      console.error('Error fetching trees:', error)
    }
  }

  const filteredTrees = trees
    .filter(tree => tree.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(tree => selectedCategory === '' || tree.category === selectedCategory)
    .slice() // copia per non modificare state originale
    .sort((a, b) => {
      if (sortOption === 'title-asc') {
        return a.title.localeCompare(b.title)
      } else if (sortOption === 'title-desc') {
        return b.title.localeCompare(a.title)
      } else if (sortOption === 'category-asc') {
        return a.category.localeCompare(b.category)
      } else if (sortOption === 'category-desc') {
        return b.category.localeCompare(a.category)
      }
      return 0
    })



  useEffect(() => {
    fetchTrees()
  }, [])

  return (
    <div>
      <div className='flex justify-between'>
        <input
          type="text"
          placeholder='Cerca un albero...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 mb-4"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded p-2 mb-4"
        >
          <option value="">Ordina per</option>
          <option value="title-asc">Titolo (A-Z)</option>
          <option value="title-desc">Titolo (Z-A)</option>
          <option value="category-asc">Categoria (A-Z)</option>
          <option value="category-desc">Categoria (Z-A)</option>
        </select>
        <button onClick={() => setIsModalOpen(true)} className="border rounded p-2 mb-4">Filtra per categoria</button>
      </div>
      {filteredTrees.length > 0 ? (
        <ul>
          {filteredTrees.map((tree) => (
            <li key={tree.id}><Link to={`/trees/${tree.id}`}>{tree.title}</Link> - {tree.category}</li>
          ))}
        </ul>
      ) : (
        <p>Non ci sono alberi disponibili</p>
      )}

      <FilteredModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  )
}

export default Home
