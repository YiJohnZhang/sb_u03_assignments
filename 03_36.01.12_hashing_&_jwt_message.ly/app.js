/** Express app for message.ly. */

const express = require("express");
const cors = require("cors");	// cross-origin resource sharing (the point of jwtokens)
const { authenticateJWT } = require("./modules/middlewareAuth");

const {ExpressError} = require("./modules/utilities")
const app = express();

app.use(express.json(), express.urlencoded({extended: true}));
	// allow both form-encoded and json body parsing

app.use(cors());
	// allow connections to all routes from any browser

app.use(authenticateJWT);
	// get auth token for all routes

/** routes */
const authRoutes = require("./modules/routerAuth");
const userRoutes = require("./modules/routerUsers");
const messageRoutes = require("./modules/routerMessages");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

/** 404 handler */
app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if (process.env.NODE_ENV != "test") console.error(err.stack);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;
