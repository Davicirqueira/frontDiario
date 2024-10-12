import { useState } from 'react'
import './index.scss'

import moment from 'moment';

import axios from 'axios'


export default function Cadastrar() {
    const [nome, setNome] = useState('');
    const [motivo, setMotivo] = useState('');
    const [vinganca, setVinganca] = useState('');
    const [nota, setNota] = useState('');
    const [perdoado, setPerdoado] = useState(false);


    async function salvar() {
        const paramCorpo = {
            "nome": nome,
            "motivo": motivo,
            "vinganca": vinganca,
            "notaOdio": nota,
            "perdoado": perdoado
        }

        const url = 'http://localhost:5010/listaNegra';
        let resp = await axios.post(url, paramCorpo);

        alert('Pessoa adicionada na lista negra. Id: ' + resp.data.novoId);
    }


    return (
        <div className='pagina-cadastrar'>
            <h1> CADASTRAR </h1>


            <div className='form'>
                <div>
                    <label>Nome:</label>
                    <input type='text' value={nome} onChange={e => setNome(e.target.value)} />
                </div>
                <div>
                    <label>Motivo:</label>
                    <input type='text' value={motivo} onChange={e => setMotivo(e.target.value)} />
                </div>
                <div>
                    <label>Vingança:</label>
                    <input type='date' value={vinganca} onChange={e => setVinganca(e.target.value)} />
                </div>
                <div>
                    <label>Nota de Ódio</label>
                    <input type='text' value={nota} onChange={e => setNota(e.target.value)} />
                </div>
                <div>
                    <label>Perdoado:</label>
                    <input type='checkbox' checked={perdoado} onChange={e => setPerdoado(e.target.checked)} />
                </div>
            </div>
            <button onClick={salvar}> SALVAR </button>

        </div>
    )
}
