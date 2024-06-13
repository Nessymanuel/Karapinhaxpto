import 'tailwindcss/tailwind.css';
import { FaGithub, FaEnvelope, FaPhone, FaInstagram } from 'react-icons/fa';

export function Footer() {
    return (
        <div  className="bg-brown py-6">
            <div id='Footer' className="container mx-auto flex flex-col justify-center items-center">
                <div className="flex flex-col md:flex-row justify-center items-center text-center text-white mb-4">
                    <div className="flex items-center mb-2 md:mb-0 md:mr-4">
                        <FaPhone className="mr-2" />
                        <p className="text-lg">+244-997-178-588</p>
                    </div>
                    <div className="flex items-center mb-2 md:mb-0 md:mr-4">
                        <FaEnvelope className="mr-2" />
                        <p className="text-lg">graciethmanuel13@gmail.com</p>
                    </div>
                    <p className="text-lg">Endereço: Luanda, Angola</p>
                </div>
                <div className="text-center mb-4">
                    <p className="text-white text-lg">&copy; 2024 Gracieth Manuel. Todos os direitos reservados.</p>
                </div>
                <div className="flex justify-center items-center space-x-4">
                    <a href="https://github.com/Nessymanuel" target="_blank" rel="noopener noreferrer" className="text-white text-lg flex items-center">
                        <FaGithub className="mr-2" /> GitHub
                    </a>
                    <a href="https://www.instagram.com/gracy_manuel23/" target="_blank" rel="noopener noreferrer" className="text-white text-lg flex items-center">
                        <FaInstagram className="mr-2" /> Instagram
                    </a>
                </div>
            </div>
        </div>
    );
}
