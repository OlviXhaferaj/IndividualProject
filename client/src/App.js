import { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Form from './Components/Form';
import List from './Components/List';
import Display from './Components/Display';
import Update from './Components/Update';
import Header from './Components/Header';
import About from './Components/About';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Register from './Components/Register';
import Login from './Components/Login';
import Products from './Components/Products';
import AdminRoutes from './Components/AdminRoutes';

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');


  return (
    <div className="App">
      <BrowserRouter>
      <Header userName={userName}  role={role} setRole={setRole} setIsLoggedin={setIsLoggedin} isLoggedin={isLoggedin}/>
        <Routes>

          <Route path='/home' element={<Home isLoggedin={isLoggedin} userName={userName} role={role}/>}/>
          <Route path='/products/instrument/:id/edit' element={<Update/>}/>
          <Route path='/products/instrument/:id' element={<Display/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/all/products' element={<Products isLoggedin={isLoggedin}/>}/>
          <Route path='/register' element={<Register setIsLoggedin={setIsLoggedin}/>}/>
          <Route path='/login' element={<Login setUserName={setUserName} isLoggedin={isLoggedin} setRole={setRole} setIsLoggedin={setIsLoggedin}/>}/>
          
          <Route element={<AdminRoutes isLoggedin={isLoggedin} role={role}/>}>
            <Route path='/store/new' element={<Form/>}/>
            <Route path='/products' element={<List/>}/>
          </Route>
        </Routes>      
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
