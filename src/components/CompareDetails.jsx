const CompareDetails = ({ compareList, onRemoveAlbum }) => {
  const nonEmptyAlbums = compareList.filter(Boolean)

  return (
    <div className="mt-12 p-8 bg-[#292929]/10 rounded-2xl shadow-inner">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-[#c7481d]">
        Confronto tra album musicali anni '70
      </h1>

      {nonEmptyAlbums.length < 2 ? (
        <p className="text-center text-[#568a99]">
          Seleziona almeno due album per iniziare il confronto.
        </p>

      ) : (
        <div className={`grid gap-6 ${nonEmptyAlbums.length >= 4
          ? 'md:grid-cols-4'
          : nonEmptyAlbums.length === 3
            ? 'md:grid-cols-3'
            : 'md:grid-cols-2'
          }`}>
          {nonEmptyAlbums.map((album, i) => (
            <div key={album.id || i}>
              {renderAlbumDetails({ album, onRemove: onRemoveAlbum })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const renderAlbumDetails = ({ album, onRemove }) => (
  <div className="relative bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-[#292929] border-4 border-[#568a99]">
    <button
      onClick={() => onRemove(album.id)}
      className="absolute top-2 right-2 text-[#c7481d] hover:text-[#292929] text-xl font-bold"
      title="Rimuovi album dal confronto"
    >
      ✕
    </button>
    <h2 className="text-xl font-extrabold mb-4 text-[#c7481d]">{album.title}</h2>
    <img src={album.cover} alt={album.title} className="w-full max-w-xs rounded-lg mb-4" />
    <p><strong>Artista:</strong> {album.artist}</p>
    <p><strong>Categoria:</strong> {album.category}</p>
    <p><strong>Anno:</strong> {album.year}</p>
    <p><strong>Etichetta:</strong> {album.label}</p>
    <p className="mt-2"><strong>Tracce:</strong></p>
    <ul className="list-disc list-inside text-sm">
      {album.tracks?.map((track, i) => (
        <li key={i}>{track.title}</li>
      ))}
    </ul>
    <p className="mt-2 text-sm">{album.description}</p>
  </div>
)

export default CompareDetails


