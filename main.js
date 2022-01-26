import { removeTags, convertMinsToHrsMins, tellmeAllTasks, array_move } from "./src/utils";
import { getTasks, saveTask, saveTasks, updateTask, deleteTask, toogleTask, editTask } from "./src/storage";
import { createNewTaskElement, cleanContent } from "./src/dom";
import { arrayMoveImmutable } from "array-move";
import "./style.css";
// DOM Selection
const tasksContainer = document.getElementById("tasks");
const input = document.getElementById("todo_input");
const hours = document.getElementById('time_input_hours');
const saveButton = document.getElementById("save_todo");
const sayTasksBtn = document.querySelector("#tellmethetasks");
const minutes = document.getElementById("time_input_minutes");
// SET THE TITLE
document.getElementById("title").textContent = `
Tareas que completar hoy:  ${new Date().toDateString()} 📝
`;


// Drag and drop
const dragged = (index) => (event) => {
  event.dataTransfer.setData("index", index);
}

const target = (index) => (event) => {
  const tasks = getTasks();
  const draggedIndex = parseFloat(event.dataTransfer.getData("index"));
  const movedTasks = arrayMoveImmutable(tasks, draggedIndex, index);
  saveTasks(movedTasks);
  updateState();
}

// DISPLAY TASKS
function updateState() {
  console.log("updating...")
  let taskElements = []; 
  cleanContent(tasksContainer)
  const currentTasks = getTasks();
  for (let task of currentTasks) {
    let newTask = createNewTaskElement({task, updateState, container: tasksContainer});
    taskElements.push(newTask);
  }

  // Event listeners for drag and drop
  for (let index = 0; index < taskElements.length; index++) {
    taskElements[index].ondragstart = dragged(index);
    taskElements[index].ondragover = e=>e.preventDefault();
    taskElements[index].ondrop = target(index);
  }
}
updateState();



// SAVE TASK FUNCTIONALITY
saveButton.addEventListener("click", ()=>{
  if(!input.value) return;
  const [h, m] = convertMinsToHrsMins(parseFloat(minutes.value)||0);
  const newHours = (parseFloat(hours.value) + h);
  console.log("new hours", newHours, parseFloat(hours.value), h)

  input.value && saveTask(updateState)({
    name: input.value,
    hours: newHours,  
    minutes: m
  });
  input.value = "";
  hours.value = 0;
  minutes.value = 0;
  updateState();
})


// BUTTON TO LISTEN TO ALL TASKS
sayTasksBtn.onclick = ()=>tellmeAllTasks(getTasks());
