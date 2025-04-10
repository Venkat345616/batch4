let express = require('express')
let app = express()
let PORT = 5000;

app.use(express.json())

let users = []



app.get('/users', (req, res) => {
    return res.status(200).json(users)
})

app.post('/users', (req, res) => {
    let { name, email, age } = req.body


    if (!name || !email || !age) {
        return res.status(404).json({ error: 'Please enter the details' })
    }

    let user = {
        id: users.length + 1,
        name,
        email,
        age
    }
    users.push(user)
    return res.status(200).json(user)
})


app.get('/users/:id', (req, res) => {

    let user = users.filter((v) => v.id.toString() === req.params.id)

    return res.status(200).json(user)


})

app.put('/users/:id', (req, res) => {
    let { name, email, age } = req.body

    let user = users.find((v) => v.id = parseInt(req.params.id))

    if (!user) {
        return res.status(404).json({ error: 'user not found' })
    }


    if (name) user.name = name
    if (email) user.email = email
    if (age) user.age = age
    return res.status(200).json({ message: "user updated" })

})

app.delete('/users/:id', (req, res) => {
    let deleteUser = users.findIndex((v) => v.id === parseInt(req.params.id))

    if (deleteUser === -1) {
        return res.status(404).json({ error: "user not found" })
    }

    users.splice(deleteUser, 1)

    return res.status(200).send()
})


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})