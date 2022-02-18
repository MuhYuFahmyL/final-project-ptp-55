const form_todo = document.querySelector('#todos-form');
const input_todo = document.querySelector('#todos-input');
const tbody_todo = document.getElementById('todo-items').getElementsByTagName('tbody')[0];
let todos = [];

form_todo.addEventListener('submit', function(event) {
  event.preventDefault();
  tambah_aktivitas(input_todo.value);
});

function tambah_aktivitas(item) {
  if (item !== '') {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };
    todos.push(todo);
    simpan_ke_localstorage(todos);
    input_todo.value = '';
  }
}

function show_aktivitas(todos) {
  tbody_todo.innerHTML = `<tr>
    <td colspan="4" style="text-align:center;">Data Not Found</td>
  </tr>`;
  if(todos.length>0){
    tbody_todo.innerHTML = ``;
    todos.forEach(function(item) {
      const checked = item.completed ? 'checked': null;
      const tr = tbody_todo.insertRow();;
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
      tbody_todo.appendChild(tr);
    });
  }
}

function simpan_ke_localstorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  show_aktivitas(todos);
}

function get_From_LocalStorage() {
  const reference = localStorage.getItem('todos');
  if (reference) {
    todos = JSON.parse(reference);
    show_aktivitas(todos);
  }
}

function toggle(id) {
  console.log(id)
  todos.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

  simpan_ke_localstorage(todos);
}

function hapus_aktivitas(id) {
  todos = todos.filter(function(item) {
    return item.id != id;
  });

  simpan_ke_localstorage(todos);
}

get_From_LocalStorage();

tbody_todo.addEventListener('click', function(event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.parentElement.dataset.key);
  }

  if (event.target.classList.contains('delete-button')) {
    hapus_aktivitas(event.target.parentElement.parentElement.dataset.key);
  }
});
