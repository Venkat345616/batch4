const express = require('express')
const app = express()
app.use(express.json())
const userRoute = require('./route/userRoute')
const postRoute = require('./route/postRoute')

const PORT = 3000

app.use("/users", userRoute)
app.use("/posts", postRoute)




app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
})


module.exports = app;