import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from './src/users/routes.js';
// import { router as userRouter } from "./routes/user.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use("/api", userRouter);
app.use('/api/users', userRoutes);
// app.use(express.static(path.join(__dirname, "./client/build")));

// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./client/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`serving on port ${PORT}`);
});