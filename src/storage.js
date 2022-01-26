import { createId } from "./utils";

const input = document.getElementById("todo_input");
const hours = document.getElementById('time_input_hours');
const minutes = document.getElementById("time_input_minutes");

// INTERACTION WITH LOCALSTORAGE
export const getTasks = ()=> {
  try {
    return JSON.parse(localStorage.getItem("tasks"))||[]
  }catch(err){
    console.log(err);
    return [];
  }
};
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }catch(err){
    console.log(err);
    localStorage.removeItem("tasks")
  }
};

export const saveTask = (updateState)=> ({name, hours, minutes}) => {
  const id = createId();
  let tasks = getTasks();
  if (tasks) {
    tasks.push({id, name, hours, minutes, checked: false});
    saveTasks(tasks);
  }else {
    tasks = [{id, name, hours, minutes}];
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
  updateState()
}
export const updateTask = (updateState)=> (newTask) => {
  let tasks = getTasks();
  tasks = tasks.map(task=>{
    if (task.id === newTask.id) return newTask;
    return task;
  });
  saveTasks(tasks);
  updateState();
}

export const deleteTask = (updateState) => (id) => {
  let tasks = getTasks();
  tasks = tasks.filter(task => task.id != id);
  saveTasks(tasks);

  updateState();
}

export const toogleTask = (id) => {
  let tasks = getTasks();
  let thisTask = tasks.find(task=> task.id === id);
  thisTask.checked = !thisTask.checked;
  updateTask(thisTask);
}

export const editTask = (updateState) => (id) => {
  let tasks = getTasks();
  const taskToEdit = tasks.find(task => task.id === id);

  input.value = taskToEdit?.name;
  hours.value = taskToEdit?.hours;
  minutes.value = taskToEdit?.minutes

  tasks = tasks.filter(task => task.id != id);
    saveTasks(tasks);

  updateState();
}