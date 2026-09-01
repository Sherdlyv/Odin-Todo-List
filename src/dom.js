export function createLayout() {
    const layout = document.createElement("div");
    layout.id = "container";

   
    const sidebar = document.createElement('div');
    sidebar.classList.add("sidebar");

   
    const sidebarTitle = document.createElement('h2');
    sidebarTitle.textContent = "Projects";
    sidebar.appendChild(sidebarTitle);

    
    const filters = ["All task", "Today", "This week"];
    filters.forEach(text => {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add("btn-nav");
        // dataset utile pour savoir sur quel bouton l'utilisateur clique plus tard
        button.dataset.filter = text.toLowerCase().replace("'", ""); 
        sidebar.appendChild(button);
    });



   
    const main = document.createElement("div");
    main.classList.add("main");

    
    const title = document.createElement("div");
    title.classList.add("title");
    const mainTitleText = document.createElement('h1');
    mainTitleText.id = "current-view-title";
    mainTitleText.textContent = "My Task";
    title.appendChild(mainTitleText);

    
    const task = document.createElement("div");
    task.classList.add("task-area");

    const addTaskBtn = document.createElement('button');
    addTaskBtn.id = "add-task-btn";
    addTaskBtn.textContent = "+ Add a task";
    
    
    const todoListContainer = document.createElement('div');
    todoListContainer.id = "todo-list";

    task.appendChild(addTaskBtn);
    task.appendChild(todoListContainer);


  
    main.appendChild(title); 
    main.appendChild(task);  

    layout.appendChild(sidebar);
    layout.appendChild(main);

    return layout;
}
