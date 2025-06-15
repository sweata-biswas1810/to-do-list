 const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const taskCounter = document.getElementById("task-counter");
    const progressLine = document.getElementById("progress-line");
    const congratsMsg = document.getElementById("congrats-msg");
    const newTaskBtn = document.getElementById("new-task-btn");

    const filterAll = document.getElementById("filter-all");
    const filterActive = document.getElementById("filter-active");
    const filterCompleted = document.getElementById("filter-completed");

    let tasks = [];

    function updateTasks() {
      taskList.innerHTML = "";
      let completedCount = 0;
      const filter = document.querySelector(".filter-buttons .active").id;

      tasks.forEach((task, index) => {
        if ((filter === "filter-active" && task.completed) ||
            (filter === "filter-completed" && !task.completed)) return;

        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onchange = () => {
          task.completed = !task.completed;
          updateTasks();
        };

        const span = document.createElement("span");
        span.textContent = task.text;

        const editBtn = document.createElement("button");
        editBtn.innerHTML = "✏️";
        editBtn.onclick = () => {
          const newText = prompt("Edit task:", task.text);
          if (newText) {
            task.text = newText;
            updateTasks();
          }
        };

        const delBtn = document.createElement("button");
        delBtn.innerHTML = "🗑️";
        delBtn.onclick = () => {
          tasks.splice(index, 1);
          updateTasks();
        };

        li.append(checkbox, span, editBtn, delBtn);
        taskList.appendChild(li);

        if (task.completed) completedCount++;
      });

      taskCounter.textContent = `${completedCount} / ${tasks.length}`;
      const progress = tasks.length === 0 ? 0 : (completedCount / tasks.length) * 100;
      progressLine.style.width = `${progress}%`;

      if (tasks.length > 0 && completedCount === tasks.length) {
        congratsMsg.classList.remove("hidden");
        newTaskBtn.classList.remove("hidden");
      } else {
        congratsMsg.classList.add("hidden");
        newTaskBtn.classList.add("hidden");
      }
    }

    addTaskBtn.onclick = () => {
      const text = taskInput.value.trim();
      if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = "";
        updateTasks();
      }
    };

    newTaskBtn.onclick = () => {
  tasks = []; // Clear all existing tasks
  taskInput.value = "";
  updateTasks();
  taskInput.focus(); // Focus on the input field
};


    [filterAll, filterActive, filterCompleted].forEach(button => {
      button.onclick = () => {
        document.querySelectorAll(".filter-buttons button").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        updateTasks();
      };
    });

    updateTasks();