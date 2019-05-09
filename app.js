'use strict';

var alltask = document.getElementById('alltask');

//Today pane functions begin here

function getAllTasks(){
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
  var allTaskShowArr = [];
  allTaskShowArr = allTaskArr.reduce(function(taskArr, task){
    if (task.userName === localStorage.currentUser && task.dueDateTime >= todayStr && task.status === 'New') {
      taskArr.push(task);
    }
    return taskArr;
  },[]);
  return allTaskShowArr;
}

function renderAllTasks(inTaskArr){
  for (var taskCounter = 0; taskCounter < inTaskArr.length; taskCounter++) {
    var displayTask = document.createElement('li');
    displayTask.textContent = inTaskArr[taskCounter].title;
    var displayTaskBody = document.createElement('ul');
    var displayTaskDescription = document.createElement('li');
    var displayTaskDueDateTime = document.createElement('li');
    displayTaskDescription.textContent = inTaskArr[taskCounter].description;
    displayTaskDueDateTime.textContent = inTaskArr[taskCounter].dueDateTime;
    displayTaskBody.appendChild(displayTaskDescription);
    displayTaskBody.appendChild(displayTaskDueDateTime);
    displayTask.appendChild(displayTaskBody);
    allTaskArr.appendChild(displayTask);
  }
}

function loadAllView(){
  alltask.innerHTML = '';

  if (!localStorage.currentUser) {
    console.log('No current user.');
    alltask.innerHTML = 'No current user.';
  }
  if (!localStorage[localStorage.currentUser]) {
    console.log('No tasks for this user.');
    alltask.innerHTML = 'No tasks for this user.';
  }
  var tasks = getAllTasks();
  if (!tasks[0]) {
    alltask.innerHTML = 'No tasks.';
  }
  renderAllTasks(tasks);
}

//Today pane execution begins here:

//setting event to unload currentUser whenever leaving the page
window.addEventListener('unload', function(){
  localStorage.removeItem('currentUser');
});

//execute alltask view
loadAllView();
