const express=require('express');
const cors=require('cors');

const models=require('./models');
const { raw } = require('express');

const app=express();
app.use(cors());
app.use(express.json());

let cliente=models.Cliente;
let servico=models.Servico;
let pedido=models.Pedido;

app.get('/', function(req,res){
    res.send('Ola Mundo!');
});

/*app.get('/Clientes', async(req,res)=>{
    let create=await cliente.create({
        nome:"Felipe Saueressig Mello",
        endereco:"rua de casa, 155",
        cidade:"maringa",
        uf:"PR",
        nascimento:"2003-07-31",
    })
    res.send('Cliente cadastrado');
});*///esse codigo é usado para enviar as informações diretamente do codigo para a tabela

app.post('/Clientes', async(req,res)=>{
    let create = await cliente.create(
        req.body
    );
    res.send('Cliente cadastrado!');
});

/*app.get('/Servicos', async(req,res)=>{
    let create=await servico.create({
        nome: "HTML/CSS",
        descricao: "Criação de Páginas estaticas",
    });
    res.send('Serviço foi inserido!');
});*///esse codigo é usado para enviar as informações diretamente do codigo para a tabela

app.post('/Servicos', async(req,res)=>{
    let create = await servico.create(
        req.body
    );
    res.send('Serviço foi inserido!');
});
/*app.get('/pedidos', async(req,res)=>{
    let create=await pedido.create({
        idCliente:"1",
        idServico:"1",
        valor:"88",  
        data:"2003-07-31",
    });
    res.send('pedido inserido');
});*///esse codigo é usado para enviar as informações diretamente do codigo para a tabela

app.post('/pedidos', async(req,res)=>{
    let create = await pedido.create(
        req.body
    );
    res.send('pedido foi inserido!');
});

// aula 3 e 4
app.get('/listaservicos', async(req,res)=>{
    await   servico.findAll({
        raw:true
    }). then(function(servicos){
        res.json(servicos)
    });
});

app.get('/ofertas', async(req,res)=>{
    await servico.count('id').then(function(servicos){ //count apresenta a quantidade de elementos que tem dentro de uma coluna especificada. 
        res.json({servicos})
    });
});

app.get('/servico/:id', async(req,res)=>{// caso necessite que o endereço pegue algo de dentro da tabela deve ser especificado qual coluna depois de ":"
    servico.findByPk(req.params.id)
    .then(servico=>{
        return res.json({
            error: false,
            servico
        });
    }).catch(function(erro){
            return res.status(400).json({
            error: true,
            message: "Código não cadastrado!"
        });
    });
});

// Exercicio 1: Lista todos os clientes
app.get('/listaclientes', async(req,res)=>{  
    await cliente.findAll({
//        raw:true  // listando desordenadamente...
          order: [['nome','ASC']]
    }).then(function(clientes){
        res.json({clientes})
    });
});

// Exercicio 2: Lista clientes por ordem de antiguidade
app.get('/lisclipornasc', async(req,res)=>{
    await cliente.findAll({
//        raw:true  // listando desordenadamente...
          order: [['nascimento','DESC']]//DESC = decrecente
    }).then(function(clientes){
        res.json({clientes})
    });
});

// Exercicio 3: Lista todos os pedidos
app.get('/listapedidos', async(req,res)=>{
    await pedido.findAll({
        raw:true  // listando desordenadamente...
//          order: [['nome','DESC']]
    }).then(function(pedidos){
        res.json({pedidos})
    });
});

// Exercicio 4: Lista pedidos por ordem de maior para menor valor
app.get('/listapedidosva', async(req,res)=>{
    await pedido.findAll({
          order: [['valor','DESC']]
    }).then(function(pedidos){
        res.json({pedidos})
    });
});

// Exercicio 5: Quantidade de clientes
app.get('/qtdeclientes', async(req,res)=>{
    await cliente.count('id').then(function(cliente){
        res.json({cliente})
    });
});

// Exercicio 6: Quantidade de pedidos
app.get('/qtdepedidos', async(req,res)=>{
    await pedido.count('id').then(function(pedido){
        res.json({pedido})
    });
});

// desafio 30/8
const { Op } = require("sequelize");

app.get('/totalpedicliente/:clienteId', async(req,res)=>{
    await pedido.sum('valor', { where: { ClienteId:{[Op.eq]: req.params.clienteId} } })
    .then(saldo=>{
        return res.json({
            error: false,
            saldo
        });
    }).catch(function(erro){
            return res.status(400).json({
            error: true,
            message: "Cliente sem pedidos!"
        });
    });
});

//aula 4 e 5

app.get('/atualizaservico', async(req, res)=>{
    await servico.findByPk(1)
    .then(servico=>{
        servico.nome ='HTML/CSS/JS';
        servico.descricao = 'Páginas estáticas e dinâmicas estilizadas';
        servico.save();
        return res.json({servico});
    });
});

app.put('/editarservico', (req,res)=>{ 
    servico.update(req.body, {
        where:{id: req.body.id }// precisa de uma sincronização para que receba as informações que ira executar
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço alterado com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço."
        });
    });
});

app.get('/servicospedidos', async (req,res)=>{
    await servico.findByPk(1, {
        include: [{all: true}],
    }).then(servico =>{
        return res.json({servico});
    });
});

app.put('/editarpedido', (req,res)=>{
    pedido.update(req.body,{
        where: {
            ServicoId: req.body.ServicoId
        },
    }).then(()=>{
        return res.json({
            error: false,
            message: "Pedido modificado com sucesso.",
        });
    }).catch((erro)=>{
        return res.status(400).json({
            error: true,
            message: "Não foi ppossivel modificar o pedido."
        });
    });
});



// exercicios aula 4 e 5
// exercicio 1
app.get('/servicosclientes', async (req,res)=>{
    await cliente.findByPk(req.body.id, {
        include: [{all: true}],
    }).then(cliente =>{
        return res.json({cliente});
    });
});

//exercicio 2
app.put('/editarcliente',(req,res)=>{
    cliente.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente foi alterado com sucesso."
        });
        }).catch(function(erro){
            return res.status(400).json({
            error: true, 
            message: "Erro na alteração do serviço."
        });
    });
});
// exercicio 3
app.put('/editarpedido',(req,res)=>{
    pedido.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço foi alterado com sucesso."
        });
        }).catch(function(erro){
            return res.status(400).json({
            error: true, 
            message: "Erro na alteração do serviço."
        });
    });
});

//desafio aula 4 
app.get('/pedidoscliente/:ClienteId', async (req, res)=>{
    await pedido.findAll({
        where: {
            'ClienteId': req.params.ClienteId,
        },
    }).then(function(pedido){
        res.json({pedido})
    });
});

app.put('/editarpedidoporcliente/:ClienteId', (req,res)=>{
    pedido.update(req.body,{
        where: {
            ClienteId: req.params.ClienteId
        },
    }).then(()=>{
        return res.json({
            error: false,
            message: "Pedido modificado com sucesso.",
        });
    }).catch((erro)=>{
        return res.status(400).json({
            error: true,
            message: "Não foi possivel modificar o pedido."
        });
    });
});

app.get('/excluircliente', async (req,res)=>{
    cliente.destroy({
        where:{id: 2}
    });
});

app.delete('/apagarcliente/:id', (req,res)=>{
    cliente.destroy({
        where:{id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: 'Cliente excluido com sucesso!'
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: 'Não foi possivel excluir o cliente.'
        });
    });
});

let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('servidor ativo');
});
