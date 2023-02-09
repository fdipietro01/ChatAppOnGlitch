const express = require('express')
const handlebars = require('express-handlebars')
const {Server} = require('socket.io')
const viewRouter = require('./routes/views')


const app = express()
app.engine('handlebars', handlebars.engine())
app.set("views", __dirname + '/views')
app.set('view engine', 'handlebars')
app.use('/aleas', express.static(__dirname + "/public"))

app.use('/', viewRouter)


const httpServer = app.listen(8080, (err) => {
    if (err) console.log(err)
    console.log("Escuchando en el 8080")
})

//así se crea nuestra instancia del servidor socket io
const io = new Server(httpServer)

const mensajes = []

io.on('connection', (socket)=>{
    console.log("Conexión establecida");

    socket.on("nuevoMsj", (data)=>{
        console.log(data)
        mensajes.push(data)
        io.emit("chat", mensajes)
    })

    socket.on("usrLogueado", (data)=>{
        socket.emit("chat", mensajes)
        socket.broadcast.emit("nuevoUsuarioAlerta", data)
    })

    socket.on('disconnect', (socket)=>{
        console.log("Disconnect")
    })
})