var form = document.getElementById('Add_task');
var formHTML = form.innerHTML;
var formPane = document.getElementById('formPane');
var data = JSON.parse(localStorage.getItem('data')) || [];
var alltask = document.getElementById('alltask');
localStorage.todayAnimated = [];
localStorage.allAnimated = [];
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

function nextVal() {
  if (!localStorage.taskSeq) {
    localStorage.taskSeq = parseInt(1);
  } else {
    localStorage.taskSeq++;
  }
  return localStorage.taskSeq;
}

function task(
  title,
  priority,
  description,
  category,
  date,
  time,
  location,
  alert,
  currentUser
) {
  this.title = title;
  this.priority = priority;
  this.description = description;
  this.category = category;
  this.date = date;
  this.time = time;
  this.location = location;
  this.alert = alert;
  this.currentUser = currentUser;
  this.status = 'New';
  this.id = nextVal();
}

function formData(event) {

  //localStorage.clear();
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
    var alert = event.target.alert.value;
    var currentUser = localStorage.currentUser;
  } catch (err) {
    console.log('Failed to inser data into data array' + err.message);
  }
  console.log(localStorage);
  data.push(
    new task(
      title,
      priority,
      description,
      category,
      date,
      time,
      location,
      alert,
      currentUser
    )
  );
  localStorage.setItem('data', JSON.stringify(data));
  console.log('Values are added into the Array data');
  console.log(data.currentUser);

  //createTable();
  form.reset();
  loadTodayView();
  loadAllView();

}


function login(event) {
  //localStorage.clear();
  event.preventDefault();

  console.log('Before Inserting Data ', localStorage);
  var userName = event.target.userInput.value;
  if (typeof(userName) === 'undefined' || userName === '') {
    alert('User name must be at least one character.');
  } else {
    var loginUserDetails =
    JSON.parse(localStorage.getItem('loginUserDetails')) || [];
    localStorage.setItem('currentUser', userName);
    if (!loginUserDetails.includes(userName) && userName !== '') {
      loginUserDetails.push(userName);
      localStorage.setItem('loginUserDetails', JSON.stringify(loginUserDetails));
    }
    console.log(localStorage);
    loadTodayView();
    loadAllView();

    formPane.innerHTML = `<h2>Add a Task</h2><form id="Add_task">${formHTML}</form>`;
    form = document.getElementById('Add_task');
    console.log(form);
    form.addEventListener('submit', formData);
    console.log('After Inserting Data', localStorage);
  }
}

var today = document.getElementById('today');

//Today pane functions begin here

function getTodaysTasks() {
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
  var todayStr = `${yr}-${mon}-${day}`;
  var todayTaskArr = [];
  todayTaskArr = allTaskArr.reduce(function(taskArr, task) {
    console.log('evaluating tasks...');
    console.log(task);
    if (
      task.currentUser === localStorage.currentUser &&
      task.date === todayStr &&
      task.status === 'New'
    ) {
      taskArr.push(task);
    }
    return taskArr;
  }, []);
  return todayTaskArr;
}

function renderTodaysTasks(inTaskArr) {
  for (var taskCounter = 0; taskCounter < inTaskArr.length; taskCounter++) {
    var displayTask = document.createElement('li');
    (displayTask.className = 'task'),
    (displayTask.id = inTaskArr[taskCounter].id),
    (displayTask.textContent = inTaskArr[taskCounter].title);
    var displayTaskBody = document.createElement('ul');
    displayTaskBody.className = 'task_body';
    var displayTaskPriority = document.createElement('li');
    var displayTaskDescription = document.createElement('li');
    var displayTaskCategory = document.createElement('li');
    var displayTaskDate = document.createElement('li');
    var displayTaskTime = document.createElement('li');
    var displayTaskLocation = document.createElement('li');
    var displayTaskAlert = document.createElement('li');
    var displayTaskStatus = document.createElement('input');
    displayTaskPriority.textContent = `Priority: ${inTaskArr[taskCounter].priority}`;
    displayTaskDescription.textContent = `Description: ${inTaskArr[taskCounter].description}`;
    displayTaskCategory.textContent = `Category: ${inTaskArr[taskCounter].category}`;
    displayTaskDate.textContent = `Due Date: ${inTaskArr[taskCounter].date}`;
    displayTaskTime.textContent = `Due Time: ${inTaskArr[taskCounter].time}`;
    displayTaskLocation.textContent = `Location: ${inTaskArr[taskCounter].location}`;
    displayTaskAlert.textContent = `Alert: ${inTaskArr[taskCounter].alert}`;
    displayTaskStatus.type = 'checkbox';
    displayTaskStatus.id = inTaskArr[taskCounter].id;
    displayTaskStatus.onchange = markComplete;
    displayTaskBody.appendChild(displayTaskPriority);
    displayTaskBody.appendChild(displayTaskDescription);
    displayTaskBody.appendChild(displayTaskCategory);
    displayTaskBody.appendChild(displayTaskDate);
    displayTaskBody.appendChild(displayTaskTime);
    displayTaskBody.appendChild(displayTaskLocation);
    displayTaskBody.appendChild(displayTaskAlert);
    displayTaskBody.appendChild(displayTaskStatus);
    displayTask.appendChild(displayTaskBody);
    var todayAnimated = [];
    if (localStorage.todayAnimated) {
      todayAnimated = JSON.parse(localStorage.todayAnimated);
    }
    if (!todayAnimated.includes(inTaskArr[taskCounter].id)) {
      displayTask.style.animation = 'bounceIn 1s';
      todayAnimated.push(inTaskArr[taskCounter].id);
      localStorage.todayAnimated = JSON.stringify(todayAnimated);
    }
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
      markCompleteArr[markCounter].status = 'Done';
      localStorage.data = JSON.stringify(markCompleteArr);
      document.getElementById(id).style.animation = 'bounceOut 2s';
      setTimeout(function() {
        loadTodayView();
        loadAllView();
      }, 1500);
      return;
    }
  }
}

function loadTodayView() {
  today.innerHTML = '';

  if (!localStorage.currentUser) {
    console.log('No current user.');
    today.innerHTML = 'No current user.';
  }

  var tasks = getTodaysTasks();
  if (!tasks[0]) {
    today.innerHTML = 'No tasks due today.';
  }
  renderTodaysTasks(tasks);
}



//Today pane functions begin here

function getAllTasks() {
  var allTasksArr = JSON.parse(localStorage.data);
  var allMyTasksArr = [];
  allMyTasksArr = allTasksArr.reduce(function(taskArr, task) {
    console.log('evaluating tasks...');
    console.log(task);
    if (
      task.currentUser === localStorage.currentUser
    ) {
      taskArr.push(task);
    }
    return taskArr;
  }, []);
  allMyTasksArr.sort(function(d1, d2) {
    return new Date(d1.date) - new Date(d2.date);
  });
  return allMyTasksArr;
}

function renderAllTasks(inTaskArr) {
  for (var taskCounter = 0; taskCounter < inTaskArr.length; taskCounter++) {
    var displayTask = document.createElement('li');
    (displayTask.className = 'task'),
    (displayTask.id = inTaskArr[taskCounter].id),
    (displayTask.textContent = inTaskArr[taskCounter].title);
    var displayTaskBody = document.createElement('ul');
    displayTaskBody.className = 'task_body';
    var displayTaskPriority = document.createElement('li');
    var displayTaskDescription = document.createElement('li');
    var displayTaskCategory = document.createElement('li');
    var displayTaskDate = document.createElement('li');
    var displayTaskTime = document.createElement('li');
    var displayTaskLocation = document.createElement('li');
    var displayTaskAlert = document.createElement('li');
    displayTaskPriority.textContent = `Priority: ${inTaskArr[taskCounter].priority}`;
    displayTaskDescription.textContent = `Description: ${inTaskArr[taskCounter].description}`;
    displayTaskCategory.textContent = `Category: ${inTaskArr[taskCounter].category}`;
    displayTaskDate.textContent = `Due Date: ${inTaskArr[taskCounter].date}`;
    displayTaskTime.textContent = `Due Time: ${inTaskArr[taskCounter].time}`;
    displayTaskLocation.textContent = `Location: ${inTaskArr[taskCounter].location}`;
    displayTaskAlert.textContent = `Alert: ${inTaskArr[taskCounter].alert}`;
    displayTaskBody.appendChild(displayTaskPriority);
    displayTaskBody.appendChild(displayTaskDescription);
    displayTaskBody.appendChild(displayTaskCategory);
    displayTaskBody.appendChild(displayTaskDate);
    displayTaskBody.appendChild(displayTaskTime);
    displayTaskBody.appendChild(displayTaskLocation);
    displayTaskBody.appendChild(displayTaskAlert);
    displayTask.appendChild(displayTaskBody);
    var allAnimated = [];
    if (localStorage.allAnimated) {
      allAnimated = JSON.parse(localStorage.allAnimated);
    }
    if (!allAnimated.includes(inTaskArr[taskCounter].id)) {
      displayTask.style.animation = 'bounceIn 1s';
      allAnimated.push(inTaskArr[taskCounter].id);
      localStorage.allAnimated = JSON.stringify(allAnimated);
    }
    if (inTaskArr[taskCounter].status === 'Done') {
      displayTask.style.textDecoration = 'line-through';
    }
    alltask.appendChild(displayTask);
  }
}

function loadAllView() {
  alltask.innerHTML = '';

  if (!localStorage.currentUser) {
    console.log('No current user.');
    alltask.innerHTML = 'No current user.';
  }
  var tasks = getAllTasks();
  if (!tasks[0]) {
    alltask.innerHTML = 'No tasks for this user.';
  }
  renderAllTasks(tasks);
}
//loadAllView();
//login();

if (!localStorage.currentUser) {
  //console.log(form.innerHTML);
  formPane.innerHTML = 'Enter your name to track your tasks: <form id="loginForm"><input type="text" name="userInput"> <input type="submit" class="button" value="Login" id="loginSubmit"></form>';
  var loginSubmit = document.getElementById('loginForm');
  loginSubmit.addEventListener('submit', login);
}

window.addEventListener('unload', function() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('todayAnimated');
  localStorage.removeItem('allAnimated');
});
