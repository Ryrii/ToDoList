import * as Page from "./page.js"
import * as Lists from "./lists.js"
import * as Tasks from "./tasks.js"
import * as Listener from "./clickListener.js"
import * as modifyTask from "./modifyTask.js"
const checkConnexion = async ()=>{
  try {
    const response = await fetch("http://localhost:5000/check_login", {
        method: "GET",
        credentials: "include",
        headers:{"Content-Type": "application/json"}
      })
    const check = await response//.json()
    if(check.status!==200){
      document.location.href="http://localhost:3000/src/html/login.html"; 
      location.href = monUrl + '?param1=valeur1&param2=valeur2';
    }
  } catch (err) {
    console.error(err)
  } 
}
checkConnexion()

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
    ouvrir(menuOpened)
  }

}


window.onresize = reportWindowSize;
// console.log(window.innerWidth);
//INITIALISER LISTE 

await Lists.init()
Listener.addList()
Listener.list()

export  const taskInit = async ()=>{
  await Tasks.init("")
  Tasks.checkTask()
  Listener.taskDelete()
  Listener.taskDetails()

}
await taskInit()
// Listener.taskDetails()
// modifyTask.init("2","2")
