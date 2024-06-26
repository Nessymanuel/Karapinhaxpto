// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import { useHistory } from "react-router-dom";
// import 'tailwindcss/tailwind.css';

// export function UserManagement() {
//     const [users, setUsers] = useState([]);
//     const [services, setServices] = useState([]);
//     const history = useHistory();

//     useEffect(() => {
//         // Carregar usuários
//         axios.get('https://localhost:7104/api/User')
//             .then(response => {
//                 setUsers(response.data);
//             })
//             .catch(error => {
//                 console.error('Erro ao buscar usuários!', error);
//             });

//         // Carregar serviços
//         axios.get('https://localhost:7104/api/Service')
//             .then(response => {
//                 setServices(response.data);
//             })
//             .catch(error => {
//                 console.error('Erro ao buscar serviços!', error);
//             });
//     }, []);

//     const handleEditUser = (id:any) => {
//         history.push(`/RegistrationForm/${id}`);
//     };

//     const handleMakeAppointment = (userId:any, serviceId:any) => {
//         // Enviar solicitação POST para API com userId e serviceId
//         axios.post('https://localhost:7104/api/Appointment', {
//             userId: userId,
//             serviceId: serviceId
//         })
//         .then(response => {
//             // Tratar resposta da API, se necessário
//             console.log('Marcação realizada com sucesso!', response.data);
//         })
//         .catch(error => {
//             console.error('Erro ao fazer marcação!', error);
//         });
//     };

//     return (
//         <div className="bg-beige w-screen h-screen p-10">
//             <div className="max-w-3xl mx-auto">
//                 <h2 className="text-2xl font-semibold mb-4">Gerenciamento de Usuários</h2>
//                 <ul>
//                 {categories.map((category: any) => (
//                                 <option key={category.id} value={category.description}>{category.description}</option>
//                             ))}
//                     {users.map(user => (
//                         <li key={user.username} className="mb-4">
//                             <div>
//                                 <span className="font-semibold">Nome:</span> {user.username}
//                             </div>
//                             <div>
//                                 <span className="font-semibold">Email:</span> {user.email}
//                             </div>
//                             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mr-2" onClick={() => handleEditUser(user.id)}>Editar</button>
//                             <div>
//                                 <span className="font-semibold">Serviços:</span> 
//                                 {services.map(service => (
//                                     <button key={service.id} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleMakeAppointment(user.id, service.id)}>{service.name}</button>
//                                 ))}
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }
