import * as TaskAddEvent from "./taskAddEvent.js"

const createElem = (selector, classList,textContent) =>{
    const elem = document.createElement(selector)
    if (classList!=null) elem.classList.add(classList)
    elem.textContent = textContent
    return elem;
}

export const init = async (listId) =>{
        try {
        const response = await fetch("http://localhost:5000/list/"+listId, {
            method: "GET",
            credentials: "include",
            headers:{"Content-Type": "application/json"}
          })
        const list = await response.json()
        // console.log(list);
        const root = document.querySelector(".tasks")
        root.innerHTML=""
        if (listId==="") {
            list.forEach(list =>{
                const listsTask= list.Tasks.map((task) => createTask(task,list))
                root.append(...listsTask)
            })
        }else{
            const listsTask= list.Tasks.map((task) => createTask(task,list))
            root.append(...listsTask)

        }

        TaskAddEvent.main()
      } catch (err) {
        console.error(err)
      }

  
}
export const init2 = (lists,listId) =>{
    const tasks = document.querySelector(".tasks")
    lists.forEach(list => {
        if( list.id==listId) {
            const listsTask= list.Tasks.map((task) => createTask(task))
            tasks.innerHTML = ""
            tasks.append(...listsTask)
        }
    });
}


//TACHES
const createTask = (task,list) => {
    const nbTask = list.Tasks.length
    let taskPlace 
    list.Tasks.forEach((elem,i)=>{
        if (elem.id===task.id) {
            taskPlace = i+1
        }
    })
    const elem = createElem('li','task')
    elem.dataset.id = task.id
    elem.dataset.listId = list.id
    const check = createElem('div',"check")
        const checkbox = createElem('input',"taskCheckbox")
        checkbox.setAttribute("type", "checkbox")
        checkbox.checked = task.done
        check.append(checkbox)
    
    const taskDetails = createElem('div','taskDetails')
    taskDetails.setAttribute("data-list", "checkbox")
        const taskName = createElem('h3','taskName',task.name)
        const taskElements = createElem('div','taskElements')
            const taskStep = createElem('div','taskStep',taskPlace+" sur "+nbTask)
            if (task.dueDate!=null) {
                task.dueDate=task.dueDate.slice(0, 10)
            }
            const taskDeadline = createElem('div','taskDeadline',"Echeance : "+task.dueDate)
            const taskNote = createElem('div','taskNote', ""+task.description)
            const separator = createElem('div',null,'●')
            const separator2 = createElem('div',null,'●')
            taskElements.append(taskStep,separator,taskDeadline,separator2,taskNote)
        taskDetails.append(taskName,taskElements)
    const bin = createElem('div','bin')
    bin.innerHTML = `<img class="taskDelete" src="../logos/bin.svg" alt="">`
    elem.append(check,taskDetails,bin)
 return elem
}

//ADD TACHE
export const addTask= async (listId,TaskName)=>{
    try {
        const response = await fetch("http://localhost:5000/list/"+listId+"/task", {
            method: "POST",
            credentials: "include",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                name: TaskName
            })
          })
        const data = await response//.json()
        console.log(data)
        init(listId)
      } catch (err) {
        console.error(err)
      }
    
}

//SUPPRIMER TACHE
export const deleteTask=async (taskId)=>{
    try {
        const response = await fetch("http://localhost:5000/task/"+taskId, {
            method: "DELETE",
            credentials: "include",
            headers:{"Content-Type": "application/json"}
            })
        const data = await response//.json()
        console.log(data)
        } catch (err) {
        console.error(err)
        }
}

//CHECKED
export const checkTask=()=>{
    const taskCheckboxs = document.querySelectorAll(".taskCheckbox")
    taskCheckboxs.forEach(taskCheckbox=>
        taskCheckbox.addEventListener("click", async ()=>{
            const taskId = taskCheckbox.closest('.task').dataset.id
            try {
                const response = await fetch("http://localhost:5000/task/"+taskId, {
                    method: "PUT",
                    credentials: "include",
                    headers:{"Content-Type": "application/json"},                    
                    body: JSON.stringify({
                        done: taskCheckbox.checked
                    })
                    })
                const data = await response//.json()
                console.log(data)
                        
                
                } catch (err) {
                console.error(err)
                }
            
        })
    )
}
