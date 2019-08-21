const handlers = require("./handler.js");

const router = (req, res) => {
  //console.log("Router method", `${req.method} ${req.url}`);

  const url = req.url;
  let endPoint = "";
  if (url.indexOf("?") > -1) {
    endPoint = url.split("?")[0];
  } else {
    endPoint = url;
  }
  if (endPoint === "/") {
    handlers.handlerHomeRoute(res);
  } else if (endPoint.includes("public")) {
    handlers.handlePublic(req, res);
  } else if (endPoint === "/public/favicon.ico") {
    handlers.handleIcon(res);
  } else if (`${req.method} ${req.url}` === "POST /login") {
    handlers.handleSignIn(req, res);
  } else if (`${req.method} ${req.url}` === "POST /register") {
    handlers.handleRegister(req, res);
  } else {
    handlers.handleNotFound(res);
  }
};

module.exports = router;
