import connection from "../database.js";

export async function postClients(req, res) {
    const { name, address, phone } = req.body

    try {
        await connection.query(`INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3)`, [name, address, phone])
        res.sendStatus(201)
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }

}

export async function getOrdersByClientId(req, res) {
    const { id } = req.params
    try {
        const findClient = await connection.query(`SELECT id FROM clients WHERE id = $1`, [id]);
        if (findClient.rowCount === 0) return res.sendStatus(404)
        const orders = await connection.query(` SELECT * FROM orders WHERE "clientId"=$1`, [id]);
        res.send(orders.rows)

    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
}