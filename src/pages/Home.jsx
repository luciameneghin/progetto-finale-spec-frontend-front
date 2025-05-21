import React, { useState, useEffect, useContext, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FilteredModal from '../components/FilteredModal.jsx'
import { FavoritesContext } from '../context/FavoritesContext.jsx'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import AlbumCarousel from '../components/AlbumCarousel'
import AlbumComparePanel from '../components/AlbumComparePanel'

const Home = () => {
  // stati e context
  const [albums, setAlbums] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortOption, setSortOption] = useState('')
  const [compareList, setCompareList] = useState([null, null, null, null])

  const navigate = useNavigate()
  const { favorites, addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext)

  useEffect(() => {
    fetchAlbums()
  }, [])

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
    } catch (error) {
      console.error('Error fetching albums:', error)
    }
  }

  // useMemo solo per filteredAlbums
  const filteredAlbums = useMemo(() => {
    return albums
      .filter(album => album.title?.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(album => selectedCategory === '' || album.category === selectedCategory)
      .slice()
      .sort((a, b) => {
        if (sortOption === 'title-asc') return a.title.localeCompare(b.title)
        if (sortOption === 'title-desc') return b.title.localeCompare(a.title)
        if (sortOption === 'category-asc') return a.category.localeCompare(b.category)
        if (sortOption === 'category-desc') return b.category.localeCompare(a.category)
        return 0
      });
  }, [albums, searchTerm, selectedCategory, sortOption])

  // toggleCompare fuori da useMemo
  const toggleCompare = async (album) => {
    const isAlreadySelected = compareList.find(a => a.id === album.id)
    if (isAlreadySelected) {
      setCompareList(compareList.filter(a => a.id !== album.id))
    } else if (compareList.length < 4) {
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

  const filledCompareList = compareList.filter(Boolean)

  return (
    <div>
      {/* Carousel */}
      <AlbumCarousel />
      <div className="container mx-auto px-4 py-5">
        <h1 className='text-2xl font-extrabold text-center text-[#c7481d] py-5'>Compara. Analizza. Scegli il tuo album perfetto.</h1>
        <AlbumComparePanel
          albums={albums}
          compareList={compareList}
          setCompareList={setCompareList}
        />

        {/* Controlli di ricerca, filtro e ordinamento */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Cerca un album..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[200px] rounded border border-[#568a99] px-4 py-2 text-[#292929] placeholder-[#c7481d] focus:outline-none focus:ring-2 focus:ring-[#e9a716]"
          />

          <select
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
            className="rounded border border-[#568a99] px-4 py-2 text-[#292929] focus:outline-none focus:ring-2 focus:ring-[#e9a716]"
          >
            <option value="">Ordina per</option>
            <option value="title-asc">Titolo (A-Z)</option>
            <option value="title-desc">Titolo (Z-A)</option>
            <option value="category-asc">Categoria (A-Z)</option>
            <option value="category-desc">Categoria (Z-A)</option>
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded border border-[#568a99] bg-[#e9a716] px-4 py-2 font-semibold text-[#292929] hover:bg-[#c7481d] transition"
          >
            Filtra per categoria
          </button>
        </div>

        {/* Griglia album */}
        {filteredAlbums.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredAlbums.map(album => (
              <div
                key={album.id}
                className="flex flex-col border-1 border-[#568a992c]"
              >
                <Link to={`/albums/${album.id}`}>
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="h-50 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <div className="flex flex-col flex-grow justify-between">
                  <div>
                    <Link
                      to={`/albums/${album.id}`}
                      className="block text-lg font-semibold text-[#568a99] hover:text-[#c7481d] mb-1"
                    >
                      {album.title}
                    </Link>
                    <p className="text-sm text-[#292929] mb-1">
                      {album.artist} – {album.year}
                    </p>
                    <p className="text-sm text-[#568a99]">
                      {album.category} – ★ {album.rating}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between items-center gap-2">
                    <button
                      onClick={() => toggleCompare(album)}
                      disabled={
                        filledCompareList.length === 4 && !filledCompareList.some(a => a.id === album.id)
                      }
                      className="flex-1 rounded border border-[#568a99] bg-[#e9a716] px-3 py-1 text-sm font-semibold text-[#292929] hover:bg-[#c7481d] disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      {filledCompareList.some(a => a.id === album.id) ? 'Rimuovi' : 'Confronta'}
                    </button>

                    <button
                      onClick={() => {
                        isFavorite(album.id)
                          ? removeFavorite(album.id)
                          : addFavorite(album)
                      }}
                      className="text-xl text-[#c7481d] hover:scale-110 transition"
                      aria-label={
                        isFavorite(album.id) ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'
                      }
                    >
                      {isFavorite(album.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#292929] text-center mt-12 text-lg font-semibold">
            Non ci sono album disponibili
          </p>
        )}

        <FilteredModal
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  )
}

export default Home
