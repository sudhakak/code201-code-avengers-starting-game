var form = document.getElementById("Add_task");
var data = JSON.parse(localStorage.getItem("data")) || [];

/*function submitData() {
  console.log("Values entered in the Add Task Button");
  debugger;

  console.log(localStorage);
  //localStorage.clear();
  var users = JSON.parse(localStorage.getItem("Users")) || [];
  try {
    var userDataDetails = [
      { Title: document.getElementById("title").value },
      { Priority: document.getElementById("priority").value },
      { Description: document.getElementById("description").value },
      { Category: document.getElementById("category").value },
      { Date: document.getElementById("date").value },
      { Time: document.getElementById("time").value },
      { Location: document.getElementById("location").value },
      { Alert: document.getElementById("alert").value },
      { userName: localStorage.getItem("currentUser") }
    ];
  } catch (err) {
    console.log(err.message);
  }

  users.push(userDataDetails);
  localStorage.setItem("Users", JSON.stringify(users));
  console.log("Values are added into the Array users");
  console.log(users.currentUser);
}*/

function task(
  title,
  priority,
  description,
  category,
  date,
  time,
  location,
  alertData,
  currentUser,
  status
) {
  this.title = title;
  this.priority = priority;
  this.description = description;
  this.category = category;
  this.date = date;
  this.time = time;
  this.location = location;
  this.alertData = alertData;
  this.currentUser = currentUser;
  this.status = status;
}

function formData(event) {
  // localStorage.clear();
  /* while (data.length) {
    data.pop();
  }*/
  event.preventDefault();
  try {
    var title = event.target.title.value;
    var priority = event.target.priority.value;
    var description = event.target.description.value;
    var category = event.target.category.value;
    var date = event.target.date.value;
    var time = event.target.time.value;
    var location = event.target.location.value;
    var alertData = event.target.alert.value;
    var currentUser = localStorage.currentUser;
    var status = "New";
    console.log(localStorage);

    if (currentUser) {
      data.push(
        new task(
          title,
          priority,
          description,
          category,
          date,
          time,
          location,
          alertData,
          currentUser,
          status
        )
      );
    } else {
      alert("Null UserName is entered please refresh the page and login");
    }
  } catch (err) {
    console.log("Failed to insert data into data array" + err.message);
  }
  localStorage.setItem("data", JSON.stringify(data));
  console.log("Values are added into the Array data");
  console.log(data.currentUser);
  //createTable();
  //  form.reset();
}
form.addEventListener("submit", formData);

function login() {
  //localStorage.clear();

  console.log("Before Inserting Data ", localStorage);
  var userName = prompt("Please enter userName");
  var loginUserDetails =
    JSON.parse(localStorage.getItem("loginUserDetails")) || [];
  localStorage.setItem("currentUser", userName);
  if (loginUserDetails.includes(userName) == false && userName != null) {
    loginUserDetails.push(userName);
    localStorage.setItem("loginUserDetails", JSON.stringify(loginUserDetails));
  } else if (typeof userName === "undefined" || !userName) {
    alert("Null values are entered");
  } else {
    var currentUser = localStorage.getItem("currentUser");
    // debugger;
    console.log(localStorage);
    loadTodayView();
    loadAllView();
  }

  console.log("After Inserting Data", localStorage);
}

var today = document.getElementById("today");

//Today pane functions begin here

function getTodaysTasks() {
  //debugger;
  var allTaskArr = JSON.parse(localStorage.data);
  console.log(localStorage.data);
  var today = new Date();
  var day = today.getDate();
  if (parseInt(day) < 10) {
    day = `0${day}`;
  }
  var mon = parseInt(today.getMonth()) + 1;
  if (parseInt(mon) < 10) {
    mon = `0${mon}`;
  }
  var yr = today.getFullYear();
  var todayStr = `${mon}/${day}/${yr}`;
  var todayTaskArr = [];
  todayTaskArr = allTaskArr.reduce(function(taskArr, task) {
    if (
      task.currentUser ===
        localStorage.currentUser /*&&
      task.dueDateTime === todayStr */ &&
      task.status === "New"
    ) {
      taskArr.push(task);
    }
    return taskArr;
  }, []);
  return todayTaskArr;
}

function renderTodaysTasks(inTaskArr) {
  for (var taskCounter = 0; taskCounter < inTaskArr.length; taskCounter++) {
    var displayTask = document.createElement("li");
    (displayTask.className = "task"),
      (displayTask.id = inTaskArr[taskCounter].id),
      (displayTask.textContent = inTaskArr[taskCounter].title);
    var displayTaskBody = document.createElement("ul");
    displayTaskBody.className = "task_body";
    var displayTaskDescription = document.createElement("li");
    var displayTaskDueDateTime = document.createElement("li");
    var displayTaskStatus = document.createElement("input");
    displayTaskDescription.textContent = inTaskArr[taskCounter].description;
    displayTaskDueDateTime.textContent = inTaskArr[taskCounter].dueDateTime;
    displayTaskStatus.type = "checkbox";
    displayTaskStatus.id = inTaskArr[taskCounter].id;
    displayTaskStatus.onchange = markComplete;
    displayTaskBody.appendChild(displayTaskDescription);
    displayTaskBody.appendChild(displayTaskDueDateTime);
    displayTaskBody.appendChild(displayTaskStatus);
    displayTask.appendChild(displayTaskBody);
    today.appendChild(displayTask);
  }
}

function markComplete() {
  var id = this.id;
  var markCompleteArr = JSON.parse(localStorage.data);
  for (
    var markCounter = 0;
    markCounter < markCompleteArr.length;
    markCounter++
  ) {
    if (parseInt(markCompleteArr[markCounter].id) === parseInt(id)) {
      markCompleteArr[markCounter].status = "Done";
      localStorage.data = JSON.stringify(markCompleteArr);
      document.getElementById(id).style.animation = "bounceOut 2s";
      setTimeout(function() {
        loadTodayView();
      }, 1500);
      return;
    }
  }
}

function loadTodayView() {
  today.innerHTML = "";

  if (!localStorage.currentUser) {
    console.log("No current user.");
    today.innerHTML = "No current user.";
  }
  if (!localStorage[localStorage.currentUser]) {
    console.log("No tasks for this user.");
    today.innerHTML = "No tasks for this user.";
  }
  var tasks = getTodaysTasks();
  if (!tasks[0]) {
    today.innerHTML = "No tasks due today.";
  }
  renderTodaysTasks(tasks);
}

//Today pane execution begins here:

//setting event to unload currentUser whenever leaving the page
window.addEventListener("unload", function() {
  localStorage.removeItem("currentUser");
});

//execute today view
//loadTodayView();
var alltask = document.getElementById("alltask");

//Today pane functions begin here

function getAllTasks() {
  var allTaskArr = JSON.parse(localStorage.data);
  var today = new Date();
  var day = today.getDate();
  if (parseInt(day) < 10) {
    day = `0${day}`;
  }
  var mon = parseInt(today.getMonth()) + 1;
  if (parseInt(mon) < 10) {
    mon = `0${mon}`;
  }
  var yr = today.getFullYear();
  var todayStr = `${mon}/${day}/${yr}`;
  var allTaskShowArr = [];
  allTaskShowArr = allTaskArr.reduce(function(taskArr, task) {
    if (
      task.currentUser ===
      localStorage.currentUser /*&&
      task.dueDateTime >= todayStr &&
      task.status === "New"*/
    ) {
      taskArr.push(task);
    }
    return taskArr;
  }, []);
  return allTaskShowArr;
}

function renderAllTasks(inTaskArr) {
  for (var taskCounter = 0; taskCounter < inTaskArr.length; taskCounter++) {
    var displayTask = document.createElement("li");
    displayTask.textContent = inTaskArr[taskCounter].title;
    var displayTaskBody = document.createElement("ul");
    var displayTaskDescription = document.createElement("li");
    var displayTaskDueDateTime = document.createElement("li");
    displayTaskDescription.textContent = inTaskArr[taskCounter].description;
    displayTaskDueDateTime.textContent = inTaskArr[taskCounter].dueDateTime;
    displayTaskBody.appendChild(displayTaskDescription);
    displayTaskBody.appendChild(displayTaskDueDateTime);
    displayTask.appendChild(displayTaskBody);
    alltask.appendChild(displayTask);
  }
}

function loadAllView() {
  alltask.innerHTML = "";

  if (!localStorage.currentUser) {
    console.log("No current user.");
    alltask.innerHTML = "No current user.";
  }
  if (!localStorage[localStorage.currentUser]) {
    console.log("No tasks for this user.");
    alltask.innerHTML = "No tasks for this user.";
  }
  var tasks = getAllTasks();
  if (!tasks[0]) {
    alltask.innerHTML = "No tasks.";
  }
  renderAllTasks(tasks);
}
//loadAllView();
