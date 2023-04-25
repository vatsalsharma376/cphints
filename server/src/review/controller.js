import pool from "../../db.js";
import * as queries from "./queries.js";
export const showHints = (request, response) => {
  // show all hints from temphint db
  pool.query(queries.showHints, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const checkQuestionExists = async (qlink1, qlink2) => {
  // check if question exists in question db
  await pool.query(
    queries.checkQuestionExists,
    [qlink1, qlink2],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length > 0) {
        return results.rows[0].qid;
      } else {
        return false;
      }
    }
  );
};
export const approveHint = async (request, response) => {
  // approve the hint by moving it from temphint to hint db
  const { qlink1, qlink2, qname, plaform, uid, hints } = request.body;
  const qid = await checkQuestionExists(qlink1, qlink2);
  if (qid) {
    pool.query(queries.approveHint, [hints, qid, uid], (error, results) => {
      if (error) {
        response.status(400).json({ error });
        throw error;
      }
      response.status(200).json(results.rows);
    });
  } else {
    // if question does not exist in question db, add it to question db
    pool.query(
      queries.addQuestion,
      [qlink1, qlink2, plaform,qname],
      (error, results) => {
        if (error) {
          response.status(400).json({ error });
          throw error;
        }
        const qid = results.rows[0].qid;
        pool.query(queries.approveHint, [hints, qid, uid], (error, results) => {
          if (error) {
            response.status(400).json({ error });
            throw error;
          }
          response.status(200).json(results.rows);
        });
      }
    );
  }
};
export const rejectHint = (request, response) => {
  // reject the hint by deleting it from temphint db
  const { id } = request.body;
  pool.query(queries.rejectHint, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Hint deleted with ID: ${id}`);
  });
};

