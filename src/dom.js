

// pause &#x23F8;

import { updateTask, toogleTask, editTask, deleteTask } from "./storage";

const timeLeft = count => `${Math.floor(count/60)}m | ${count-(Math.floor(count/60)*60)}s left`

function countDown({hours, minutes, taskElement, task, updateState}) {
    const playBtn = taskElement.querySelector(".play");
    const timeContainer = taskElement.querySelector(".time");

    let seconds = (hours*60*60+minutes*60);
    let count = seconds;

    playBtn.textContent = "";

    timeContainer.innerHTML = timeLeft(count);
    const interval = setInterval(()=> {
        // update dom with the count as long as count >= 0
        if (count > 0) {
            count -= 1;
            timeContainer.innerHTML = timeLeft(count);
        }
    }, 1000);
    setTimeout(()=> {
        // Play a sound, clear interval and change dom
        clearInterval(interval);
        timeContainer.innerHTML = `its done`;
        const audio = new Audio("./bell.mp3");
        audio.play();
        updateTask(updateState)({...task, checked: true})
    }, seconds*1000)
}

export function createNewTaskElement({
        task, 
        container,
        updateState
    }) {

    const divConteiner = document.createElement("div");
    divConteiner.setAttribute("class", "todo");
    divConteiner.setAttribute("style", `background:${task.checked?"rgba(0,0,0,.05)":"#FFF"}`);

    const checkButton = document.createElement("input");
    checkButton.setAttribute("type", "checkbox");
    checkButton.setAttribute("class", "checkbox");
    checkButton.checked = task.checked
    checkButton.onchange = ()=>updateTask(updateState)({...task, checked: checkButton.checked});

    const text = document.createElement("p");
    text.setAttribute("style", `color:${task.checked?"rgba(0,0,0,.5)":"black"};
    text-decoration:${task.checked?"line-through":"none"};
    margin: auto;`);
    text.textContent = task.name;

    const time = document.createElement("span");
    time.setAttribute("class", "time");
    time.textContent = task.checked?"its done":`${parseFloat(task.hours)||0} hrs | ${parseFloat(task.minutes)||0} m`;

    let playButton = document.createElement("span");
    if (!task.checked) {
        // button to play tempo
        playButton = document.createElement("button");
        playButton.setAttribute("class", "play");
        playButton.onclick = ()=>countDown({
            hours: task.hours,
            minutes: task.minutes,
            taskElement: divConteiner,
            updateState,
            task
        });
        playButton.innerHTML = "&#9654;";
    }

    const editButton = document.createElement("button");
    editButton.setAttribute("class", "edit");
    editButton.onclick = ()=>editTask(updateState)(task.id);
    editButton.innerHTML = "&#9998;";

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete");
    deleteButton.onclick = ()=>deleteTask(updateState)(task.id);
    deleteButton.innerHTML = "&#x1f7ab;";

    divConteiner.appendChild(checkButton);
    divConteiner.appendChild(text);
    divConteiner.appendChild(playButton);
    divConteiner.appendChild(time);
    divConteiner.appendChild(editButton);
    divConteiner.appendChild(deleteButton);

    divConteiner.draggable = true;

    if (container) {
        container.appendChild(divConteiner);
    }

    return divConteiner;   
}

export function cleanContent(element){
    element.innerHTML = "";
}