import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap"
import { api } from "../../../config";


export const EditarPedido = (props) => {

    const [id] = useState(props.match.params.id);

    const [clienteId, setClienteId] = useState('');
    const [servicoId, setServicoId] = useState('');
    const [valor, setValor] = useState('');
    const [dataDoPedido, setDataDoPedido] = useState('');

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const edtPedido = async e => {
        e.preventDefault();

        setStatus({
            formSave: true
        });

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.put(api + "/editarpedido", { id, clienteId, servicoId, valor, dataDoPedido }, { headers })
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
        const getPedido = async () => {
            await axios.get(api + "/pedido/" + id)
                .then((response) => {
                    setClienteId(response.data.pedido.ClienteId);
                    setServicoId(response.data.pedido.ServicoId);
                    setValor(response.data.pedido.valor);
                    setDataDoPedido(response.data.pedido.data);
                }).catch(() => {
                    console.log("Erro: Não foi possível conectar a API.")
                });
        }
        getPedido();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="w-100 m-auto mt-3 p-3 border rounded-pill d-flex justify-content-center align-items-center" style={{ background: '#23bceb' }}>
                        <div className="m-auto p-2">
                            <h1>Editando o pedido com ID - ({id})</h1>
                        </div>
                    </div>
                </div>
                <hr className="m-4"></hr>

                <div className="w-100 p-2 d-flex justify-content-center align-items-center">
                    <Form className="w-50 p-2" onSubmit={edtPedido}>
                        <FormGroup className="p-2">
                            <Label>ID Cliente</Label>
                            <Input type="text" name="clienteId" placeholder="ID do cliente que fez esse pedido" value={clienteId} onChange={e => setClienteId(e.target.value)}></Input>
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>ID Serviço</Label>
                            <Input type="text" name="servicoId" placeholder="ID do serviço solicitado neste pedido" value={servicoId} onChange={e => setServicoId(e.target.value)}></Input>
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>Valor</Label>
                            <Input type="text" name="valor" placeholder="Valor a ser cobrado do cliente" value={valor} onChange={e => setValor(e.target.value)}></Input>
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>Data</Label>
                            <Input type="text" name="dataDoPedido" placeholder="Data do pedido" value={dataDoPedido} onChange={e => setDataDoPedido(e.target.value)}></Input>
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
                        <Link to={"/visualizarpedido"} className="btn btn-outline-primary btn-md">Voltar</Link>
                    </div>
                    <div className="p-2">
                        <Link to={"/pedido/" + id} className="btn btn-outline-primary btn-md">Consultar este pedido</Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}