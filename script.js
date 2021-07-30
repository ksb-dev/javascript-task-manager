// Define UI vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('ul');
const clearBtn = document.querySelector('.clear');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // 6. DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event
    form.addEventListener('submit', addTask);

    // Remove task event
    taskList.addEventListener('click', removeTask);

    // Clear task event
    clearBtn.addEventListener('click', clearTasks);

    // Filter event
    filter.addEventListener('keyup', filterTasks);
}

// 6. Get Tasks from local storage

function getTasks() { 
    
    let tasks;

    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
    // Create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'list';

    // Create text node
    const textNode = document.createTextNode(task);

    // Append text node to element
    li.appendChild(textNode);

    //Create a link element
    const link = document.createElement('a');

    // Add class
    link.className = 'delete';

    // Add icon to HTML
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';

    // Append link to element
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
    })
}

// 1.Add Task

function addTask(e) {
    
    if(taskInput.value === ''){
        alert("Add a task");
        return;
    }

    // Create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'list';

    // Create text node
    const textNode = document.createTextNode(taskInput.value);

    // Append text node to element
    li.appendChild(textNode);

    //Create a link element
    const link = document.createElement('a');

    // Add class
    link.className = 'delete';

    // Add icon to HTML
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';

    // Append link to element
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // 5. Store to local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    e.preventDefault();

}

// 2. Remove Task

function removeTask(e) {
    e.preventDefault();

    if(e.target.parentElement.classList.contains('delete')){
        if(confirm("Are you sure")) {
            e.target.parentElement.parentElement.remove();

            // 7. Remove from local storage

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// 7. Remove from local storage

function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 3. Clear Tasks

function clearTasks(){
    //taskList.innerHTML = ''; 

    confirm("Are you sure?");
    
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // 8. Clear all task from local storage
    clearAllTasksFromLocalStorage();
}

// 8. Clear all task from local storage
function clearAllTasksFromLocalStorage() {
    localStorage.clear();   
} 

// 4. Filter Tasks

function filterTasks(e) {

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        const item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'flex';
        }
        else{
            task.style.display = 'none';
        }
    });
}

// 5. Store to lacal storage

function storeTaskInLocalStorage(task) {
    let tasks;

    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}