import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CompareDetails from '../components/CompareDetails'
import AlbumSelectorModal from '../components/AlbumSelectorModal'

const Compare = ({ handleRemoveAlbum, filledCompareList }) => {
  const location = useLocation()
  const [isSelectOpen, setSelectOpen] = useState(false)
  const initialList = location.state?.filledCompareList || []
  const paddedList = [...initialList]
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)

  while (paddedList.length < 4) {
    paddedList.push(null)
  }

  const [compareList, setCompareList] = useState(paddedList)

  // Se non ci sono dati iniziali, puoi fetchare una lista completa da cui scegliere
  useEffect(() => {
    if (initialList.length === 0) {
      // Puoi fare fetch e aprire una modale per selezionare album
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-6">
      <CompareDetails
        compareList={compareList}
        onRemoveAlbum={handleRemoveAlbum}
      />



      <AlbumSelectorModal
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onSelect={(newAlbum) => {
          if (compareList.length < 4) {
            setCompareList([...compareList, newAlbum])
          } else {
            const updated = [...compareList]
            updated[1] = newAlbum
            setCompareList(updated)
          }
        }}
      />


      <button
        onClick={() => setSelectOpen(true)}
        className="mt-6 px-4 py-2 bg-[#e9a716] text-[#292929] font-semibold rounded hover:bg-[#c7481d] transition"
      >
        Confronta altri album
      </button>
    </div>
  )
}

export default Compare
