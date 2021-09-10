window.onload = () => {

    //Textbox
    const txtValor1 = document.querySelector("#txtValor1");
    const txtValor2 = document.querySelector("#txtValor2");
    const txtResultado = document.querySelector("#txtResultado");

    //Buttom
    const btnResultado = document.querySelector("#btnResultado");

    //Function
    btnResultado.addEventListener('click', () => {
        var vlr1 = Number(txtValor1.value);
        var vlr2 = Number(txtValor2.value);
        var vlrResultado = Number(txtResultado.value);

        var resultado = vlr1 + vlr2;

        var sucesso = resultado === vlrResultado ? true : false;

        if (sucesso && resultado != 0) {
            alert("Valor Correto!");
        }
        else {
            alert("Valor Incorreto");
        }
    });
};