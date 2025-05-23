import { useState, useEffect, useCallback, useMemo } from 'react'
import { useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const AddFavoritesCarousel = () => {
  const { addFavorite, isFavorite, removeFavorite } = useContext(FavoritesContext)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [albums, setAlbums] = useState([])
  const [slidePercentage, setSlidePercentage] = useState(33.3)

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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setSlidePercentage(100)
      } else if (width < 1024) {
        setSlidePercentage(50)
      } else {
        setSlidePercentage(33.3)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
        album.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [albums, isFavorite, debouncedSearch])

  return (
    <div className="mt-16 px-4 sm:px-8 overflow-visible">
      <h2 className="text-2xl font-bold text-[#c7481d] mb-6 text-center">
        Ecco alcuni album che potrebbero interessarti...
      </h2>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Cerca per titolo..."
          onChange={handleSearchChange}
          value={search}
          className="border border-[#292929] bg-[#f9f6f2] rounded-lg p-2 w-full max-w-sm text-[#292929] focus:outline-none focus:ring-2 focus:ring-[#c7481d]"
        />
      </div>

      <div className="relative overflow-visible z-10 pb-20">
        {filteredAlbums.length === 0 ? (
          <div className="text-center text-[#c7481d] font-semibold ">
            Non ci sono album che corrispondono alla ricerca.
          </div>
        ) : (
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={false}
            centerMode
            centerSlidePercentage={slidePercentage}
            swipeable
            emulateTouch
            showIndicators={true}
            className="mx-auto w-full"
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 -translate-x-full sm:-translate-x-1/2 z-20 p-2"
                >
                  <HiOutlineChevronLeft size={25} className="text-[#292929]" />
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 translate-x-full sm:translate-x-1/2 z-20"
                >
                  <HiOutlineChevronRight size={25} className="text-[#292929]" />
                </button>
              )
            }
          >
            {filteredAlbums.map((album) => (
              <div key={album.id} className="p-2">
                <div className="bg-[#f9f6f2] border-2 rounded border-[#292929] p-4 shadow-md h-[340px] flex flex-col w-[220px] sm:w-[270px] md:w-[280px] mx-auto">

                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full object-contain mb-4 sm:w-60 h-50"
                  />
                  <h3 className="text-lg font-semibold text-[#292929]">
                    {album.title}
                  </h3>
                  <p className="text-sm text-[#568a99] mb-2">
                    {album.artist} — {album.year}
                  </p>
                  <div className="flex justify-end mt-auto">
                    <button
                      onClick={() => handleAddOrRemove(album)}
                      className="text-[#e9a716] hover:text-[#c7481d] text-2xl transition"
                      aria-label={isFavorite(album.id) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
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
    </div >
  )
}

export default AddFavoritesCarousel

