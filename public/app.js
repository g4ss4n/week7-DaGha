var confirmPassword = document.getElementById("confirm_password");
var password = document.getElementById("password");
var confirmErr = document.getElementById("confirmErr");
var postButton = document.getElementById("post-button");
var passwordErr = document.getElementById("passwordErr");

// Confirm Password
confirmPassword.addEventListener("input", event => {
  event.preventDefault();
  if (password.value != confirmPassword.value) {
    confirmErr.innerText = "Passwords do not match!";
    confirmErr.style.color = "red";
    postButton.disabled = true;
  } else if (confirmPassword.validity.valueMissing) {
    confirmErr.innerText = "Please confirm your password";
    postButton.disabled = true;
  } else {
    confirmErr.innerText = "Passwords match";
    confirmErr.style.color = "green";
    postButton.disabled = false;
    return true;
  }
});

password.addEventListener("input", event => {
  event.preventDefault();
  if (password.validity.patternMismatch) {
    passwordErr.innerText =
      "Password must contain at least eight characters, including one letter and one number";
    passwordErr.style.color = "red";
  } else if (password.validity.valueMissing) {
    passwordErr.innerText = "Please enter a password";
  } else {
    passwordErr.innerText = "";
    return true;
  }
})

confirmPassword.addEventListener("input",(event)=>{
  event.preventDefault();
    if (password.value != confirmPassword.value) {
      confirmErr.innerText = "Passwords do not match";
      confirmErr.style.color = "red"
    } else if (confirmPassword.validity.valueMissing) {
      confirmErr.innerText = "Please confirm your password";
    } else {
      postButton.disabled = false;
      confirmErr.innerText = "";
      return true;
    }
  })
 

postButton.addEventListener("click", event => {
  event.preventDefault();
  let formData = new FormData(document.forms.person);
  var data = {
    username: formData.get("username"),
    password: formData.get("password"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name")
  };
  console.log("post");
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/register", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
  });


  