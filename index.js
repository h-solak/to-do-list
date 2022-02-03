let taskList = [];
let counter = 0;
let ul = document.querySelector("ul");

const addTask = () => {
    const currentTask = document.querySelector("#input-value").value;
    taskList[counter] = currentTask;

    //a function that doesn't let the user to enter the same task again!
    //CURRENTLY BUGGED -- IF WE DELETE A TASK, WE CANNOT ADD THAT TASK AGAIN
    //TO FIX IT, YOU HAVE TO DELETE THAT TASK FROM THE TASKS ARRAY
    const checkInclude = () => {
        for (let i = 0; i < taskList.length - 1; i++) {
            if ((taskList[i] == taskList[taskList.length - 1])) {
                document.querySelector("h5").innerHTML = "You already have that task!!!";
                document.querySelector("h5").classList.add("shake");

                return false;
            }
        }
        document.querySelector("h5").classList.remove("shake");
        document.querySelector("h5").innerHTML = "";
        return true;
    }

    if ((currentTask != "") && (checkInclude())) {
        createTask(currentTask)
        document.querySelector("#input-value").value = ""; //empty inside
    }
}

const createTask = (currentTask) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(currentTask)); //makes text from input field the li text
    ul.appendChild(li); //adds li to ul

    /*I am new to this concept, so I got most of the lines between 38-59 from this link https://codepen.io/JohnPaulFich/pen/MXmzzM */
    // because it's in the function, it only adds it for new items
    function taskDone() {
        li.classList.toggle("done");
    }
    li.addEventListener("click", taskDone);

    //creating delete button
    const deleteButton = document.createElement("i");
    deleteButton.classList.add("fa-regular")
    deleteButton.classList.add("fa-trash-can")

    //adding the delete button to the task
    var dBtn = document.createElement("button");
    dBtn.appendChild(deleteButton);
    li.appendChild(dBtn);
    dBtn.addEventListener("click", deleteTask);

    function deleteTask() {
        //hiding the deleted task - not deleting, just hiding it
        li.classList.add("delete")

        //removing the deleted task from the tasks array
        let deletedItem = li.innerHTML.slice(0, -18); //getting task from task<button>X</button>
        const index = taskList.indexOf(deletedItem);
        if (index > -1) {
            taskList.splice(index, 1);
        }
    }

    counter++;
}


/* NOT RELATED TO THE APP */
//DYNAMIC FAVICON FOR BOTH DARK THEME AND LIGHT THEME
lightSchemeIcon = document.querySelector('link#light-scheme-icon');
darkSchemeIcon = document.querySelector('link#dark-scheme-icon');

function onUpdate() {
    if (matcher.matches) {
        lightSchemeIcon.remove();
        document.head.append(darkSchemeIcon);
    } else {
        document.head.append(lightSchemeIcon);
        darkSchemeIcon.remove();
    }
}
matcher = window.matchMedia('(prefers-color-scheme: dark)');
matcher.addListener(onUpdate);
onUpdate();