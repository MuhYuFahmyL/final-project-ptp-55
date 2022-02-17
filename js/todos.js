const todoForm = document.querySelector('#todos-form');
const todoInput = document.querySelector('#todos-input');
const todoItemsList = document.getElementById('todo-items').getElementsByTagName('tbody')[0];
let todos = [];

todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addTodo(todoInput.value);
});

function addTodo(item) {
  if (item !== '') {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };
    todos.push(todo);
    addToLocalStorage(todos);
    todoInput.value = '';
  }
}

function renderTodos(todos) {
  todoItemsList.innerHTML = `<tr>
    <td colspan="4" style="text-align:center;">Data Not Found</td>
  </tr>`;
  if(todos.length>0){
    todoItemsList.innerHTML = ``;
    todos.forEach(function(item) {
      const checked = item.completed ? 'checked': null;
      const tr = todoItemsList.insertRow();;
      tr.setAttribute('class', 'item');
      tr.setAttribute('data-key', item.id);
      if (item.completed === true) {
        tr.classList.add('checked');
      }
      tr.innerHTML = `
        <td><input type="checkbox" class="checkbox" ${checked}></td>
        <td>${new Date(item.id)}</td>
        <td>${item.name}</td>
        <td><button class="delete-button">Hapus Aktivitas</button></td>
      `;
      todoItemsList.appendChild(tr);
    });
  }
}

function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

function toggle(id) {
  console.log(id)
  todos.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

function deleteTodo(id) {
  todos = todos.filter(function(item) {
    return item.id != id;
  });

  addToLocalStorage(todos);
}

getFromLocalStorage();

todoItemsList.addEventListener('click', function(event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.parentElement.dataset.key);
  }

  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.parentElement.dataset.key);
  }
});