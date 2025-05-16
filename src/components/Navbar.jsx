import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex gap-4 p-4 bg-gray-100 justify-center">
      <Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link>
      <Link to="favorites" className="text-blue-500 hover:text-blue-700">Favorites</Link>
    </div>
  )
}

export default Navbar
