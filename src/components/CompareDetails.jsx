import React, { useMemo } from 'react'

const CompareDetails = ({ compareList, onRemoveAlbum }) => {
  const nonEmptyAlbums = useMemo(() => compareList.filter(Boolean), [compareList])

  return (
    <div className="mt-12 p-8">

      {nonEmptyAlbums.length < 2 ? (
        <div className="py-50">
          <p className="text-center text-[#568a99] font-semibold text-3xl">
            Seleziona almeno due album per iniziare il confronto.
          </p>

        </div>

      ) : (
        <div className={`grid gap-6 ${nonEmptyAlbums.length >= 4
          ? 'md:grid-cols-4'
          : nonEmptyAlbums.length === 3
            ? 'md:grid-cols-3'
            : 'md:grid-cols-2'
          }`}>
          {nonEmptyAlbums.map((album, i) => {
            const key = album?.id ? `album-${album.id}` : `slot-${i}`
            return (
              <div key={key}>
                {renderAlbumDetails(album, onRemoveAlbum)}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const renderAlbumDetails = (album) => {
  const resolvedAlbum = album?.album || album
  console.log('Album da confrontare:', resolvedAlbum)
  return (
    <div className="relative bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-[#292929] border-4 border-[#568a99]">
      <h2 className="text-xl font-extrabold mb-4 text-[#c7481d]">{resolvedAlbum.title}</h2>
      <img src={resolvedAlbum.cover} alt={resolvedAlbum.title} className="w-full max-w-xs rounded-lg mb-4" />
      <p><strong>Artista:</strong> {resolvedAlbum.artist}</p>
      <p><strong>Categoria:</strong> {resolvedAlbum.category}</p>
      <p><strong>Anno:</strong> {resolvedAlbum.year}</p>
      <p><strong>Etichetta:</strong> {resolvedAlbum.label}</p>
      <p className="mt-2"><strong>Prezzi:</strong></p>
      <ul>
        <li><strong>CD:</strong> {resolvedAlbum.price.cd}€</li>
        <li><strong>Vinile:</strong> {resolvedAlbum.price.vinyl}€</li>
      </ul>
      <p className="mt-2"><strong>Tracce:</strong></p>
      {Array.isArray(resolvedAlbum.tracks) && resolvedAlbum.tracks.length > 0 ? (
        <ul className="list-disc list-inside text-sm">
          {resolvedAlbum.tracks.map((track, i) => (
            <li key={i}>{track.title}{track.duration ? ` - ${track.duration}` : ''}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm italic text-gray-500">Nessuna traccia disponibile</p>
      )}
    </div>
  )
}

export default React.memo(CompareDetails)



