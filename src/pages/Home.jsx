import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FilteredModal from '../components/FilteredModal.jsx'
import { FavoritesContext } from '../context/FavoritesContext.jsx'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const Home = () => {
  const [albums, setAlbums] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortOption, setSortOption] = useState('')
  const [compareList, setCompareList] = useState([])

  const navigate = useNavigate()
  const { favorites, addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext)

  async function fetchAlbums() {
    try {
      const response = await fetch('http://localhost:3001/albums')
      const basicAlbums = await response.json()

      const detailedAlbums = await Promise.all(
        basicAlbums.map(async (album) => {
          const res = await fetch(`http://localhost:3001/albums/${album.id}`)
          const data = await res.json()
          return data.album
        })
      )
      setAlbums(detailedAlbums)
      console.log('Dati ricevuti dal server:', detailedAlbums)
    } catch (error) {
      console.error('Error fetching albums:', error)
    }
  }
  console.log('Valore searchTerm:', searchTerm)

  const filteredAlbums = albums
    .filter(album => {
      return album.title?.toLowerCase().includes(searchTerm.toLowerCase())
    })
    .filter(album => selectedCategory === '' || album.category === selectedCategory)
    .slice()
    .sort((a, b) => {
      if (sortOption === 'title-asc') return a.title.localeCompare(b.title)
      if (sortOption === 'title-desc') return b.title.localeCompare(a.title)
      if (sortOption === 'category-asc') return a.category.localeCompare(b.category)
      if (sortOption === 'category-desc') return b.category.localeCompare(a.category)
      return 0
    })


  const toggleCompare = async (album) => {
    const isAlreadySelected = compareList.find(a => a.id === album.id)
    if (isAlreadySelected) {
      setCompareList(compareList.filter(a => a.id !== album.id))
    } else if (compareList.length < 2) {
      try {
        const res = await fetch(`http://localhost:3001/albums/${album.id}`)
        const fullAlbum = await res.json()
        setCompareList([...compareList, fullAlbum])

      } catch (err) {
        console.error('Errore fetching dettaglio album:', err)
      }
    }
  }

  useEffect(() => {
    fetchAlbums()
  }, [])

  return (
    <div className='container mx-auto'>
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cerca un album..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border rounded p-2 flex-1 min-w-[200px]"
        />

        <select
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">Ordina per</option>
          <option value="title-asc">Titolo (A-Z)</option>
          <option value="title-desc">Titolo (Z-A)</option>
          <option value="category-asc">Categoria (A-Z)</option>
          <option value="category-desc">Categoria (Z-A)</option>
        </select>

        <button onClick={() => setIsModalOpen(true)} className="border rounded p-2 bg-gray-100 hover:bg-gray-200">
          Filtra per categoria
        </button>
      </div>

      {filteredAlbums.length > 0 ? (
        <ul className="space-y-4">
          {filteredAlbums.map(album => (
            <li key={album.id} className="flex items-center justify-between p-4 border rounded shadow-sm">
              <div className="flex items-center gap-4">
                <img src={album.cover} alt={album.title} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                <div>
                  <Link to={`/albums/${album.id}`} className="text-lg font-semibold hover:underline">
                    {album.title}
                  </Link>
                  <p className="text-sm text-gray-600">{album.artist} – {album.year}</p>
                  <p className="text-sm text-gray-500">{album.category} – ★ {album.rating}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleCompare(album)}
                  disabled={compareList.length === 2 && !compareList.some(a => a.id === album.id)}
                  className="border rounded px-3 py-1 text-sm hover:bg-gray-100 disabled:opacity-50"
                >
                  {compareList.some(a => a.id === album.id) ? 'Rimuovi' : 'Confronta'}
                </button>
                <button
                  onClick={() => {
                    isFavorite(album.id)
                      ? removeFavorite(album.id)
                      : addFavorite(album)
                  }}
                  className="text-xl text-red-500 hover:scale-110 transition"
                >
                  {isFavorite(album.id) ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Non ci sono album disponibili</p>
      )}

      <button
        disabled={compareList.length !== 2}
        onClick={() => navigate('/compare', { state: { compareList } })}
        className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50 mt-6"
      >
        Confronta album
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
