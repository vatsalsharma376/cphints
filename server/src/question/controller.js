import pool from "../../db.js";
import * as queries from "./queries.js";
// controller for router.post('/',showAllQuestions); with number of hints for each question
export const showAllQuestions = (request, response) => {
    const {limit,offset} = request.body;
    pool.query(queries.hintsForEachQ,[limit,offset],(error, results) => {
        if (error) {
            response.status(400).json({ error });
            throw error;
        }
        response.status(200).json(results.rows);
    });
}
