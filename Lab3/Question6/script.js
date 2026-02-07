var TaskStatus;
(function (TaskStatus) {
    TaskStatus["Pending"] = "pending";
    TaskStatus["Completed"] = "completed";
})(TaskStatus || (TaskStatus = {}));

var Task = /** @class */ (function () {
    function Task(text, dueDate) {
        this.text = text;
        this.dueDate = dueDate;
        this.status = TaskStatus.Pending;
    }
    Task.prototype.toggleStatus = function () {
        this.status =
            this.status === TaskStatus.Pending
                ? TaskStatus.Completed
                : TaskStatus.Pending;
    };
    return Task;
}());

var tasks = [];
var currentFilter = "all";

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var dueDateInput = document.getElementById("dueDate");
    if (taskInput.value === "" || dueDateInput.value === "") {
        alert("Please enter task and due date");
        return;
    }
    var task = new Task(taskInput.value, new Date(dueDateInput.value));
    tasks.push(task);
    sortTasks();
    displayTasks();
    taskInput.value = "";
    dueDateInput.value = "";
}

function displayTasks() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    var filteredTasks = tasks.filter(function (task) {
        if (currentFilter === "completed")
            return task.status === TaskStatus.Completed;
        if (currentFilter === "pending")
            return task.status === TaskStatus.Pending;
        return true;
    });
    filteredTasks.forEach(function (task, index) {
        var li = document.createElement("li");
        if (task.status === TaskStatus.Completed) {
            li.classList.add("completed");
        }
        li.innerHTML = "\n            <span onclick=\"toggleTask(" + index + ")\">\n                " + task.text + "\n                <br><small>Due: " + task.dueDate.toDateString() + "</small>\n            </span>\n            <button onclick=\"deleteTask(" + index + ")\">X</button>\n        ";
        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].toggleStatus();
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
    tasks.sort(function (a, b) {
        return a.dueDate.getTime() - b.dueDate.getTime();
    });
}
