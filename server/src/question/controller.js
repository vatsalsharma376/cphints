import pool from "../../db.js";
import * as queries from "./queries.js";

// controller for router.post('/',showAllQuestions); with number of hints for each question
export const showAllQuestions = async (request, response) => {
  const { limit, offset, searchQuery } = request.body;
  const obj = [];
  if (searchQuery === "") {
    pool.query(queries.totalHintsAll, (error, result) => {
      if (error) {
        response.status(400).json({ error });
        throw error;
      } else {
        // console.log(result.rows[0]);
        obj.push(result.rows[0].count);
        pool.query(queries.hintsForEachQ, [limit, offset], (error, results) => {
          if (error) {
            response.status(400).json({ error });
            throw error;
          }
          // console.log(results.rows);
          obj.push(results.rows);
          response.status(200).json(obj);
        });
      }
    });
  } else {
    pool.query(queries.totalHintsSearch, [searchQuery], (error, result) => {
      if (error) {
        response.status(400).json({ error });
        throw error;
      } else {
        // console.log(result.rows[0]);
        obj.push(result.rows[0].count);
        pool.query(
          queries.questionsBySearch,
          [searchQuery, limit, offset],
          (error, results) => {
            if (error) {
              response.status(400).json({ error });
              throw error;
            }
            obj.push(results.rows);
            response.status(200).json(obj);
          }
        );
      }
    });
  }
};
