import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import Header from './components/common/Header';

function App() {
  const isAuthenticated = !!localStorage.getItem('token')
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      {isAuthenticated ? (
        <Route path="/" element={<Header/>}/>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
