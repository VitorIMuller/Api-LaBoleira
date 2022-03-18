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

export async function getOrders(req, res) {

    try {
        const { rows: orders } = await connection.query({
            text: `
            SELECT 
                c.id AS "clientId", c.name AS "clientName", c.address AS "clientAddress", c.phone AS "clientPhone",
                ca.id AS "cakeId", ca.name AS "cakeName", ca.price AS "cakePrice", ca.description AS "cakeDescription", ca.image AS "cakeImage",
                o."createAt" AS createdAt, o.quantity AS "orderQuantity", o."totalPrice" AS "orderTotalPrice"
            FROM
                orders o
            JOIN clients c ON c.id = o."clientId"
            JOIN cakes ca ON ca.id = o."cakeId"`
            , rowMode: "array"
        });
        if (orders.rowCount === 0) return res.status(404).send([])
        res.send(
            orders.map((row) => {
                const [
                    clientId,
                    clientName,
                    clientAddress,
                    clientPhone,
                    cakeId,
                    cakeName,
                    cakePrice,
                    cakeDescription,
                    cakeImage,
                    createdAt,
                    orderQuantity,
                    orderTotalPrice
                ] = row

                return {
                    client: {
                        id: clientId,
                        name: clientName,
                        address: clientAddress,
                        phone: clientPhone
                    },
                    cake: {
                        id: cakeId,
                        name: cakeName,
                        price: cakePrice,
                        description: cakeDescription,
                        image: cakeImage
                    },
                    createdAt: createdAt,
                    quantity: orderQuantity,
                    totalPrice: orderTotalPrice
                }
            })


        )
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
}