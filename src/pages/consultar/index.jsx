import { useState, useEffect } from 'react'
import './index.scss';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function Consultar(){

    const [token, setToken] = useState(null);
    const [listaDiario, setListaDiario] = useState([]);

    const navigate = useNavigate();

    async function buscar(){

        const url = `http://localhost:7000/diario?x-access-token=${token}`;
        let resp = await axios.get(url);
        setListaDiario(resp.data);

    }

    async function excluir(id){
        
        const url = `http://localhost:7000/diario/${id}?x-access-token=${token}`;
        await axios.delete(url);

        await buscar();

    }

    async function sair(){

        localStorage.setItem('USUARIO', null)
        navigate('/')

    }

    //Função onde é obrigatório ter feito o login.
    useEffect(() => {

        let token = localStorage.getItem('USUARIO')
        setToken(token);

        if(token == 'null'){
            navigate('/')
        }

    }, [])


    return(

        <div className='pagina-consultar'>

            <h2>Bem-Vindo {token?.nome}</h2>

            <button onClick={sair}>Sair</button>

            <button onClick={buscar}>Exibir</button>
            <button><Link to={'/cadastrar'}>Cadastrar</Link></button>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Dia</th>
                        <th>Nota</th>
                        <th>Usuário</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {listaDiario.map(item => 

                        <tr>
                            <td>{item.idDiario}</td>
                            <td>{new Date(item.dia).toLocaleDateString()}</td>
                            <td>{item.conteudo}</td>
                            <td>{item.usuario}</td>
                            <td>
                                <Link to={`/cadastrar/${item.idDiario}`}>Alterar</Link>
                                <Link onClick={() => excluir(item.idDiario)}>Deletar</Link>
                            </td>
                        </tr>

                    )}
                </tbody>
            </table>
        </div>

    );
}