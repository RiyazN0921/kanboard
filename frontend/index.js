document.addEventListener('DOMContentLoaded', () => {
    const todoTasks = document.getElementById('todo-tasks');
    const doingTasks = document.getElementById('doing-tasks');
    const doneTasks = document.getElementById('done-tasks');
    const addTaskButton = document.getElementById('add-button');
    const taskTitleInput = document.getElementById('task-title');
    const taskDescriptionInput = document.getElementById('task-description');
  
    
    const initialTasks = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: 'To Do' },
      { id: 2, title: 'Task 2', description: 'Description 2', status: 'Doing' },
      { id: 3, title: 'Task 3', description: 'Description 3', status: 'Done' },
    ];
  

    function createTaskCard(task) {
      const card = document.createElement('div');
      card.classList.add('task-card');
      card.dataset.id = task.id;
      card.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
      `;
  
      card.draggable = true;
  
      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', task.id);
      });
  
      return card;
    }
  
    
    function renderTasks() {
      todoTasks.innerHTML = '';
      doingTasks.innerHTML = '';
      doneTasks.innerHTML = '';
  
      initialTasks.forEach((task) => {
        const card = createTaskCard(task);
  
        if (task.status === 'To Do') {
          todoTasks.appendChild(card);
        } else if (task.status === 'Doing') {
          doingTasks.appendChild(card);
        } else {
          doneTasks.appendChild(card);
        }
      });
    }
  

    renderTasks();
  
    
    function addTask() {
      const title = taskTitleInput.value;
      const description = taskDescriptionInput.value;
  
      if (title && description) {
        const newTask = {
          id: Date.now(), 
          title,
          description,
          status: 'To Do', 
        };
  
        initialTasks.push(newTask);
        renderTasks();
        taskTitleInput.value = '';
        taskDescriptionInput.value = '';
      }
    }
  
    
    addTaskButton.addEventListener('click', addTask);
  
    
    document.querySelectorAll('.column').forEach((column) => {
      column.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
  
      column.addEventListener('drop', (e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('text/plain');
        const task = initialTasks.find((t) => t.id == taskId);
  
        if (task) {
          task.status = column.id; 
          renderTasks();
        }
      });
    });
  });
  