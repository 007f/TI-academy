/* 
        ARRAYS
*/

// começa de 0 a infinito
var frutas = ["Uva", "Banana", "Pera", "Manga"]; // var frutas = Array(); - equivalentes! 1º + usada
console.log(`Quantidade do Array: ${frutas.length} frutas: ${frutas[0]}`);// length = tamanho do array

var frutas2 = ["Abacaxi", "Maça", "Laranja"];

var todasAsFrutas = frutas.concat(frutas2);

console.log(frutas);
console.log(todasAsFrutas);

// indexOf() Procura por um elemento específico no array e retorna a sua posição;
var retornoIndexOf = todasAsFrutas.indexOf("Pera");
console.log(retornoIndexOf); // 0 - 1 - 2 

// join() Junta todso os elementos de um array em uma string

var stringDeArray = todasAsFrutas.join(); // junta tds as frutas
console.log(stringDeArray);

// push() Insere um novo elemento no final do array / pode inserir + de 1

var outraLista = ["Bola", "Peteca"];
var novaLista = outraLista.push("Boneca", "Capivara");

console.log(novaLista);
console.log(outraLista);
console.log(outraLista[3]);

// pop () Remover o último elemento do array

console.log(outraLista.pop()); // removeu a Capivara, que é o ultimo
console.log(outraLista);

// reverse() Inverte a ordem dos elementos do array

console.log(outraLista.reverse());

//shift() Remove o primeiro elemento do array

var removerPrimeiro = ["fusca", "variante"];
removerPrimeiro.shift();// usar antes do console!
console.log(removerPrimeiro.shift());

// sort () Ordena os elementos do array em ordem crescente

var alfa = [4, 6, 7, 2];  // ordena crescente
alfa.sort(); // usar antes do console!
console.log(alfa);

// toString() Converte um array em string e retorna esa string = "join"

// unshift () Insere um novo elemento no início do array

alfa.unshift(9);
console.log(alfa);
alfa.sort();
console.log(alfa);

// splice() Corta o array em determinado ponto - quebra de array
// elimina restante do array a partir de certo ponto

var f = ["Uva", "Banana", "Pera", "Manga"];
var idx = f.indexOf("Banana"); // retorna o indice do array
console.log(idx);
console.log(f.splice(idx, 2)); // nº = quantidade a tirar
console.log(f);


// arrays de objetos

// [] criação de array / objeto {}, {} ....

var dados = [
    {nome: "Felipe"},
    {nome: "Mello"}
]

/* 
console.log(dados[0].nome); // 0 = 1º posição
console.log(dados[1].nome); // 1 = 2º posição
 */

function Pessoa2(nome, sobrenome, idade, doc=[]){ // doc "=" []
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.idade = idade;
    this.doc = { // colocando arrays ao invés de nºs fixos
        rg : doc[0],
        cpf : doc[1]
    }
}

var pessoa2 = new Pessoa2("Felipe" ," ", " ", ["22", "555"]); // [rg, cpf]
console.log("Nome: " + pessoa2.nome + ", CPF: " + pessoa2.doc.cpf);
console.log("Nome: " + pessoa2.nome + ", CPF: " + pessoa2.doc.rg);