var getButton = document.getElementById("get-button");
console.log("APPLOG works");

//Login
getButton.addEventListener("click", event => {
  event.preventDefault();
  let formData = new FormData(document.forms.person);
  var data = {
    username: formData.get("usernameLog"),
    password: formData.get("passwordLog")
  };
  console.log("Data works", data);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/login", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
});
