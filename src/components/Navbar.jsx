import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { PiUserCircle } from "react-icons/pi";

const Navbar = () => {
  return (
    <nav
      style={{ boxShadow: '0 4px 12px rgba(233, 167, 22, 0.6)' }}
      className="fixed top-0 left-0 right-0 w-full flex justify-between items-center bg-[#292929] shadow-lg z-1000 px-6 py-3 px-50"
    >
      {/* SINISTRA: Logo + Comparatore */}
      <div className='flex items-center gap-4'>
        <Link to="/" className="w-[150px]">
          <img src="/tape_Recorder-removebg-preview.jpg" alt="tape-recorder" />
        </Link>
        <Link
          to="/compare/:id"
          className="text-[#e9a716] text-xl font-semibold tracking-wider hover:text-[#c7481d] transition"
        >
          Comparatore
        </Link>
      </div>

      {/* DESTRA: Icone */}
      <div className='flex items-center gap-4'>
        <Link
          to="/favorites"
          className="hover:text-[#c7481d] transition"
          aria-label="Preferiti"
        >
          <FaHeart className="text-[#e9a716] text-2xl hover:text-[#c7481d] transition cursor-pointer" />
        </Link>
        <Link
          to="/"
          aria-label="Profilo utente"
        >
          <PiUserCircle className="text-[#e9a716] text-2xl hover:text-[#c7481d] transition cursor-pointer" />
        </Link>
      </div>
    </nav>

  )
}

export default Navbar

