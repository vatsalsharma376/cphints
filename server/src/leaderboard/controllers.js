import pool from "../../db.js";
import * as queries from "./query.js";

export const getLeaderboard = async (req, res) => {
  pool.query(queries.getLeaderboardData, (err, result) => {
    if (err) {
      res.status(400).json({ err });
      // throw err;
    } else {
      console.log(result.rows);
      res.status(200).json(result.rows);
    }
  });
};
