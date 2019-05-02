function submitData() {
  Console.log("Values entered in the Add Task Button");
  //localStorage.clear();
  var users = JSON.parse(localStorage.getItem("Users")) || [];
  var userDataDetails = [
    { Title: document.getElementById("Title").value },
    { Priority: document.getElementById("Priority").value },
    { Description: document.getElementById("Description").value },
    { Category: document.getElementById("Category").value },
    { Date: document.getElementById("Date").value },
    { Time: document.getElementById("Time").value },
    { Location: document.getElementById("Location").value },
    { Alert: document.getElementById("Alert").value },
    { userName: localStorage.getItem("currentUser") }
  ];

  users.push(userDataDetails);
  localStorage.setItem("Users", JSON.stringify(users));
  console.log("Values are added into the Array users");
  console.log(users.currentUser);
}
function login() {
  //localStorage.clear();

  console.log("Before Inserting Data ", localStorage);
  var userName = prompt("Please enter userName");
  var loginUserDetails = JSON.parse(localStorage.getItem("LoginList")) || [];

  if (loginUserDetails.includes(userName) == false && userName != null) {
    loginUserDetails.push(userName);
    localStorage.setItem("LoginList", JSON.stringify(loginUserDetails));
    localStorage.setItem("currentUser", userName);
  } else {
    alert("Username already existing or Null values are entered");
  }
  var user = localStorage.getItem("currentUser");
  console.log(user);

  console.log("After Inserting Data", localStorage);
}
