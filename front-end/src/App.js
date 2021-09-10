import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './pages(view)/Home/';
import { VisualizarCliente } from './pages(view)/Cliente/VisualizarCliente';
import { VisualizarPedido } from './pages(view)/Pedido/VisualizarPedido';
import { VisualizarServico } from './pages(view)/Servico/VisualizarServico';
import { Menu } from './components/Menu';
import { Servico } from './pages(view)/Servico/Servico';
import { CadastrarServico } from './pages(view)/Servico/Cadastrar';
import { EditarServico } from './pages(view)/Servico/Editar';
import { Cliente } from './pages(view)/Cliente/Cliente';
import { CadastrarCliente } from './pages(view)/Cliente/Cadastrar';
import { EditarCliente } from './pages(view)/Cliente/Editar';
import { Pedido } from './pages(view)/Pedido/Pedido';
import { CadastrarPedido } from './pages(view)/Pedido/Cadastrar';
import { EditarPedido } from './pages(view)/Pedido/Editar';

function App() {
  return (
    <div>
      <Menu />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/visualizarcliente" component={VisualizarCliente} />
          <Route exact path="/visualizarservico" component={VisualizarServico} />
          <Route exact path="/visualizarpedido" component={VisualizarPedido} />
          <Route path="/servico/:id" component={Servico} />
          <Route path="/cadastrarservico" component={CadastrarServico} />
          <Route path="/editarservico/:id" component={EditarServico} />
          <Route path="/cliente/:id" component={Cliente} />
          <Route path="/cadastrarcliente" component={CadastrarCliente} />
          <Route path="/editarcliente/:id" component={EditarCliente} />
          <Route path="/pedido/:id" component={Pedido} />
          <Route path="/cadastrarpedido" component={CadastrarPedido} />
          <Route path="/editarpedido/:id" component={EditarPedido} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;