var confirmPassword = document.getElementById("confirm_password");
var password = document.getElementById("password");
var confirmErr = document.getElementById("confirmErr");
var postButton = document.getElementById("post-button");


confirmPassword.addEventListener("input",(event)=>{
  event.preventDefault();
    if (password.value != confirmPassword.value) {
      confirmErr.innerText = "Passwords do not match";
      confirmErr.style.color = "red"
      postButton.disabled = true;
    } else if (confirmPassword.validity.valueMissing) {
      confirmErr.innerText = "Please confirm your password";
      postButton.disabled = true;
    } else {
      postButton.disabled = false;
      confirmErr.innerText = "";
      return true;
    }
  })
 




//confirmPassword.addEventListener("input", check);
postButton.addEventListener("click" , (event)=>{
  event.preventDefault();
  let formData = new FormData(document.forms.person);
  var data = {
    username :formData.get('username'),
    password :formData.get('password'),
    first_name: formData.get('first_name'),
    last_name : formData.get('last_name')
  }
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/register', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
})
