const handlers = require("./handler.js");

const router = (req, res) => {
  if (req.url === "/") {
    handlers.handlerHomeRoute(res);
  } else if (req.url.indexOf("public") == -1) {
    handlers.handlePublic(req, res);
  } else if (req.url === "/public/assets") {
    handlers.handleIcon(res);
  } else {
    handlers.handleNotFound(res);
  }
};

module.exports = router;
