let express = require('express')
let app = express()
let PORT = 5000;



app.get('/', (req, res) => {
    res.send('Hello world! Hello world!')
})

app.listen(PORT, () => {
    console.log(`server is running at: http://localhost:${PORT}`)
})


