document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');

    // Load saved tasks from local storage
    loadTasks();

    // Add task button event listener
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(text) {
        const li = document.createElement('li');
        li.textContent = text;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', saveTasks);
        li.prepend(checkbox);
        taskList.appendChild(li);
        saveTasks();
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => ({
            text: li.textContent.replace('✓', '').trim(),
            completed: li.firstChild.checked
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.text));
        taskList.children.forEach((li, index) => {
            li.firstChild.checked = tasks[index]?.completed || false;
        });
    }
});
