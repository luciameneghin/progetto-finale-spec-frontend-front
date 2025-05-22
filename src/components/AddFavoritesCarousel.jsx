import { useState, useEffect, useCallback, useMemo } from 'react'
import { useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const AddFavoritesCarousel = () => {
  const { addFavorite, isFavorite, removeFavorite } = useContext(FavoritesContext)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const res = await fetch("http://localhost:3001/albums")
        const data = await res.json()

        const fullAlbum = await Promise.all(
          data.map(async (album) => {
            const resAlbum = await fetch(`http://localhost:3001/albums/${album.id}`)
            const quoteAlbum = await resAlbum.json()
            return quoteAlbum.album
          })
        )

        setAlbums(fullAlbum)
      } catch (err) {
        console.error("Errore nel fetch:", err)
      }
    }

    fetchAlbums()
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => clearTimeout(timeout)
  }, [search])

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredAlbums = useMemo(() => {
    return albums.filter(
      (album) =>
        !isFavorite(album.id) &&
        album.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [albums, isFavorite, search]);


  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-[#568a99] mb-4 text-center">
        Aggiungi altri album ai preferiti
      </h2>

      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Cerca per titolo..."
          onChange={handleSearchChange}
          className="border border-[#568a99] rounded-lg p-2 w-full max-w-sm text-[#292929]"
        />
      </div>

      {filteredAlbums.length === 0 ? (
        <div className="text-center text-[#c7481d] font-semibold">
          Non ci sono album che corrispondono alla ricerca.
        </div>
      ) : (
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={false}
          centerMode
          centerSlidePercentage={33.3}
          swipeable
          emulateTouch
          className="max-w-6xl mx-auto"
        >
          {filteredAlbums.map((album) => (
            <div key={album.id} className="p-2">
              <div className="bg-[#f9f6f2] border-2 border-[#e9a716] rounded-xl p-4 shadow-md h-full flex flex-col">
                <img
                  src={album.cover}
                  alt={album.title}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
                <h3 className="text-lg font-semibold text-[#292929]">
                  {album.title}
                </h3>
                <p className="text-sm text-[#568a99]">
                  {album.artist} — {album.year}
                </p>
                <div className="flex justify-between items-center mt-auto pt-2">
                  <button
                    onClick={() => handleAddOrRemove(album)}
                    className="text-[#e9a716] hover:text-[#c7481d] text-2xl transition"
                    aria-label="Aggiungi ai preferiti"
                  >
                    {isFavorite(album.id) ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}


export default AddFavoritesCarousel
