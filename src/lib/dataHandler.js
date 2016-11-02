const dataFetcher = require("./dataFetcher.js")

exports.searchEvents = (req, res, next) => {
  const results = dataFetcher.getFBEvents();
  req.value = results;
  next();
}
