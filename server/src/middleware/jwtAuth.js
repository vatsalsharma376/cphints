import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  // console.log(req.headers.authorization);
  console.log(req.originalUrl);
  const authHeader =
    req.body.token ||
    req.query.token ||
    req.headers["authorization"] ||
    req.headers.authorization;
  const exceptions = ["/api/hints/gethints/","/api/hints/getHintsByVotes/"];
  
  const token = authHeader && authHeader.split(" ")[1];
  
  if (token==="null" && exceptions.includes(req.originalUrl)) {
    return next();
  }
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
  } catch (err) {
    console.log('Invalid user');
    return res.status(401).send("Invalid Token");
  }
  return next();
};
export default verifyToken;
