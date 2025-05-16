import React from 'react'
import { useLocation } from 'react-router-dom'

const Compare = () => {
  const location = useLocation()
  const { treesToCompare } = location.state || {}

  console.log('Alberi da confrontare:', treesToCompare)

  if (!treesToCompare) {
    return <p>Caricamento dati confronto oppure seleziona prima due alberi da confrontare.</p>
  }

  if (treesToCompare.length !== 2) {
    return <p>Seleziona prima due alberi da confrontare.</p>
  }

  const [treeA, treeB] = treesToCompare

  const renderTreeDetails = ({ tree }) => (
    <div className="border p-4 rounded shadow w-full">
      <h2 className="text-xl font-bold mb-2">{tree.title}</h2>
      <img src={tree.image} alt={tree.title} className="w-full h-auto mb-4 rounded" />
      <p><strong>Categoria:</strong> {tree.category}</p>
      <p><strong>Nome scientifico:</strong> {tree.scientificName}</p>
      <p><strong>Origine:</strong> {tree.origin}</p>
      <p><strong>Altezza:</strong> {tree.height}</p>
      <p><strong>Longevità:</strong> {tree.lifespan}</p>
      <p><strong>Tipo di foglia:</strong> {tree.leafType}</p>
      <p><strong>Velocità di crescita:</strong> {tree.growthRate}</p>
      <p><strong>Clima preferito:</strong> {tree.climate}</p>
      <p><strong>Assorbimento CO₂:</strong> {tree.co2Absorption} kg/anno</p>
      <p><strong>Descrizione:</strong> {tree.description}</p>
    </div>
  )

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Confronto tra alberi</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderTreeDetails(treeA)}
        {renderTreeDetails(treeB)}
      </div>
    </div>
  )
}

export default Compare




