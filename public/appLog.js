var getButton = document.getElementById("get-button");
var Logged = document.getElementById("logged");
var cookies = document.cookie.split("=")[1];

//Login
getButton.addEventListener("click", event => {
  event.preventDefault();
  let formData = new FormData(document.forms.person);
  var data = {
    username: formData.get("usernameLog"),
    password: formData.get("passwordLog")
  };
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/login", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
});

getButton.addEventListener("mouseleave", event => {
  event.preventDefault();
  console.log("cookies - ", cookies);

  if (cookies) {
    Logged.innerHTML = `<p>Hello ${cookies}, you're logged in</p>`;
  } else {
    Logged.innerHTML = `<p id="red">please log-in</p>`;
  }
});
