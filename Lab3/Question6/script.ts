export {};

enum TaskStatus {
    Pending = "pending",
    Completed = "completed"
}

class Task {
    text: string;
    dueDate: Date;
    status: TaskStatus;

    constructor(text: string, dueDate: Date) {
        this.text = text;
        this.dueDate = dueDate;
        this.status = TaskStatus.Pending;
    }

    toggleStatus(): void {
        this.status =
            this.status === TaskStatus.Pending
                ? TaskStatus.Completed
                : TaskStatus.Pending;
    }
}

let tasks: Task[] = [];
let currentFilter: "all" | "completed" | "pending" = "all";

function addTask(): void {
    const taskInput = document.getElementById("taskInput") as HTMLInputElement | null;
    const dueDateInput = document.getElementById("dueDate") as HTMLInputElement | null;

    if (!taskInput || !dueDateInput) return;

    if (taskInput.value === "" || dueDateInput.value === "") {
        alert("Please enter task and due date");
        return;
    }

    const task = new Task(
        taskInput.value,
        new Date(dueDateInput.value)
    );

    tasks.push(task);
    sortTasks();
    displayTasks();

    taskInput.value = "";
    dueDateInput.value = "";
}

function displayTasks(): void {
    const taskList = document.getElementById("taskList") as HTMLUListElement | null;
    if (!taskList) return;

    taskList.innerHTML = "";

    const filteredTasks: Task[] = tasks.filter(task => {
        if (currentFilter === "completed") return task.status === TaskStatus.Completed;
        if (currentFilter === "pending") return task.status === TaskStatus.Pending;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.status === TaskStatus.Completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span onclick="toggleTask(${index})">
                ${task.text}
                <br><small>Due: ${task.dueDate.toDateString()}</small>
            </span>
            <button onclick="deleteTask(${index})">X</button>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(index: number): void {
    tasks[index].toggleStatus();
    displayTasks();
}

function deleteTask(index: number): void {
    tasks.splice(index, 1);
    displayTasks();
}

function filterTasks(type: "all" | "completed" | "pending"): void {
    currentFilter = type;
    displayTasks();
}

function sortTasks(): void {
    tasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
}

(window as any).addTask = addTask;
(window as any).toggleTask = toggleTask;
(window as any).deleteTask = deleteTask;
(window as any).filterTasks = filterTasks;
