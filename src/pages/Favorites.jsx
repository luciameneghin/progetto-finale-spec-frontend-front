import { useContext } from "react"
import { FavoritesContext } from "../context/FavoritesContext"
import { Link } from "react-router-dom"
import AddFavoritesCarousel from "../components/AddFavoritesCarousel"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaHeart } from 'react-icons/fa'

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext)

  if (!favorites) {
    return (
      <p className="text-center text-[#c7481d] font-semibold mt-12">
        Caricamento dati preferiti...
      </p>
    )
  }

  if (favorites.length === 0) {
    return (
      <p className="text-center text-[#292929] font-semibold mt-12">
        Nessun album preferito trovato.
      </p>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-45">
      <h1 className="text-3xl font-extrabold text-[#c7481d] mb-8 text-center">
        Album Preferiti
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-30 border-b border-b-gray-400">
        {favorites.map((fav) => (
          <div
            key={fav.id}
            className="bg-white shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={fav.cover}
              alt={fav.title}
              className="w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold text-[#292929] mb-2">{fav.title}</h2>
              <p className="text-sm text-[#568a99] mb-1">
                {fav.artist} — {fav.year}
              </p>
              <p className="text-sm text-[#292929] mb-3">
                <strong>Categoria:</strong> {fav.category} <br />
                <strong>Durata:</strong> {fav.duration}
              </p>
              <div className="relative">
                <button
                  onClick={() => {
                    removeFavorite(fav.id)
                    toast.info(`Album "${fav.title}" rimosso dai preferiti.`, {
                      position: "bottom-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      theme: "colored"
                    })
                  }}
                  className="absolute bottom-93 right-0 text-2xl text-[#e9a716] border-2 rounded-full p-2 hover:text-amber-800"
                  aria-label="Rimuovi dai preferiti"
                >
                  <FaHeart />
                </button>
              </div>

              <Link
                to={`/albums/${fav.id}`}
                className="mt-auto inline-block text-[#e9a716] font-semibold hover:text-[#c7481d] transition"
              >
                Visualizza dettagli →
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-10">
        <AddFavoritesCarousel />
      </div>
    </div >
  )
}

export default Favorites



