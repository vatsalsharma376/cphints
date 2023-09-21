import pool from "../../db.js";
import * as queries from "./queries.js";

// controller for router.post('/',showAllQuestions); with number of hints for each question
export const showAllQuestions = async (request, response) => {
  const { limit, offset, searchQuery } = request.body;
  const obj = [];
  if (searchQuery === "") {

    try {
      const totalHints = await pool.query(queries.totalHintsAll);
      obj.push(totalHints.rows[0].count);
      const hintsForEachQ = await pool.query(queries.hintsForEachQ, [
        limit,
        offset,
      ]);
      obj.push(hintsForEachQ.rows);
      response.status(200).json(obj);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error });
    }
  } else {
    try {
      const totalHints = await pool.query(queries.totalHintsSearch, [
        searchQuery,
      ]);
      obj.push(totalHints.rows[0].count);
      const questionsBySearch = await pool.query(queries.questionsBySearch, [
        searchQuery,
        limit,
        offset,
      ]);
      obj.push(questionsBySearch.rows);
      response.status(200).json(obj);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error });
    }
  }
};
