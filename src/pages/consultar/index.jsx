import { useState, useEffect } from 'react'
import './index.scss';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';


export default function Consultar(){

    const [token, setToken] = useState(null);
    const [listaDiario, setListaDiario] = useState([]);
    const [exib, setExib] = useState(false)

    const navigate = useNavigate();

    async function buscar(){

        const url = `http://localhost:7000/diario?x-access-token=${token}`;
        let resp = await axios.get(url);
        setListaDiario(resp.data);

        setExib(!exib)

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

            <h2>Bem-Vindo {token?.usuario} <img src="/diariozinho.png" alt="" /></h2>

            <section>

            <div className='bts'>

            <button onClick={sair}>Sair</button>
            <button onClick={buscar}>{exib ? 'Ocultar' : 'Exibir'}</button>

            </div>

            <button className='cds'><Link to={'/cadastrar'}>Cadastrar nota</Link></button>

            </section>

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

            {exib &&

                <tbody>
                    {listaDiario.map(item => 

                        <tr>
                            <td>{item.idDiario}</td>
                            <td>{new Date(item.dia).toLocaleDateString()}</td>
                            <td>{item.conteudo}</td>
                            <td>{item.usuario}</td>
                            <td>
                                <Link to={`/cadastrar/${item.idDiario}`}><FontAwesomeIcon icon={faPen} color='#1a2036'/></Link>
                                <Link className='m' onClick={() => excluir(item.idDiario)}><FontAwesomeIcon icon={faTrash} color='#1a2036'/></Link>
                            </td>
                        </tr>

                    )}
                </tbody>
            }

            </table>
        </div>

    );
}