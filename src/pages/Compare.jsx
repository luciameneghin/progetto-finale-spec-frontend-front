import React from 'react'
import { useLocation } from 'react-router-dom'

const Compare = () => {
  const location = useLocation()
  const { compareList } = location.state || {}
  console.log('Album:', compareList)


  if (!compareList) {
    return <p>Caricamento dati confronto oppure seleziona prima due album da confrontare.</p>
  }

  if (compareList.length !== 2) {
    return <p>Seleziona prima due album da confrontare.</p>
  }

  const [albumA, albumB] = compareList

  const renderAlbumDetails = ({ album }) => (
    <div className="border p-4 rounded shadow w-full">
      <h2 className="text-xl font-bold mb-2">{album.title}</h2>
      <img src={album.cover} alt={album.title} className="w-full h-auto mb-4 rounded" />
      <p><strong>Categoria:</strong> {album.category}</p>
      <p><strong>Anno di uscita:</strong> {album.year}</p>
      <p><strong>Artista:</strong> {album.artist}</p>
      <p><strong>Durata:</strong> {album.duration}</p>
      <p><strong>Etichetta:</strong> {album.label}</p>
      <p><strong>Descrizione:</strong> {album.description}</p>
    </div>
  )

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Confronto tra album musicali anni '70</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderAlbumDetails(albumA)}
        {renderAlbumDetails(albumB)}
      </div>
    </div>
  )
}

export default Compare





