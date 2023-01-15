
export const init = async (listId,taskId) => {
    try {
        const response = await fetch("http://localhost:5000/list/"+listId, {
            method: "GET",
            credentials: "include",
            headers:{"Content-Type": "application/json"}
          })
        const list = await response.json()
        // console.log(list.Tasks);
        list.Tasks.forEach(task => {
            if (task.id==taskId) {
                // console.log(task);
                create(task,listId)
            }
           
        });
      } catch (err) {
        console.error(err)
      }  
}
export const create = (task,listId)=>{
    const closeTask = document.querySelectorAll('.closeTask')
    const modifyTask = document.querySelector('.modifyTaskAndgriser')
    closeTask.forEach( task =>{
    task.addEventListener('click',()=>{modifyTask.style.display = 'none'})
    })
    const formTask = document.querySelector('.formTask')
    formTask.dataset.id = task.id
    formTask.dataset.listId = listId
    const taskTitle = document.querySelector('.taskTitle')
    taskTitle.value=task.name
    const taskDueDate = document.querySelector('.taskDueDate')
    if (task.dueDate!=null) {
        task.dueDate=task.dueDate.slice(0, 10)
    }
    taskDueDate.value = task.dueDate
    const taskDescription = document.querySelector('.taskDescription')
    taskDescription.value=task.description

}

export const putTask= async (form)=>{
    try {
    const response = await fetch("http://localhost:5000/task/"+form.dataset.id, {
        method: "PUT",
        credentials: "include",
        headers:{"Content-Type": "application/json"},                    
        body: JSON.stringify({
            name : form.elements["name"].value,
            description : form.elements["description"].value,
            dueDate : form.elements["dueDate"].value
        })
    })
    const data = await response//.json()
    console.log(data)
    
    
    } catch (err) {
        console.error(err)
    }

}