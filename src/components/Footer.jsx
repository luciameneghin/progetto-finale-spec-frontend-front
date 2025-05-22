import { FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa'
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-[#292929] text-[#e9a716] py-5 shadow-inner">
      <div className="max-w-4xl mx-auto px-4 pb-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          <img src="/tape_Recorder-removebg-preview.jpg" alt="" />
        </div>
        <div>
          <h4><strong>A proposito di 'Trade Recorder'</strong></h4>
          <p>Qualcosa</p>
          <p>Qualcosa</p>
          <p>Qualcosa</p>
          <p>Qualcosa</p>
        </div>
        <div>
          <h4><strong>Qui trovi aiuto</strong></h4>
          <p>Qualcosa</p>
          <p>Qualcosa</p>
          <p>Qualcosa</p>
          <p>Qualcosa</p>
        </div>
        <div>
          <h4><strong>Partecipa</strong></h4>
          <p>Qualcosa</p>
          <p>Qualcosa</p>
          <p>Qualcosa</p>
          <p>Qualcosa</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          © 2025 Tape Recorder. Tutti i diritti riservati.
        </p>
        <div className="flex space-x-6 mt-3 md:mt-0">
          <a href="#" className="hover:text-[#c7481d] transition" aria-label="Privacy Policy">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#c7481d] transition" aria-label="Termini di Servizio">
            Termini di Servizio
          </a>
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#c7481d] transition text-xl">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-[#c7481d] transition text-xl">
            <RiTwitterXFill />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#c7481d] transition text-xl">
            <FaInstagram />
          </a>
          <a href="https://github.com/luciameneghin" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#c7481d] transition text-xl">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

