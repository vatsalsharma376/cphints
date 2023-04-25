import pool from "../../db.js";
import bcrypt, { hash } from "bcrypt";
import * as queries from "./queries.js";
import jwt from "jsonwebtoken";
// import sendgrid sg module
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import sgMail from "@sendgrid/mail";
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
// database schema CREATE TABLE users (ID SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(512), handle VARCHAR(255), color VARCHAR(25),username varchar(255));
export const addUser = async (request, response) => {
  const { email, username } = request.body;
  console.log(request.body);
 

  //check if user already exists in postgres
  pool.query(
    queries.checkAlreadyExists,
    [email, username],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length > 0) {
        response.status(409).send("User already exists");
      } else {
        // generate a random 6 digit otp
        const otp = Math.floor(100000 + Math.random() * 900000);
        // send the otp to the user's email using sendgrid api
        const msg = {
          to: email,
          from: process.env.SENDGRID_EMAIL,
          subject: "OTP for CPhints",
          html: `The OTP for CPhints is ${otp}. OTPs are meant to be used only by the person they are intended for. Do not share your OTPs with anyone, even if they claim to be from a trusted source.`,
        };
        sgMail
          .send(msg)
          .then(() => {
            response.status(200).json({ otp });
          })
          .catch((error) => {
            response.status(401).send("OTP error", error);
          });
      }
    }
  );
};

// login user by checking by both username and email
export const loginUser = async (request, response) => {
  const { id, password } = request.body;
  // check if id is email or username
  let email = id;
  let username = id;
  if (id?.includes("@")) {
    email = id;
    username = "@";
  } else {
    email = "c@p@";
    username = id;
  }

  pool.query(
    queries.checkAlreadyExists,
    [email, username],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length > 0) {
        const user = results.rows[0];
        bcrypt.compare(password, user.password, function (err, res) {
          if (res) {
            const accessToken = jwt.sign(user, "secret");
            response.status(200).json({ accessToken });
          } else {
            response.status(401).send("Invalid credentials");
          }
        });
      } else {
        response.status(401).send("Invalid credentials");
      }
    }
  );
};

export const addTemporaryHint = (request, response) => {
  const { qlink, hints } = request.body;
  // padd hints array with undefined if length is less than 5
  if (hints.length < 5) {
    for (let i = hints.length; i < 5; i++) {
      hints.push(null);
    }
  }

  // add hints array to table temphints postgresql
  pool.query(
    queries.addHint,
    [hints[0], hints[1], hints[2], hints[3], hints[4]],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows[0]);
    }
  );
};

export const addUserToDatabase = async (request, response) => {
  const { name, email, password, username } = request.body;
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //check if user already exists in postgres
  pool.query(
    queries.addUser,
    [name, email, hashedPassword, username],
    (error, results) => {
      if (error) {
        throw error;
      }
      // console.log(results.rows[0].id);
      const accessToken = jwt.sign(results.rows[0], "secret");
      response.status(201).json({ accessToken });
    }
  );
};
