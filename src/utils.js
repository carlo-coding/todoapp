export function removeTags(str) {
    if (!str) return "";
    return str.replace( /(<([^>]+)>)/ig, '');
}
export function choose (items) {
  return items[Math.floor(Math.random()*items.length)];
}

let luegos = ["después", "más tarde", "seguidamente", "posteriormente", "enseguida", "más adelante"];

export function tellmeAllTasks(tasks){
    const taskNames = tasks.map(tsk=>tsk.name);
    let message = "Primero ";
    let msg = new SpeechSynthesisUtterance();
    msg.lang = "es Es";
    for (let i = 0; i < taskNames.length; i++) {
        let isLast = i === (taskNames.length - 1);
        let isPreLast = i === (taskNames.length - 2)
    
        message += (isLast && taskNames.length > 1)?" Por último":"";
        message += " "+taskNames[i];
        message += isPreLast?"":(isLast)?"":" "+choose(luegos);
    
    }
    msg.text = message;
    window.speechSynthesis.speak(msg);
}

// FUNTION TO CREATE ID
export const createId = ()=> "id" + Math.random().toString(16).slice(2);


export function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

export function convertMinsToHrsMins(minutes) {
    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    return [h, m];
  }