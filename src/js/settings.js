import * as Main from "./main.js"

//CLICK LIST
const listNameClick = (elem)=>{
  const listId = elem.closest(".list").dataset.listId
  const listName = elem.textContent
  document.location.href="http://localhost:3000/src/html/home.html"+"?mail="+Main.mail+"&listId="+listId+"&listName="+listName
}
window.listNameClick = listNameClick; 
