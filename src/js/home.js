// import {  } from "module";
const menuOpened = document.querySelector(".menuOpenedAndGriser");
const modifyTask = document.querySelector(".modifyTaskAndgriser");
const openMenu = document.querySelector(".openMenu");
const closeMenu = document.querySelector(".closeMenu");
const openTask = document.querySelector(".openTask");
const closeTasks = document.querySelectorAll(".closeTask");
const taskElements = document.querySelectorAll(".taskElements");
const taskCheckboxs = document.querySelectorAll(".taskCheckbox");
const taskSupprimers = document.querySelectorAll(".taskSupprimer");

const ouvrir= (elem) => {
    elem.style.display = 'flex';
}
const fermer= (elem) => {
    elem.style.display = 'none';
}

openMenu.onclick = () => {ouvrir(menuOpened);}
closeMenu.onclick = () => {fermer(menuOpened);}

taskElements.forEach((task) => {
    task.onclick = () => {ouvrir(modifyTask);}
});
closeTasks.forEach((closeTask) => {
    closeTask.onclick = () => {fermer(modifyTask);}
});

//barrer Text
const lineText= (check,text) => {
    if (check.checked === true){
        text.style.textDecoration = "line-through";
    }
    else{
        text.style.textDecoration = "none";;
    }
}

export const barrerText = (check,elemParent,elemBarrer) => {
    const taskText = check.closest(elemParent).querySelector(elemBarrer);
    lineText(check,taskText);
    check.onclick = () => {lineText(check,taskText);}
}

taskCheckboxs.forEach((taskCheckbox) => {
        barrerText(taskCheckbox,".task","h3")
});


//supprimer elem
export const suppElem = (supp,elemParent) => {
    supp.closest(elemParent).remove();
    
}
    
taskSupprimers.forEach((taskSupprimer) => {
    taskSupprimer.onclick = () => {suppElem(taskSupprimer,".task");}
    
});
