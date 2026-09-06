import { app } from './src/server.js'

const PORT = 3000
const HOST = '127.0.0.1'

app.listen(PORT, () => {
    console.log(`Servidor online no site http:${HOST}:${PORT}`)
})