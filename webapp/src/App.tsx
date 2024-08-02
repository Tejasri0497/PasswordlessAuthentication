import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  LoginForm  from './login';
import  SignUpForm  from './signup';
import HomePage from './homepage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/homepage' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
