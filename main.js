const input = document.querySelector('input');
const addBtn = document.querySelector('.btn-add');
const ul = document.querySelector('ul');
const empty = document.querySelector('.empty');

// Cargar las tareas guardadas en el localStorage al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = createTaskElement(task);
        ul.appendChild(li);
    });
});

addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const text = input.value;

    if (text !== '') {
        const li = createTaskElement(text);
        ul.appendChild(li);
    
        input.value = "";
        empty.style.display = "none";

        saveTasksToLocalStorage();
    }
});

function createTaskElement(text) {
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = text;

    li.appendChild(p);
    li.appendChild(addDeleteBtn());

    return li;
}

function addDeleteBtn() {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "x";
    deleteBtn.className = "btn-delete";

    deleteBtn.addEventListener('click', (e) => {
        const item = e.target.parentElement;
        ul.removeChild(item);

        if (ul.children.length === 0) {
            empty.style.display = "block";
        }

        saveTasksToLocalStorage();
    });

    return deleteBtn;
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(ul.children).map(li => li.firstChild.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
