import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Table } from "reactstrap";

import { api } from '../../../config';

export const VisualizarServico = () => {


    /* Implementação de um evento para confirmar se o usuário realmente quer deletar algum item da lista
    
    Ou seja, ao clicar no botão "Deletar serviço", ele se transforma em uma mensagem perguntando se
    o usuário tem certeza, seguido de dois botões "Sim" e "Não".
    Caso o usuário clicar no botão "Não", esses três elementos se transformam novamente em um único botão
    "Deletar serviço".
    Caso o usuário clicar no botão "Sim", a função apagarServico é executado e o serviço selecionado é excluído
    Em síntese, para atinger este efeito, criamos várias contantes para todos os quatro elementos:
    "Deletar Serviço", "Tem certeza?", "Sim" e "Não"
    Essas constantes utilizam a função useState do react com a lógica booleana "true" ou "false"
    Dessa forma, conseguimos criar uma pequena lógica para controlar a visibilidade desses elementos
    Inicialmente, apenas o botão "Deletar Serviço" está visível, os demais possuem o className "d-none" que os
    torna invisíveis, porém, quando o usuário clica neste botão a situação inverte, removemos essa classe dos
    elementos deixando visíveis, e adicionamos "d-none" ao botão "Deletar Serviço", deixando-o invisível */
    const [bitaoDeleteIsVisible, setBitaoDeleteIsVisible] = useState(true);
    const [bitaoDeleteSimIsVisible, setBitaoDeleteSimIsVisible] = useState(true);
    const [bitaoDeleteNaoIsVisible, setBitaoDeleteNaoIsVisible] = useState(true);
    const [bitaoDeleteCtzaIsVisible, setBitaoDeleteCtzaIsVisible] = useState(true);

    /* Essa mudança de estado é possível através destas quatro funções abaixo, que manipulam a lógica
    booleana de cada elemento de "true" para "false" ou vice-versa */
    function mudarBitaoDeleteInvisivel() { setBitaoDeleteIsVisible(!bitaoDeleteIsVisible) }
    function mudarBitaoDeleteSimInvisivel() { setBitaoDeleteSimIsVisible(!bitaoDeleteSimIsVisible) }
    function mudarBitaoDeleteNaoInvisivel() { setBitaoDeleteNaoIsVisible(!bitaoDeleteNaoIsVisible) }
    function mudarBitaoDeleteCtzaInvisivel() { setBitaoDeleteCtzaIsVisible(!bitaoDeleteCtzaIsVisible) }

    /* Para simplificar a sintaxe do parametro onClick={} dos botões, criamos uma nova função "mestre"
    que chama todas as demais conforme necessário */
    function juntarFunctions() {
        mudarBitaoDeleteInvisivel();
        mudarBitaoDeleteSimInvisivel();
        mudarBitaoDeleteNaoInvisivel();
        mudarBitaoDeleteCtzaInvisivel();
    }

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getServicos = async () => {
        await axios.get(api + "/listaservicos")
            .then((response) => {
                console.log(response.data.servicos);
                setData(response.data.servicos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possível conectar a API.'
                })
            });
    }

    const apagarServico = async (idServico) => {
        console.log(idServico);

        /* Pelas mesmas razões expostas em comentários acima, chamamos a função "juntarFunctions" para
        simplificar a sintaxe do parametro onClick={}*/
        juntarFunctions();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.delete(api + "/apagarservico/" + idServico, { headers })
            .then((response) => {
                console.log(response.data.error);
                getServicos();
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possível acessar a API.'
                })
            })
    }

    useEffect(() => {
        getServicos();
    }, []);

    return (
        <div className="p-3">
            <Container>
                <div className="w-100 m-auto mt-3 p-3 border rounded-pill d-flex justify-content-center align-items-center" style={{ background: 'rgba(16,100,199,0.33)' }}>
                    <div className="m-auto p-2">
                        <h1>Tabela dos Serviços</h1>
                    </div>
                </div>
                <div className="p-2 d-flex justify-content-center">
                    <div className="p-2">
                        <a href="/cadastrarservico" className="btn btn-outline-primary btn-lg">Criar novo serviço</a>
                    </div>
                </div>
                <div className="p-2 d-flex flex-column">
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                    <Table striped dark hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Serviço</th>
                                <th>Descrição</th>
                                <th colSpan="3" className="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.descricao}</td>
                                    <td className="text-center">
                                        <Link to={"/servico/" + item.id} className="btn btn-outline-primary btn-sm">Consultar</Link>
                                    </td>
                                    <td className="text-center">
                                        <Link to={"/editarservico/" + item.id} className="btn btn-outline-warning btn-sm">Editar</Link>
                                    </td>
                                    <td className="text-center">

                                        {/* Aqui, temos a nossa lógica do botão deletar, note que o className de cada elemento está baseado
                                        em uma lógica condicional if else
                                        
                                        Inicialmente todos estão "true", por isso que contém "d-none" no final, com a excessão do botão
                                        "Deletar Serviço" que é o único visível quando esta página de visualizar serviços é carregada
                                        
                                        Caso o usuário clique nesse botão a situação inverte, e todos ficam "false" e novamente apenas
                                        o botão "Deletar Serviço" contém "d-none" no seu else, assim ele fica invisível enquanto os outros
                                        elementos ficam visíveis*/}
                                        <span onClick={juntarFunctions} className={bitaoDeleteIsVisible ? "btn btn-outline-danger btn-sm"
                                            : "btn btn-outline-danger btn-sm d-none"}>Deletar</span>

                                        <span className={bitaoDeleteCtzaIsVisible ? "btn btn-outline-danger btn-sm disabled d-none"
                                            : "btn btn-outline-danger btn-sm disabled"}>Tem certeza?</span>

                                        <span onClick={() => apagarServico(item.id)} className={bitaoDeleteSimIsVisible ? "btn btn-outline-danger btn-sm d-none"
                                            : "btn btn-outline-danger btn-sm"} style={{ marginLeft: '0.5rem' }}>Sim</span>

                                        <span onClick={juntarFunctions} className={bitaoDeleteNaoIsVisible ? "btn btn-outline-success btn-sm d-none"
                                            : "btn btn-outline-success btn-sm"} style={{ marginLeft: '0.5rem' }}>Não</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-center">
                        <div className="p-2">
                            <a href="/" className="btn btn-outline-primary btn-md">Voltar</a>
                        </div>
                        <div className="p-2">
                            <a href="/visualizarcliente" className="btn btn-outline-primary btn-md">Cliente</a>
                        </div>
                        <div className="p-2">
                            <a href="/visualizarpedido" className="btn btn-outline-primary btn-md">Pedido</a>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}