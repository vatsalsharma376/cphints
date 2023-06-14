import pool from "../../db.js";
import * as queries from "./query.js";

export const getActiveHints = async (req, res) => {
  const { limit, offset } = req.body;
  const id = req.user.id;
  pool.query(queries.activeHints, [id, limit, offset], (err, result) => {
    if (err) {
      res.status(400).json({ err });
      throw err;
    }
    res.status(200).json(result.rows);
  });
};

export const getUser = async (req, res) => {
  const id = req.user.id;
  pool.query(queries.getUser, [id], (err, result) => {
    if (err) {
      res.status(400).json({ err });
      throw err;
    }
    res.status(200).json(result.rows);
  });
};
