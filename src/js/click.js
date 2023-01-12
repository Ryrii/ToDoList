import * as PageTask from "./pageTask.js"
import * as Lists from "./lists.js"
import * as Tasks from "./tasks.js"
import * as ModifyTask from "./modifyTask.js"



const listNameClick = (elem)=>{
  const menuOpenedAndGriser = document.querySelector(".menuOpenedAndGriser");
  const listId = elem.closest(".list").dataset.listId
  const page = document.querySelector('.page')
  PageTask.main(elem.textContent,listId)
  addTaskEnter()
  Tasks.init(listId)
  if(window.innerWidth<1024){
    menuOpenedAndGriser.style.display = 'none'
    const h1Page = document.querySelector('.h1Page')
    h1Page.textContent = elem.textContent
  }
}

// AJOUTER TACHE EN APPUYANT SUR ENTRER
const addTaskEnter = ()=>{
  const addTaskInput = document.querySelector('.addTaskInput')
  addTaskInput.addEventListener('keypress',(event)=>{
    if(event.key === "Enter"){
      addNewTaskClick()
    }
    
  })
}

export const addListClick = async ()=>{
  const newList = document.querySelector(".addListInput")
  if(newList.value!==""){
    if (await Lists.addList(newList.value)===201){
      // Lists.init() // REINITIALISE LES LISTE
      addList() 
      newList.value=""
      newList.focus()
    }
  }

}

//AJOUTE LA DERNIER LISE AUX LISTE
const addList = async ()=>{
  const listsServer = await Lists.getLists() 
  const lastList = listsServer[listsServer.length-1]     //RECUPERE LA DERNIERE LISTE CREER
  const lists = document.querySelector(".listes")
  const newList = Lists.createList(lastList)
  lists.append(newList)
}

const deleteListClick = async()=>{
  const page = document.querySelector('.page')
  if (await Lists.deleteList(page.dataset.listId)===200) {
    location.reload()
  }
}

export const addNewTaskClick = async ()=>{
  const listId = document.querySelector(".page").dataset.listId
  const newTask = document.querySelector(".addTaskInput")
  if(newTask.value!==""){
    if (await Tasks.addTask(listId,newTask.value)===201){
      //Tasks.init(listId) // REINITIALISE LES TACHES
      addTask(listId)
      // Lists.init() //REINITIALISE LES LISTE POUR AJOUTER 1 A LA LISTE
      plusNbTasks(listId)
      newTask.value=""
      newTask.focus()
    }
  }

}
//AJOUTE LA DERNIER TACHE AUX TACHES
const addTask = async (listId)=>{
  const listsServer = await Lists.getLists() 
  let listCurrent
  listsServer.forEach(listServer =>{
    if (listServer.id==listId) {
      listCurrent = listServer
    }
  })
  const tasksServer = await Tasks.getTasks(listId) 
  const lastTask = tasksServer.Tasks[tasksServer.Tasks.length-1]     //RECUPERE LA DERNIERE TACHE CREER
  const tasks = document.querySelector(".tasks")
  const newTask = Tasks.createTask(lastTask,listCurrent)
  tasks.append(newTask)
}

//AJOUTE 1 A LA LISTE 
const plusNbTasks = async (listId)=>{
  const listes = document.querySelector(".listes")
  listes.childNodes.forEach(list => {
    if(list.dataset.listId === listId){
      list.childNodes[1].innerHTML = parseInt(list.childNodes[1].innerHTML)+1
      list.childNodes[1].style.display = "flex"
    }
  });
}

const taskCheckboxClick = async(elem,e)=>{
  e.preventDefault()
  const taskId = elem.closest(".task").dataset.taskId
  const listId = elem.closest(".page").dataset.listId
  if (await Tasks.checkTask(taskId,elem.checked)===200){
    // Tasks.init(listId) //REINITIALISE TOUTES LES TACHES
    await checkTask(elem)

  }
}
// COCHE ET BARRE LA TACHES COCHÉE
const checkTask = async (elem)=>{
  const taskId = elem.closest(".task").dataset.taskId
  const listId = elem.closest(".page").dataset.listId
  const tasksServer = await Tasks.getTasks(listId) 
  tasksServer.Tasks.forEach(task => {
    if(task.id == taskId){
      elem.checked = task.done
      const taskName = elem.parentElement.nextSibling.firstChild
      Tasks.lineText(elem,taskName)
    }
  });
}



const binClick = async (elem)=>{
  const taskId = elem.closest(".task").dataset.taskId
  const listId = elem.closest(".page").dataset.listId
  if (await Tasks.deleteTask(taskId)===200){
    Tasks.init(listId)
    //Lists.init() //REINITIALISE LES LISTES
    await moinsNbTasks(listId)
  }
}

//RETIRE 1 A LA LISTE 
const moinsNbTasks = async (listId)=>{
  const listes = document.querySelector(".listes")
  listes.childNodes.forEach(list => {
    if(list.dataset.listId === listId){
      list.childNodes[1].innerHTML = parseInt(list.childNodes[1].innerHTML)-1
      if (list.childNodes[1].innerHTML == 0) {
        list.childNodes[1].style.display = "none"
      }
      
    }
  });
}

const taskDetailsClick = (elem)=>{
  const modifyTask = document.querySelector(".modifyTaskAndgriser");
  const listId = elem.closest(".task").dataset.listId
  const taskId = elem.closest(".task").dataset.taskId
  ModifyTask.init(listId,taskId)
  modifyTask.style.display = 'flex'

}

const taskSaveClick = async()=>{
  const formTask = document.querySelector('.formTask')
  const listId = document.querySelector(".page").dataset.listId
  await ModifyTask.putTask(formTask)
  Tasks.init(listId)
  console.log('taskSave');
}


window.taskSaveClick = taskSaveClick; 
window.deleteListClick = deleteListClick; 
window.addNewTaskClick = addNewTaskClick; 
window.binClick = binClick; 
window.taskCheckboxClick = taskCheckboxClick; 
window.taskDetailsClick = taskDetailsClick; 
window.listNameClick = listNameClick; 
window.addListClick = addListClick