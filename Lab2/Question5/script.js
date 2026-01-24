let tasks = [];
let currentFilter = "all";

function addTask() {
    const taskText = document.getElementById("taskInput").value;
    const dueDate = document.getElementById("dueDate").value;

    if (taskText === "" || dueDate === "") {
        alert("Please enter task and due date");
        return;
    }

    const task = {
        text: taskText,
        due: new Date(dueDate),
        completed: false
    };

    tasks.push(task);
    sortTasks();
    displayTasks();

    document.getElementById("taskInput").value = "";
    document.getElementById("dueDate").value = "";
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "pending") return !task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span onclick="toggleTask(${index})">
                ${task.text} 
                <br><small>Due: ${task.due.toDateString()}</small>
            </span>
            <button onclick="deleteTask(${index})">X</button>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function filterTasks(type) {
    currentFilter = type;
    displayTasks();
}

function sortTasks() {
    tasks.sort((a, b) => a.due - b.due);
}
