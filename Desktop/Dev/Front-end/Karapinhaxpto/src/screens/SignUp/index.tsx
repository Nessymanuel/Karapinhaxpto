
import 'tailwindcss/tailwind.css';
import { Form } from '../../components/Form';



export function SignUp() {

    return (
        <div className="bg-bege w-screen h-auto py-10">
            <div className="max-w-md mx-auto p-6 bg-white shadow-s rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Formulário de Adesão</h2>
                <Form />
            </div>
        </div>
    );
}
