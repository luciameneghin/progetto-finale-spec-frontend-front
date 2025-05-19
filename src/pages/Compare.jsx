import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Compare = () => {
  const location = useLocation()
  const { compareList } = location.state || {}

  if (!compareList) {
    return <p className="text-center text-[#c7481d] font-semibold mt-12">Caricamento dati confronto oppure seleziona prima due album da confrontare.</p>
  }

  if (compareList.length !== 2) {
    return <p className="text-center text-[#c7481d] font-semibold mt-12">Seleziona prima due album da confrontare.</p>
  }

  const [albumA, albumB] = compareList

  const renderAlbumDetails = ({ album }) => (
    <div className="bg-[#f9f6f2] rounded-xl shadow-lg p-6 flex flex-col items-center text-[#292929] border-4 border-[#568a99] hover:border-[#e9a716] transition-all duration-300">
      <h2 className="text-2xl font-extrabold mb-4 text-[#c7481d]">{album.title}</h2>
      <img
        src={album.cover}
        alt={album.title}
        className="w-full max-w-xs rounded-lg mb-6 shadow-md object-cover"
      />
      <div className="w-full space-y-2 text-lg font-medium">
        <p><span className="font-bold text-[#568a99]">Categoria:</span> {album.category}</p>
        <p><span className="font-bold text-[#568a99]">Anno di uscita:</span> {album.year}</p>
        <p><span className="font-bold text-[#568a99]">Artista:</span> {album.artist}</p>
        <p><span className="font-bold text-[#568a99]">Durata:</span> {album.duration}</p>
        <p><span className="font-bold text-[#568a99]">Etichetta:</span> {album.label}</p>
        <p className="font-semibold text-[#c7481d] mb-2">Canzoni:</p>
        <ul className="list-disc list-inside space-y-1 text-[#292929]">
          {album.tracks.map((track, index) => (
            <li key={index}>{track.title}</li>
          ))}
        </ul>
        <p><span className="font-bold text-[#568a99]">Descrizione:</span></p>
        <p className="text-sm text-[#292929]/90 leading-relaxed">{album.description}</p>

      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto p-8 bg-[#292929]/10 rounded-2xl shadow-inner">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-[#c7481d] tracking-wide">
        Confronto tra album musicali anni '70
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {renderAlbumDetails(albumA)}
        {renderAlbumDetails(albumB)}
      </div>
    </div >
  )
}


export default Compare





