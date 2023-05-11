const debugLog = (req, res, next) => {
  let debugMessage = `\nIncoming ${req.method} request to ${req.originalUrl}`;

  debugMessage += '\n----------------------Request headers----------------------';
  Object.entries(req.headers).forEach(([key, value]) => {
    debugMessage += `\n${key}: ${value}`;
  });
  debugMessage += '\n----------------------Request headers----------------------';

  if (req.body) {
    debugMessage += '\n----------------------Request body-------------------------';
    debugMessage += `\n${JSON.stringify(req.body)}`;
    debugMessage += '\n----------------------Request body-------------------------';
  }

  console.log(debugMessage);
  next();
};

module.exports = debugLog;
