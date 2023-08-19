// initialize postgres db connection
import * as pg from 'pg'
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const { Pool } = pg.default
// const pool = new Pool({
//     user : process.env.DB_USER,
//     host : process.env.DB_HOST,
//     database : 'cphints',
//     password : process.env.DB_PASSWORD,
//     port : process.env.DB_PORT,
//     ssl: {
//         rejectUnauthorized: false // Only set this to true if your certificate is signed by a trusted CA.
//     }
// });
// initialize postgres db connection

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: "cphints",
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   ssl: {
//     rejectUnauthorized: false, // Only set this to true if your certificate is signed by a trusted CA.
//   },
//   max: 20,
// });

// const connectionString =
//   "postgres://earigpgu:jjKGaUjw3UHruxQRJWRoy-TlVPoNfqk_@tiny.db.elephantsql.com/earigpgu";
const connectionString = process.env.PSQL_STRING;
// Create a new connection pool
const pool = new Pool({
  connectionString: connectionString,
  max:20,
});
// pool
//   .connect()
//   .then((client) => {
//     console.log("Connected to the database via pool");
//     const now = new Date();
//     // display how long it took to connect in miliseconds
//     console.log("Connection time: ", now.getTime() - prev.getTime());

//   })
//   .catch((error) => {
//     console.error("Error connecting to the database:", error);
//   });
export default pool;
