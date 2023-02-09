console.log("Soy index papito");
const socket = io()

let usr;
let chatbox = document.getElementById("chatbox")

Swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingresar un usuario para identificarte',
    inputValidator: (value) => !value && 'Ingresa un nombre de usuario para continuar',
    allowOutsideClick: false,
}).then(res => {
    usr = res.value
    socket.emit("usrLogueado", usr)
})

const handleSocket = (e)=>{
    if (e.key === "Enter") {
        if (chatbox.value.trim().length > 0) socket.emit("nuevoMsj", {
            user: usr,
            msj: chatbox.value.trim()
        })
        chatbox.value = ""
    }
}

chatbox.addEventListener('keyup', (e) => {
    handleSocket(e)
})

socket.on("chat", (data)=>{
    let log = document.getElementById("messageLog")
    let message = ""
    data.forEach(mensajes => {
        message = message + `<li>${mensajes.user} dice: ${mensajes.msj}</li><br>`
    });
    log.innerHTML = message
})

socket.on('nuevoUsuarioAlerta', (data)=>{
    const title = `Nuevo usuario conectado: ${data}`
    console.log(data)
    Swal.fire({
        title,
        toast: true, 
        showConfirmButton: false,
        position: "top-right",
        timmer: 3000,
        icon: "success"
    })
})

