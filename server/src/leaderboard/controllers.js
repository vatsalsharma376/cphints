import pool from "../../db.js";
import * as queries from "./query.js";

export const getLeaderboard = async (req, res) => {
  // pool.query(queries.getLeaderboardData, (err, result) => {
  //   if (err) {
  //     res.status(400).json({ err });
  //     // throw err;
  //   } else {
  //     // console.log(result.rows);
  //     res.status(200).json(result.rows);
  //   }
  // });

  // * changing the code to async await
  try {
    const result = await pool.query(queries.getLeaderboardData);
    // console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};
