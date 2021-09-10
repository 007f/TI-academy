import axios from 'axios';
import { useState } from 'react';
import { Container, Form, FormGroup, Input, Label, Button, Alert, Spinner } from 'reactstrap';
import { api } from '../../../config';


export const CadastrarServico = () => {

    const [servico, setServico] = useState({
        nome: '',
        descricao: ''
    });

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    })

    const valorInput = e => setServico({
        ...servico, [e.target.name]: e.target.value
    })

    const cadServico = async e => {
        e.preventDefault();

        setStatus({
            formSave: true
        });

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.post(api + "/servicos", servico, { headers })
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
            })
            .catch(() => {
                setStatus({
                    formSave: false,
                    type: 'success',
                    message: 'Erro: não foi possível se conectar a API.'
                });
            });
    };

    return (
        <div>
            <Container>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="w-100 m-auto mt-3 p-3 border rounded-pill d-flex justify-content-center align-items-center" style={{ background: '#23bceb' }}>
                        <div className="m-auto p-2">
                            <h1>Cadastrar serviço</h1>
                        </div>
                    </div>
                </div>
                <hr className="m-4"></hr>


                <div className="w-100 p-2 d-flex justify-content-center align-items-center">
                    <Form className="w-50 p-2" onSubmit={cadServico}>
                        <FormGroup className="p-2">
                            <Label>Nome</Label>
                            <Input type="text" name="nome" placeholder="Nome do serviço" onChange={valorInput}></Input>
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>Descrição</Label>
                            <Input type="text" name="descricao" placeholder="Descrição do serviço" onChange={valorInput}></Input>
                        </FormGroup>

                        <div className="p-2 d-flex justify-content-center align-items-center">
                            {status.formSave ? <Button type="submit" outline color="warning" disabled>
                                <Spinner children="" style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem', color: 'primary' }} />{'Salvando...'}
                            </Button> :
                                <Button type="submit" outline color="success">Cadastrar</Button>}

                            <Button className="m-2" type="reset" outline color="warning">Limpar</Button>
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
                        <a href="/visualizarservico" className="btn btn-outline-primary btn-md">Voltar</a>
                    </div>
                </div>
            </Container>
        </div>
    )
}