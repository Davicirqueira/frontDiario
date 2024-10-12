import { useState, useEffect } from 'react'
import './index.scss'
import moment from 'moment';

import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';


export default function Cadastrar() {

    const [token, setToken] = useState(null);

    const [dia, setDia] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [usuario, setUsuario] = useState('');

    const navigate = useNavigate();

    const { id } = useParams();

    async function salvar() {

        const paramDiario = {
            "dia": dia,
            "conetudo": conteudo,
            "usuario": usuario
        }

        if(id == undefined){

            const url = `http://localhost:7000/diario?x-access-token=${token}`;
            let resp = await axios.post(url, paramDiario)

            alert(`Nota adicionada ao diário. id: ${resp.data.idDiario}`);

        }
        else{

            const url = `http://localhost:7000/diario/${id}?x-access-token=${token}`;
            let resp = await axios.put(url, paramDiario);

            alert('Nota alterada no diário.');

        }

    }

    async function buscarDados(){

        if(id != undefined){

            const url = `http://localhost:7000/diario/${id}`;
            let resp = await axios.get(url);
            let dados = resp.data;

            let data = moment(dados.dia).format('YYYY-MM-DD');

            setDia(data);
            setConteudo(dados.conetudo);
            setUsuario(dados.usuario);

        }

    }

    useEffect(() => {

        let usu = localStorage.getItem('USUARIO')
        setToken(usu);

        if(usu == undefined){

            navigate('/')

            buscarDados();

        }

    }, [])


    return (
        <div className='pagina-cadastrar'>

            <button><Link to={'/consultar'}>Voltar</Link></button>
            <h1>{id ? 'EDITAR' : 'CADASTRAR'}</h1>


            <div className='form'>
                <div>
                    <label>Dia:</label>
                    <input type='text' value={dia} onChange={e => setDia(e.target.value)} />
                </div>
                <div>
                    <label>Nota:</label>
                    <input type='text' value={conteudo} onChange={e => setConteudo(e.target.value)} />
                </div>
                <div>
                    <label>Seu Nome:</label>
                    <input type='date' value={usuario} onChange={e => setUsuario(e.target.value)} />
                </div>
            </div>
            <button onClick={salvar}> SALVAR </button>

        </div>
    )
}
