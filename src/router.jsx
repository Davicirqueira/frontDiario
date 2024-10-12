import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home';
import Consultar from './pages/consultar';
import Cadastrar from './pages/cadastrar';


export default function Navegacao() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/consultar' element={<Consultar />} />
        <Route path='/cadastrar' element={<Cadastrar />} />
        <Route path='/cadastrar/:id' element={<Cadastrar />} />
      </Routes>
    </BrowserRouter>

  )

}