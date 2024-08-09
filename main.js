let campoRespuesta = document.querySelector('.presentacion__rectangulo__cuerpo');
let AnunciomensajeCopiado = "Mensaje copiado con exito";

let valoresEncriptacion = {
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat"
}

function obtenerMensajeUsuario() {
    const mensajeUsuario = document.getElementById('campo__texto').value.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return mensajeUsuario;

}
 
function modficarClases(seleccion = 'remove', idElemento, clase) {
    let elemento = document.getElementById(idElemento);
    if (seleccion === 'remove') {

        elemento.classList.remove(clase);

    } else {
        elemento.classList.add(clase);
    }
}

function modificarEstilos(nombe_clase) {
    const elemento = document.querySelector(nombe_clase);
    elemento.style.cssText = `align-items: flex-start; 
                            justify-content: flex-start; 
                            white-space: pre-wrap; 
                            word-wrap: break-word; 
                            text-align:left;`
        ;
}

function ocultarCosas(clase) {
    modficarClases('remove', 'copiar', clase);
    modficarClases('remove', 'mensaje__encriptado__display', clase);
    modficarClases('remove', "presentacion__rectangulo__texto__mensaje", "mensaje__ingresar");

}

function aparecerObjetosPantallaTexto() {
    modficarClases('remove', "mensaje__encriptado__display", 'oculto');
    modficarClases('add', 'presentacion__rectangulo__texto__mensaje', 'mensaje__oculto');
    modficarClases('remove', 'copiar', 'boton__oculto');
}

function mostrarMensajePantalla(mensaje) {
    return campoRespuesta.innerHTML = mensaje;

}

function comprobarMensajeUsuario() {
    let mensajeUsuario = obtenerMensajeUsuario();
    if (mensajeUsuario.trim() === "" || mensajeUsuario === "ingrese texto aqui...") {
        ocultarCosas('oculto')
        return false;
    } else {
        modificarEstilos('.presentacion__rectangulo__cuerpo');
        aparecerObjetosPantallaTexto();
        return true;
    }
}

function encriptarMensaje() {
    let mensajeUsuario = obtenerMensajeUsuario();

    if (!comprobarMensajeUsuario()) {
        return console.log('No funciona esta parte - comprobarMensaje')


    } else {
        let mensajeEncriptado = "";
        for (let i = 0; i < mensajeUsuario.length; i++) {
            let claveMensaje = mensajeUsuario[i];
            if (valoresEncriptacion[claveMensaje]) {
                mensajeEncriptado += valoresEncriptacion[claveMensaje];
            } else
                mensajeEncriptado += claveMensaje;

        }
        mostrarMensajePantalla(mensajeEncriptado);
    }
}

function desencriptarMensaje() {
    let mensajeUsuario = obtenerMensajeUsuario();

    if (!comprobarMensajeUsuario()) {

    } else {
        let mensajeDesencriptado = mensajeUsuario;
        let clavesOrdenadas = Object.keys(valoresEncriptacion).sort((a, b) => valoresEncriptacion[b].length - valoresEncriptacion[a].length);

        // Uso de loop para iterar sobre la colección de claves ordenadas
        for (let clave of clavesOrdenadas) {
            let palabraDesencriptada = valoresEncriptacion[clave];
            let regex = new RegExp(palabraDesencriptada, 'g');
            mensajeDesencriptado = mensajeDesencriptado.replace(regex, clave);

        }
        mostrarMensajePantalla(mensajeDesencriptado);
    }

}

function copiarTexto() {
    let mensajeEncriptadoCopia = document.getElementById('mensaje__encriptado__display').textContent;
    return navigator.clipboard.writeText(mensajeEncriptadoCopia).then(function () {
        alert(AnunciomensajeCopiado);
    }, function (err) {
        console.error("Error al copiar el mensaje: ", err);
    }
    );
}

