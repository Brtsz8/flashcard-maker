const express = require('express')
const path = require('path')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes.js')
const decksRoutes = require('./routes/decksRoutes.js')
const authMiddleware = require('./middleware/auth.js')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.static(path.join(__dirname, "../server/public")))

// routes
//app.use('/auth', authRoutes)
//app.use('/todos', authMiddleware, decksRoutes)

// test routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../server/public", "index.html"))
})

app.get('/test', (req, res) => {
    res.json({ name: "oskar" })
})

// start server
app.listen(PORT, () => {
    console.log(`Server działa na porcie ${PORT}`)
})