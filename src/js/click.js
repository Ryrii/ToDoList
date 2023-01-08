import * as PageTask from "./pageTask.js"
import * as Lists from "./lists.js"
import * as Tasks from "./tasks.js"
import * as ModifyTask from "./modifyTask.js"



const listNameClick = (elem)=>{
  const menuOpenedAndGriser = document.querySelector(".menuOpenedAndGriser");
  const listId = elem.closest(".list").dataset.listId
  const page = document.querySelector('.page')
  PageTask.main(elem.textContent,listId)
  addlistEnter()
  // page.dataset.listId = listId
  Tasks.init(listId)
  if(window.innerWidth<1024){
    menuOpenedAndGriser.style.display = 'none'
    const h1Page = document.querySelector('.h1Page')
    h1Page.textContent = elem.textContent
  }
}

// AJOUTER TACHE EN APPUYANT SUR ENTRER
const addlistEnter = ()=>{
  const addTaskInput = document.querySelector('.addTaskInput')
  addTaskInput.addEventListener('keypress',(event)=>{
    if(event.key === "Enter"){
      addNewTaskClick()
    }
    
  })
}

export const addListClick = ()=>{
  const newList = document.querySelector(".addListInput")
  if(newList.value!==""){
    Lists.addList(newList.value)
    Lists.init()
    newList.value=""
    newList.focus()
  }

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
    await Tasks.addTask(listId,newTask.value)
    Tasks.init(listId)
    Lists.init()
    console.log(newTask.value);
    newTask.value=""
    newTask.focus()
  }

}

const taskCheckboxClick = async(elem,e)=>{
  e.preventDefault()
  const taskId = elem.closest(".task").dataset.taskId
  const listId = elem.closest(".page").dataset.listId
  console.log(taskId);
  await Tasks.checkTask(taskId,elem.checked)
  Tasks.init(listId)
}

const binClick = async (elem)=>{
  const taskId = elem.closest(".task").dataset.taskId
  const listId = elem.closest(".page").dataset.listId
  await Tasks.deleteTask(taskId)
  Tasks.init(listId)
  Lists.init()
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