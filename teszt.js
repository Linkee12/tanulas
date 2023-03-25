let input = document.getElementById("inputlist");
let button = document.getElementById("button");
let todo = document.getElementById("todo");
let editing = false;
const db = {
  add: function (title) {
    const data = localStorage.getItem("list");
    if (data === null) {
      localStorage.setItem("list", title + ";");
    } else {
      localStorage.setItem("list", data + title + ";");
    }
  },
  delete: function (id) {
    let asd = db.get().filter((i, idx) => idx != id);
    localStorage.setItem("list", asd.join(";"));
  },
  get: function () {
    const todoList = localStorage.getItem("list");
    if (todoList != null) {
      return todoList.split(";");
    } else {
      return [];
    }
  },
  update: function (id, title) {
    let asd = db.get();
    asd[id] = title;
    localStorage.setItem("list", asd.join(";"));
  },
};
const ui = {
  createTodoItem: function (i, todoList) {
    const textdiv = document.createElement("div");
    const todoElement = document.createElement("div");
    const content = i + "." + todoList[i] + "";
    textdiv.classList = "textdiv";
    if (editing === i) {
      todoElement.classList = "line editing";
    } else {
      todoElement.classList = "line";
    }
    const newContent = document.createTextNode(content);
    todoElement.appendChild(textdiv);
    textdiv.appendChild(newContent);
    const deleteButton = ui.createDeleteButton(i);
    const editButton = ui.createEditButton(i);
    todoElement.append(editButton);
    todoElement.append(deleteButton);

    return todoElement;
  },

  createDeleteButton: function (id) {
    const del = document.createElement("button");
    del.id = id + "del";
    del.classList = "del";
    del.appendChild(ui.createTrashIcon());
    del.addEventListener("click", function () {
      if (editing === false) {
        db.delete(id), render();
      }
    });
    return del;
  },

  createEditButton: function (i) {
    const editdiv = document.createElement("button");
    editdiv.id = i + "edit";
    editdiv.classList = "edit";
    editdiv.appendChild(ui.createEditIcon());
    editdiv.addEventListener("click", function () {
      let old = db.get();
      input.value = old[i];
      editing = i;
      input.focus();
      render();
    });
    return editdiv;
  },

  createTrashIcon: function () {
    const remove = new Image(40, 40);
    remove.src = "del.png";
    return remove;
  },
  createEditIcon: function () {
    const edit = new Image(40, 40);
    edit.src = "edit.png";
    return edit;
  },
};
render();

input.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    if (editing !== false) {
      db.update(editing, input.value);
      render();
      input.value = "";
      editing = false;
      document.getElementsByClassName("editing")[0].classList = "line";
    } else {
      kalmo();
    }
  }
});

button.addEventListener("click", function () {
  teszt.innerHTML = "";
  localStorage.clear();
});

function kalmo() {
  db.add(input.value);
  input.value = "";
  render();
}

function render() {
  teszt.innerHTML = "";
  const todoList = db.get();

  for (let i = 0; i < todoList.length - 1; i++) {
    insertTodoItem(ui.createTodoItem(i, todoList), i, todoList);
  }
}

function insertTodoItem(todoElement) {
  document.getElementById("teszt").append(todoElement);
}
function exchange(array, index, newelement) {
  array[index] = newelement;
}
