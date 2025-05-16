import { useContext } from "react"
import { FavoritesContext } from "../context/FavoritesContext"
import { Link } from "react-router-dom"

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext)

  if (!favorites) {
    return <p>Caricamento dati preferiti...</p>
  }

  if (favorites.length === 0) {
    return <p>Nessun albero preferito trovato.</p>
  }

  return (
    <div>
      <h1>pagina degli alberi preferiti</h1>
      {favorites.map((fav) => (
        <div key={fav.id} className="border p-4 rounded shadow w-full">
          <h2 className="text-xl font-bold mb-2">{fav.title}</h2>
          <img src={fav.image} alt={fav.title} className="w-full h-auto mb-4 rounded" />
          <p><strong>Categoria:</strong> {fav.category}</p>
          <p><strong>Nome scientifico:</strong> {fav.scientificName}</p>
          <p><strong>Origine:</strong> {fav.origin}</p>
          <Link to={`/trees/${fav.id}`} className="text-blue-500">Visualizza dettagli</Link>
        </div>
      ))}
    </div>
  )
}

export default Favorites
