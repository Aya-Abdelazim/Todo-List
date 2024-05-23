const inputName = document.querySelector('.js-name');
const inputDate = document.querySelector('.js-date');
const button = document.querySelector('.js-btn');
const list = document.querySelector('.js-todo');

const todoList = JSON.parse(localStorage.getItem('todoList')) || [
  {
    name: 'make dinner',
    date: '5-10-2024',
  },
];

renderTodoList();

function renderTodoList() {
  let todoListHtml = '';

  todoList.forEach(function (todoObject) {
    const { name, date } = todoObject;
    const html = `
  <input type="checkbox" class="checkbox">
  <div class="name">${name}</div>
  <div class="date">${date}</div>
  <button class="delete-btn">Delete</button>
  `;

    todoListHtml += html;
  });

  list.innerHTML = todoListHtml;

  document
    .querySelectorAll('.delete-btn')
    .forEach(function (deleteButton, index) {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
      });
    });

  saveToStorage();
}

function addTodo() {
  const name = inputName.value;
  const date = inputDate.value;

  todoList.push({ name, date });

  inputName.value = '';

  renderTodoList();
  saveToStorage();
}

button.addEventListener('click', () => {
  addTodo();
});

inputName.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}
