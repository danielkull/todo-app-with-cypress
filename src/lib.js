export function initTodoApp() {
  /* ====== START =====*/

  let todos = [];
  const deleteTodosButton = document.querySelector("#delete-todos");
  const addTodoBtn = document.querySelector("#add-todo");
  const todoListEl = document.querySelector("#todo-list");

  //   Start: Storage Handler
  function readTodosFromLocalStorage() {
    const todosFromStorage = localStorage.getItem("todos");
    if (todosFromStorage !== null) {
      todos = JSON.parse(todosFromStorage);
    }
  }
  readTodosFromLocalStorage();

  function saveTodosToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  //   End: Storage Handler

  //   Start: Create new Todo
  function addNewTodo() {
    const newTodoEl = document.querySelector("#new-todo");
    const newTodoText = newTodoEl.value.trim();

    // length check
    if (emptyToDoText(newTodoText)) {
      return;
    }

    // duplicate check
    if (isDuplicate(newTodoText, todos)) {
      return;
    }

    const newTodo = {
      todo: newTodoText,
      done: false,
    };
    todos.push(newTodo);

    renderTodos();
    saveTodosToLocalStorage();

    newTodoEl.value = "";
  }
  addTodoBtn.addEventListener("click", addNewTodo);
  //   End: Create new Todo

  // Start: Initialise / update App
  function renderTodos() {
    const todoListEl = document.querySelector("#todo-list");
    todoListEl.innerHTML = "";

    todos.forEach(function (currentTodo) {
      const newTodoLiEl = document.createElement("li");

      const todoCheckboxEl = document.createElement("input");
      todoCheckboxEl.setAttribute("type", "checkbox");
      todoCheckboxEl.checked = currentTodo.done;
      newTodoLiEl.appendChild(todoCheckboxEl);

      const textNode = document.createTextNode(currentTodo.todo);
      newTodoLiEl.append(textNode);

      if (isTodoDone(currentTodo.done)) {
        newTodoLiEl.classList.add("done");
      }

      newTodoLiEl.todo = currentTodo;

      const filterValue = getFilterValue();
      if (isFilterDone(filterValue)) {
        newTodoLiEl.hidden = true;
      }

      todoListEl.appendChild(newTodoLiEl);
    });

    filterTodos();
  }

  renderTodos();
  // End: Initialise / update App

  //  Start: Listen if user checks or unchecks todo task
  todoListEl.addEventListener("change", toggleTodoState);
  function toggleTodoState(event) {
    const checkbox = event.target;
    if (isTodoDone(checkbox.checked)) {
      checkbox.parentElement.classList.add("done");
      checkbox.parentElement.todo.done = true;
    } else {
      checkbox.parentElement.classList.remove("done");
      checkbox.parentElement.todo.done = false;
    }

    saveTodosToLocalStorage();
  }
  //  End: Listen if user checks or unchecks todo task

  //  Start: Listen to Filter selecten and show only suitable todos
  const todoFilterEl = document.querySelector("#todo-filter");
  todoFilterEl.addEventListener("change", filterTodos);
  function filterTodos() {
    const filterValue = getFilterValue();

    const todoListEl = document.querySelector("#todo-list");
    for (let i = 0; i < todoListEl.children.length; i++) {
      const currentTodo = todoListEl.children[i];
      if (isFilterAll(filterValue)) {
        currentTodo.hidden = false;
      } else if (isFilterOpen(filterValue)) {
        currentTodo.hidden = currentTodo.todo.done;
      } else if (isFilterDone(filterValue)) {
        currentTodo.hidden = !currentTodo.todo.done;
      }
    }
  }
  //  End: Listen to Filter selecten and show only suitable todos

  function getFilterValue() {
    return document.querySelector('#todo-filter input[type="radio"]:checked')
      .value;
  }

  function deleteDoneTodos() {
    todos = todos.filter((todo) => todo.done === false);
    saveTodosToLocalStorage();
    renderTodos();
  }
  deleteTodosButton.addEventListener("click", deleteDoneTodos);
}

// Outsourced Funktions

function emptyToDoText(todoText) {
  return todoText.length === 0;
}

function isDuplicate(newTodo, todos) {
  newTodo = newTodo.toLowerCase();
  for (let i = 0; i < todos.length; i++) {
    const currentTodo = todos[i];
    if (currentTodo.todo.toLowerCase() === newTodo) {
      return true;
    }
  }
  return false;
}

function isTodoDone(todo) {
  return todo === true;
}

function isFilterAll(filterValue) {
  return filterValue === "all";
}

function isFilterOpen(filterValue) {
  return filterValue === "open";
}

function isFilterDone(filterValue) {
  return filterValue === "done";
}
