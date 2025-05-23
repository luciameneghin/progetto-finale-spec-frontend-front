import { useParams } from 'react-router-dom'
import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import AddFavoritesCarousel from '../components/AddFavoritesCarousel'


const AlbumDetail = () => {
  const [albumDetail, setAlbumDetail] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext)

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
    <div className='pt-50 pb-20 bg-[#f9f6f2]'>
      <h1 className="text-center text-4xl sm:text-4xl font-extrabold text-[#c7481d] mb-10">Dettagli dell'album</h1>
      <div className="max-w-6xl mx-auto py-10 px-20 bg-white rounded-2xl shadow-lg border-2 border-[#292929] m-8">
        <div>
          <div className='flex'>
            <div>
              <img
                src={albumDetail.cover}
                alt={albumDetail.title}
                className="w-60 max-w-sm object-cover shadow-md shadow-[#292929]"
              />
            </div>

            {/* blocco di testo */}
            <div className="flex flex-col justify-between w-full ml-4">
              <div className="flex justify-between items-center">
                <p className="text-[#568a99] text-2xl font-bold mt-1">
                  {albumDetail.artist}
                  <span className="text-2xl font-bold text-[#c7481d]"> - {albumDetail.title}</span>
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      if (isFavorite(albumDetail.id)) {
                        removeFavorite(albumDetail.id)
                        toast.info(`Album "${albumDetail.title}" rimosso dai preferiti.`, {
                          position: "bottom-right",
                          autoClose: 3000,
                          theme: "colored",
                        })
                      } else {
                        addFavorite(albumDetail)
                        toast.success(`Album "${albumDetail.title}" aggiunto ai preferiti!`, {
                          position: "bottom-right",
                          autoClose: 3000,
                          theme: "colored",
                        })
                      }
                    }}
                    className={`flex items-center gap-2 p-2 rounded-full font-semibold border-2 transition-colors
      ${isFavorite(albumDetail.id)
                        ? 'text-[#c7481d] border-[#c7481d] hover:bg-red-100'
                        : 'text-[#e9a716] border-[#e9a716] hover:bg-yellow-100'}
    `}
                  >
                    {isFavorite(albumDetail.id) ? <FaHeart className="text-[#c7481d]" /> : <FaRegHeart className="text-[#e9a716]" />}
                  </button>
                </div>

              </div>

              <div className="flex flex-col mt-4 gap-2">
                <div className='flex gap-2'>
                  <label className="text-sm uppercase tracking-wider text-[#568a99] font-semibold">Etichetta:</label>
                  <p className="text-[#292929]">{albumDetail.label}</p>
                </div>
                <div className='flex gap-2'>
                  <label className="text-sm uppercase tracking-wider text-[#568a99] font-semibold">Paese:</label>
                  <p>{albumDetail.origin}</p>
                </div>
                <div className='flex gap-2'>
                  <label className="text-sm uppercase tracking-wider text-[#568a99] font-semibold">Anno di uscita:</label>
                  <p>{albumDetail.year}</p>
                </div>
                <div className='flex gap-2'>
                  <label className="text-sm uppercase tracking-wider text-[#568a99] font-semibold">Genere:</label>
                  <p>{albumDetail.category}</p>
                </div>
                <div className='flex gap-2'>
                  <label className="text-sm uppercase tracking-wider text-[#568a99] font-semibold">Prezzi:</label>
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
            <label className="text-sm uppercase tracking-wider text-[#568a99] font-semibold">Elenco tracce:</label>
            <p>Tracce totali: {albumDetail.tracksNumber}</p>
            <p className='pb-10'>Durata totale dell'album: {albumDetail.duration} min</p>
            <table className='w-full max-w-xl mx-auto border border-gray-300 shadow-sm'>
              <thead>
                <tr className="bg-[#f9f6f2] text-left text-[#292929]">
                  <th className="py-2 px-4 font-semibold">Titolo</th>
                  <th className="py-2 px-4 font-semibold">Durata</th>
                </tr>
              </thead>
              <tbody>
                {albumDetail.tracks.map((track, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-t border-gray-200`}>
                    <td className="py-2 px-4">{track.title}</td>
                    <td className="py-2 px-4">{track.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* descrizione */}
          <div className='py-10'>
            <label className="text-sm uppercase tracking-wider text-[#568a99] font-semibold">Descrizione:</label>
            <p>{albumDetail.description}</p>
          </div>
        </div>
      </div>
      <div className='bg-[#f9f6f2] py-10'>
        <AddFavoritesCarousel />
      </div>
    </div>
  )
}

export default React.memo(AlbumDetail)





