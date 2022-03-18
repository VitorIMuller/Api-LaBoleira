import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import router from './Router/index.js';
import connection from './database.js';

const server = express();

server.use(cors());
server.use(express.json());
server.use(router);

server.get("/clients/teste", async (req, res) => {
    const teste = await connection.query(`
        SELECT * FROM clients
        `)
    res.send(teste.rows)
})

server.get("/cakes/teste", async (req, res) => {
    const teste = await connection.query(`
        SELECT * FROM cakes
        `)
    res.send(teste.rows)
})

server.get("/orders/teste", async (req, res) => {
    const teste = await connection.query(`
        SELECT * FROM orders
        `)
    res.send(teste.rows)

})


server.listen(process.env.PORT, console.log(`Rodando em: ${process.env.PORT} `));