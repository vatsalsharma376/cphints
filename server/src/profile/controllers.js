import pool from "../../db.js";
import * as queries from "./query.js";

export const getActiveHints = async (req, res) => {
  try {
    const { limit, offset } = req.body;
    const id = req.user.id;
    const obj = [];

    const result1 = await pool.query(queries.getActiveCount, [id]);
    obj.push(result1.rows[0].total_count);

    const result2 = await pool.query(queries.activeHints, [id, limit, offset]);
    obj.push(result2.rows);

    res.status(200).json(obj);
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const getReviewHints = async (req, res) => {
  try {
    const { limit, offset } = req.body;
    const id = req.user.id;
    const obj = [];

    const result1 = await pool.query(queries.getReviewCount, [id]);
    obj.push(result1.rows[0].total_count);

    const result2 = await pool.query(queries.reviewHints, [id, limit, offset]);
    obj.push(result2.rows);

    res.status(200).json(obj);
  } catch (err) {
    res.status(400).json({ err });
  }
};

// pool.query(
//   queries.reviewHints,
//   [id, limit, offset],
//   (err, result) => {
//     if (err) {
//       res.status(400).json({ err });
//       throw err;
//     }
//     obj.push(result.rows);
//     res.status(200).json(obj);
//   }
// );

export const getUser = async (req, res) => {
  try {
    const id = req.user.id;
    const result = await pool.query(queries.getUser, [id]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const getStats = async (req, res) => {
  try {
    const id = req.user.id;
    const obj = {};

    const result1 = await pool.query(queries.getStats, [id]);
    obj.upvotes = result1.rows[0].total_upvotes;
    obj.downvotes = result1.rows[0].total_downvotes;
    obj.hintsAccepted = result1.rows[0].total_hints;

    const result2 = await pool.query(queries.getReviewStats, [id]);
    obj.hintsInReview = result2.rows[0].total_in_review;

    res.status(200).json(obj);
  } catch (err) {
    res.status(400).json({ err });
  }
};
