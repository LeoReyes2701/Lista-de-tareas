const inputIcon = document.querySelector('#input-icon');
const taskList = document.querySelector('#task-list');
const inputTask = document.querySelector('#input-task');

const totalContainer = document.querySelector('#total-container');
const completedContainer = document.querySelector('#completed-container');
const incompletedContainer = document.querySelector('#incompleted-container');

// Función para actualizar los contadores
const updateCounters = () => {
    const totalTasks = document.querySelectorAll('.tasks').length;
    const completedTasks = document.querySelectorAll('.task-text-checked').length;
    const incompletedTasks = totalTasks - completedTasks;

    // Actualizar el contenido de los contadores
    totalContainer.textContent = `Total: ${totalTasks}`;
    completedContainer.textContent = `Completado: ${completedTasks}`;
    incompletedContainer.textContent = `Incompleto: ${incompletedTasks}`;
};

// Función para añadir tarea a la lista y guardarla en el almacenamiento local
const addTaskToList = () => {
    const taskText = inputTask.value.trim();

    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.classList.add('tasks');
        taskItem.innerHTML = `
            <button class="x-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            <p class="text-task-container">${taskText}</p>
            <button class="check-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </button>
        `;
        taskList.appendChild(taskItem);

        // Guardar la tarea en el almacenamiento local
        saveTasksToLocalStorage();

        inputTask.value = ''; // Limpiar el input
    } else {
        alert('Por favor, escribe una tarea válida.');
    }
    // Actualizar los contadores después de añadir la tarea
    updateCounters();
};

// Función para guardar las tareas en el almacenamiento local
const saveTasksToLocalStorage = () => {
    const tasks = document.querySelectorAll('.tasks');
    const tasksArray = Array.from(tasks).map(task => task.innerHTML);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
};

// Función para cargar las tareas desde el almacenamiento local
const loadTasksFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('tasks');
            taskItem.innerHTML = task;
            taskList.appendChild(taskItem);
        });
    }
};

// Cargar las tareas almacenadas al cargar la página
loadTasksFromLocalStorage();

// Evento clic en el icono de entrada para añadir tarea
inputIcon.addEventListener('click', addTaskToList);

// Evento clic en la lista de tareas
taskList.addEventListener('click', (event) => {
    const deleteBtn = event.target.closest('.x-button');
    const checkBtn = event.target.closest('.check-button');

    // Verificar si se hizo clic en el botón 'x'
    if (deleteBtn !== null) {
        deleteBtn.closest('li').remove();
        saveTasksToLocalStorage(); // Guardar las tareas actualizadas

    // Verificar si se hizo clic en el botón de verificación
    } else if (checkBtn !== null) {
        const taskTextP = checkBtn.previousElementSibling;
        taskTextP.classList.toggle('task-text-checked');
        saveTasksToLocalStorage(); // Guardar las tareas actualizadas
    }
    updateCounters();

});
