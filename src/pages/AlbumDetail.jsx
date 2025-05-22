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
      > ← Torna alla Home</button>

      <div>
        <div className='flex'>
          <div>
            <img
              src={albumDetail.cover}
              alt={albumDetail.title}
              className="w-50 max-w-sm object-cover"
            />
          </div>

          {/* blocco di testo */}
          <div className="flex flex-col justify-between w-full ml-4">
            {/* Riga 1: artista, titolo, rating */}
            <div className="flex justify-between items-center">
              <p className="text-[#568a99] text-2xl font-bold mt-1">
                {albumDetail.artist}
                <span className="text-2xl font-bold text-[#c7481d]"> - {albumDetail.title}</span>
              </p>
              <h3 className="text-[#e9a716]">★ {albumDetail.rating}</h3>
            </div>

            {/* Riga 2: etichetta sotto */}
            <div className="flex flex-col mt-4 gap-2">
              <div className='flex gap-2'>
                <label className="font-semibold">Etichetta:</label>
                <p>{albumDetail.label}</p>
              </div>
              <div className='flex gap-2'>
                <label className="font-semibold">Paese:</label>
                <p>{albumDetail.origin}</p>
              </div>
              <div className='flex gap-2'>
                <label className="font-semibold">Anno di uscita:</label>
                <p>{albumDetail.year}</p>
              </div>
              <div className='flex gap-2'>
                <label className="font-semibold">Genere:</label>
                <p>{albumDetail.category}</p>
              </div>
              <div className='flex gap-2'>
                <label className="font-semibold">Prezzi</label>
                <div>
                  <p>CD: {albumDetail.price.cd} €</p>
                  <p>Vinile: {albumDetail.price.vinyl} €</p>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* tracce */}
        <div className='my-5'>
          <label className='font-semibold'>Elenco tracce:</label>
          <p>Tracce totali: {albumDetail.tracksNumber}</p>
          <p>Durata totale dell'album: {albumDetail.duration}</p>
          <table>
            <tbody>
              {albumDetail.tracks.map((track, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="py-2">{track.title}</td>
                  <td className="py-2">{track.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* descrizione */}
        <div>
          <label className='font-semibold'>Descrizione:</label>
          <p className="text-sm text-[#292929] mb-1">{albumDetail.description}</p>
        </div>
      </div>

      {/* <div className="flex flex-col md:flex-row gap-8">

        <div className="flex-1 text-[#292929]">
          <p className="mb-2">
            <strong className="text-[#568a99]">Categoria:</strong> {albumDetail.category}
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
      </div> */}
    </div>
  )
}

export default AlbumDetail





