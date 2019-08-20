const { createServer } = require("http");
const router = require("./router.js");

const server = createServer(router);
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
