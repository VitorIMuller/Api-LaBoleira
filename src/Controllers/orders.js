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
    const date = req.query.date
    try {
        if (!date) {
            const { rows: orders } = await connection.query({
                text: `
                SELECT 
                    c.id AS "clientId", c.name AS "clientName", c.address AS "clientAddress", c.phone AS "clientPhone",
                    ca.id AS "cakeId", ca.name AS "cakeName", ca.price AS "cakePrice", ca.description AS "cakeDescription", ca.image AS "cakeImage",
                    o."createAt" AS createdAt, o.quantity AS "orderQuantity", o."totalPrice" AS "orderTotalPrice", o."isDelivered" AS "delivered",
                    f.name AS flavourCake
                FROM
                    orders o
                JOIN clients c ON c.id = o."clientId"
                JOIN cakes ca ON ca.id = o."cakeId"
                JOIN flavours f ON f.id = ca."flavourId"`

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
                        orderTotalPrice,
                        delivered,
                        flavourCake

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
                            image: cakeImage,
                            flavour: flavourCake,
                        },
                        createdAt: createdAt,
                        quantity: orderQuantity,
                        totalPrice: orderTotalPrice,
                        isDelivered: delivered
                    }
                })
            )
        } else {
            const orders = await connection.query({
                text: `
                SELECT 
                c.id AS "clientId", c.name AS "clientName", c.address AS "clientAddress", c.phone AS "clientPhone",
                ca.id AS "cakeId", ca.name AS "cakeName", ca.price AS "cakePrice", ca.description AS "cakeDescription", ca.image AS "cakeImage",
                o."createAt" AS createdAt, o.quantity AS "orderQuantity", o."totalPrice" AS "orderTotalPrice", o."isDelivered" AS delivered,
                f.name AS flavourCake
                FROM
                orders o
                JOIN clients c ON c.id = o."clientId"
                JOIN cakes ca ON ca.id = o."cakeId"
                JOIN flavours f ON f.id = ca."flavourId"
                WHERE o."createAt" = $1`

                , rowMode: "array"
            }, [date]);
            if (orders.rowCount === 0) return res.status(404).send([])
            res.send(
                orders.rows.map((row) => {
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
                        orderTotalPrice,
                        delivered,
                        flavourId
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
                            image: cakeImage,
                            flavour: flavourId
                        },
                        createdAt: createdAt,
                        quantity: orderQuantity,
                        totalPrice: orderTotalPrice,
                        isDelivered: delivered
                    }
                })
            )
        }


    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
}


export async function getOrderById(req, res) {
    const { id } = req.params

    try {
        if (id <= 0 || id % 1 != 0) return res.sendStatus(400)
        const findId = await connection.query(` SELECT id FROM orders WHERE id=$1`, [id])
        if (findId.rowCount === 0) return res.sendStatus(404)
        const { rows: orders } = await connection.query({
            text: `
                SELECT 
                c.id AS "clientId", c.name AS "clientName", c.address AS "clientAddress", c.phone AS "clientPhone",
                ca.id AS "cakeId", ca.name AS "cakeName", ca.price AS "cakePrice", ca.description AS "cakeDescription", ca.image AS "cakeImage",
                o."createAt" AS createdAt, o.quantity AS "orderQuantity", o."totalPrice" AS "orderTotalPrice", o."isDelivered" AS delivered
                FROM
                orders o
                JOIN clients c ON c.id = o."clientId"
                JOIN cakes ca ON ca.id = o."cakeId"
                WHERE o.id = ${id}`

            , rowMode: "array"
        });
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
                    orderTotalPrice,
                    delivered
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
                    totalPrice: orderTotalPrice,
                    isDelivered: delivered
                }
            })
        )
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }

}

export async function updateDelivery(req, res) {
    const { id } = req.params

    try {
        if (id <= 0) return res.sendStatus(400)
        const findId = await connection.query(`SELECT id FROM orders WHERE id=$1`, [id])
        if (findId.rowCount === 0) return res.sendStatus(404);
        await connection.query(`UPDATE orders SET "isDelivered" = $1 WHERE id=$2`, [true, id])
        res.sendStatus(204)
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
}