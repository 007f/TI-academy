
var nome = prompt("Digite seu Nome  ");
var numero = prompt(nome + " Digite um numero para comparar com 'n'");
var n = Math.round(Math.random() * (50 - 1));
numero = parseInt(numero);
var bolea = (numero === n);
var soma = numero + n;
var subtra = numero - n;
var divs = numero%n;
var quadrad = numero**2;
function verificNome(){	
	if(typeof(nome) === typeof(String())){	
		document.write("O nome que você digitou é uma String <br>");
		alert("uma String foi enviada")	
	}else{
		document.write("você digitou um numero inteiro <br>")
	}
}
function verificNumero(){	
	if(typeof(numero) === typeof(String())){
		document.write("O numero que você digitou é uma String <br>");	
	}else{
		document.write("você digitou um numero inteiro<br>")
		alert("a string sera convertida para numero ")
	}
}
verificNome();
verificNumero();
document.write("1.Seja bem vindo...: " + nome + "<br>");
document.write("2.Você digitou o numero...: "+ "("+ numero +")" + "<br>");
document.write("3.O retorno da comparação booleana é...: "+ bolea + "<br>");
document.write("4.A soma dos valores é...: " + soma + "<br>");
document.write("5.A subtração dos valores é...: " + subtra + "<br>");
document.write("6.O resto da divsão é...: " + divs + "<br>");
document.write("7.O quadrado do numero digitado é...: " + quadrad + "<br>");
