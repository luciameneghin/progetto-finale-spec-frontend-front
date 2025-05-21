import React, { useState, useEffect } from 'react'

const AlbumSelectorModal = ({ isOpen, onClose, onSelect }) => {
  const [albums, setAlbums] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (isOpen) {
      fetch('http://localhost:3001/albums')
        .then(response => response.json())
        .then(data => setAlbums(data))
        .catch(error => console.error('Error fetching albums:', error))
    }
  }, [isOpen]);

  const filtered = albums.filter(album =>
    album.title.toLowerCase().includes(search.toLowerCase())
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-xl font-bold text-[#c7481d]"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-[#568a99]">Scegli album da confrontare</h2>
        <input
          type="text"
          placeholder="Cerca album..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-[#568a99] px-4 py-2 mb-4 rounded"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {filtered.map(album => (
            <div
              key={album.id}
              onClick={() => {
                onSelect(album)
                onClose()
              }}
              className="cursor-pointer border border-[#568a99] rounded p-2 hover:bg-[#e9a716]/20"
            >
              <img src={album.cover} alt={album.title} className="w-full h-32 object-cover mb-2 rounded" />
              <p className="text-sm font-medium">{album.title}</p>
              <p className="text-xs text-[#292929]">{album.artist}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AlbumSelectorModal
