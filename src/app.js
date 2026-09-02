import { createLayout, renderProjects, renderTasks } from "./dom.js";
import './style.css';

class ToDo {
    constructor(title, description, dueDate, priority, notes, checklist, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.project = project || "Default"; 
        this.complete = false; 
    }
}

const myProjects = ["Default", "Work", "Personal"];
const myTodoList = [];

let currentFilter = { type: "time", value: "all" }; 
let editTodoIndex = null; 

function saveToLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(myTodoList));
    localStorage.setItem("projects", JSON.stringify(myProjects));
}

function loadFromLocalStorage() {
    const savedTodos = localStorage.getItem("todoList");
    const savedProjects = localStorage.getItem("projects");

    if (savedProjects) {
        myProjects.length = 0; 
        myProjects.push(...JSON.parse(savedProjects)); 
    }

    if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos);
        myTodoList.length = 0; 
        
        parsedTodos.forEach(t => {
            const todo = new ToDo(t.title, t.description, t.dueDate, t.priority, t.notes, t.checklist, t.project);
            todo.complete = t.complete;
            myTodoList.push(todo);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector('body');
    body.appendChild(createLayout());

    loadFromLocalStorage();
    
    currentFilter = { type: "time", value: "all" };

    renderProjects(myProjects, "Default");
    updateDynamicDisplay();

    const sidebar = document.querySelector(".sidebar");
    const taskModal = document.querySelector("#task-modal");
    const modalTitle = taskModal.querySelector("h2"); 
    const taskBtn = document.querySelector("#add-task-btn");
    const closeModalBtn = document.querySelector("#close-modal-btn");
    const taskForm = document.querySelector("#task-form");
    const addProjectBtn = document.querySelector("#add-project-btn");
    const taskArea = document.querySelector(".task-area");

    sidebar.addEventListener("click", (e) => {
        const allButtons = sidebar.querySelectorAll("button");
        
        if (e.target.classList.contains("filter-btn")) {
            allButtons.forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
            currentFilter = { type: "time", value: e.target.dataset.type };
            updateDynamicDisplay();
        }
        
        if (e.target.classList.contains("project-btn")) {
            allButtons.forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
            currentFilter = { type: "project", value: e.target.dataset.project };
            updateDynamicDisplay();
        }
    });

    taskBtn.addEventListener("click", () => {
        editTodoIndex = null; 
        modalTitle.textContent = "Add New Task";
        taskForm.reset();
        taskModal.showModal();
    });

    closeModalBtn.addEventListener("click", () => {
        taskModal.close();
        taskForm.reset();
        editTodoIndex = null;
    });

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.querySelector("#form-title").value;
        const description = document.querySelector("#form-desc").value;
        const dueDate = document.querySelector("#form-date").value;
        const priority = document.querySelector("#form-priority").value;
        const project = document.querySelector("#form-project").value; 
        const notes = document.querySelector("#form-notes").value;

        if (editTodoIndex !== null) {
            myTodoList[editTodoIndex].title = title;
            myTodoList[editTodoIndex].description = description;
            myTodoList[editTodoIndex].dueDate = dueDate;
            myTodoList[editTodoIndex].priority = priority;
            myTodoList[editTodoIndex].project = project;
            myTodoList[editTodoIndex].notes = notes;
        } else {
            const newTask = new ToDo(title, description, dueDate, priority, notes, [], project);
            myTodoList.push(newTask);
        }

        saveToLocalStorage();
        updateDynamicDisplay();
        taskForm.reset();
        taskModal.close();
        editTodoIndex = null;
    });

    taskArea.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        const filteredList = getFilteredTasks();
        
        if (e.target.classList.contains("delete-task-btn")) {
            const targetTask = filteredList[index];
            const globalIndex = myTodoList.indexOf(targetTask);
            
            if (globalIndex > -1) myTodoList.splice(globalIndex, 1);

            saveToLocalStorage();
            updateDynamicDisplay();
        }

        if (e.target.classList.contains("edit-task-btn")) {
            const targetTask = filteredList[index];
            editTodoIndex = myTodoList.indexOf(targetTask);

            modalTitle.textContent = "Edit Task";

            document.querySelector("#form-title").value = targetTask.title;
            document.querySelector("#form-desc").value = targetTask.description;
            document.querySelector("#form-date").value = targetTask.dueDate;
            document.querySelector("#form-priority").value = targetTask.priority;
            document.querySelector("#form-project").value = targetTask.project;
            document.querySelector("#form-notes").value = targetTask.notes;

            taskModal.showModal();
        }

        if (e.target.classList.contains("toggle-complete-btn")) {
            const targetTask = filteredList[index];
            const globalIndex = myTodoList.indexOf(targetTask);

            if (globalIndex > -1) {
                myTodoList[globalIndex].complete = !myTodoList[globalIndex].complete;
            }

            saveToLocalStorage();
            updateDynamicDisplay();
        }
    });

    addProjectBtn.addEventListener("click", () => {
        const newProjectName = prompt("Enter new project name:");
        if (newProjectName && !myProjects.includes(newProjectName)) {
            myProjects.push(newProjectName);
            saveToLocalStorage(); 
            renderProjects(myProjects, currentFilter.type === "project" ? currentFilter.value : ""); 
        }
    });
});

function getFilteredTasks() {
    const todayStr = new Date().toISOString().split('T')[0];

    if (currentFilter.type === "project") {
        return myTodoList.filter(t => t.project === currentFilter.value);
    }
    
    if (currentFilter.type === "time") {
        if (currentFilter.value === "today") {
            return myTodoList.filter(t => t.dueDate === todayStr);
        }
        if (currentFilter.value === "week") {
            const today = new Date();
            const nextWeek = new Date();
            nextWeek.setDate(today.getDate() + 7);
            
            return myTodoList.filter(t => {
                if (!t.dueDate) return false;
                const taskDate = new Date(t.dueDate);
                return taskDate >= today && taskDate <= nextWeek;
            });
        }
    }
    return myTodoList; 
}

function updateDynamicDisplay() {
    const titleEl = document.querySelector("#view-title");
    if (!titleEl) return;
    
    if (currentFilter.type === "project") {
        titleEl.textContent = `Project: ${currentFilter.value}`;
    } else if (currentFilter.type === "time") {
        titleEl.textContent = currentFilter.value === "all" ? "All Tasks" : 
                              currentFilter.value === "today" ? "Today's Tasks" : "This Week's Tasks";
    } else {
        titleEl.textContent = "All Tasks";
    }
    renderTasks(getFilteredTasks());
}
