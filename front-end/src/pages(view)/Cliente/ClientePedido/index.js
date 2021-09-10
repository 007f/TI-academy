import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Alert, Container, Table } from "reactstrap";
import { api } from '../../../config';

export const ClientePedidos = (props) => {
    console.log(props.match.params.id);

    const [data, setData] = useState([]);
    const [id] = useState(props.match.params.id);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    useEffect(() => {
        const getClientePedidos = async () => {
            await axios.get(api + "/listarpedidos/" + id)
                .then((response) => {
                    console.log(response.data.pedidos);
                    setData(response.data.pedidos);
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
                            <h1>Pedidos desse cliente</h1>
                        </div>
                    </div>
                    <div className="p-5 d-flex flex-column">
                        {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
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
                                {data.map(item => (
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
                        <div className="mt-2 d-flex justify-content-center">
                            <div className="p-2">
                                <Link to="/visualizarcliente" className="btn btn-outline-primary btn-sm">Voltar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}