let input = document.getElementById("inputlist");
let button = document.getElementById("button");
let todo = document.getElementById("todo");
let data = localStorage.getItem("list");
render();
input.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    kalmo();
  }
});

button.addEventListener("click", function () {
  todo.innerHTML = "";
  localStorage.clear();
});

function kalmo() {
  if (data === null) {
    data = "";
    data = data + input.value + ";";
  } else {
    data = data + input.value + ";";
  }
  localStorage.setItem("list", data);
  input.value = "";
  todo.innerHTML = "";
  render();
}

function render() {
  let send = localStorage.getItem("list");
  if (send != null) {
    send = send.split(";");

    for (let i = 0; i < send.length - 1; i++) {
      todo.innerHTML += i + "." + send[i] + "<br>";
    }
  }
}
