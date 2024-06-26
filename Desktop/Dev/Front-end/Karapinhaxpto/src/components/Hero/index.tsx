
import woman from '../../assets/images/woman-2.png'





export function Hero(){
    return (
        
        <section id="Footer" className="min-h-[550px]
        sm:min-h-[600px] bg-brown duration_200 flex justify-center items-center">

            {/* Conteúdo de texto à esquerda */} 

            <div className="md:w-1/2 px-6 mb-6 md:mb-0 md:mt-0 md:mr-6">
                <h1 className="text-5xl  text-gray sm:text-6xl lg:text-7xl font-bold">Sua Beleza, Sua Agenda </h1>

                <p className="text-lg text-white md:text-xl lg:text-2xl mb-8 mt-8">Agende seus tratamentos favoritos com apenas alguns cliques. Simplificamos o agendamento de horários em salões de beleza para você aproveitar ao máximo seu tempo.

                </p>
                <a href="Login" className="bg-[#0c0a09] text-white px-4 py-2 rounded-full hover:scale-105 duration-200  shadow-lg uppercase tracking-wider inline-block">Explore Agora</a>

            </div>
            {/* Imagem à direita */}
            <div className="md:w-1/2">
                <img src={woman} alt="mulher" className="w-full md:h-auto" />
            </div>
        </section>

    )
}
export default Hero;

