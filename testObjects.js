var thomTasks = [{
  id: 1,
  title: 'title one',
  description: 'description one',
  dueDateTime: '05/31/2019',
  status: 'New',
  username: 'Thom',
},
{
  id: 2,
  title: 'title two',
  description: 'description two',
  dueDateTime: '05/09/2019',
  status: 'New',
  username: 'Thom',
},
{
  id: 3,
  title: 'title three',
  description: 'description three',
  dueDateTime: '05/09/2019',
  status: 'New',
  username: 'Thom'
}];

localStorage.Users = JSON.stringify(thomTasks);

localStorage.currentUser = 'Thom';
