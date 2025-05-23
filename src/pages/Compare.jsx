import { useLocation } from 'react-router-dom'
import { useEffect, useState, useMemo, useCallback, use } from 'react'
import CompareDetails from '../components/CompareDetails'
import AlbumSelectorModal from '../components/AlbumSelectorModal'
import AlbumComparePanel from '../components/AlbumComparePanel'
import CitCarousel from '../components/CitCarousel'

const Compare = ({ handleRemoveAlbum }) => {
  const location = useLocation()

  const initialList = useMemo(() => location.state?.filledCompareList || [], [location.state])
  const [compareList, setCompareList] = useState(() => {
    const padded = [...initialList]
    while (padded.length < 4) padded.push(null)
    return padded
  })

  const [albums, setAlbums] = useState([])
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)
  const [activeSlot, setActiveSlot] = useState(null)

  const fetchAllAlbums = useCallback(async () => {
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
  }, [])

  const handleSelectAlbum = useCallback(async (newAlbum) => {
    try {
      const albumId = newAlbum.id || newAlbum.album?.id
      const res = await fetch(`http://localhost:3001/albums/${albumId}`)
      const data = await res.json()

      const selectedAlbum = data.success && data.album ? data.album : null
      if (selectedAlbum) {
        setCompareList(prev => {
          const updated = [...prev]
          updated[activeSlot] = selectedAlbum
          return updated
        })
        setActiveSlot(null)
        setIsSelectorOpen(false)
      } else {
        console.error('Struttura della risposta non valida:', data)
      }
    } catch (err) {
      console.error('Errore nel recuperare i dettagli dell\'album selezionato:', err)
    }
  }, [activeSlot])

  useEffect(() => {
    fetchAllAlbums()
  }, [fetchAllAlbums])

  return (
    <div className='bg-[#f9f6f2] pt-3 pb-2'>
      <div className="container mx-auto py-6 mt-45">
        <div className='text-center my-10'>
          <h1 className='text-5xl font-semibold'>
            Ogni disco ha una storia. Quale racconterà la tua?
          </h1>
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
        albums={albums}
        onSelect={handleSelectAlbum}
      />

      <div className='pt-10'>
        <CitCarousel />
      </div>
    </div>
  )
}

export default Compare

