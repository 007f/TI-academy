import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap"
import { api } from "../../../config";


export const EditarCliente = (props) => {

    const [id] = useState(props.match.params.id);

    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [nascimento, setNascimento] = useState('');

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const edtCliente = async e => {
        e.preventDefault();

        setStatus({
            formSave: true
        });

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.put(api + "/editarcliente", { id, nome, endereco, cidade, uf, nascimento }, { headers })
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
        const getCliente = async () => {
            await axios.get(api + "/cliente/" + id)
                .then((response) => {
                    setNome(response.data.cliente.nome);
                    setEndereco(response.data.cliente.endereco);
                    setCidade(response.data.cliente.cidade);
                    setUf(response.data.cliente.uf);
                    setNascimento(response.data.cliente.nascimento);
                }).catch(() => {
                    console.log("Erro: Não foi possível conectar a API.")
                });
        }
        getCliente();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="w-100 m-auto mt-3 p-3 border rounded-pill d-flex justify-content-center align-items-center" style={{ background: '#23bceb' }}>
                        <div className="m-auto p-2">
                            <h1>Editando o cliente - ({nome}) - Id ({id})</h1>
                        </div>
                    </div>
                </div>
                <hr className="m-4"></hr>

                <div className="w-100 p-2 d-flex justify-content-center align-items-center">
                    <Form className="w-50 p-2" onSubmit={edtCliente}>
                        <FormGroup className="p-2">
                            <Label>Nome</Label>
                            <Input type="text" name="nome" placeholder="Nome do cliente" value={nome} onChange={e => setNome(e.target.value)}></Input>
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>Endereço</Label>
                            <Input type="text" name="endereco" placeholder="Endereço do cliente" value={endereco} onChange={e => setEndereco(e.target.value)}></Input>
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>Cidade</Label>
                            <Input type="text" name="cidade" placeholder="Cidade do cliente" value={cidade} onChange={e => setCidade(e.target.value)}></Input>
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>UF</Label>
                            <Input type="text" name="uf" placeholder="UF do cliente" value={uf} onChange={e => setUf(e.target.value)}></Input>
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>Nascimento</Label>
                            <Input type="text" name="nascimento" placeholder="Data de nascimento do cliente" value={nascimento} onChange={e => setNascimento(e.target.value)}></Input>
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
                        <Link to={"/visualizarcliente"} className="btn btn-outline-primary btn-md">Voltar</Link>
                    </div>
                    <div className="p-2">
                        <Link to={"/cliente/" + id} className="btn btn-outline-primary btn-md">Consultar este cliente</Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}