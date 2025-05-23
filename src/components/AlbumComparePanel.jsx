import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const AlbumComparePanel = ({ albums, compareList, setCompareList, activeSlot, setActiveSlot }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const max_album = 4

  const filteredAlbums = useMemo(() => {
    if (searchQuery.trim() === '') return albums
    return albums.filter((album) => {
      const title = album.title || album.album?.title || ''
      return title.toLowerCase().includes(searchQuery.toLowerCase())
    })
  }, [searchQuery, albums])

  const handleSelectAlbum = useCallback((album) => {
    setCompareList(prev => {
      const updated = [...prev]
      updated[activeSlot] = album
      return updated
    })
    setActiveSlot(null)
    setSearchQuery('')
  }, [activeSlot, setCompareList, setActiveSlot])

  const handleClearSlot = useCallback((index) => {
    setCompareList(prev => {
      const updated = [...prev]
      updated[index] = null
      return updated
    })
  }, [setCompareList])

  const handleCompare = useCallback(() => {
    const selectedAlbums = compareList.filter(Boolean)
    if (selectedAlbums.length >= 2) {
      navigate('/compare/:id', { state: { filledCompareList: selectedAlbums } })
    } else {
      alert('Seleziona almeno 2 album per confrontarli')
    }
  }, [compareList, navigate])

  return (
    <div className="border-4 border-[#568a99] bg-[#f9f6f2] rounded-xl p-6 shadow-lg mb-20">
      <h2 className="text-2xl font-extrabold text-center text-[#c7481d] mb-6">
        Seleziona almeno due album da confrontare
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
        {[...Array(max_album).keys()].map((index) => (
          <div
            key={index}
            className="flex-1 border-2 border-dashed border-[#e9a716] p-4 cursor-pointer hover:bg-[#e9a716]/10 transition"
            onClick={() => setActiveSlot(index)}
          >
            {compareList[index] ? (
              <div className="flex flex-col items-center text-[#292929]">
                <img
                  src={compareList[index].cover || compareList[index].album?.cover}
                  alt={compareList[index].title || compareList[index].album?.title}
                  className="w-45 h-45 object-cover shadow-md mb-2"
                />
                <p className="font-semibold text-center">
                  {compareList[index].title || compareList[index].album?.title}
                </p>
                <p className="text-center">
                  {compareList[index].artist || compareList[index].album?.artist}
                </p>
                <button
                  className="mt-2 text-sm text-[#c7481d] hover:underline"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClearSlot(index)
                  }}
                >
                  Rimuovi
                </button>
              </div>
            ) : (
              <p className="text-center text-[#568a99] font-medium">Clicca per selezionare</p>
            )}
          </div>
        ))}
      </div>

      {activeSlot !== null && (
        <div className="mt-6">
          {albums.length === 0 ? (
            <p className="text-center text-sm text-gray-500">Caricamento album...</p>
          ) : (
            <>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cerca un album..."
                className="w-full p-2 border border-[#568a99] rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#e9a716]"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-64 overflow-y-auto">
                {filteredAlbums.map((album) => (
                  <div
                    key={album.id}
                    className="cursor-pointer border rounded-lg p-2 hover:bg-[#e9a716]/20 transition"
                    onClick={() => handleSelectAlbum(album)}
                  >
                    <img
                      src={album.cover || album.album?.cover}
                      alt={album.title || album.album?.title}
                      className="w-full h-50 object-contain mb-2"
                    />
                    <p className="text-sm font-semibold mt-1 text-center">
                      {album.title || album.album?.title}
                    </p>
                  </div>
                ))}
              </div>
              {filteredAlbums.length === 0 && (
                <p className="text-center text-sm text-gray-500 mt-2">
                  Nessun album trovato.
                </p>
              )}
            </>
          )}
        </div>
      )}

      {compareList.filter(Boolean).length >= 2 && (
        <div className="mt-8 text-center">
          <button
            onClick={handleCompare}
            className="mt-6 px-4 py-2 bg-[#e9a716] text-[#292929] font-semibold rounded hover:bg-[#c7481d] transition"
          >
            Confronta
          </button>
        </div>
      )}
    </div>
  )
}

export default React.memo(AlbumComparePanel)

