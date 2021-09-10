import { Container } from 'reactstrap';


export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="w-100 m-auto mt-3 p-3 border rounded-pill d-flex justify-content-center align-items-center" style={{ background: '#23bceb' }}>
                        <div className="m-auto p-2">
                            <h1>Página inicial</h1>
                        </div>
                    </div>
                    <div className="m-3 d-flex justify-content-center">
                        <div className="p-2">
                            <a href="/visualizarcliente" className="btn btn-outline-primary btn-lg">Cliente</a>
                        </div>
                        <div className="p-2">
                            <a href="/visualizarservico" className="btn btn-outline-primary btn-lg">Serviço</a>
                        </div>
                        <div className="p-2">
                            <a href="/visualizarpedido" className="btn btn-outline-primary btn-lg">Pedido</a>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}