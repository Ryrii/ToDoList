import * as PageTask from "./pageTask.js"

const createElem = (selector, classList, textContent) => {
    const elem = document.createElement(selector)
    if (classList != null) elem.classList.add(classList)
    elem.textContent = textContent
    return elem;
}
export const lineText= (check,text) => {
    if (check.checked === true){
        text.style.textDecoration = "line-through";
        text.style.color = "#666666"
    }
    else{
        text.style.textDecoration = "none";
        text.style.color = "#222222"
    }
}
//INITIALISE LES TACHES 
export const init = async (listId) => {
    const tasks = await getTasks(listId)
    const root = document.querySelector(".tasks")
    root.innerHTML = ""
    if (listId === "") { //PAGE D'ACCEUIL
        root.append(...initHome(tasks))
    } else { //PAGE TACHE
        const listsTask = tasks.Tasks.map((task) => createTask(task, tasks))
        root.append(...listsTask)

    }


}

//INITIALISATION PAGE D'ACCUEIL
const initHome = (list) => {
    const allTasks =[]
    list.forEach(list => {
        // TRIER LES TACHE PAR ID DANS SERVEUR MAL TRIER QUAND CHECKED
        list.Tasks.sort(function (a, b) {
                return a.id - b.id;
            })
        // CREER LES TACHES POUR QU'IL Y AIT '1 sur 4', '2 sur 4' ...
        const listTasks = list.Tasks.map((task) => createTask(task, list))
        // RECUPERER SEULEMENT CE QUI ONT ECHEANCE
        listTasks.forEach(task => {
            if(task.dataset.dueDate!=='à définir'){
                allTasks.push(task)
            }
        });
    })
    //TRIER PAR DATE
    allTasks.sort(function (a, b) {
        return a.dataset.dueDate.replaceAll('-', '') - b.dataset.dueDate.replaceAll('-', '');
    })
    return allTasks
}

//RECUPERE LES TACHES D'UNE LISTE DU SERVEUR 
export const getTasks = async (listId)=>{
    try {
        const response = await fetch("http://localhost:5000/list/" + listId, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        })
        const tasks = await response.json()
        return tasks 

    } catch (err) {
        console.error(err)
    }
}
//TACHES
export const createTask = (task, list) => {
    const nbTask = list.Tasks.length
    let taskPlace
    list.Tasks.forEach((elem, i) => {
        if (elem.id === task.id) {
            taskPlace = i + 1
        }
    })
    if (task.dueDate != null) {
        task.dueDate = task.dueDate.slice(0, 10)
    } else {
        task.dueDate = "à définir"
    }
    if (task.description === null) {
        task.description = ""
    }
    const elem = createElem('li', 'task')
    elem.dataset.taskId = task.id
    elem.dataset.listId = list.id
    elem.dataset.dueDate = task.dueDate
    const check = createElem('div', "check")
    const checkbox = createElem('input', "taskCheckbox")
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("onclick", "taskCheckboxClick(this,event)")
    checkbox.checked = task.done
    check.append(checkbox)

    const taskDetails = createElem('div', 'taskDetails')
    taskDetails.setAttribute("data-list", "checkbox")
    taskDetails.setAttribute('onclick','taskDetailsClick(this)')
    const taskName = createElem('h3', 'taskName', task.name)
    const taskElements = createElem('div', 'taskElements')
    const taskStep = createElem('div', 'taskStep', taskPlace + " sur " + nbTask)

    const taskDeadline = createElem('div', 'taskDeadline', "Echeance : " + dueDate(task.dueDate))
    const taskNote = createElem('div', 'taskNote', "" + task.description)
    const separator = createElem('div', null, '●')
    const separator2 = createElem('div', null, '●')
    taskElements.append(taskStep, separator, taskDeadline, separator2, taskNote)
    taskDetails.append(taskName, taskElements)
    const bin = createElem('div', 'bin')
    // bin.setAttribute('onclick','binClick(this)')
    bin.innerHTML = `<img class="taskDelete" src="../logos/bin.svg" alt="" onclick="binClick(this)">`
    elem.append(check, taskDetails, bin)
    lineText(checkbox,taskName)
    return elem
}
const dueDate = (taskDueDate)=>{
    const date1 = new Date()
    const date2 = new Date(taskDueDate)
    const tmp = date2-date1
    const diff = Math.floor(tmp/86400000)+1
    if (diff===0) {
      return "aujourd'hui"
    }else if (diff===1){
      return "demain"
    }else if (diff>1){
      return "dans "+diff+" jours"
    }else{
      return taskDueDate
    }
}

//ADD TACHE
export const addTask = async (listId, TaskName) => {
    try {
        const response = await fetch("http://localhost:5000/list/" + listId + "/task", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: TaskName
            })
        })
        const data = await response//.json()
        console.log(data)
        return data.status
    } catch (err) {
        console.error(err)
    }

}

//SUPPRIMER TACHE
export const deleteTask = async (taskId) => {
    try {
        const response = await fetch("http://localhost:5000/task/" + taskId, {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        })
        const data = await response//.json()
        console.log(data)
        return data.status
    } catch (err) {
        console.error(err)
    }
}

//CHECKED
export const checkTask = async (taskId,checked) => {
    try {
        const response = await fetch("http://localhost:5000/task/" + taskId, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            done: checked
        })
    })
    const data = await response//.json()
    console.log(data)
    return data.status
    } catch (err) {
        console.error(err)
    }
}
