var Logged = document.getElementById("logged");

var cookies = document.cookie.split("=")[1];
console.log("cookies - ", cookies);

if (!cookies) {
  Logged.innerHTML = "<p id='red'>Please Sign in</p>";
} else {
  Logged.innerHTML = `<p>Hello ${cookies}, you're logged in</p> <button id='log-me-out'>Log-out</button>`;
}
