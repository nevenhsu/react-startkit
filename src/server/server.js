const express = require('express')
const { resolve, join } = require('path')
const compression = require('compression')
const app = express()
const port = process.env.PORT || 8080

const publicPath = join(__dirname, '../public')

// 30天
const maxAge = 30 * 24 * 60 * 60 * 1000

// compress all responses
app.use(compression())

// public靜態資源
app.use(express.static(publicPath, { maxAge }))

app.get('/', (req, res) => {
    res.sendFile(resolve(publicPath, 'index.html'))
})

app.get('*', (req, res) => {
    res.sendFile(resolve(publicPath, 'index.html'))
})

app.listen(port, err => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server is running on port ${port}`)
    }
})
