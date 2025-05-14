import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const TreeDetail = () => {
  const [treeDetail, setTreeDetail] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  console.log('ID da URL:', id)

  async function fetchTree() {
    try {
      const response = await fetch(`http://localhost:3001/trees/${id}`)
      const data = await response.json()
      console.log('Dati ricevuti dal server:', data)
      setTreeDetail(data.tree)
    } catch (error) {
      console.error('Errore nel caricamento dell\'albero:', error)
    }
  }

  useEffect(() => {
    fetchTree()
  }, [id])

  if (!treeDetail) {
    return <p>Caricamento in corso...</p>
  }

  return (
    <div className="p-4">
      <button onClick={() => navigate('/')}>Torna alla home</button>
      <h1 className="text-2xl font-bold mb-4">{treeDetail.title}</h1>
      <p><strong>Categoria:</strong> {treeDetail.category}</p>
      <p><strong>Nome scientifico:</strong> {treeDetail.scientificName}</p>
      <p><strong>Origine:</strong> {treeDetail.origin}</p>
      <p><strong>Altezza:</strong> {treeDetail.height}</p>
      <p><strong>Durata vita:</strong> {treeDetail.lifespan}</p>
      <p><strong>Tipo foglie:</strong> {treeDetail.leafType}</p>
      <p><strong>Tasso crescita:</strong> {treeDetail.growthRate}</p>
      <p><strong>Clima:</strong> {treeDetail.climate}</p>
      <p><strong>Assorbimento CO2 (kg/anno):</strong> {treeDetail.co2Absorption}</p>
      <p><strong>Descrizione:</strong> {treeDetail.description}</p>
      <img
        src={treeDetail.image}
        alt={treeDetail.title}
        className="mt-4 max-w-md rounded shadow"
      />

    </div>
  )
}

export default TreeDetail


