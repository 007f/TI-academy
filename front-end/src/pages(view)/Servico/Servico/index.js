import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import { api } from '../../../config';

export const Servico = (props) => {

    const [data, setData] = useState([]);
    const [id, ] = useState(props.match.params.id);

    useEffect(() => {
        const getServico = async () => {
            await axios.get(api + "/servico/" + id)
                .then((response) => {
                    console.log(response.data.servico);
                    setData(response.data.servico);
                })
                .catch(() => {
                    console.log("Erro: Não foi possível conectar a API.");
                })
        }
        getServico();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="w-100 m-auto mt-3 p-3 border rounded-pill d-flex justify-content-center align-items-center" style={{ background: 'rgba(16,100,199,0.33)' }}>
                        <div className="m-auto p-2">
                            <h1>Informações do Serviço</h1>
                        </div>
                    </div>
                    <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
                        <div className="p-5 border rounded-pill" style={{ background: 'rgba(16,199,154,0.33)' }}>
                            <dl className="row">
                                <dt className="col-sm-3">Nome</dt>
                                <dd className="col-sm-9">{data.nome}</dd>
                            </dl>
                            <dl className="row">
                                <dt className="col-sm-3">Descrição</dt>
                                <dd className="col-sm-9">{data.descricao}</dd>
                            </dl>
                            <dl className="row">
                                <dt className="col-sm-3">Data de Criação</dt>
                                <dd className="col-sm-9">{data.createdAt}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="mt-2 d-flex justify-content-center">
                        <div className="p-2">
                            <Link to="/visualizarservico" className="btn btn-outline-primary btn-sm">Voltar</Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}