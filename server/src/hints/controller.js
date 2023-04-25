import pool from "../../db.js";
import * as queries from "./queries.js";

export const addTemporaryHint = (request, response) => {
  const { qlink, hints } = request.body;
  // console.log(request.user);
  // padd hints array with undefined if length is less than 5
  if (hints.length < 5) {
    for (let i = hints.length; i < 5; i++) {
      hints.push(null);
    }
  }

  // console.log(qlink,hints,userId);
  // add hints array to table temphints postgresql
  pool.query(
    queries.addTemporaryHint,
    [...hints, qlink, request.user.id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows[0]);
    }
  );
};
export const upvoteHint = (request, response) => {
  const { hid } = request.body;
  pool.query(queries.upvoteHint, [hid], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).json(results.rows[0]);
  });
};

export const downvoteHint = (request, response) => {
  const { hid } = request.body;
  pool.query(queries.downvoteHint, [hid], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).json(results.rows[0]);
  });
}