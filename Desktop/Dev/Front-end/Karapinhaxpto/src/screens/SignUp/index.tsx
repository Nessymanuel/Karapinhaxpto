
import 'tailwindcss/tailwind.css';
import { Form } from '../../components/Form';
import { useState } from 'react';



export function SignUp() {

    const [isFormOpen, setIsFormOpen] = useState(true);
    return (
        <div className="bg-bege w-screen h-auto py-10">
            <div className="max-w-md mx-auto p-6 bg-white shadow-s rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Formulário de Adesão</h2>
                <Form profileId={2} onClose={() => setIsFormOpen(false)} />
            </div>
        </div>
    );
}
 