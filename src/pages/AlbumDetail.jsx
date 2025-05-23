import { useParams } from 'react-router-dom'
import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const AlbumDetail = () => {
  const [albumDetail, setAlbumDetail] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  const fetchAlbum = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/albums/${id}`)
      const data = await response.json()
      setAlbumDetail(data.album)
    } catch (error) {
      console.error('Errore nel caricamento dell\'album:', error)
    }
  }, [id])

  useEffect(() => {
    fetchAlbum()
  }, [fetchAlbum])

  if (!albumDetail) {
    return (
      <p className="text-center text-[#c7481d] font-semibold mt-12">
        Caricamento in corso...
      </p>
    )
  }

  return (
    <div className='mt-50'>
      <h1 className=''>Ecco i dettagli del tuo album</h1>
      <div className="max-w-6xl mx-auto py-10 px-20 bg-[#f9f6f2] rounded-2xl shadow-lg border-4 border-[#568a99] m-8">
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
              <div className="flex justify-between items-center">
                <p className="text-[#568a99] text-2xl font-bold mt-1">
                  {albumDetail.artist}
                  <span className="text-2xl font-bold text-[#c7481d]"> - {albumDetail.title}</span>
                </p>
              </div>

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
          <div className='my-10'>
            <label className='font-semibold'>Elenco tracce:</label>
            <p>Tracce totali: {albumDetail.tracksNumber}</p>
            <p className='pb-10'>Durata totale dell'album: {albumDetail.duration}</p>
            <table className='w-1/2 mx-auto'>
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
          <div className='py-10'>
            <label className='font-semibold'>Descrizione:</label>
            <p className="text-sm text-[#292929] mb-1">{albumDetail.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AlbumDetail)





