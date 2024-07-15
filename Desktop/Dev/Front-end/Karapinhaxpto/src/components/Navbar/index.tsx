import logo from '../../assets/images/logo1.svg';
import 'tailwindcss/tailwind.css';

export function Navbar() {
    return (
        <nav className="shadow-md bg-bege dark:bg-gray-900 dark:text-white duration-200">
            <div className="container py-3 sm:py-0">
                <div className="flex justify-between items-center">
                    <div>
                        <a href="/" className="flex items-center gap-2 text-2xl sm:text-3xl font-bold">
                            <img src={logo} alt="Karapinha xpto" className="w-20" />
                        </a>
                    </div>
                    <div className="hidden sm:block">
                        <ul className="flex gap-4">
                            <li>
                                <a href="#Home" className="inline-block py-4 px-4 hover:text-brown">Início</a>
                            </li>
                            <li>
                                <a href="#About" className="inline-block py-4 px-4 hover:text-brown">Sobre nós</a>
                            </li>
                            <li>
                                <a href="#Services" className="inline-block py-4 px-4 hover:text-brown">Serviços</a>
                            </li>
                            <li>
                                <a href="#Footer" className="inline-block py-4 px-4 hover:text-brown">Contactos</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <a href="/login">
                            <button className="bg-[#0c0a09] text-white px-4 py-2 rounded-full hover:scale-105 duration-300 mr-4">
                                Entrar
                            </button>
                        </a>
                        <a href="/SignUp">
                            <button className="bg-[#0c0a09] text-white px-4 py-2 rounded-full hover:scale-105 duration-300">
                                Registrar-se
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}



