import pool from "../../db.js";
import * as queries from "./queries.js";


export const addTemporaryHint = (request, response) => {
  const { qlink, hints } = request.body;
  
  // padd hints array with undefined if length is less than 5
    if (hints.length < 5) {
        for (let i = hints.length; i < 5; i++) {
            hints.push(null);
        }
    }

    console.log(qlink,hints);
  // add hints array to table temphints postgresql
  pool.query(queries.addHint, [hints[0],hints[1],hints[2],hints[3],hints[4]], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).json(results.rows[0]);
  });
};
