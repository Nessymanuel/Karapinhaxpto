
export function ScreenActive() {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-bege">
            <div className="bg-white p-8 rounded-md shadow-md text-center">
                <h1 className="text-4xl font-bold text-brown mb-4">Conta Desativada</h1>
                <p className="text-gray-700">Aguarde a ativação da sua conta.</p>
            </div>
        </div>
    );
}
