import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav
      style={{ boxShadow: '0 4px 12px rgba(233, 167, 22, 0.6)' }}
      className="fixed top-0 left-0 right-0 w-full flex gap-8 bg-[#292929] justify-center items-center shadow-lg z-1000 shadow-3xl boxShadow">

      <Link
        to="/"
        className="w-[150px]"
      >
        <img src="/tape_Recorder-removebg-preview.jpg" alt="tape-recorder" />
      </Link>

      <Link
        to="favorites"
        className="text-[#e9a716] text-xl font-semibold tracking-wider hover:text-[#c7481d] transition"
      >
        Favorites
      </Link>


      <Link
        to="/compare/:id"
        className="text-[#e9a716] text-xl font-semibold tracking-wider hover:text-[#c7481d] transition"
      >
        Comparatore
      </Link>

    </nav>
  )
}

export default Navbar

