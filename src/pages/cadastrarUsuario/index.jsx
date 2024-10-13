import { useState } from "react";
import './index.scss';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function CadastrarUsuario(){

    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function cadastrar(){

        if(nome == '' || senha == ''){

            alert('Preenha todos os campos.')
            return;

        }

        const usuario = {

            "nome": nome,
            "senha": senha

        }

        const url = `http://localhost:7000/cadastrar`
        let resp = await axios.post(url, usuario);

        let dados = resp.data;

        alert(`Cadastro realizado. Id: ${dados.idUsuario}`);

        navigate('/')

    }

    return(

        <div className="pagina-user">

            <Link to={'/'}><FontAwesomeIcon icon={faCircleArrowLeft} color="#1a2036" size="2x"/></Link>

            <h1>FAÇA O SEU CADASTRO  <img src="/diariozinho.png" alt="" /></h1>

            <div className="campo">

                <label htmlFor="nome">Nome:</label>
                <input
                    id="nome"
                    placeholder="Seu Nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)} 
                />

            </div>

            <div className="campo">

                <label htmlFor="senha">Senha:</label>
                <input
                    id="senha"
                    placeholder="Sua Senha"
                    type="text"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)} 
                />

            </div>

            <button onClick={cadastrar}>Cadastrar</button>

        </div>

    );

}