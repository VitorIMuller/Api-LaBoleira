import connection from "../database.js"

export async function postCakes(req, res) {
    const { name, price, description, image, flavourId } = req.body

    try {
        const findName = await connection.query(`SELECT name FROM cakes WHERE name=$1`, [name]);
        if (findName.rowCount) return res.sendStatus(409)
        const findFlavour = await connection.query(`SELECT id FROM flavours WHERE id=$1`, [flavourId]);
        if (findFlavour.rowCount === 0) return res.sendStatus(404)


        await connection.query(`INSERT INTO cakes (name, price, description, image, "flavourId") VALUES ($1, $2, $3, $4, $5)`, [name, price, description, image, flavourId]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)

    }


}