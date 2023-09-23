import jwt from "jsonwebtoken";
import * as dotenv from "dotenv"; 
dotenv.config();

const verifyToken = (req, res, next) => {
  console.log(req.originalUrl);
  const authHeader =
    req.body.token ||
    req.query.token ||
    req.headers["authorization"] ||
    req.headers.authorization;
  const exceptions = ["/api/hints/gethints/","/api/hints/getHintsByVotes/"];
  
  const token = authHeader && authHeader.split(" ")[1];
  
  if ((token==="null" || token===undefined) && exceptions.includes(req.originalUrl)) {
    return next();
  }
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    console.log('Invalid user');
    return res.status(401).send("You need to log in");
  }
  return next();
};
export default verifyToken;
