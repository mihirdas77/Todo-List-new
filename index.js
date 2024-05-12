let data = [];

function saveData() {
  localStorage.setItem("data", JSON.stringify(data));
}

function loadData() {
  let storedValue = JSON.parse(localStorage.getItem("data"));
  if (storedValue) {
    data = storedValue;
    showData(data);
  }
}

function addOrUpdateTodo() {
  let todoName = document.getElementById("todoName").value.trim();
  let priority = document.getElementById("priority").value;
  if (todoName !== '' && priority !== 'Priority') {
    let existingIndex = findTodoIndex(todoName);
    if (existingIndex !== -1) {
      // Update existing todo
      data[existingIndex].priority = priority;
      saveData();
    } else {
      // Add new todo
      let todo = {
        title: todoName,
        priority: priority,
        completed: false
      };
      data.push(todo);
      saveData();
    }
    showData(data);
    document.getElementById("todoName").value = '';
    document.getElementById("priority").selectedIndex = 0;
  } else {
    confirm("Please fill in the todo name and select priority.");
  }
}

function findTodoIndex(title) {
  return data.findIndex(todo => todo.title === title);
}

function showData(arr) {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  arr.forEach((todo, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td id="td">${todo.title}</td>
      <td>${todo.priority}</td>
      <td>${todo.completed ? 'Completed' : 'Active'}</td>
      <td>
        <button id="btn2" onclick="toggleCompletion(${index})">${todo.completed ? 'Undo' : 'Complete'}</button>
        <button id="btn3" onclick="editTask(${index})">Edit</button>
        <button id="btn4" onclick="deleteTask(${index})">Delete</button>
      </td>
    `;
    taskList.appendChild(tr);
  });
}

function toggleCompletion(index) {
  data[index].completed = !data[index].completed;
  saveData();
  showData(data);
}

function editTask(index) {
  let todo = data[index];
  document.getElementById("todoName").value = todo.title;
  document.getElementById("priority").value = todo.priority;
  deleteTask(index);
}

function deleteTask(index) {
  data.splice(index, 1);
  saveData();
  showData(data);
}

loadData();