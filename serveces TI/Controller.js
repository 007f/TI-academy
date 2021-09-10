const express=require('express');
const cors=require('cors');

const models=require('./models');

const app=express();
app.use(cors());
app.use(express.json());

const { Op, json } = require("sequelize");

let cliente=models.Cliente;
let servico=models.Servico;
let pedido=models.Pedido;

function aguardar(ms){
    return new Promise((resolve)=>{
        setTimeout(resolve, ms);
    });
};

app.get('/',function(req, res){
    res.send('Olá mundo!');
});

//criar novo cliente
app.post('/clientes',async(req, res)=>{
    
    await aguardar(3000);

    await cliente.create(
        req.body
    ).then(() => {
        return res.json({
            type: "success",
            message: "Cliente foi criado com sucesso."
        });
    }).catch((erro) => {
        return res.status(400).json({
            type: "error",
            message: "Erro na criação do cliente."
        });
    });
});

//criar novo servico
app.post('/servicos',async(req, res)=>{

    await aguardar(3000);

    await servico.create(
        req.body
    ).then(() => {
        return res.json({
            type: "success",
            message: "Serviço foi criado com sucesso."
        });
    }).catch((erro) => {
        return res.status(400).json({
            type: "error",
            message: "Erro na criação do serviço."
        });
    });
});

//criar novo pedido
app.post('/pedidos',async(req, res)=>{

    await aguardar(3000);
    
    await pedido.create(
        req.body
    ).then(() => {
        return res.json({
            type: "success",
            message: "Pedido foi criado com sucesso."
        });
    }).catch((erro) => {
        return res.status(400).json({
            type: "error",
            message: "Erro na criação do pedido."
        });
    });
});

//visualizar todos servicos
app.get('/listaservicos',async(req, res)=>{
    await servico.findAll({
        order:[['id']]
    }).then(function(servicos){
        res.json({servicos})
    });
});

//visualizar numero de servicos
app.get('/ofertas',async(req, res)=>{
    await servico.count('id')
    .then(function(servicos){
        res.json({servicos})
    });
});

//visualizar um servico com id específico
app.get('/servico/:id',async(req, res)=>{
    servico.findByPk(req.params.id)
    .then(servico=>{
        return res.json({
            error:false,
            servico
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Esse código não está cadastrado!"
        });
    });
});


//visualizar um cliente com id específico
app.get('/cliente/:id',async(req, res)=>{
    cliente.findByPk(req.params.id)
    .then(cliente=>{
        return res.json({
            error:false,
            cliente
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Esse código não está cadastrado!"
        });
    });
});


//visualizar um pedido com id específico
app.get('/pedido/:id',async(req, res)=>{
    pedido.findByPk(req.params.id)
    .then(pedido=>{
        return res.json({
            error:false,
            pedido
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Esse código não está cadastrado!"
        });
    });
});


//////////EXERCÍCIOS EM SALA - AULA 30/08//////////
//EX 1 - visualize todos os clientes
app.get('/listaclientes',async(req, res)=>{
    await cliente.findAll({
        raw: true
    }).then(function(clientes){
        res.json({clientes})
    });
});

//EX 2 - visualize todos os clientes em ordem de antiguidade
app.get('/listaclientesantig',async(req, res)=>{
    await cliente.findAll({
        order:[['createdAt']]
    }).then(function(clientes){
        res.json({clientes})
    });
});

//EX 3 - visualize todos os pedidos
app.get('/listapedidos',async(req, res)=>{
    await pedido.findAll({
        raw: true
    }).then(function(pedidos){
        res.json({pedidos})
    });
});

//EX 4 - visualize todos os pedidos em ordem de valor
app.get('/listapedidosvalor',async(req, res)=>{
    await pedido.findAll({
        order:[['valor','DESC']]
    }).then(function(pedidos){
        res.json({pedidos})
    });
});

//EX 5 - visualizar numero de clientes
app.get('/numclientes',async(req, res)=>{
    await cliente.count('id')
    .then(function(clientes){
        res.json({clientes})
    });
});

//EX 6 - visualizar numero de pedidos
app.get('/numpedidos',async(req, res)=>{
    await pedido.count('id')
    .then(function(pedidos){
        res.json({pedidos})
    });
});
//////////FIM DOS EXERCÍCIOS EM SALA - AULA 30/08//////////


//////////DESAFIO - AULA 30/08//////////
//somar todos os valores gastos por um cliente específico
app.get('/clientegastou/:id',async(req, res)=>{
    await pedido.sum('valor', {where: { ClienteId: { [Op.eq]:req.params.id } } })
    .then(function(totalGastoCliente){
        res.json({totalGastoCliente})
    });
});
//explicando a função acima, para fins didáticos de anotação!
//
//então, se eu entendi corretamente temos um caminho ou url na linha 129 deste documento
//nesta linha, declaramos um :id, que será algum valor escolhido pelo usuário
//digamos '/clientegastou/3' ou '/clientegastou/2' por exemplo
//ou seja, a BEM GROSSO MODO mesmo, é quase que um prompt para o usário preencher uma variável
//e depois vamos utilizar ela posteriormente para apontar o ClienteId correto
//
//
//agora vamos por partes,  " pedido.sum('valor', " seria a nossa tabela de pedidos, conforme
//a let declarada na linha 14 deste arquivo, e estamos realizando a SOMA da COLUNA 'valor'
//
//o where seria "aonde", estamos limitando os valores que serão somados a alguma condição de nossa escolha
//
//assim correlacionamos com o ClienteId, ou seja, estamos apontando esta OUTRA COLUNA AINDA NA TABELA PEDIDOS, 
//para verificar alguma condição! isso a princípio tinha ficado um pouco confuso para mim mas é muito importante destacar,
//nunca saímos da tabela pedidos em momento algum, estamos sempre trabalhando nela, embasado em suas colunas!
//
//finalmente, temos " [Op.eq]:req.params.id " que seriam as nossas CONDIÇÕES de comparação com a COLUNA ClienteId
//lembrando que tivemos que declarar " const { Op } " na linha 10 deste documento para que ela possa ser utilizada!
//o que estamos dizendo aqui? " [Op.eq] " significa IGUAL, mas igual a que? igual a " req.params.id ", mas o que é isso?
//isso é aquela "variável" que declaramos alí na linha 129 no caminho ou url! ou seja, no fim das contas estamos dizendo assim:
//computador, faça a SOMA dos números na COLUNA valor da TABELA pedidos, mas APENAS aqueles com o mesmo ClienteId
//que foi digitano no caminho ou url pelo usuário
//
//voltando ao nosso exemplo anterior, digamos que o usuário digite '/clientegastou/3' ou '/clientegastou/2' por exemplo
//ele ou ela estaria pedindo a soma de todos os valores do ClienteId 3 no primeiro caso ou ClienteId 2 no segundo caso
//
//////////FIM DO DESAFIO - AULA 30/08//////////


//mudar um serviço
app.get('/atualizaservico',async(req,res)=>{
    await servico.findByPk(3)
    .then(servico=>{
        servico.nome='HTML/CSS/JS';
        servico.descricao='Páginas estáticas e dinâmicas estilizadas';
        servico.save();
        return res.json({servico});
    });
});

//mudar um serviço através do body
app.put('/editarservico',async(req,res)=>{
    await aguardar(3000);

    await servico.update(req.body,{
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

//buscar pedidos de um servico especifico
app.get('/servicospedidos',async(req,res)=>{
    await servico.findByPk(3, {
        include:[{all:true}]
    }).then(servico=>{
        return res.json({servico});
    });   
});


//mudar um pedido através do body
app.put('/editarpedido',async(req,res)=>{
    await aguardar(3000);

    await pedido.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido foi alterado com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do pedido."
        });
    });
});


//////////EXERCÍCIOS EM SALA - AULA 31/08//////////
//EX 1 - buscar por pedidos de clientes passando o id do cliente no corpo da requisição
app.get('/listarpedidos/:id',async(req, res)=>{
    await pedido.findAll({ where: {ClienteId: [req.params.id]} })
    .then(function(pedidos){
        res.json({pedidos})
    });
});


//buscar por pedidos de SERVICOS passando o id do cliente no corpo da requisição
app.get('/listarpedidoss/:id',async(req, res)=>{
    await pedido.findAll({ where: {ServicoId: [req.params.id]} })
    .then(function(pedidos){
        res.json({pedidos})
    });
});

//EX 1 ALTERNATIVO - buscar por pedidos de clientes utilizando o findbypk
app.get('/clientepedidos',async(req,res)=>{
    await cliente.findByPk(2, {
        include:[{all:true}]
    }).then(cliente=>{
        return res.json({cliente});
    });   
});

//EX 2 - consultar clientes e faça edição de um cliente pelo método put
//
//http://localhost:3000/listaclientes (linha 80 deste documento)
//
//e depois
app.put('/editarcliente',async(req,res)=>{
    await aguardar(3000);

    await cliente.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente foi alterado com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do cliente."
        });
    });
});


//EX 3 - consultar pedidos e faça edição de um pedido pelo método put
//
//http://localhost:3000/listapedidos (linha 98 deste documento)
//
//e depois
//
//http://localhost:3000/editarpedido (linha 211 deste documento)
//
//ou utilizar o put abaixo com id específico
app.put('/editapedido/:id', (req,res)=>{
    pedido.update(req.body,{
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido alterado com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do pedido."
        });
    });
});
//////////FIM DOS EXERCÍCIOS EM SALA - AULA 31/08//////////


//excluir um cliente
app.get('/excluircliente',async(req,res)=>{
    cliente.destroy({
        where: {id: 4}
    });
});


//excluir cliente pelo id na rota
app.delete('/apagarcliente/:id',(req,res)=>{
    cliente.destroy({
        where: {id:req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente excluído com sucesso."
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: "Não foi possível excluir o cliente."
        });
    });
});



app.delete('/apagarservico/:id',(req,res)=>{
    servico.destroy({
        where: {id:req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço excluído com sucesso."
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: "Não foi possível excluir o serviço."
        });
    });
});



app.delete('/apagarpedido/:id',(req,res)=>{
    pedido.destroy({
        where: {id:req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço excluído com sucesso."
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: "Não foi possível excluir o serviço."
        });
    });
});


//////////DESAFIO - AULA 31/08//////////
//1. faça uma rota que liste todos os pedidos de um cliente
//2. crie uma nova rota que permita alterar esse pedido utilizando o ClienteId
//
//
//em tese, a primeira parte seria a mesma coisa do exercício 1 da aula 31/08 (linha 229 deste documento)
//segue abaixo o mesmo código, mas comentado para não causar conflitos
/*
app.get('/listarpedidos/:id',async(req, res)=>{
    await pedido.findAll({ where: {ClienteId: [req.params.id]} })
    .then(function(pedidos){
        res.json({pedidos})
    });
});
*/
//
//após isso, a segunda parte também é similar ao exercício 3 da aula 31/08 (linha 277 deste documento)
//porém, realizamos uma pequena alteração no where para mudar apenas os pedidos com o mesmo ClienteId
//que o usuário inseriu na rota ou url

app.put('/mudarpedido/:ClienteId', (req,res)=>{
    pedido.update(req.body,{
        where: {ClienteId: req.body.ClienteId}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido foi alterado com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do pedido."
        });
    });
});
//////////FIM DO DESAFIO - AULA 31/08//////////


let port=process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor está ativo');
});