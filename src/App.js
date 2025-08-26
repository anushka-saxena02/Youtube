
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import Home from './pages/Home/Home ';
import Vedio from './Vedio/Vedio';
import { useState } from 'react';

function App() {
  let [sidebar,setSidebar]=useState(true);
  return (
    <div className="App">
      <Navbar setSidebar={setSidebar}/>
    <Routes>
      <Route path='/' element={<Home sidebar={sidebar} />} />
      <Route path='/vedio/:categoryId/:videoId'  element={<Vedio/>} />
    </Routes>
    </div>
  );
}

export default App;
