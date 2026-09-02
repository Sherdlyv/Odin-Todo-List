export function createLayout() {
    const layout = document.createElement("div");
    layout.id = "container";

    // --- SIDEBAR ---
    const sidebar = document.createElement('div');
    sidebar.classList.add("sidebar");

    // Section: Time Filters
    const filtersTitle = document.createElement('h2');
    filtersTitle.textContent = "Filters";
    sidebar.appendChild(filtersTitle);

    const filterList = document.createElement('div');
    filterList.id = "time-filters";
    filterList.innerHTML = `
        <button class="filter-btn active" data-type="all">All Tasks</button>
        <button class="filter-btn" data-type="today">Today</button>
        <button class="filter-btn" data-type="week">This Week</button>
    `;
    sidebar.appendChild(filterList);

    // Section: Projects
    const projectsTitle = document.createElement('h2');
    projectsTitle.textContent = "Projects";
    sidebar.appendChild(projectsTitle);

    const projectListContainer = document.createElement('div');
    projectListContainer.id = "project-list";
    sidebar.appendChild(projectListContainer);

    const addProjectBtn = document.createElement('button');
    addProjectBtn.id = "add-project-btn";
    addProjectBtn.textContent = "+ New Project";
    sidebar.appendChild(addProjectBtn);

    // --- MAIN AREA ---
    const main = document.createElement("div");
    main.classList.add("main");

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("title");
    
    const currentViewTitle = document.createElement("h1");
    currentViewTitle.id = "view-title";
    currentViewTitle.textContent = "All Tasks";
    titleContainer.appendChild(currentViewTitle);

    const task = document.createElement("div");
    task.classList.add("task-area");

    const taskBtn = document.createElement("button");
    taskBtn.id = "add-task-btn";
    taskBtn.textContent = "+ Add Task";
    task.appendChild(taskBtn);

    main.appendChild(titleContainer); 
    main.appendChild(task);  

    layout.appendChild(sidebar);
    layout.appendChild(main);

    // --- MODAL DIALOG ---
    const modal = document.createElement("dialog");
    modal.id = "task-modal";
    modal.innerHTML = `
        <form id="task-form" method="dialog">
            <h2>Add New Task</h2>
            <label for="form-title">Title *</label>
            <input type="text" id="form-title" required>
            <label for="form-desc">Description</label>
            <textarea id="form-desc"></textarea>
            <label for="form-date">Due Date</label>
            <input type="date" id="form-date">
            <label for="form-priority">Priority</label>
            <select id="form-priority">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <label for="form-project">Project</label>
            <select id="form-project">
                <!-- Dynamically populated -->
            </select>
            <label for="form-notes">Notes</label>
            <textarea id="form-notes"></textarea>
            <div class="form-buttons">
                <button type="button" id="close-modal-btn">Cancel</button>
                <button type="submit" id="submit-task-btn">Save Task</button>
            </div>
        </form>
    `;
    layout.appendChild(modal);

    return layout;
}

export function renderProjects(projectsArray, activeProject = "") {
    const container = document.querySelector("#project-list");
    if (!container) return;
    container.innerHTML = ""; 

    projectsArray.forEach(projectName => {
        const projectBtn = document.createElement("button");
        projectBtn.classList.add("project-btn");
        if (projectName === activeProject) projectBtn.classList.add("active");
        projectBtn.textContent = projectName;
        projectBtn.dataset.project = projectName;
        container.appendChild(projectBtn);
    });

    populateProjectSelect(projectsArray);
}

export function populateProjectSelect(projectsArray) {
    const select = document.querySelector("#form-project");
    if (!select) return;
    select.innerHTML = "";
    projectsArray.forEach(projectName => {
        const option = document.createElement("option");
        option.value = projectName;
        option.textContent = projectName;
        select.appendChild(option);
    });
}

export function renderTasks(tasksArray) {
    const taskArea = document.querySelector(".task-area");
    const taskBtn = document.querySelector("#add-task-btn");
    taskArea.innerHTML = "";
    taskArea.appendChild(taskBtn);

    if (tasksArray.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.textContent = "No tasks found in this view.";
        emptyMsg.style.color = "gray";
        taskArea.appendChild(emptyMsg);
        return;
    }

    tasksArray.forEach((task, index) => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card", `priority-${task.priority.toLowerCase()}`);
        
        // Ajoute le calque visuel 'completed' si l'état de la tâche est vrai
        if (task.complete) {
            taskCard.classList.add("completed");
        }

        taskCard.innerHTML = `
            <div class="task-left-side">
                <!-- Case à cocher liée à l'index de rendu -->
                <input type="checkbox" class="toggle-complete-btn" data-index="${index}" ${task.complete ? "checked" : ""}>
                
                <div class="task-info">
                    <h3>${task.title}</h3>
                    <p>${task.description || "No description"}</p>
                    <span class="task-date">📅 ${task.dueDate || "No date"}</span>
                    <span class="task-project-tag">📁 ${task.project}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="edit-task-btn" data-index="${index}">Edit</button>
                <button class="delete-task-btn" data-index="${index}">Delete</button>
            </div>
        `;
        taskArea.appendChild(taskCard);
    });
}
