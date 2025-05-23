import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import FilteredModal from '../components/FilteredModal.jsx'
import { FavoritesContext } from '../context/FavoritesContext.jsx'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import AlbumCarousel from '../components/AlbumCarousel'
import AlbumComparePanel from '../components/AlbumComparePanel'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CitCarousel from '../components/CitCarousel.jsx'

const Home = () => {
  // stati e context
  const [albums, setAlbums] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortOption, setSortOption] = useState('')
  const [compareList, setCompareList] = useState([null, null, null, null])
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [activeSlot, setActiveSlot] = useState(null);


  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext)

  const fetchAlbums = useCallback(async () => {
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
  }, [])

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
  }, [albums, debouncedSearchTerm, selectedCategory, sortOption])


  const toggleCompare = useCallback(async (album) => {
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
  }, [compareList])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchTerm])

  useEffect(() => {
    fetchAlbums()
  }, [fetchAlbums])

  const filledCompareList = compareList.filter(Boolean)
  const handleAddOrRemove = useCallback((album) => {
    if (isFavorite(album.id)) {
      removeFavorite(album.id)
      toast.info(`Album "${album.title}" rimosso dai preferiti.`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "colored"
      })
    } else {
      addFavorite(album)
      toast.success(`Album "${album.title}" aggiunto ai preferiti!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "colored"
      })
    }
  }, [addFavorite, removeFavorite, isFavorite])

  return (
    <div>
      {/* Carousel */}
      <AlbumCarousel />
      <div className='bg-white shadow-xl'>
        <div className="container mx-auto px-4 py-5">
          <h1 className='text-4xl font-extrabold text-center text-[#c7481d] py-30'>Compara. Analizza. Scegli il tuo album perfetto.</h1>
          <AlbumComparePanel
            albums={albums}
            compareList={compareList}
            setCompareList={setCompareList}
            activeSlot={activeSlot}
            setActiveSlot={setActiveSlot}
          />
        </div>
      </div>

      {/* Controlli di ricerca, filtro e ordinamento */}
      <div className='bg-[#292929]' style={{ position: 'relative', minHeight: '400px' }}>

        <div className='container mx-auto' style={{ position: 'relative', zIndex: 100, padding: '20px' }}>
          <h1 className='text-2xl font-extrabold text-[#e9a716] pt-15 pb-5'>Gli iconici album anni '70</h1>
          <div className='grid grid-cols-1 gap-6 pb-12 '>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <input
                type="text"
                placeholder="Cerca un album..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="flex-1 min-w-[200px] rounded border border-[#568a99] px-4 py-2 text-[#292929] focus:outline-none focus:ring-2 focus:ring-[#e9a716] bg-[#f9f6f2]"
              />

              <select
                value={sortOption}
                onChange={e => setSortOption(e.target.value)}
                className="rounded border border-[#568a99] px-4 py-2.5 text-[#292929] focus:outline-none focus:ring-2 focus:ring-[#e9a716] bg-[#f9f6f2]"
              >
                <option value="">Ordina per</option>
                <option value="title-asc">Titolo (A-Z)</option>
                <option value="title-desc">Titolo (Z-A)</option>
                <option value="category-asc">Categoria (A-Z)</option>
                <option value="category-desc">Categoria (Z-A)</option>
              </select>

              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded border border-[#568a99] bg-[#e9a716] px-4 py-2 font-semibold text-white transition"
              >
                Filtra per categoria
              </button>
            </div>
          </div>

          {/* Griglia album */}
          {filteredAlbums.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 pb-12">
              {filteredAlbums.map(album => (
                <div
                  key={album.id}
                  className="flex flex-col shadow shadow-gray-200 bg-white"
                >
                  <Link to={`/albums/${album.id}`}>
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="w-75 object-cover mx-auto shadow-md mb-2"
                    />
                    <h1
                      to={`/albums/${album.id}`}
                      className="block text-lg font-semibold text-[#568a99] hover:text-[#c7481d] mb-1 px-3"
                    >
                      {album.title}
                    </h1>
                  </Link>
                  <div className="flex flex-col flex-grow justify-between px-3">
                    <div>
                      <p className="text-sm text-[#292929] mb-1">
                        {album.artist}
                      </p>
                      <p className="text-sm text-[#568a99]">
                        {album.category}
                      </p>
                    </div>

                    <div className="mt-4 flex justify-between items-center gap-2 relative">
                      <button
                        onClick={() => handleAddOrRemove(album)}
                        className="text-sm text-[#e9a716] hover:scale-110 transition absolute right-0 bottom-3 border-2 rounded-full p-2"
                        aria-label={isFavorite(album.id) ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}>
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

      <div className='bg-white py-20'>
        <CitCarousel />
      </div>
    </div>
  )
}

export default React.memo(Home)
