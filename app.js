// Array to store tasks
let tasks = [];

// take user name at start only as a sign in thing.
let userName;


window.onload = function () {
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTasks();
  }

  const today = new Date().toISOString().split('T')[0];
  document.getElementById('task-date').value = today;

  userName = prompt('Please enter your name:');
  if (userName) {
    localStorage.setItem('userName', userName);
  } else {
    userName = 'Anonymous'; // Default to 'Anonymous' if no name is provided
  }

};

// Handle form submission
document.getElementById('todo-form').addEventListener('submit', function (e) {
  e.preventDefault();


  const content = document.getElementById('task-content').value;
  const due = document.getElementById('task-date').value;

  // Create a new task object
  const task = {
    name: userName,
    content: content,
    completed: false,
    dueDate: due,
    timestamp: new Date().toLocaleString()
  };

  // Add the new task to the array and save it 
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  document.getElementById('task-content').value = '';



  // Re-render tasks
  renderTasks();
});




function renderTasks() {
  const tasksContainer = document.getElementById('tasks-container');
  tasksContainer.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';

    const taskWrapper = document.createElement('div'); // Wrapper for checkbox + text
    taskWrapper.className = 'task-wrapper';

    // Create checkbox for task completion
    const completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    completeCheckbox.className = 'complete-checkbox';
    completeCheckbox.checked = task.completed; // Set checkbox state based on task completion
    completeCheckbox.addEventListener('change', () => toggleComplete(index)); // Toggle completion when clicked

    // Task content (text)
    const taskContent = document.createElement('p');
    taskContent.textContent = task.content;
    if (task.completed) {
      taskContent.classList.add('completed');
    }

    // Contributor info
    const contributor = document.createElement('p');
    contributor.textContent = `Contributed by ${task.name} on ${task.timestamp}   `;
    contributor.className = 'contributor';

    // Due date button
    const dueDateBtn = document.createElement('div');
    dueDateBtn.textContent = `${task.dueDate}`;

    const taskDueDate = new Date(task.dueDate); // Convert due date string to Date object
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for today to midnight 

    // Set class based on due date
    dueDateBtn.className =
      taskDueDate < today ? 'due-btn' : // Past (yesterday)
        taskDueDate.toDateString() === today.toDateString() ? 'due-btn1' : // Today
          'due-btn2'; // Future (greater than todoy )

    taskElement.appendChild(dueDateBtn); // Add due date button to the task element



    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = `Delete`;
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', () => deleteTask(index));


    const actions = document.createElement('div');
    actions.className = 'actions';

    actions.appendChild(dueDateBtn);
    actions.appendChild(deleteButton);

    // Append checkbox before task content
    taskWrapper.appendChild(completeCheckbox);
    taskWrapper.appendChild(taskContent);

    // Append the taskWrapper and contributor info
    taskElement.appendChild(taskWrapper);
    taskElement.appendChild(contributor);
    taskElement.appendChild(actions);

    tasksContainer.appendChild(taskElement);
  });
}


// Function to toggle task completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  const audio = new Audio('click.mp3');
  audio.play().then(() => { console.log("Audio played successfully"); })
  renderTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  const audio = new Audio('click.mp3');
  audio.play().then(() => { console.log("Audio played successfully"); })
  renderTasks();
}
