import connection from "../database.js"

export async function postCakes(req, res) {
    const { name, price, description, image } = req.body

    try {
        const findName = await connection.query(`SELECT name FROM cakes WHERE name=$1`, [name]);
        if (findName.rowCount) return res.sendStatus(409)

        await connection.query(`INSERT INTO cakes (name, price, description, image) VALUES ($1, $2, $3, $4)`, [name, price, description, image]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)

    }


}