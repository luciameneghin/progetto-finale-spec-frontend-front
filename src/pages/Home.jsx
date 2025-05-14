import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [trees, setTrees] = useState([])

  async function fetchTrees() {
    try {
      const response = await fetch('http://localhost:3001/trees')
      const data = await response.json()
      console.log(data)
      setTrees(data)
    } catch (error) {
      console.error('Error fetching trees:', error)
    }
  }

  useEffect(() => {
    fetchTrees()
  }, [])

  return (
    <div>
      <h1>Homepage</h1>
      {trees.length > 0 ? (
        <ul>
          {trees.map((tree) => (
            <li key={tree.id}><Link to={`/trees/${tree.id}`}>{tree.title}</Link> - {tree.category}</li>
          ))}
        </ul>
      ) : (
        <p>Non ci sono alberi disponibili</p>
      )}
    </div>
  )
}

export default Home
