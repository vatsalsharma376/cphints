import pool from "../../db.js";
import * as queries from "./query.js";

export const getLeaderboard = async (req, res) => {
  try {
    const result = await pool.query(queries.getLeaderboardData);
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};
