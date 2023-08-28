import pool from "../../db.js";
import * as queries from "./queries.js";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import Redis from "ioredis";
import { redisClient } from "../../server.js";
dotenv.config();

// const redisClient = redis.createClient({
//     password: process.env.REDIS_PASSWORD,
//     socket: {
//       host: pprocess.env.REDIS_HOSTrocess.env.REDIS_HOST,
//       port: 13305,
//     },
//     legacyMode: true,
//   });
// const redisConfig = {
//   host: process.env.REDIS_HOST,
//   port: 13305,
//   password: process.env.REDIS_PASSWORD, // If applicable, otherwise remove this line
// };

// // Create a new Redis client with the configuration
// const redisClient = new Redis(redisConfig);
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
  try {
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
  } catch (err) {
    console.log('Error adding hint.');
    response.status(400).json({ message: "Error adding hint." });
  }
};
// export const upvoteHint = (request, response) => {
//   const { hid } = request.body;
//   pool.query(queries.upvoteHint, [hid], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(201).json(results.rows[0]);
//   });
// };

export const upDownvoteHint = async (request, response) => {
  const { upvote, downvote, hintId } = request.body;
  // const redisClient = createClient();
  if (upvote == 1 || upvote == -1 || downvote == 1 || downvote == -1) {
    if (upvote == 1) {
      // add user id to set of upvotes in redis
      const query = await redisClient.sadd(`upvote:${hintId}`, request.user.id);
      if (query == 1) {
        response.status(200).json({ message: "Upvote added successfully." });
      } else {
        response.status(409).json({ message: "Upvote already exists." });
      }
    } else if (upvote == -1) {
      // remove user id from set of upvotes in redis
      const query = await redisClient.srem(`upvote:${hintId}`, request.user.id);
      if (query == 1) {
        response.status(200).json({ message: "Upvote removed successfully." });
      } else {
        response.status(409).json({ message: "Upvote does not exist." });
      }
    }
    if (downvote == 1) {
      // add user id to set of downvotes in redis
      const query = await redisClient.sadd(
        `downvote:${hintId}`,
        request.user.id
      );
      if (query == 1) {
        response.status(200).json({ message: "Downvote added successfully." });
      } else {
        response.status(409).json({ message: "Downvote already exists." });
      }
    } else if (downvote == -1) {
      // remove user id from set of downvotes in redis
      const query = await redisClient.srem(
        `downvote:${hintId}`,
        request.user.id
      );
      if (query == 1) {
        response
          .status(200)
          .json({ message: "Downvote removed successfully." });
      } else {
        response.status(409).json({ message: "Downvote does not exist." });
      }
    }
  } else {
    response.status(400).json({ message: "Invalid request." });
  }
};

export const getHints = async (request, response) => {
  const { qid, limit, offset } = request.body;
  console.log(request.user);
  // await redisClient.connect();
  // redisClient.on("error", (err) => {
  //   throw err;
  // });
  pool.query(queries.getHints, [qid, limit, offset], async (error, results) => {
    if (error) {
      throw error;
    }
    const allHints = results.rows;
    // console.log(allHints, "HIs");

    // add total upvote downvote count for each hint stored in redis
    const updatedHints = await Promise.all(
      allHints.map(async (hint) => {
        try {
          hint.totalUpvotes = await redisClient.scard(`upvote:${hint.hid}`);
          hint.totalDownvotes = await redisClient.scard(`downvote:${hint.hid}`);
          hint.isUpvoted = await redisClient.sismember(
            `upvote:${hint.hid}`,
            request.user ? request.user.id : -1
          );
          hint.isDownvoted = await redisClient.sismember(
            `downvote:${hint.hid}`,
            request.user ? request.user.id : -1
          );

          return hint;
        } catch (err) {
          console.log(err);
        }
      })
    );

    const finalHints = await Promise.all(
      updatedHints.map((hint) => {
        return new Promise((resolve, reject) => {
          pool.query(queries.getUser, [hint.uid], (error, results) => {
            if (error) {
              reject(error);
            } else {
              hint.username = results.rows[0].username;
              resolve(hint);
            }
          });
        });
      })
    );

    response.status(200).json(finalHints);
  });
};

export const getHintsByVotes = async (request, response) => {
  const { qid, limit, offset } = request.body;

  pool.query(queries.getHintsByVotes, [qid], async (error, results) => {
    if (error) {
      throw error;
    }
    const allHints = results.rows;
    // add total upvote downvote count for each hint stored in redis
    const updatedHints = await Promise.all(
      allHints.map(async (hint) => {
        try {
          hint.totalUpvotes = await redisClient.scard(`upvote:${hint.hid}`);
          hint.totalDownvotes = await redisClient.scard(`downvote:${hint.hid}`);
          hint.isUpvoted = await redisClient.sismember(
            `upvote:${hint.hid}`,
            request.user ? request.user.id : -1
          );
          hint.isDownvoted = await redisClient.sismember(
            `downvote:${hint.hid}`,
            request.user ? request.user.id : -1
          );

          return hint;
        } catch (err) {
          console.log(err);
        }
        // check if user.id is present in downvote set
      })
    );

    const finalHints = await Promise.all(
      updatedHints.map((hint) => {
        return new Promise((resolve, reject) => {
          pool.query(queries.getUser, [hint.uid], (error, results) => {
            if (error) {
              reject(error);
            } else {
              hint.username = results.rows[0].username;
              resolve(hint);
            }
          });
        });
      })
    );

    // sort allHints based on most number of totalUpvotes
    finalHints.sort((a, b) => b.totalUpvotes - a.totalUpvotes);
    // return subarray of allHints based on limit and offset
    const limitHints = allHints.slice(offset, offset + limit);

    response.status(200).json(limitHints);
  });
};
