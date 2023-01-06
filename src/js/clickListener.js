import * as Page from "./page.js"
import * as Lists from "./lists.js"
import * as Tasks from "./tasks.js"
import * as TaskAddEvent from "./taskAddEvent.js"
import * as ModifyTask from "./modifyTask.js"


const menuOpened = document.querySelector(".menuOpenedAndGriser");
const openMenu = document.querySelector(".openMenu");
const closeMenu = document.querySelector(".closeMenu");
const ouvrir= (elem) => {
  elem.style.display = 'flex';
}
const fermer= (elem) => {
  elem.style.display = 'none';
}

openMenu.onclick = () => {ouvrir(menuOpened);}
closeMenu.onclick = () => {fermer(menuOpened);}

let accueil=true

export const addList = ()=>{
    const addList = document.querySelector(".addList")
    const newList = document.querySelector(".addListInput")
    // console.log(addList);
    addList.addEventListener("click", async ()=>{
        // console.log('hi');
        if(newList.value!==""){
          await Lists.addList(newList.value)
          await Lists.init()
          list()
        }
    })
}  

export const list= ()=>{
  const myLists = document.querySelectorAll('.list')
  myLists.forEach(element => {
      element.addEventListener("click", async ()=>{
        const page = document.querySelector(".page")
        page.dataset.listId = element.dataset.id
        Page.main(element.dataset.name)
        addNewTask(element.dataset.id)
    Lists.deleteList(element.dataset.id)

        tasksRefresh(element.dataset.id)
        // ModifyTask.init("2","2")
        
        if(window.innerWidth<1024){
            // console.log('hi');
            fermer(menuOpened)
        }
      })
  })
}
export const tasksRefresh= async (listId)=>{
    // Lists.deleteList(listId)
    await Tasks.init(listId)
    taskDelete()
    Tasks.checkTask()
    taskDetails()
  }
export const addNewTask=(listId)=>{
    const addNewTask = document.querySelector(".addNewTask")
    const newTask = document.querySelector(".addTaskInput")
    addNewTask.addEventListener("click", async ()=>{
        if(newTask.value!==""){
            await Tasks.addTask(listId,newTask.value)
    Lists.deleteList(listId)

            tasksRefresh(listId)
            await Lists.init()
            list()
        }
    })
    
}
export const taskDelete=()=>{
    const taskDeleters = document.querySelectorAll(".taskDelete")
    taskDeleters.forEach(taskDelete=>
        taskDelete.addEventListener("click", async ()=>{
            const taskId = taskDelete.closest('.task').dataset.id
            const listId = taskDelete.closest('.page').dataset.listId
            await Tasks.deleteTask(taskId)
            tasksRefresh(listId)
            await Lists.init()
            list()

        })
    )
}


      //AFFICHER DETAIL TACHE
export const taskDetails=()=>{
    const modifyTask = document.querySelector(".modifyTaskAndgriser");
    const taskDetails = document.querySelectorAll(".taskDetails");
      taskDetails.forEach((task) => {
          // task.onclick = () => {ouvrir(modifyTask);}
          task.addEventListener("click",() => {
            ouvrir(modifyTask)
            const listId = task.closest(".task").dataset.listId
            const taskId = task.closest(".task").dataset.id
            task.closest(".task")
            ModifyTask.init(listId,taskId)
          })
      });
}


const formTask = document.querySelector('.formTask')
formTask.addEventListener("submit", async (e)=>{
  const page = document.querySelector(".page")
  console.log(page.dataset.listId)
  e.preventDefault()
  await ModifyTask.putTask(formTask)
  await Tasks.init(page.dataset.listId)
  taskDelete()
  Tasks.checkTask()
  taskDetails()
})

