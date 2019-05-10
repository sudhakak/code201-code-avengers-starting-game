'use strict';

var today = document.getElementById('today');
localStorage.displayedItems = [];

//Today pane functions begin here

function getTodaysTasks(){
  var allTaskArr = JSON.parse(localStorage.Users);
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
  todayTaskArr = allTaskArr.reduce(function(taskArr, task){
    if (task.username === localStorage.currentUser && task.dueDateTime === todayStr && task.status === 'New') {
      taskArr.push(task);
    }
    return taskArr;
  },[]);
  return todayTaskArr;
}

function renderTodaysTasks(inTaskArr){
  for (var taskCounter = 0; taskCounter < inTaskArr.length; taskCounter++) {
    var displayTask = document.createElement('li');
    displayTask.className = 'task',
    displayTask.id = inTaskArr[taskCounter].id,
    displayTask.textContent = inTaskArr[taskCounter].title;
    var displayTaskBody = document.createElement('ul');
    displayTaskBody.className = 'task_body';
    var displayTaskDescription = document.createElement('li');
    var displayTaskDueDateTime = document.createElement('li');
    var displayTaskStatus = document.createElement('input');
    displayTaskDescription.textContent = inTaskArr[taskCounter].description;
    displayTaskDueDateTime.textContent = inTaskArr[taskCounter].dueDateTime;
    displayTaskStatus.type = 'checkbox';
    displayTaskStatus.id = inTaskArr[taskCounter].id;
    displayTaskStatus.onchange = markComplete;
    displayTaskBody.appendChild(displayTaskDescription);
    displayTaskBody.appendChild(displayTaskDueDateTime);
    displayTaskBody.appendChild(displayTaskStatus);
    displayTask.appendChild(displayTaskBody);
    today.appendChild(displayTask);
    if (!localStorage.displayedItems.includes(inTaskArr[taskCounter].id)) {
      document.getElementById(inTaskArr[taskCounter].id).style.animation = 'bounceIn 2s';
      localStorage.displayedItems.push(inTaskArr[taskCounter].id);
    }
  }
}

function markComplete(){
  var id = this.id;
  var markCompleteArr = JSON.parse(localStorage.Users);
  for (var markCounter = 0; markCounter < markCompleteArr.length; markCounter++) {
    if (parseInt(markCompleteArr[markCounter].id) === parseInt(id)) {
      markCompleteArr[markCounter].status = 'Done';
      localStorage.Users = JSON.stringify(markCompleteArr);
      document.getElementById(id).style.animation = 'bounceOut 2s';
      setTimeout(function() {
        loadTodayView();
      }, 1500);
      return;
    }
  }
}

function loadTodayView(){
  today.innerHTML = '';

  if (!localStorage.currentUser) {
    console.log('No current user.');
    today.innerHTML = 'No current user.';
  }
  if (!localStorage[localStorage.currentUser]) {
    console.log('No tasks for this user.');
    today.innerHTML = 'No tasks for this user.';
  }
  var tasks = getTodaysTasks();
  if (!tasks[0]) {
    today.innerHTML = 'No tasks due today.';
  }
  renderTodaysTasks(tasks);
}

//Today pane execution begins here:

//setting event to unload currentUser whenever leaving the page
window.addEventListener('unload', function(){
  localStorage.removeItem('currentUser');
  localStorage.removeItem('displayedItems');
});

//execute today view
loadTodayView();
