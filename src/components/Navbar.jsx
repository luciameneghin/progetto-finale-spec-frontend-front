import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaBars, FaTimes } from 'react-icons/fa'
import { PiUserCircle } from 'react-icons/pi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav
      style={{ boxShadow: '0 4px 12px rgba(233, 167, 22, 0.6)' }}
      className="fixed top-0 left-0 right-0 w-full bg-[#292929] shadow-lg z-1000"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        <div className="flex items-center gap-4">
          <Link to="/" className="w-[120px]">
            <img src="/tape_Recorder-removebg-preview.jpg" alt="tape-recorder" />
          </Link>
          <Link
            to="/compare/:id"
            className="hidden md:block text-[#e9a716] text-xl font-semibold tracking-wider hover:text-[#c7481d] transition"
          >
            Comparatore
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/favorites" className="hover:text-[#c7481d]" aria-label="Preferiti">
            <FaHeart className="text-[#e9a716] text-2xl" />
          </Link>
          <Link to="/" className="hover:text-[#c7481d]" aria-label="Profilo utente">
            <PiUserCircle className="text-[#e9a716] text-2xl" />
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#e9a716] text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 pb-4 bg-[#292929]">
          <Link
            to="/compare/:id"
            className="text-[#e9a716] text-lg hover:text-[#c7481d] transition"
            onClick={() => setIsOpen(false)}
          >
            Comparatore
          </Link>
          <Link
            to="/favorites"
            className="text-[#e9a716] text-lg hover:text-[#c7481d] transition"
            onClick={() => setIsOpen(false)}
          >
            <FaHeart className="inline mr-2" /> Preferiti
          </Link>
          <Link
            to="/"
            className="text-[#e9a716] text-lg hover:text-[#c7481d] transition"
            onClick={() => setIsOpen(false)}
          >
            <PiUserCircle className="inline mr-2" /> Profilo
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar


