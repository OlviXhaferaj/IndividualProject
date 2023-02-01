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

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [role, setRole] = useState('');



  return (
    <div className="App">
      <BrowserRouter>
      <Header  role={role} setRole={setRole} setIsLoggedin={setIsLoggedin} isLoggedin={isLoggedin}/>
        <Routes>

          <Route path='/home' element={<Home role={role}/>}/>
          <Route path='/products' element={<List/>}/>
          <Route path='/products/instrument/:id/edit' element={<Update/>}/>
          <Route path='/products/instrument/:id' element={<Display/>}/>
          <Route path='/store/new' element={<Form/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/all/products' element={<Products isLoggedin={isLoggedin}/>}/>

          <Route path='/register' element={<Register setIsLoggedin={setIsLoggedin}/>}/>
          <Route path='/login' element={<Login isLoggedin={isLoggedin} setRole={setRole} setIsLoggedin={setIsLoggedin}/>}/>
          
        </Routes>      
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
