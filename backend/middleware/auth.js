const jwt = require("jsonwebtoken");

const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.sendStatus(403); // Forbidden

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      if (roles.length && !roles.includes(user.role)) {
        return res.sendStatus(403); // Forbidden
      }
      next();
    });
  };
};

module.exports = auth;
