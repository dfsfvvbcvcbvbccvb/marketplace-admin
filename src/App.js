import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import UsersPage from './pages/UsersPage';
import Dashboard from './pages/Dashboard';
import StoresPage from './pages/StoresPage';
import ProductsPage from './pages/ProductsPage';
import { AuthProvider, useAuth } from './context/AuthContext'
import CreateStorePage from './pages/CreateStorePage';
import CategoriesPage from './pages/CategoriesPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProduct from './pages/EditProduct';

function AppRoutes() {
    const { isAuthenticated } = useAuth()

    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            {isAuthenticated ? (
                <>
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/stores" element={<StoresPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/stores/create" element={<CreateStorePage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/products/create" element={<CreateProductPage />} />
                    <Route path="/products/edit" element={<EditProduct />} />
                </>
            ) : null}
            {!isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />}
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
