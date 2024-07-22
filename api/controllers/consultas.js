import { db } from "../db.js";

export const getConsultas = (_, res) => {
    
    const q = "SELECT * FROM consulta";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
}