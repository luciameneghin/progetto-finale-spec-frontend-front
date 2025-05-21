import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CompareDetails from '../components/CompareDetails'
import AlbumSelectorModal from '../components/AlbumSelectorModal'
import AlbumComparePanel from '../components/AlbumComparePanel'

const Compare = ({ handleRemoveAlbum }) => {

  const location = useLocation()

  const initialList = location.state?.filledCompareList || []
  const paddedList = [...initialList]
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)
  const [albums, setAlbums] = useState([])
  const [activeSlot, setActiveSlot] = useState(null)

  while (paddedList.length < 4) {
    paddedList.push(null)
  }

  const [compareList, setCompareList] = useState(paddedList)

  useEffect(() => {
    async function fetchAllAlbums() {
      try {
        const res = await fetch('http://localhost:3001/albums')
        const basicAlbums = await res.json()

        const responses = await Promise.all(
          basicAlbums.map(album =>
            fetch(`http://localhost:3001/albums/${album.id}`)
          )
        )
        const fullAlbums = await Promise.all(responses.map(r => r.json()))
        console.log('Album completi:', fullAlbums)

        setAlbums(fullAlbums)
      } catch (err) {
        console.error('Errore nel caricamento degli album completi:', err)
      }
    }

    fetchAllAlbums()
  }, [])

  return (
    <div className="container mx-auto px-4 py-6">
      <AlbumComparePanel
        albums={albums}
        compareList={compareList}
        setCompareList={setCompareList}
        activeSlot={activeSlot}
        setActiveSlot={setActiveSlot}
      />
      <CompareDetails
        compareList={compareList}
        onRemoveAlbum={handleRemoveAlbum}
      />

      <AlbumSelectorModal
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        albums={albums || albums.album}
        onSelect={async (newAlbum) => {
          try {
            const albumId = newAlbum.id || newAlbum.album?.id;
            const res = await fetch(`http://localhost:3001/albums/${albumId}`);
            const data = await res.json();


            // Assicurati di accedere sempre alla proprietà album
            const selectedAlbum = data.success && data.album ? data.album : null;
            if (selectedAlbum) {
              const updated = [...compareList];
              updated[activeSlot] = selectedAlbum;
              setCompareList(updated);
              setActiveSlot(null);
            } else {
              console.error('Struttura della risposta non valida:', data);
            }
          } catch (err) {
            console.error('Errore nel recuperare i dettagli dell\'album selezionato:', err);
          }
        }}
      />
    </div>
  )
}

export default Compare
