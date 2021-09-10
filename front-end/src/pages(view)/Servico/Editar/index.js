import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap"
import { api } from "../../../config";


export const EditarServico = (props) => {

    const [id] = useState(props.match.params.id);

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const edtServico = async e => {
        e.preventDefault();

        setStatus({
            formSave: true
        });

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.put(api + "/editarservico", { id, nome, descricao }, { headers })
            .then((response) => {
                if (response.data.error) {
                    setStatus({
                        formSave: false,
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    setStatus({
                        formSave: false,
                        type: 'success',
                        message: response.data.message
                    });
                }
            }).catch(() => {
                setStatus({
                    formSave: false,
                    type: 'error',
                    message: 'Erro: Não foi possível acessar a API.'
                })
            })
    };

    useEffect(() => {
        const getServico = async () => {
            await axios.get(api + "/servico/" + id)
                .then((response) => {
                    setNome(response.data.servico.nome);
                    setDescricao(response.data.servico.descricao);
                }).catch(() => {
                    console.log("Erro: Não foi possível conectar a API.")
                });
        }
        getServico();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="w-100 m-auto mt-3 p-3 border rounded-pill d-flex justify-content-center align-items-center" style={{ background: '#23bceb' }}>
                        <div className="m-auto p-2">
                            <h1>Editando o serviço - ({nome}) - Id ({id})</h1>
                        </div>
                    </div>
                </div>
                <hr className="m-4"></hr>

                <div className="w-100 p-2 d-flex justify-content-center align-items-center">
                    <Form className="w-50 p-2" onSubmit={edtServico}>
                        <FormGroup className="p-2">
                            <Label>Nome</Label>
                            <Input type="text" name="nome" placeholder="Nome do serviço" value={nome} onChange={e => setNome(e.target.value)}></Input>
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>Descrição</Label>
                            <Input type="text" name="descricao" placeholder="Descrição do serviço" value={descricao} onChange={e => setDescricao(e.target.value)}></Input>
                        </FormGroup>

                        <div className="p-2 d-flex justify-content-center align-items-center">
                            {status.formSave ? <Button type="submit" outline color="warning" disabled>
                                <Spinner children="" style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem', color: 'primary' }} />{'Salvando...'}
                            </Button> :
                                <Button type="submit" outline color="success">Salvar Edição</Button>}
                        </div>

                    </Form>
                </div>

                {status.type === 'error' ? <div className="w-100 p-2 d-flex justify-content-center align-items-center">
                    <Alert className="w-50 d-flex justify-content-center align-items-center" color="danger">{status.message}</Alert>
                </div> : ""}
                {status.type === 'success' ? <div className="w-100 p-2 d-flex justify-content-center align-items-center">
                    <Alert className="w-50 d-flex justify-content-center align-items-center" color="success">{status.message}</Alert>
                </div> : ""}

                <hr className="m-4"></hr>
                <div className="d-flex justify-content-center">
                    <div className="p-2">
                        <Link to={"/visualizarservico"} className="btn btn-outline-primary btn-md">Voltar</Link>
                    </div>
                    <div className="p-2">
                        <Link to={"/servico/" + id} className="btn btn-outline-primary btn-md">Consultar este serviço</Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}