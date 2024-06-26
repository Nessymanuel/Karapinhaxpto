import { AuthProvider } from './context/AuthContext';
import { MyRoutes } from './routes/MyRoutes';

export default function App() {
    return (
        <AuthProvider>
            <MyRoutes />
        </AuthProvider>
    );
}