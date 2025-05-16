import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FilteredModal from '../components/FilteredModal.jsx'

const Home = () => {
  const [trees, setTrees] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortOption, setSortOption] = useState('')
  const [compareList, setCompareList] = useState([])
  const navigate = useNavigate()

  async function fetchTrees() {
    try {
      const response = await fetch('http://localhost:3001/trees')
      const data = await response.json()
      setTrees(data)
    } catch (error) {
      console.error('Error fetching trees:', error)
    }
  }

  const filteredTrees = trees
    .filter(tree => tree.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(tree => selectedCategory === '' || tree.category === selectedCategory)
    .slice()
    .sort((a, b) => {
      if (sortOption === 'title-asc') return a.title.localeCompare(b.title)
      if (sortOption === 'title-desc') return b.title.localeCompare(a.title)
      if (sortOption === 'category-asc') return a.category.localeCompare(b.category)
      if (sortOption === 'category-desc') return b.category.localeCompare(a.category)
      return 0
    })

  // Qui faccio fetch dettagliato del singolo albero da aggiungere a compareList
  const toggleCompare = async (tree) => {
    const isAlreadySelected = compareList.find(t => t.id === tree.id)
    if (isAlreadySelected) {
      setCompareList(compareList.filter(t => t.id !== tree.id))
    } else if (compareList.length < 2) {
      try {
        const res = await fetch(`http://localhost:3001/trees/${tree.id}`)
        const fullTree = await res.json()
        setCompareList([...compareList, fullTree])
      } catch (err) {
        console.error('Errore fetching dettaglio albero:', err)
      }
    }
  }

  useEffect(() => {
    fetchTrees()
  }, [])

  return (
    <div>
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Cerca un albero..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border rounded p-2 mb-4"
        />
        <select
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
          className="border rounded p-2 mb-4"
        >
          <option value="">Ordina per</option>
          <option value="title-asc">Titolo (A-Z)</option>
          <option value="title-desc">Titolo (Z-A)</option>
          <option value="category-asc">Categoria (A-Z)</option>
          <option value="category-desc">Categoria (Z-A)</option>
        </select>
        <button onClick={() => setIsModalOpen(true)} className="border rounded p-2 mb-4">
          Filtra per categoria
        </button>
      </div>

      {filteredTrees.length > 0 ? (
        <ul>
          {filteredTrees.map(tree => (
            <li key={tree.id} className="mb-2 flex items-center justify-between">
              <Link to={`/trees/${tree.id}`} className="mr-4">{tree.title}</Link> - {tree.category}
              <button
                onClick={() => toggleCompare(tree)}
                disabled={compareList.length === 2 && !compareList.some(t => t.id === tree.id)}
                className="border rounded px-3 py-1"
              >
                {compareList.some(t => t.id === tree.id) ? 'Rimuovi' : 'Confronta'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Non ci sono alberi disponibili</p>
      )}

      <button
        disabled={compareList.length !== 2}
        onClick={() => navigate('/compare', { state: { treesToCompare: compareList } })}
        className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50 mt-4"
      >
        Confronta
      </button>

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



