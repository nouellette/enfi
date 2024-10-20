import http from 'http'
import api from './api.js'
import dotenv from 'dotenv'
dotenv.config()

const hostname = process.env.HOSTNAME
const port = process.env.PORT

const index = http.createServer(api)

index.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})