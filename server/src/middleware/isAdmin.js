const isAdmin = (req, res, next) => {
  const email = req.user.email;

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).send("You are not an Admin");
  }
  return next();
};

export default isAdmin;
