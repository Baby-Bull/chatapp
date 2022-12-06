const corsMiddleware = (req, res, next) => {
    if (!Array.isArray(allowedOrigins))
      throw new Error("corsMiddleware: allowedOrigins param must be an array");
    if (allowedOrigins.length === 0) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', '*');
    } else if (allowedOrigins.indexOf(req.headers.origin) !== -1) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Headers', '*');
    }
    next()
  }
  
  module.exports = {
    corsMiddleware,
  }