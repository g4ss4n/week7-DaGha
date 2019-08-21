const fs = require("fs");
const path = require("path");
require("dotenv").config();
const postData = require('./queries/postData.js');
const { getUsers } = require("./queries/getData");
const { getResults } = require("./queries/getData");


const serverError = (err, response) => {
  response.writeHead(500, "Content-Type:text/html");
  response.end("<h1>Sorry, there was a problem loading the homepage</h1>");
  console.log(err);
};


const handlerHomeRoute = response => {
  const filepath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filepath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, { "Content-type": "text/html" });
      response.end("<h1> Sorry, there was a server error</h1>");
    } else {
      response.writeHead(200, { "Content-type": "text/html" });
      response.end(file);
    }
  });
};

const handlePublic = (request, response) => {
  const { url } = request;

  const extention = url.split(".")[1];

  const extentionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon",
    png: "image/png"
  };
  const filepath = path.join(__dirname, "..", url);
  fs.readFile(filepath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, { "Content-type": extentionType.html });
      response.end("<h1>Sorry, there was a server error</h1>");
    } else {
      response.writeHead(200, { "Content-type": extentionType[extention] });
      response.end(file);
    }
  });
};

const handleIcon = response => {
  const filePath = path.join(__dirname, "..", url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>Sorry, we've had a problem on our end</h1>");
    } else {
      response.writeHead(200, { "Content-Type": "image/x-icon" });
      response.end(file);
    }
  });
};


const handleRegister = (request, response)=>{
  // console.log("req" , request);
  // console.log("res " ,response)
  let data = '';
  request.on('data', chunk => {
    console.log("chunk" , chunk); 
    data += chunk;
  });
  request.on('end', () => {
    var new_data = JSON.parse(data);
      console.log("dataaaa" ,JSON.parse(data));
    postData(new_data.username, new_data.password , new_data.first_name , new_data.last_name, err => {
      if(err){ return serverError(err, response);}
      else{response.writeHead(302, {Location: '/' });
      response.end()
    }
    });
  });
}
const handleSignIn = response => {
  console.log("GET USERS", getUsers());
  if (err) {
    response.writeHead(500, "Content-Type:text/html");
    response.end("<h1>Sorry, we cannot show you anything...<h1>");
    console.log(err);
  } else {
    let output = JSON.stringify(response);
    console.log("Output", output);
    response.writeHead(200, { "content-type": "application/json" });
    response.end(output);
  }
};



const handleNotFound = response => {
  response.writeHead(404);
  response.end("<h1>This page cannot be found</h1>");
};
module.exports = {
  handlerHomeRoute,
  handlePublic,
  handleNotFound,
  handleIcon,
  handleRegister,
  handleSignIn
};
