import * as Page from "./pageTask.js"
import * as Lists from "./lists.js"
import * as Tasks from "./tasks.js"
import * as ModifyTask from "./modifyTask.js"
import * as Click from "./click.js"

//VERIFIER USER CONNECTER SINON PAGE LOGIN
const checkConnexion = async ()=>{
  try {
    const response = await fetch("http://localhost:5000/check_login", {
        method: "GET",
        credentials: "include",
        headers:{"Content-Type": "application/json"}
      })
    const check = await response//.json()
    if(check.status!==200){
      document.location.href="http://localhost:3000/src/html/login.html"
      // location.href = monUrl + '?param1=valeur1&param2=valeur2';
    }
  } catch (err) {
    console.error(err)
  } 
}
checkConnexion()

//AFFICHER MAIL
const userMail = document.querySelector('.userMail')
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
export const mail = params.get("mail")
userMail.textContent=mail

// OUVRIR FERMER MENU
const menuOpened = document.querySelector(".menuOpenedAndGriser");
const openMenu = document.querySelector(".openMenu");
const closeMenu = document.querySelector(".closeMenu");

openMenu.addEventListener('click',()=>{menuOpened.style.display = 'flex'})
closeMenu.addEventListener('click',()=>{menuOpened.style.display = 'none'})

// AFFICHER MENU QUAND BUREAU
function reportWindowSize() {
  if(window.innerWidth>=1024 && menuOpened.style.display==="none"){
    menuOpened.style.display = 'flex'
  }
  
}
window.onresize = reportWindowSize;

// AJOUTER LISTE EN APPUYANT SUR ENTRER
const addListInput = document.querySelector('.addListInput')
addListInput.addEventListener('keypress',(event)=>{
  if(event.key === "Enter"){
    Click.addListClick()
  }
})
//HOME 
const home = document.querySelector('.home')
home.addEventListener('click',()=>{
// home.href =home.href+"?mazgrGil="+mail
document.location.href="http://localhost:3000/src/html/home.html"+"?mail="+mail; 

})
//PARAMETRES CLICK
const settings = document.querySelector('.settings')
settings.addEventListener('click',()=>{
settings.href =settings.href+"?mail="+mail
})

//DECONNEXION
const logoutButton = document.querySelector('.logoutButton')
logoutButton.addEventListener('click',()=>{
  logout()
})

const logout = async ()=>{
  try {
    const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
            name: "newList"
        })
      })
    const data = await response//.json()
    console.log(data)
    if(data.status===200){
      document.location.href="http://localhost:3000/src/html/login.html"; 
      // location.href = monUrl + '?param1=valeur1&param2=valeur2';
    }    

  } catch (err) {
    console.error(err)
  }
}


//cperois@protonmail.com
// INITIALISER LISTES 
Lists.init()

//INITIALISER TACHES

let listId = params.get("listId")
let listName = params.get("listName")
console.log(window.location.pathname!=='/src/html/settings.html');
if (window.location.pathname!=='/src/html/settings.html') {
  if(listId === null){
    Tasks.init("")
  }else{
    Tasks.init(listId)
    Page.main(listName,listId)
  }
}
