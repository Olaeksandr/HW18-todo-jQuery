'use strict';
const $addTaskForm = $('#addTaskForm');
const $taskNameInput = $('#taskNameInput');
const $taskList = $('#taskList');
const $taskItemTemplate = $('#taskItemTemplate');

const tasksLS = localStorage.getItem('tasks');
let itemsArray = tasksLS ? tasksLS : [];
console.log(tasksLS);

let data = JSON.parse(tasksLS);
data = data ? data : [];
data.forEach(task => { addTask(task) });

$addTaskForm.on('submit', onAddTaskFormSubmit);
$taskList.on('click', onTaskListClick);

function onAddTaskFormSubmit(event) {
    event.preventDefault();
    submitForm();
}


function submitForm() {
    const task = { title: $(taskNameInput).val() };

    console.log(task);
    console.log(itemsArray);

    itemsArray.push(task);
    localStorage.setItem('tasks', JSON.stringify(itemsArray));
    
    addTask(task);
    resetForm();
}

function addTask(task) {
    const newTaskText = $taskItemTemplate.replaceWith(`<div class="task-item u-full-width">${task.title}<span class="delete-btn">X</span></div>`);
    const $newTaskEl = $('.task-item').after(newTaskText);
    $taskList.append($newTaskEl);
}

function resetForm() {
    $(addTaskForm)[0].reset();
}

function onTaskListClick(e) {
    switch (true) {
        case $(e.target).hasClass('task-item'):
            toggleTaskState(e.target);
            break;
        case $(e.target).hasClass('delete-btn'):
            deleteTask(e.target.parentNode);
            break;
    }
}

function deleteTask(el) {
    el.remove();
}

function toggleTaskState(el) {
    $(el).toggleClass('done');
}
