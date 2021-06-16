const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || "testing";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.sendStatus(401);
    jwt.verify(token, secret, (err, decoded) => {
      if (err || req.params.id != decoded.id) {
          return res.status(401).send({
              message: "Unauthorized!",
          });
      }

      next();
    });
    
  }

module.exports = authenticateToken