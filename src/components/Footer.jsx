import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-[#292929] text-[#e9a716] py-20 mt-12 rounded-t-xl shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm md:text-base">
          © 2025 Tape Recorder <br /> Tutti i diritti riservati.
        </p>
        <div className="flex space-x-6 mt-3 md:mt-0">
          <a href="#" className="hover:text-[#c7481d] transition" aria-label="Privacy Policy">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#c7481d] transition" aria-label="Termini di Servizio">
            Termini di Servizio
          </a>
          <a href="#" className="hover:text-[#c7481d] transition" aria-label="Contatti">
            Contatti
          </a>
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#c7481d] transition text-xl">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-[#c7481d] transition text-xl">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#c7481d] transition text-xl">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

