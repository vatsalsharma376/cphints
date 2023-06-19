import pool from "../../db.js";
import * as queries from "./query.js";

export const getActiveHints = async (req, res) => {
  const { limit, offset } = req.body;
  const id = req.user.id;
  const obj = new Array();

  pool.query(queries.getActiveCount, [id], (err, result) => {
    if (err) {
      res.status(400).json({ err });
      throw err;
    } else {
      obj.push(result.rows[0].total_count);

      pool.query(queries.activeHints, [id, limit, offset], (err, result) => {
        if (err) {
          res.status(400).json({ err });
          throw err;
        } else {
          obj.push(result.rows);
          res.status(200).json(obj);
        }
      });
    }
  });
};

export const getReviewHints = async (req, res) => {
  const { limit, offset } = req.body;
  const id = req.user.id;
  const obj = new Array();

  pool.query(queries.getReviewCount, [id], (err, result) => {
    if (err) {
      res.status(400).json({ err });
      throw err;
    } else {
      obj.push(result.rows[0].total_count);

      pool.query(queries.reviewHints, [id, limit, offset], (err, result) => {
        if (err) {
          res.status(400).json({ err });
          throw err;
        } else {
          obj.push(result.rows);
          res.status(200).json(obj);
        }
      });
    }
  });
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
  const id = req.user.id;
  pool.query(queries.getUser, [id], (err, result) => {
    if (err) {
      res.status(400).json({ err });
      throw err;
    }
    res.status(200).json(result.rows);
  });
};

export const getStats = async (req, res) => {
  const id = req.user.id;
  const obj = {};

  pool.query(queries.getStats, [id], (err, result) => {
    if (err) {
      res.status(400).json({ err });
      throw err;
    } else {
      obj.upvotes = result.rows[0].total_upvotes;
      obj.downvotes = result.rows[0].total_downvotes;
      obj.hintsAccepted = result.rows[0].total_hints;

      pool.query(queries.getReviewStats, [id], (err, result) => {
        if (err) {
          res.status(400).json({ err });
          throw err;
        }
        obj.hintsInReview = result.rows[0].total_in_review;

        res.status(200).json(obj);
      });
    }
  });
};
