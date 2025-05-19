import { useContext } from "react"
import { FavoritesContext } from "../context/FavoritesContext"
import { Link } from "react-router-dom"

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext)

  if (!favorites) {
    return <p>Caricamento dati preferiti...</p>
  }

  if (favorites.length === 0) {
    return <p>Nessun album preferito trovato.</p>
  }

  return (
    <div>
      <h1>Pagina degli album preferiti</h1>
      {favorites.map((fav) => (
        <div key={fav.id} className="border p-4 rounded shadow w-full mb-6">
          <h2 className="text-xl font-bold mb-2">{fav.title}</h2>
          <img src={fav.cover} alt={fav.title} className="w-full h-auto mb-4 rounded" />
          <p><strong>Categoria:</strong> {fav.category}</p>
          <p><strong>Artista:</strong> {fav.artist}</p>
          <p><strong>Anno di uscita:</strong> {fav.year}</p>
          <p><strong>Durata:</strong> {fav.duration}</p>
          <Link to={`/albums/${fav.id}`} className="text-blue-500">Visualizza dettagli</Link>
        </div>
      ))}
    </div>
  )
}

export default Favorites


