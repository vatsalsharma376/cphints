import pool from "../../db.js";
import * as queries from "./queries.js";

export const getPlatfromData = async (req, res) => {
  const obj = new Array();

  pool.query(queries.getPlatformRowCount, (err, result) => {
    if (err) {
      res.status(400).json({ err });
      throw err;
    } else {
      obj.push(result.rows);

      pool.query(queries.getPlatformHintCount, (err, result) => {
        if (err) {
          res.status(400).json({ err });
          throw err;
        } else {
          obj.push(result.rows);
          // console.log(obj);
          res.status(200).json(obj);
        }
      });
    }
  });
};
