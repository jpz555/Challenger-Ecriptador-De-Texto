let campoRespuesta = document.querySelector('.campo__respuesta')
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


function estadoSinMensajaUsuario() {
    modficarClases('remove', 'mensaje__encriptado__display', 'oculto');
    modficarClases('remove', 'presentacion__rectangulo__texto__mensaje', 'oculto');
    modficarClases('add', 'copiar', 'oculto');
    campoRespuesta.classList.add('oculto');
    modficarClases('remove', 'presentacion__rectangulo__texto__mensaje', 'mensaje__solicitud__ingreso')
    mostrarMensajePantalla('');
}

function estadoEntradaExitosaUsuario() {
    modficarClases('add', "mensaje__encriptado__display", 'oculto');
    modficarClases('add', 'presentacion__rectangulo__texto__mensaje', 'oculto');
    modficarClases('remove', 'copiar', 'oculto');
    modficarClases('remove', 'presentacion__rectangulo__texto__mensaje', 'mensaje__solicitud__ingreso')
    campoRespuesta.classList.remove('oculto')

}

function mostrarMensajePantalla(mensaje) {
    return campoRespuesta.textContent = mensaje;

}

function comprobarMensajeUsuario() {
    let mensajeUsuario = obtenerMensajeUsuario();
    if (mensajeUsuario.trim() === "" || mensajeUsuario === "ingrese texto aqui...") {
        estadoSinMensajaUsuario();
        return false;

    } else {
        estadoEntradaExitosaUsuario();
        return true;
    }
}



function encriptarMensaje() {

    if (!comprobarMensajeUsuario()) {
        //return console.log('No funciona esta parte - comprobarMensaje')

    } else {
        encriptar();
    }
}

function desencriptarMensaje() {
    if (!comprobarMensajeUsuario()) {
        
    } else {
        desencriptar();
    }

}

function encriptar() {
    let mensajeUsuario = obtenerMensajeUsuario();
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

function desencriptar() {
    let mensajeUsuario = obtenerMensajeUsuario();
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


function copiarTexto() {
    let mensajeEncriptadoCopia = document.getElementById('campo__respuesta__rec').textContent;
    return navigator.clipboard.writeText(mensajeEncriptadoCopia).then(function () {
        alert(AnunciomensajeCopiado);
    }, function (err) {
        console.error("Error al copiar el mensaje: ", err);
    }
    );
}