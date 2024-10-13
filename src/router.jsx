import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/login';
import CadastrarUsuario from './pages/cadastrarUsuario';
import Consultar from './pages/consultar';
import Cadastrar from './pages/cadastrar';


export default function Navegacao() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/cadastrarUsuario' element={<CadastrarUsuario />} />
        <Route path='/consultar' element={<Consultar />} />
        <Route path='/cadastrar' element={<Cadastrar />} />
        <Route path='/cadastrar/:id' element={<Cadastrar />} />
      </Routes>
    </BrowserRouter>

  )

}