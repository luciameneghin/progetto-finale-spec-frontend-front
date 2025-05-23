import { FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa'
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-[#292929] text-[#e9a716] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-10 text-center">
        <div className="flex flex-col md:flex-row md:items-start md:justify-start md:gap-10">
          {/* Immagine */}
          <div className="w-[200px] mx-auto md:mx-0 lg:ml-12">
            <img src="/tape_Recorder-removebg-preview.jpg" alt="Tape Recorder" className="w-full h-auto" />
          </div>

          {/* Liste */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8 md:mt-0 md:ml-10 pt-10 sm:pt-0 lg:pt-10">
            <div>
              <h4><strong>Join In</strong></h4>
              <p className='hover:text-[#c7481d] transition cursor-pointer'>Iscriviti</p>
              <p className='hover:text-[#c7481d] transition cursor-pointer'>Contribuisci</p>
              <p className='hover:text-[#c7481d] transition cursor-pointer'>Aggiungi Album</p>
              <p className='hover:text-[#c7481d] transition cursor-pointer'>Lista dei contributori</p>
            </div>
            <div>
              <h4><strong>Etichette</strong></h4>
              <p className='hover:text-[#c7481d] transition cursor-pointer'>EMI Studios</p>
              <p className='hover:text-[#c7481d] transition cursor-pointer'>Atlantic Records</p>
              <p className='hover:text-[#c7481d] transition cursor-pointer'>Epic Records</p>
              <p className='hover:text-[#c7481d] transition cursor-pointer'>Asylum Records</p>
            </div>
            <div>
              <h4><strong>About Us</strong></h4>
              <p className='hover:text-[#c7481d] transition cursor-pointer'>Chi siamo</p>
              <p className='hover:text-[#c7481d] transition cursor-pointer'>Contatti</p>
              <p className='hover:text-[#c7481d] transition cursor-pointer'>Help</p>
            </div>
            <div className='mx-auto'>
              <h1><strong>I nostri Social</strong></h1>
              <div className="flex space-x-2 mt-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#c7481d] transition text-xl">
                  <FaFacebookF />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-[#c7481d] transition text-xl">
                  <RiTwitterXFill />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#c7481d] transition text-xl">
                  <FaInstagram />
                </a>
                <a href="https://github.com/luciameneghin" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[#c7481d] transition text-xl">
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        {/* Blocco logo + testo */}
        <div className='flex items-center'>
          <img src="/logo-scheda.png" alt="" className='w-7 mr-5' />
          <p className="text-sm">
            © 2025 Tape Recorder. Tutti i diritti riservati.
          </p>
        </div>

        {/* Blocchi link */}
        <div className="flex flex-col sm:flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          <a href="#" className="hover:text-[#c7481d] transition" aria-label="Privacy Policy">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#c7481d] transition" aria-label="Termini di Servizio">
            Termini di Servizio
          </a>
          <a href="#" className="hover:text-[#c7481d] transition" aria-label="Cookie Policy">
            Cookie Policy
          </a>
        </div>
      </div>

    </footer>
  )
}

export default Footer

