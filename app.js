let campo_texto = document.getElementById("campo-texto");
let campo_mensaje = document.getElementById("campo-mensaje");
const advertencia = document.getElementById("advertencia");
const imagen_mensaje = document.getElementById("imagen-mensaje");
const alerta_copia = document.getElementById("alerta-copia");
const btn_copiar = document.getElementById("btnCopiar");


function verificarTexto(texto) {
    let texto_normalizado = texto.normalize("NFD").replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"';,\u0300-\u036f}]/g,'');

    if(texto == ""){
        advertencia.innerHTML = "&#9888; El campo de texto está vacío.";
        advertencia.style.fontWeight = "bold";
        advertencia.style.opacity = 100;
        advertencia.style.transition= "opacity 500ms ease";

        setTimeout(()=>{
            advertencia.style.transition= "opacity 500ms ease";
            advertencia.style.opacity = 0;
        },2000);

        return false;
    } 
    else if(texto !== texto_normalizado || texto !== texto.toLowerCase()){
        advertencia.innerHTML = "&#9888; Solo se aceptan letras minúsculas, no carácteres especiales ni acento.";
        advertencia.style.fontWeight = "bold";
        advertencia.style.opacity = 100;
        advertencia.style.transition= "opacity 500ms ease";
        
        setTimeout(()=>{
            advertencia.style.transition= "opacity 500ms ease";
            advertencia.style.opacity = 0;
        },2000);

        return false;
    } else {
        return true;
    }
}

function btnEncriptar() {
    let texto = campo_texto.value;

    if(verificarTexto(texto)){
        texto = texto.replace(/e/mg,"enter");
        texto = texto.replace(/i/mg,"imes");
        texto = texto.replace(/a/mg,"ai");
        texto = texto.replace(/o/mg,"ober");
        texto = texto.replace(/u/mg,"ufat");

        imagen_mensaje.style.opacity = 0;

        campo_mensaje.innerHTML = texto;
    }
    return;
}

function btnDesencriptar() {
    let texto = campo_texto.value;
    if (verificarTexto(texto)){

        texto = texto.replace(/(?:enter|imes|ai|ober|ufat)/g, function(match) {
            switch (match) {
                case "enter":
                    return "e";
                case "imes":
                    return "i";
                case "ai":
                    return "a";
                case "ober":
                    return "o";
                case "ufat":
                    return "u";
                default:
                    return match;
            }
        });

        campo_mensaje.innerHTML = texto;

        imagen_mensaje.style.opacity = 0;
    }
    return;
}

function btnCopiar() {
    const mensaje = document.getElementById("campo-mensaje").value;
    
    if(mensaje == ""){
        alerta_copia.innerHTML = "&#9888; El campo está vacío.";

        alerta_copia.style.opacity = 100;    
    } else {
        navigator.clipboard.writeText(mensaje);

        alerta_copia.innerHTML = "&#128505; El texto se copió al portapapeles.";
        alerta_copia.style.opacity = 100;    
    }
    
    setTimeout(()=>{
        alerta_copia.style.transition = "opacity 500ms ease";
        alerta_copia.style.opacity = 0;
    },2000);

    return;
}