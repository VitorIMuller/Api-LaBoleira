import connection from "../database.js"
import dayjs from "dayjs";
export async function postOrders(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body
    const createAt = dayjs().format("YYYY-MM-DD");

    try {
        const findClient = await connection.query(`SELECT * FROM clients WHERE id=$1`, [clientId]);
        if (findClient.rowCount === 0) return res.sendStatus(404);
        const findCake = await connection.query(`SELECT * FROM cakes WHERE id=$1`, [cakeId])
        if (findCake.rowCount === 0) return res.sendStatus(404)

        await connection.query(`
        INSERT INTO orders 
            ("clientId", "cakeId", quantity,  "createAt", "totalPrice")
        VALUES
            ($1, $2, $3, $4, $5)`,
            [clientId, cakeId, quantity, createAt, totalPrice])
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}