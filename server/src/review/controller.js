import pool from "../../db.js";
import * as queries from "./queries.js";

export const showHints = async (request, response) => {
  // show all hints from temphint db
  // pool.query(queries.showHints, (error, results) => {
  //   if (error) {
  //     response.status(400).json({ err });
  //     throw error;
  //   }
  //   response.status(200).json(results.rows);
  // });

  // *  changed the code to async await
  try {
    const data = await pool.query(queries.showHints);
    response.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
    response.status(400).json({ error });
  }
};

const checkQuestionExists = async (qlink1, qlink2) => {
  // check if question exists in question db
  // await pool.query(
  //   queries.checkQuestionExists,
  //   [qlink1, qlink2],
  //   (error, results) => {
  //     if (error) {
  //       response.status(400).json({ err });
  //       throw error;
  //     }
  //     if (results.rows.length > 0) {
  //       return results.rows[0].qid;
  //     } else {
  //       return false;
  //     }
  //   }
  // );

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
  const { qlink1, qlink2, qname, platform, uid, hints, thid } = request.body;

  // let qid = null;
  // pool.query(
  //   queries.checkQuestionExists,
  //   [qlink1, qlink2?.length > 0 ? qlink2 : null],
  //   (error, results) => {
  //     if (error) {
  //       response.status(400).json({ err });
  //       throw error;
  //     }
  //     if (results.rows.length > 0) {
  //       qid = results.rows[0].qid;
  //     } else {
  //       qid = false;
  //     }
  //     if (qid && qid != null) {
  //       console.log("Found", qid);
  //       pool.query(queries.rejectHint, [thid], (error, results) => {});
  //       pool.query(
  //         queries.approveHint,
  //         [...hints, qid, uid],
  //         (error, results) => {
  //           if (error) {
  //             response.status(400).json({ error });
  //             throw error;
  //           }
  //           pool.query(queries.rejectHint, [thid], (error, results) => {});

  //           response.status(200).json(results.rows);
  //         }
  //       );
  //     } else {
  //       // if question does not exist in question db, add it to question db
  //       pool.query(
  //         queries.addQuestion,
  //         [qlink1, qlink2, platform, qname],
  //         (error, results) => {
  //           if (error) {
  //             response.status(400).json({ error });
  //             throw error;
  //           }
  //           const qid = results.rows[0].qid;
  //           pool.query(
  //             queries.approveHint,
  //             [...hints, qid, uid],
  //             (error, results) => {
  //               if (error) {
  //                 response.status(400).json({ error });
  //                 throw error;
  //               }
  //               pool.query(queries.rejectHint, [thid], (error, results) => {});

  //               response.status(200).json(results.rows);
  //             }
  //           );
  //         }
  //       );
  //     }
  //   }
  // );

  // *  changed the code to async await
  try {
    const qid = await checkQuestionExists(qlink1, qlink2);
    if (qid && qid != null) {
      console.log("Found", qid);
      await pool.query(queries.rejectHint, [thid]);
      const data = await pool.query(queries.approveHint, [...hints, qid, uid]);
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
      await pool.query(queries.approveHint, [...hints, qid, uid]);
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
  // pool.query(queries.rejectHint, [id], (error, results) => {
  //   if (error) {
  //     throw error;
  //   }
  //   response.status(200).send(`Hint deleted with ID: ${id}`);
  // });

  // *  changed the code to async await
  try {
    const data = await pool.query(queries.rejectHint, [id]);
    response.status(200).send(`Hint deleted with ID: ${id}`);
  } catch (error) {
    console.log(error);
    response.status(400).json({ error });
  }
};
