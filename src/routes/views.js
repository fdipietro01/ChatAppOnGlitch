const { Router } = require('express')
const viewRouter = Router()

const prods = [{ name: "prod1", title: "title1", price: 100 },
{ name: "prod2", title: "title2", price: 200 },
{ name: "prod3", title: "title3", price: 300 },
{ name: "prod4", title: "title4", price: 400 },
{ name: "prod5", title: "title5", price: 500 },
{ name: "prod6", title: "title6", price: 600 },
{ name: "prod7", title: "title7", price: 700 },
{ name: "prod8", title: "title8", price: 800 }]

viewRouter.get("/", (req, res) => {
    let testUser = {
        user: "Flavio",
    }
    res.render('index', { user: testUser.user})
})

module.exports = viewRouter