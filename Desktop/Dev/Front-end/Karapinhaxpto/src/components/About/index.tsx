import salao from '../../assets/images/salao.jpg'

export function About(){
    return (
        <div id="About" className="py-10 bg-bege">
            <div className="container">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold font-cursive text-gray-800">Sobre Nós</h1>
                </div>
                <div className="flex justify-between">
                    <div className="max-w-3xl mx-auto  text-gray-700 ">
                        <p className="mb-4">
                            A Karapinha XPTO é uma rede de salões de beleza dedicada a proporcionar experiências excepcionais aos seus clientes. Há mais de uma década, nos destacamos pela qualidade dos nossos serviços e pelo ambiente acolhedor que oferecemos.                    </p>
                        <p className="mb-4">
                            Em nossos salões, você encontrará profissionais altamente qualificados, prontos para atender às suas necessidades de beleza, desde cortes de cabelo até tratamentos faciais e corporais. Nosso objetivo é fazer com que cada cliente se sinta renovado e confiante após cada visita.                    </p>
                        <p>
                            Na Karapinha XPTO, nosso compromisso é com a satisfação e o bem-estar de nossos clientes. Estamos aqui para ajudá-los a realçar sua beleza natural e sair do nosso salão sentindo-se confiantes e renovados. Junte-se a nós e experimente a diferença que a Karapinha XPTO pode fazer em sua jornada de beleza e autoestima.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto ">
                      <img src={salao} className="w-full max-h-80  object-cover" />
                    </div>
                </div>


            </div>
        </div>
    );
};


