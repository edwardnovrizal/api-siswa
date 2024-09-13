const jwt = require("jsonwebtoken");

const VerifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  try {
    if (!token)
      return res.status(400).send({
        code: res.statusCode,
        message: "Unauthorized Access: JWT Token is required!",
      });

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (decoded.id_murid) {
      req.murid = decoded;
    } else {
      req.guru = decoded;
    }
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).send({
        code: res.statusCode,
        message: err.message,
      });
    }
    return res.status(500).send({
      code: res.statusCode,
      message: "Invalid Token",
    });
  }
};

module.exports = VerifyToken;
