import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AlbumDetail = () => {
  const [albumDetail, setAlbumDetail] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  async function fetchAlbum() {
    try {
      const response = await fetch(`http://localhost:3001/albums/${id}`)
      const data = await response.json()
      setAlbumDetail(data.album)
    } catch (error) {
      console.error('Errore nel caricamento dell\'album:', error)
    }
  }

  useEffect(() => {
    fetchAlbum()
  }, [id])

  if (!albumDetail) {
    return (
      <p className="text-center text-[#c7481d] font-semibold mt-12">
        Caricamento in corso...
      </p>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#f9f6f2] rounded-2xl shadow-lg border-4 border-[#568a99] m-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 px-4 py-2 rounded bg-[#e9a716] text-[#292929] font-semibold hover:bg-[#c7481d] transition"
      >
        ← Torna alla Home
      </button>

      <h1 className="text-4xl font-extrabold text-[#c7481d] mb-4">{albumDetail.title}</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={albumDetail.cover}
          alt={albumDetail.title}
          className="w-full max-w-sm rounded-lg shadow-md object-cover"
        />

        <div className="flex-1 text-[#292929]">
          <p className="mb-2">
            <strong className="text-[#568a99]">Categoria:</strong> {albumDetail.category}
          </p>
          <p className="mb-2">
            <strong className="text-[#568a99]">Artista:</strong> {albumDetail.artist}
          </p>
          <p className="mb-2">
            <strong className="text-[#568a99]">Anno di uscita:</strong> {albumDetail.year}
          </p>
          <p className="mb-2">
            <strong className="text-[#568a99]">Durata:</strong> {albumDetail.duration}
          </p>

          <p className="mb-2 font-semibold text-[#c7481d]">Descrizione:</p>
          <p className="mb-6 text-sm text-[#292929]/90 leading-relaxed">{albumDetail.description}</p>

          <p className="font-semibold text-[#c7481d] mb-2">Canzoni:</p>
          <ul className="list-disc list-inside space-y-1 text-[#292929]">
            {albumDetail.tracks.map((track, index) => (
              <li key={index}>{track.title}</li>
            ))}
          </ul>
          <p className="mb-2"><strong className="text-[#568a99]">Prezzo:</strong></p>
          <ul className="list-disc list-inside space-y-1 text-[#292929] list-none">
            <li>CD: {albumDetail.price.cd} €</li>
            <li>Vinile: {albumDetail.price.vinyl} €</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AlbumDetail





