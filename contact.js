let countParagraph = document.getElementById("cardNumber");
countParagraph.innerHTML = localStorage.getItem("cardCount");
let form = document.getElementById("contactForm");
let firstName = document.getElementById("firstName");
let wrongFirstName = document.getElementById("wrongFirstName");
let lastName = document.getElementById("lastName");
let wrongLastName = document.getElementById("WrongLastName");
let email = document.getElementById("userEmail");
let WrongEmail = document.getElementById("wrongEmail");
let phoneNumber = document.getElementById("phoneNumber");
let wrongPhoneNumber = document.getElementById("WrongPhone");
let userPassword = document.getElementById("userPassword");
let wrongPassword = document.getElementById("wrongPassword");
let confirmPassword = document.getElementById("confirmPassword");
let wrongConfirmPassword = document.getElementById("WrongConfrimPassword");
let submit = document.querySelector("submit");
function checKFirstName() {
  if (firstName.value.match("^[A-Za-z][A-Za-z0-9_]{2,29}$")) {
    wrongFirstName.style.visibility = "hidden";
    return true;
  } else {
    wrongFirstName.style.visibility = "visible";
    return false;
  }
}
function checKLastName() {
  if (lastName.value.match("^[A-Za-z][A-Za-z0-9_]{2,29}$")) {
    wrongLastName.style.visibility = "hidden";
    return true;
  } else {
    wrongLastName.style.visibility = "visible";
    return false;
  }
}
function checKEmail() {
  if (email.value.match(/^([a-z0-9_.-]+@[da-z.-]+.[a-z.]{2,6})$/gm)) {
    WrongEmail.style.visibility = "hidden";
    console.log("true");
    return true;
  } else {
    WrongEmail.style.visibility = "visible";
    console.log("false");
    return false;
  }
}
function checkPhone() {
  if (phoneNumber.value.match("^01[0125][0-9]{8}")) {
    wrongPhoneNumber.style.visibility = "hidden";
    return true;
  } else {
    wrongPhoneNumber.style.visibility = "visible";
    return false;
  }
}
function checkUserPassword() {
  if (
    userPassword.value.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{10,30}$/
    )
  ) {
    wrongPassword.style.visibility = "hidden";
    return true;
  } else {
    wrongPassword.style.visibility = "visible";
    return false;
  }
}
function checkConfirmUserPassword() {
  if (
    userPassword.value !== confirmPassword.value ||
    confirmPassword.value == ""
  ) {
    wrongConfirmPassword.style.visibility = "visible";
    return false;
  } else {
    wrongConfirmPassword.style.visibility = "hidden";
    return true;
  }
}
form.addEventListener("submit", function (e) {
  if (
    !(
      checKFirstName() &&
      checKLastName() &&
      checKEmail() &&
      checkPhone() &&
      checkUserPassword() &&
      checkConfirmUserPassword()
    )
  ) {
    e.preventDefault();
  }
});
