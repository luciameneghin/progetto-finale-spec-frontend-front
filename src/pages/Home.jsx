import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FilteredModal from '../components/FilteredModal.jsx'

const Home = () => {
  const [trees, setTrees] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')

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



  useEffect(() => {
    fetchTrees()
  }, [])

  return (
    <div>
      <h1>Homepage</h1>
      <input
        type="text"
        placeholder='Cerca un albero...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setIsModalOpen(true)}>Filtra per categoria</button>
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
