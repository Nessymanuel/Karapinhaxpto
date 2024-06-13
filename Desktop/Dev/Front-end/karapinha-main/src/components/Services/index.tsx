import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img3 from '../../assets/images/img3.jpeg';

interface Service {
  id: number;
  img: string;
  description: string;
  price: string;
  contact: string;
}

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [columns, setColumns] = useState<number>(3); 

  useEffect(() => {
    axios.get('https://localhost:7104/api/Public/services')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Houve um erro ao buscar os serviços!', error);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setColumns(3);
      } else if (window.innerWidth >= 576) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    handleResize(); 

    window.addEventListener('resize', handleResize); 
    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex(prevIndex => (prevIndex + columns) % Math.max(services.length, 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [columns, services.length]);

  const visibleServices = services.slice(visibleIndex, visibleIndex + columns).concat(
    services.slice(0, Math.max(0, (visibleIndex + columns) - services.length))
  );

  return (
    <>
    <a href="/Login">
      <div id="Services" className="py-10 bg-bege ">
        <div className="container"></div>
        {/* header title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-cursive text-gray-800">Serviços</h1>
        </div>
        {/* Services Card Section */}
        <div className={`grid grid-cols-1 sm:grid-cols-${Math.min(2, columns)} md:grid-cols-${Math.min(3, columns)} gap-14 md:gap-5 place-items-center`}>
          {
            visibleServices.map((service, index) => (
              <div key={service.id}
                className="border-gray-400 rounded-lg rounded-exl bg-bege hover:bg-brown hover:text-white shadow-xl duration-200 max-w-[300px] group relative">
                {/* img section */}
                <div className="h[122px]">
                  <img src={service.img || img3} alt={service.description} className="scale-50 border-gray-400 rounded-lg block mx-auto transform- translate-y-q4 group-hover:scale-100 group-hover:rotate duration-300" />
                </div>
                <div>
                  <h1 className="text-xl mr-4 ml-4">{service.description}</h1>
                  <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2 mr-4 ml-4">preço:{service.price}</p>
                  <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2 mr-4 ml-4">Contacto: {service.contact}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      </a>
    </>
  );
}
