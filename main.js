// My Tasks Basic

// HTML Elements
let taskInputEl = document.getElementById("taskInput");
let menuEl = document.getElementById("menu");
let tasksEl = document.getElementById("tasks");

// Global Variables
let tasks = initTasks();
displayTasks();

// Go Btn - Menu Listener
taskInputEl.addEventListener("keydown", taskSubmitHandler);

function taskSubmitHandler(e) {
  // Get Menu Selection
  console.log(e.code);
  if (e.code === "Enter") {
    // add submitted task
    let userTask = taskInputEl.value;
    tasks.push(newTask(userTask));
    saveTasks();
    displayTasks();
    taskInputEl.value = "";
  }
}

function toggleTask() {
  let taskIndex = +prompt("Please enter number of task to toggle:");
  let task = tasks[taskIndex];
  if (task.completed === "") {
    task.completed = "completed";
  } else {
    task.completed = "";
  }
  saveTasks();
  displayTasks();
}

function removeTask() {
  let taskIndex = +prompt("Please enter number of task to remove:");
  tasks.splice(taskIndex, 1);
  saveTasks();
  displayTasks();
}

function clearAll() {
  tasks = [];
  saveTasks();
  displayTasks();
}

// HELPERS
function initTasks() {
  let jsonTasks = localStorage.getItem("tasks");
  return JSON.parse(jsonTasks) ?? [];
}

function displayTasks() {
  tasksEl.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    tasksEl.appendChild(getTaskHTML(tasks[i], i));
  }
}

function newTask(taskDescription) {
  return {
    description: taskDescription,
    completed: false,
  };
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTaskHTML(task, index) {
  //javascript

  // check box element
  let checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.dataset.index = index;
  checkboxEl.checked = task.completed;

  checkboxEl.addEventListener("input", checkBoxHandler);
  //task description text node
  let textSpanEl = document.createElement("span");
  textSpanEl.innerHTML = task.description;
  if (task.completed) {
    textSpanEl.className = "completed";
  }
  // remove button
  let buttonEl = document.createElement("button");
  buttonEl.innerHTML = "remove";
  buttonEl.dataset.index = index;
  buttonEl.addEventListener("click", removeBtnHandler);
  // add everything to div element
  let divEl = document.createElement("div");
  divEl.appendChild(checkboxEl);
  divEl.appendChild(textSpanEl);
  divEl.appendChild(buttonEl);

  return divEl;
}

//event functions
function checkBoxHandler(e) {
  let taskIndex = +e.target.dataset.index;
  let task = tasks[taskIndex];
  task.completed = !task.completed;
  saveTasks();
  displayTasks();
}

function removeBtnHandler(e) {
  let taskIndex = +e.target.dataset.index;
  tasks.splice(taskIndex, 1);
  saveTasks();
  displayTasks();
}
