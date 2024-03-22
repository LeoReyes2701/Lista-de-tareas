const inputIcon = document.querySelector('#input-icon');
const taskList = document.querySelector('#task-list');
const inputTask = document.querySelector('#input-task')


// Creamos la funcion para anadir la tarea a la lista
const addTaskToList = () => {
    const taskText = inputTask.value.trim();

    if (taskText !== '' ) {
        //Creamos un elemento nuevo para la lista
        const taskItem = document.createElement('li')
        //Le asignamos la classe tasks a taskItem *********
        taskItem.classList.add('tasks');

            taskItem.innerHTML=`
            <button class="x-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            </button>
                <p class="text-task-container">${taskText}</p>
            <button class="check-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </button>
        `;

        // Agregamos la tarea a la lista
        taskList.appendChild(taskItem);

        document.querySelector("#input-task").reset();

    }   else {
    }   alert('Por favor, escribe una tarea valida.');
    
};


//Esto es un evento para que cuando se haga click en el boton del input se ejecute la funcion
inputIcon.addEventListener('click', addTaskToList)