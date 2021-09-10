import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Table } from "reactstrap";

import { api } from '../../../config';

export const VisualizarPedido = () => {

    const [bitaoDeleteIsVisible, setBitaoDeleteIsVisible] = useState(true);
    const [bitaoDeleteSimIsVisible, setBitaoDeleteSimIsVisible] = useState(true);
    const [bitaoDeleteNaoIsVisible, setBitaoDeleteNaoIsVisible] = useState(true);
    const [bitaoDeleteCtzaIsVisible, setBitaoDeleteCtzaIsVisible] = useState(true);

    function mudarBitaoDeleteInvisivel() { setBitaoDeleteIsVisible(!bitaoDeleteIsVisible) }
    function mudarBitaoDeleteSimInvisivel() { setBitaoDeleteSimIsVisible(!bitaoDeleteSimIsVisible) }
    function mudarBitaoDeleteNaoInvisivel() { setBitaoDeleteNaoIsVisible(!bitaoDeleteNaoIsVisible) }
    function mudarBitaoDeleteCtzaInvisivel() { setBitaoDeleteCtzaIsVisible(!bitaoDeleteCtzaIsVisible) }

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

    const getPedidos = async () => {
        await axios.get(api + "/listapedidos")
            .then((response) => {
                console.log(response.data.pedidos);
                setData(response.data.pedidos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possível conectar a API.'
                })
            });
    }

    const apagarPedido = async (idPedido) => {
        console.log(idPedido);

        juntarFunctions();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.delete(api + "/apagarpedido/" + idPedido, { headers })
            .then((response) => {
                console.log(response.data.error);
                getPedidos();
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possível acessar a API.'
                })
            })
    }

    useEffect(() => {
        getPedidos();
    }, []);


    return (
        <div className="p-3">
            <Container>
                <div className="w-100 m-auto mt-3 p-3 border rounded-pill d-flex justify-content-center align-items-center" style={{ background: 'rgba(16,100,199,0.33)' }}>
                    <div className="m-auto p-2">
                        <h1>Tabela dos Pedidos</h1>
                    </div>
                </div>
                <div className="p-2 d-flex justify-content-center">
                    <div className="p-2">
                        <a href="/cadastrarpedido" className="btn btn-outline-primary btn-lg">Criar novo pedido</a>
                    </div>
                </div>
                <div className="p-2 d-flex flex-column">
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                    <Table striped dark hover>
                        <thead>
                            <tr>
                                <th>ID Pedido</th>
                                <th>ID Cliente</th>
                                <th>ID Serviço</th>
                                <th>Valor</th>
                                <th>Data</th>
                                <th colSpan="3" className="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.ClienteId}</td>
                                    <td>{item.ServicoId}</td>
                                    <td>{item.valor}</td>
                                    <td>{item.data}</td>
                                    <td className="text-center">
                                        <Link to={"/pedido/" + item.id} className="btn btn-outline-primary btn-sm">Consultar</Link>
                                    </td>
                                    <td className="text-center">
                                        <Link to={"/editarpedido/" + item.id} className="btn btn-outline-warning btn-sm">Editar</Link>
                                    </td>
                                    <td className="text-center">
                                        <span onClick={juntarFunctions} className={bitaoDeleteIsVisible ? "btn btn-outline-danger btn-sm"
                                            : "btn btn-outline-danger btn-sm d-none"}>Deletar</span>

                                        <span className={bitaoDeleteCtzaIsVisible ? "btn btn-outline-danger btn-sm disabled d-none"
                                            : "btn btn-outline-danger btn-sm disabled"}>Tem certeza?</span>

                                        <span onClick={() => apagarPedido(item.id)} className={bitaoDeleteSimIsVisible ? "btn btn-outline-danger btn-sm d-none"
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
                            <a href="/visualizarservico" className="btn btn-outline-primary btn-md">Serviço</a>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}