import connection from "../database.js";

export async function postFlavours(req, res) {
    const { name } = req.body

    try {
        await connection.query(`INSERT INTO flavours (name) VALUES ($1)`, [name])
        res.sendStatus(201)
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }


}