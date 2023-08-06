
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
  if (upvote == 1) {
    // add user id to set of upvotes in redis
    await redisClient.sadd(`upvote:${hintId}`, request.user.id);
  } else if (upvote == -1) {
    // remove user id from set of upvotes in redis
    await redisClient.srem(`upvote:${hintId}`, request.user.id);
  }
  if (downvote == 1) {
    // add user id to set of downvotes in redis
    await redisClient.sadd(`downvote:${hintId}`, request.user.id);
  } else if (downvote == -1) {
    // remove user id from set of downvotes in redis
    await redisClient.srem(`downvote:${hintId}`, request.user.id);
  }

};
export const getHints = async (request, response) => {
  const { qid, limit, offset } = request.body;

  // await redisClient.connect();
  // redisClient.on("error", (err) => {
  //   throw err;
  // });
  pool.query(queries.getHints, [qid, limit, offset], (error, results) => {
    if (error) {
      throw error;
    }
    const allHints = results.rows;
    console.log(allHints, "HIs");
    // add total upvote downvote count for each hint stored in redis
    allHints.forEach(async (hint) => {
      try {
        hint.totalUpvotes = await redisClient.scard(`upvote:${hint.hid}`);
        hint.totalDownvotes = await redisClient.scard(`downvote:${hint.hid}`);
        hint.isUpvoted = await redisClient.sismember(
          `upvote:${hint.hid}`,
          request.user.id
        );
        hint.isDownvoted = await redisClient.sismember(
          `downvote:${hint.hid}`,
          request.user.id
        );
      } catch (err) {
        console.log(err);
      }
    });
    console.log(allHints);
    response.status(200).json(allHints);
  });
};

export const getHintsByVotes = (request, response) => {
  const { qid, limit, offset } = request.body;
  

  pool.query(queries.getHintsByVotes, [qid], (error, results) => {
    if (error) {
      throw error;
    }
    const allHints = results.rows;
    // add total upvote downvote count for each hint stored in redis
    allHints.forEach(async (hint) => {
      try {
        hint.totalUpvotes = await redisClient.scard(`upvote:${hint.hid}`);
        hint.totalDownvotes = await redisClient.scard(`downvote:${hint.hid}`);
        hint.isUpvoted = await redisClient.sismember(
          `upvote:${hint.hid}`,
          request.user.id
        );
        hint.isDownvoted = await redisClient.sismember(
          `downvote:${hint.hid}`,
          request.user.id
        );
      } catch (err) {
        console.log(err);
      }

        // check if user.id is present in downvote set
    });
    // sort allHints based on most number of totalUpvotes
    allHints.sort((a, b) => b.totalUpvotes - a.totalUpvotes);
    // return subarray of allHints based on limit and offset
    const limitHints = allHints.slice(offset, offset + limit);
    response.status(200).json(limitHints);
  });
};
