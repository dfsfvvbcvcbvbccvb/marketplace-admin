import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import Header from './components/common/Header';
import { AuthProvider, useAuth } from './components/context/AuthContext'

function AppRoutes() {
    const { isAuthenticated } = useAuth()

    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            {isAuthenticated ? (
                <Route path="/" element={<Header/>}/>
            ) : (
                <Route path="*" element={<Navigate to="/login" />} />
            )}
        </Routes>
    )
}


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;
