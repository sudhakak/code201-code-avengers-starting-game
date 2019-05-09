'use strict';

var form = document.getElementById('Add_task');
var table = document.getElementById('task_table');
var data = [];

function task(title, priority, description,category, date, time, location, alert) {
    this.title = title;
    this.priority = priority;
    this.description = description;
    this.category = category;
    this.date = date;
    this.time = time;
	 this.location = location;
    this.alert = alert;
       
}

function formData(event) {
    event.preventDefault();

    var title = event.target.title.value;
    var priority = event.target.priority.value;
    var description = event.target.description.value;
    var category = event.target.category.value;
    var date = event.target.date.value;
	 var time = event.target.time.value;
    var location = event.target.location.value;
    var alert = event.target.alert.value;
  
    data.push(new task(title, priority, description, category ,date, time, location, alert));
    createTable();
  //  form.reset();
}

function createTable() {
    var row;
    for (var i = 0; i < data.length; i++) {
        row = document.createElement('tr');
        row.innerHTML = '<td>' + data[i].title + '</td>' +
            '<td>' + data[i].priority + '</td>' +
            '<td>' + data[i].description + '</td>' +
            '<td>' + data[i].category + '</td>' +
            '<td>' + data[i].date + '</td>' +
            '<td>' + data[i].time + '</td>' +
            '<td>' + data[i].location + '</td>' +
            '<td>' + data[i].alert + '</td>'
    }

    table.appendChild(row);
}

form.addEventListener('submit', formData);
