import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import { api } from '../../../config';

export const Pedido = (props) => {
    console.log(props.match.params.id);

    const [data, setData] = useState([]);

    const [nomeCliente, setNomeCliente] = useState('');
    const [enderecoCliente, setEnderecoCliente] = useState('');
    const [cidadeCliente, setCidadeCliente] = useState('');
    const [ufCliente, setUfCliente] = useState('');
    const [nascimentoCliente, setNascimentoCliente] = useState('');
    const [createdAtCliente, setCreatedAtCliente] = useState('');

    const [nomeServico, setNomeServico] = useState('');
    const [descricaoServico, setDescricaoServico] = useState('');
    const [createdAtServico, setCreatedAtServico] = useState('');

    const [id] = useState(props.match.params.id);

    useEffect(() => {
        const getPedido = async () => {
            await axios.get(api + "/pedido/" + id)
                .then((response) => {
                    console.log(response.data.pedido);
                    setData(response.data.pedido);
                })
                .catch(() => {
                    console.log("Erro: Não foi possível conectar a API.");
                })
        }
        getPedido();
    }, [id]);

    useEffect(() => {
        const getCliente = async () => {
            await axios.get(api + "/cliente/" + data.ClienteId)
                .then((response) => {
                    setNomeCliente(response.data.cliente.nome);
                    setEnderecoCliente(response.data.cliente.endereco);
                    setCidadeCliente(response.data.cliente.cidade);
                    setUfCliente(response.data.cliente.uf);
                    setNascimentoCliente(response.data.cliente.nascimento);
                    setCreatedAtCliente(response.data.cliente.createdAt);
                })
                .catch(() => {
                    console.log("Erro: Não foi possível conectar a API.");
                })
        }
        getCliente();
    }, [data.ClienteId]);

    useEffect(() => {
        const getServico = async () => {
            await axios.get(api + "/servico/" + data.ServicoId)
                .then((response) => {
                    setNomeServico(response.data.servico.nome);
                    setDescricaoServico(response.data.servico.descricao);
                    setCreatedAtServico(response.data.servico.createdAt);
                })
                .catch(() => {
                    console.log("Erro: Não foi possível conectar a API.");
                })
        }
        getServico();
    }, [data.ServicoId]);

    return (
        <div>
            <Container>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="w-100 m-auto mt-3 p-3 border rounded-pill d-flex justify-content-center align-items-center" style={{ background: 'rgba(16,100,199,0.33)' }}>
                        <div className="m-auto p-2">
                            <h1>Informações do pedido com ID - ({id})</h1>
                        </div>
                    </div>
                    <div className="w-75 mt-3 d-flex flex-column justify-content-center align-items-center text-center">
                        <div className="w-100 p-5 border border-dark rounded" style={{ background: 'rgba(16,199,154,0.33)' }}>
                            <dl className="row justify-content-center">
                                <dt className="col-md-3">ID do Cliente</dt>
                                <dd className="col-md-3">{data.ClienteId}</dd>
                            </dl>
                            <dl className="row justify-content-center">
                                <dt className="col-md-3">Nome do Cliente</dt>
                                <dd className="col-md-3">{nomeCliente}</dd>
                            </dl>
                            <dl className="row justify-content-center">
                                <dt className="col-md-3">Consultar Cliente</dt>
                                <dd className="col-md-3"><Link to={"/cliente/" + data.ClienteId} className="btn btn-outline-primary btn-md">Consultar este cliente</Link></dd>
                            </dl>
                            <dl className="row justify-content-center">
                                <dt className="col-md-3">ID do Serviço</dt>
                                <dd className="col-md-3">{data.ClienteId}</dd>
                            </dl>
                            <dl className="row justify-content-center">
                                <dt className="col-md-3">Nome do Serviço</dt>
                                <dd className="col-md-3">{nomeServico}</dd>
                            </dl>
                            <dl className="row justify-content-center">
                                <dt className="col-md-3">Consultar Serviço</dt>
                                <dd className="col-md-3"><Link to={"/servico/" + data.ServicoId} className="btn btn-outline-primary btn-md">Consultar este serviço</Link></dd>
                            </dl>
                            <dl className="row justify-content-center">
                                <dt className="col-md-3">Valor do Pedido</dt>
                                <dd className="col-md-3">{data.valor}</dd>
                            </dl>
                            <dl className="row justify-content-center">
                                <dt className="col-md-3">Data do Pedido</dt>
                                <dd className="col-md-3">{data.data}</dd>
                            </dl>
                            <dl className="row justify-content-center">
                                <dt className="col-md-3">Data de Criação</dt>
                                <dd className="col-md-3">{data.createdAt}</dd>
                            </dl>
                        </div>
                    </div>

                    <div className="m-4 p-2 border border-dark rounded text-center">
                        <h1>Detalhes</h1>
                        <h2>Cliente - {nomeCliente}</h2>
                        <h2>Serviço - {nomeServico}</h2>
                    </div>

                    <div className="w-75 m-3 d-flex justify-content-center align-items-center text-justify">
                        <div className="w-50 p-5 border border-dark rounded" style={{ background: 'rgba(16,199,154,0.33)' }}>
                            <dl className="row justify-content-start">
                                <dt className="col-sm-6">Nome</dt>
                                <dd className="col-md-3">{nomeServico}</dd>
                            </dl>
                            <dl className="row justify-content-start">
                                <dt className="col-sm-6">Descrição</dt>
                                <dd className="col-md-6">{descricaoServico}</dd>
                            </dl>
                            <dl className="row justify-content-start">
                                <dt className="col-sm-6">Data de Criação</dt>
                                <dd className="col-md-3">{createdAtServico}</dd>
                            </dl>
                        </div>

                        <div className="w-50 p-5 border border-dark rounded" style={{ background: 'rgba(16,199,154,0.33)', marginLeft: "5%" }}>
                            <dl className="row justify-content-start">
                                <dt className="col-sm-6">Nome</dt>
                                <dd className="col-md-3">{nomeCliente}</dd>
                            </dl>
                            <dl className="row justify-content-start">
                                <dt className="col-sm-6">Endereço</dt>
                                <dd className="col-md-6">{enderecoCliente}</dd>
                            </dl>
                            <dl className="row justify-content-start">
                                <dt className="col-sm-6">Cidade</dt>
                                <dd className="col-md-3">{cidadeCliente}</dd>
                            </dl>
                            <dl className="row justify-content-start">
                                <dt className="col-sm-6">UF</dt>
                                <dd className="col-md-3">{ufCliente}</dd>
                            </dl>
                            <dl className="row justify-content-start">
                                <dt className="col-sm-6">Nascimento </dt>
                                <dd className="col-md-3">{nascimentoCliente}</dd>
                            </dl>
                            <dl className="row justify-content-start">
                                <dt className="col-sm-6">Data de Criação</dt>
                                <dd className="col-md-3">{createdAtCliente}</dd>
                            </dl>
                        </div>
                    </div>

                    <div className="m-3 d-flex justify-content-center">
                        <div className="p-2">
                            <Link to="/visualizarpedido" className="btn btn-outline-primary btn-lg">Voltar</Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}