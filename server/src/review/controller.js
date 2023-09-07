import pool from "../../db.js";
import * as queries from "./queries.js";

export const showHints = async (request, response) => {
  // *  changed the code to async await
  try {
    const data = await pool.query(queries.showHints);
    response.status(200).json(data.rows);
  } catch (error) {
    console.log(error.message);
    response.status(400).json({ error });
  }
};

const checkQuestionExists = async (qlink1, qlink2) => {
  // *  changed the code to async await
  try {
    const data = await pool.query(queries.checkQuestionExists, [
      qlink1,
      qlink2?.length > 0 ? qlink2 : null,
    ]);
    if (data.rows.length > 0) {
      return data.rows[0].qid;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const approveHint = async (request, response) => {
  // console.log('approveHint route called');
  // approve the hint by moving it from temphint to hint db
  const { qlink1, qlink2, qname, platform, uid, hints, thid, created_at } =
    request.body;

  try {
    const qid = await checkQuestionExists(qlink1, qlink2);
    if (qid && qid != null) {
      console.log("Found", qid);
      await pool.query(queries.rejectHint, [thid]);
      const data = await pool.query(queries.approveHint, [
        ...hints,
        qid,
        uid,
        created_at,
      ]);
      response.status(200).json(data.rows);
    } else {
      // if question does not exist in question db, add it to question db
      const data = await pool.query(queries.addQuestion, [
        qlink1,
        qlink2,
        platform,
        qname,
      ]);
      const qid = data.rows[0].qid;
      await pool.query(queries.approveHint, [...hints, qid, uid, created_at]);
      await pool.query(queries.rejectHint, [thid]);
      response.status(200).json(data.rows);
    }
  } catch (error) {
    console.log(error);
    response.status(400).json({ error });
  }
};
export const rejectHint = async (request, response) => {
  // reject the hint by deleting it from temphint db
  // get id from url :id
  const id = request.params.id;

  // *  changed the code to async await
  try {
    const data = await pool.query(queries.rejectHint, [id]);
    response.status(200).send(`Hint deleted with ID: ${id}`);
  } catch (error) {
    console.log(error);
    response.status(400).json({ error });
  }
};
