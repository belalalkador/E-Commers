import { FaWhatsapp, FaLinkedin, FaGithub, FaFacebookMessenger, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-1 pb-2">
      <div className="container mx-auto flex flex-col items-center">
        {/* Name */}
        <h2 className="text-lg font-bold mb-3">Belal Alkador</h2>
        
        {/* Social Media Links */}
        <div className="flex space-x-4">
          {/* WhatsApp */}
          <a
            href="https://wa.me/963985639522" // Replace with your WhatsApp link
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-400 transition-colors duration-300"
          >
            <FaWhatsapp size={24} />
          </a>
          
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/belalalkador" // Replace with your LinkedIn profile link
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400 transition-colors duration-300"
          >
            <FaLinkedin size={24} />
          </a>
          
          {/* GitHub */}
          <a
            href="https://github.com/belalalkador" // Replace with your GitHub profile link
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-200 transition-colors duration-300"
          >
            <FaGithub size={24} />
          </a>
          
            {/* Gmail */}
          <a
            href="mailto:belal.alkador1@gmail.com" // Replace with your Gmail address
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-500 transition-colors duration-300"
          >
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
