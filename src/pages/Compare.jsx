import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CompareDetails from '../components/CompareDetails'
import AlbumSelectorModal from '../components/AlbumSelectorModal'
import AlbumComparePanel from '../components/AlbumComparePanel'
import CitCarousel from '../components/CitCarousel'

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

        setAlbums(fullAlbums)
      } catch (err) {
        console.error('Errore nel caricamento degli album completi:', err)
      }
    }

    fetchAllAlbums()
  }, [])

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className='text-center my-10 '>
          <h1 className='text-5xl font-semibold'>Ogni disco ha una storia. Quale racconterà la tua?</h1>
          <h4>Tra vinili e leggende: trova il tuo album perfetto.</h4>
        </div>
        <AlbumComparePanel
          albums={albums}
          compareList={compareList}
          setCompareList={setCompareList}
          activeSlot={activeSlot}
          setActiveSlot={setActiveSlot}
        />
      </div>
      <div className='bg-[#292929]'>
        <div className='container mx-auto'>
          <CompareDetails
            compareList={compareList}
            onRemoveAlbum={handleRemoveAlbum}
          />

        </div>
      </div>

      <AlbumSelectorModal
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        albums={albums || albums.album}
        onSelect={async (newAlbum) => {
          try {
            const albumId = newAlbum.id || newAlbum.album?.id;
            const res = await fetch(`http://localhost:3001/albums/${albumId}`);
            const data = await res.json();

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

      <div className='pt-10'>
        <CitCarousel />
      </div>

    </>
  )
}

export default Compare
