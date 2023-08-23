 document.addEventListener('DOMContentLoaded', function() {
    let submit = document.getElementById('add');
    let addedTask = document.getElementById('input');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    submit.onclick = function() {
      let newTask = addedTask.value;
        if (newTask === '') {
            window.alert("Please enter a valid task.");
            return;}
      if (tasks.length<12){
       
        tasks.push(newTask);
        addedTask.value = '';
        saveTasks();
        showTask();
        console.log(tasks);
    }else {
      window.alert("You have reached the maximum number of active tasks. Please focus on your current tasks.")}
    };

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function showTask() {
        let list = '';

        for (let i = 0; i < tasks.length; i++) {
            list += `<li>${tasks[i]} <button class="delete-btn" data-index="${i}">done/delete</button></li>`;
        }

        document.getElementById('list').innerHTML = list;

        // Add event listeners to delete buttons
        let deleteButtons = document.getElementsByClassName('delete-btn');
        for (let i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].addEventListener('click', function(event) {
                deleteTask(event);
            });
        }
    }

    function deleteTask(event) {
        let index = event.target.getAttribute('data-index');
        tasks.splice(index, 1);
        saveTasks();
        showTask();
        console.log(tasks);
    }

    showTask();
});