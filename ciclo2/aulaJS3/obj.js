/* 
        Objetos
        "this" - faz referência a ele mesmo. 
        "new" - cria objeto instanciado
        função - uma espécie de class
 */

function Pessoa(nome, sobrenome, idade){
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.idade = idade;
}

var ps1 = new Pessoa("Edson", "Pessoa", 26); // cria nova var para add a função / construtor
console.log("Nome: " + ps1.nome + " " + ps1.sobrenome+ ", idade: "+ps1.idade);

var ps2 = new Pessoa("Márcia");
console.log("Nome "+ ps2.nome + " " + ps2.sobrenome);

// outras formas de criar objetos dentro do JS

var objPessoa = { rg : "10.152.252-17 ", cpf : " 053.620.335-45" } // : - dados que queremos

//console.log(typeof(objPessoa));
console.log("RG: "+ objPessoa.rg + "CPF: " + objPessoa.cpf); // formula simples de estruturar


function Pessoa2(nome, sobrenome, idade){
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.idade = idade;
    this.doc = { // pode receber um objeto no doc
        rg : "10.152.252-17 ", // virgula !  -- Dados Fixos!
        cpf : " 053.620.335-45"
    }
}

var pessoa2 = new Pessoa2("Felipe");
console.log("Nome: " + pessoa2.nome + ", RG: " + pessoa2.doc.rg);

// outro tipo de estrutura de dados - TEMPLATE STRINGS
console.log(`Nome ${pessoa2.nome} Rg: ${pessoa2.doc.rg}`);
