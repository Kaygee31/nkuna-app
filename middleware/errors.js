const notFoundHandler = (req, res, next) => {
  res.render("partials/error", {
    error: 404,
    message: "Page not found."
  })
}

const errorLogger = (err, req, res, next) => {
	console.error(err.stack);
	next(err);
}

module.exports = {
  notFoundHandler,
  errorLogger
}

