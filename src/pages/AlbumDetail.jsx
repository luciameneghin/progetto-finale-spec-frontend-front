import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AlbumDetail = () => {
  const [albumDetail, setAlbumDetail] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  console.log('ID da URL:', id)

  async function fetchAlbum() {
    try {
      const response = await fetch(`http://localhost:3001/albums/${id}`)
      const data = await response.json()
      console.log('Dati ricevuti dal server:', data)
      setAlbumDetail(data.album)  // salvo solo l'oggetto album
    } catch (error) {
      console.error('Errore nel caricamento dell\'album:', error)
    }
  }

  useEffect(() => {
    fetchAlbum()
  }, [id])

  if (!albumDetail) {
    return <p>Caricamento in corso...</p>
  }

  return (
    <div className="p-4">
      <button onClick={() => navigate('/')}>Torna alla home</button>
      <h1 className="text-2xl font-bold mb-4">{albumDetail.title}</h1>
      <p><strong>Categoria:</strong> {albumDetail.category}</p>
      <p><strong>Artista:</strong> {albumDetail.artist}</p>
      <p><strong>Anno di uscita:</strong> {albumDetail.year}</p>
      <p><strong>Durata:</strong> {albumDetail.duration}</p>
      <p><strong>Descrizione:</strong> {albumDetail.description}</p>

      <p><strong>Canzoni:</strong></p>
      <ul>
        {albumDetail.tracks.map((track, index) => (
          <li key={index}>{track.title}</li>
        ))}
      </ul>

      <img
        src={albumDetail.cover}
        alt={albumDetail.title}
        className="mt-4 max-w-md rounded shadow"
      />
    </div>
  )
}

export default AlbumDetail




