const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const fs = require('fs')
const uploadDir = require('./controllers/upload').uploadDir
const routes = require('./routes')

const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('views', './views')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

app.use(cors())
app.use(routes())
app.use(helmet())
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
