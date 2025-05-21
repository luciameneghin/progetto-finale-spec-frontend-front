import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="flex gap-8 bg-[#292929] justify-center items-center shadow-lg">

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

