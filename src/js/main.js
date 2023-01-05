//npm run dev -- --port 8000
import * as Page from "./page.js"
import * as Lists from "./lists.js"
import * as Tasks from "./tasks.js"
// import * as TaskAddEvent from "./taskAddEvent.js"
import * as Listener from "./clickListener.js"
import * as modifyTask from "./modifyTask.js"

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

function reportWindowSize() {
  if(window.innerWidth>1024 && menuOpened.style.display==="none"){
    // console.log(menuOpened.style.display);
    ouvrir(menuOpened)
  }

}

window.onresize = reportWindowSize;
// console.log(window.innerWidth);
//INITIALISER LISTE 
await Lists.init()
Listener.addList()
Listener.list()

// export const taskDeleteFirst=()=>{
//   const taskDeleters = document.querySelectorAll(".taskDelete")
//   taskDeleters.forEach(taskDelete=>
//       taskDelete.addEventListener("click", async ()=>{
//           const taskId = taskDelete.closest('.task').dataset.id
//           const listId = taskDelete.closest('.task').dataset.listId
//           await Tasks.deleteTask(taskId)
//           taskInit()
//       })
//       )
// }
export  const taskInit = async ()=>{
  await Tasks.init("")
  Tasks.checkTask()
  Listener.taskDelete()
  Listener.taskDetails()

}
await taskInit()
// Listener.taskDetails()
// modifyTask.init("2","2")
