let express = require('express')
let app = express()
let PORT = 3000;

app.use(express.json())


let products = []



app.get('/products', (req, res) => {
    return res.status(200).json(products)
})

app.get('/products/:id', (req, res) => {
    let product = products.find((v) => product.id === req.params.id)

    return res.status(200).json(product)
})

app.post('/products', (req, res) => {
    let { name, price, category, inStock } = req.body

    if (!name || !price || !category || !inStock) {
        return res.status(404).json({ error: "Enter valid details" })
    }

    let product = {
        id: products.length + 1,
        name,
        price,
        category,
        inStock

    }

    products.push(product)
    return res.status(200).json(product)
})

app.put('/products/:id', (req, res) => {

    let { name, price, category, inStock } = req.body

    let product = products.find((v) => v.id === parseInt(req.params.id))

    if (!product) {
        return res.status(404).json({ error: "user not found" })
    }

    if (name) product.name = name
    if (price) product.price = price
    if (category) product.category = category
    if (inStock) product.inStock = inStock

    return res.status(200).json({ message: "user updated" })
})

app.delete('/products/:id', (req, res) => {
    let product = products.findIndex((v) => v.id === parseInt(req.params.id))

    if (product === -1) {
        res.status(404).json({ error: 'user not found' })
    }

    products.splice(product, 1)
    return res.status(200).json({ message: "user deleted" })
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})