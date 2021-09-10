
/*
	var / let const
*/

/*
var nome= "Marcelo"; //global
let sobreNome= "Weihmayr";
if(true){
	console.log("var nome= " + nome)
	var nm = nome;
	console.log("chamando o sobrenome " + sobreNome);
	let sn = "Da Silva";
	console.log(sobreNome);
}
console.log("Meu nome é " + nm + " "+sobreNome + " " + sn);
console.log("var nome= "+ nm);
*/

var Pessoa = {
	nome: "Anderson", 
	rua: "Rua lá",
	ncasa: "13",
	dados: function(){
		document.write(
			"Nome...:"+this.nome+"<br>"+
			"Rua...:"+this.rua+"<br>"+
			"N. casa...:"+this.ncasa+"<br>")}
}

Pessoa.dados();

/*console.log("Nome " + Pessoa.nome +
						" Endereço" + " " + Pessoa.rua + " N." + Pessoa.ncasa);*/