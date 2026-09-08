const ApiError = require("../lib/ApiError");

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = err instanceof ApiError ? err.status : 500;
  if (status >= 500) {
    console.error(err);
  }
  res.status(status).send({
    error: true,
    message: status >= 500 ? "Internal server error" : err.message,
  });
}

function notFound(req, res) {
  res.status(404).send({ error: true, message: "Not found" });
}

module.exports = { errorHandler, notFound };
