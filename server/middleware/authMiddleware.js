const User = require("../models").users;
const jwt = require("jsonwebtoken");

module.exports = {
  protect: async function (req, res, next) {
    // Initialize token variable
    let token;

    // Check if Bearer Token is sent
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get token from the authorization header
        token = req.headers.authorization.split(" ")[1];

        // Decode and verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Set req.user to the authorized user
        req.user = await User.findOne({
          where: { id: decodedToken.id },
          attributes: ["username", "id"],
        });

        // Call next to finish running middleware
        next();
      } catch (error) {
        // If no Bearer token was verified return 401 status
        res.status(401).json({
          message: "Unauthorized request. Please login.",
        });
      }
    }

    // If no token found return 401 status
    if (!token) {
      res.status(401).json({
        message: "Unauthorized request. Please login.",
      });
    }
  },
};
