let taskList = [];
let counter = 0;
let ul = document.querySelector("ul");

$(document).ready(function () {
  if (localStorage.getItem("taskItem")) {
    // liste localstorage belleğinde varsa oku
    document.getElementById("allTasks").innerHTML =
      localStorage.getItem("taskItem");
    document.getElementById("clear-all").style.display = "block";
  } else {
    document.getElementById("allTasks").innerHTML = "";
    document.getElementById("clear-all").style.display = "none";
  }
});

const addTask = () => {
  const currentTask = document.querySelector("#input-value").value.trim();

  if (currentTask != "") {
    taskList.push(currentTask);
    document.querySelector("#input-value").value = ""; //empty inside
    createTask(currentTask);
    document.getElementById("clear-all").style.display = "block";
  }
};

const createTask = (currentTask) => {
  document.querySelector("ul").innerHTML +=
    '<li onclick="taskDone(this)">' +
    currentTask +
    '<span onclick="deleteTask(this.parentNode)"><i class="fa-regular fa-trash-can"></i></span></li>';

  localStorage.setItem(
    "taskItem",
    document.getElementById("allTasks").innerHTML
  );
};

function taskDone(id) {
  id.classList.toggle("done");
  localStorage.setItem(
    "taskItem",
    document.getElementById("allTasks").innerHTML
  );
}

function deleteTask(id) {
  document.querySelector("ul").removeChild(id);
  localStorage.setItem(
    "taskItem",
    document.getElementById("allTasks").innerHTML
  );
}

function clearStorage() {
  localStorage.clear();
  window.location.reload();
}

document.getElementById("clear-all").onclick = () => {
  clearStorage();
};

//---------------------------------------------------------------------//
//DYNAMIC FAVICON FOR BOTH DARK THEME AND LIGHT THEME
lightSchemeIcon = document.querySelector("link#light-scheme-icon");
darkSchemeIcon = document.querySelector("link#dark-scheme-icon");

function onUpdate() {
  if (matcher.matches) {
    lightSchemeIcon.remove();
    document.head.append(darkSchemeIcon);
  } else {
    document.head.append(lightSchemeIcon);
    darkSchemeIcon.remove();
  }
}
matcher = window.matchMedia("(prefers-color-scheme: dark)");
matcher.addListener(onUpdate);
onUpdate();
