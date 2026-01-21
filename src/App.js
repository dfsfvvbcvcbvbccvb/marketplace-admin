import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'

function App() {
  const isAuthenticated = !!localStorage.getItem('token')
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
