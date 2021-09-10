import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Alert, Container, Table } from 'reactstrap';
import { api } from '../../../config';

export const Cliente = (props) => {
    console.log(props.match.params.id);

    const [data, setData] = useState([]);

    const [dataServicoPedidos, setDataServicoPedidos] = useState([]);

    const [nome, setNome] = useState('');

    const [tabelaPedidosIsVisible, setTabelaPedidosIsVisible] = useState(true);
    const [msgNaoTemPedidosIsVisible, setMsgNaoTemPedidosIsVisible] = useState(true);

    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    useEffect(() => {
        const getCliente = async () => {
            await axios.get(api + "/cliente/" + id)
                .then((response) => {
                    console.log(response.data.cliente);
                    setData(response.data.cliente);
                    setNome(response.data.cliente.nome);
                })
                .catch(() => {
                    console.log("Erro: Não foi possível conectar a API.");
                })
        }
        getCliente();
    }, [id]);

    useEffect(() => {
        const getClientePedidos = async () => {
            await axios.get(api + "/listarpedidos/" + id)
                .then((response) => {
                    let temPedido = (response.data.pedidos);
                    if (temPedido.length === 0) {
                        setTabelaPedidosIsVisible(!tabelaPedidosIsVisible);
                    } else {
                        setMsgNaoTemPedidosIsVisible(!msgNaoTemPedidosIsVisible);
                    }
                    console.log(response.data.pedidos);
                    setDataServicoPedidos(response.data.pedidos);
                })
                .catch(() => {
                    console.log("Erro: Não foi possível conectar a API.");
                    setStatus({
                        type: 'error',
                        message: 'Erro: Não foi possível conectar a API.'
                    })
                })
        }
        getClientePedidos();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="w-100 m-auto mt-3 p-3 border rounded-pill d-flex justify-content-center align-items-center" style={{ background: 'rgba(16,100,199,0.33)' }}>
                        <div className="m-auto p-2">
                            <h1>Informações do cliente - ({nome}) - Id ({id})</h1>
                        </div>
                    </div>
                    
                    <div className="w-75 m-3 d-flex justify-content-center align-items-center text-center">
                        <div className="w-100 p-5 border border-dark rounded" style={{ background: 'rgba(16,199,154,0.33)' }}>
                            <dl className="row justify-content-center">
                                <dt className="col-sm-3">Nome</dt>
                                <dd className="col-md-3">{data.nome}</dd>
                            </dl>
                            <dl className="row justify-content-center">
                                <dt className="col-sm-3">Endereço</dt>
                                <dd className="col-md-3">{data.endereco}</dd>
                            </dl>
                            <dl className="row justify-content-center">
                                <dt className="col-sm-3">Cidade</dt>
                                <dd className="col-md-3">{data.cidade}</dd>
                            </dl>
                            <dl className="row justify-content-center">
                                <dt className="col-sm-3">UF</dt>
                                <dd className="col-md-3">{data.uf}</dd>
                            </dl>
                            <dl className="row justify-content-center">
                                <dt className="col-sm-3">Nascimento </dt>
                                <dd className="col-md-3">{data.nascimento}</dd>
                            </dl>
                            <dl className="row justify-content-center">
                                <dt className="col-sm-3">Data de Criação</dt>
                                <dd className="col-md-3">{data.createdAt}</dd>
                            </dl>
                        </div>
                    </div>

                    <div className={tabelaPedidosIsVisible ? "p-5 d-flex flex-column"
                        : "p-5 d-flex flex-column d-none"}>
                        {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                        <div className="m-4 p-2 border border-dark rounded">
                            <h1>Pedidos relacionados a este cliente</h1>
                        </div>
                        <Table striped dark hover>
                            <thead>
                                <tr>
                                    <th>ID Pedido</th>
                                    <th>ID Serviço</th>
                                    <th>Valor</th>
                                    <th>Data</th>
                                    <th className="text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataServicoPedidos.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.ServicoId}</td>
                                        <td>{item.valor}</td>
                                        <td>{item.data}</td>
                                        <td className="text-center">
                                            <Link to={"/pedido/" + item.id} className="btn btn-outline-primary btn-sm">Consultar</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    <div className={msgNaoTemPedidosIsVisible ? "p-5 d-flex flex-column"
                        : "p-5 d-flex flex-column d-none"}>
                        <div className="m-auto p-2 border border-dark rounded">
                            <h1>Não existem pedidos relacionados a este cliente!</h1>
                        </div>
                    </div>

                    <div className="mt-2 d-flex justify-content-center">
                        <div className="p-2">
                            <Link to="/visualizarcliente" className="btn btn-outline-primary btn-sm">Voltar</Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}