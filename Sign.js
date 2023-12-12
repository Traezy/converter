document.querySelector(".sign").addEventListener("click", function () {
  if (FirstName.value.length > 3 && password.value.length > 8) {
    document.querySelector(".sign").style.display = "block";
  } else {
    document.querySelector(".sign").style.display = "none";
    alert("Must input something");
  }
});
