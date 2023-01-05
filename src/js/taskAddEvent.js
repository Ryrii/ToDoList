export const main =()=>{

    // //AFFICHER DETAIL TACHE
    const modifyTask = document.querySelector(".modifyTaskAndgriser");
    const taskDetails = document.querySelectorAll(".taskDetails");

    // taskDetails.forEach((task) => {
    //     // task.onclick = () => {ouvrir(modifyTask);}
    //     task.addEventListener("click",() => {
    //         fermer(modifyTask)
    //         console.log('gg');
    //         // TaskDetails.init('dataTask')
    //     })
    // });
        

    const ouvrir= (elem) => {
        elem.style.display = 'flex';
    }

    //FERMER DETAIL TACHE
    const closeTasks = document.querySelectorAll(".closeTask");

    const fermer= (elem) => {
        elem.style.display = 'none';
    }

    closeTasks.forEach((closeTask) => {
        closeTask.onclick = () => {fermer(modifyTask);}
    });

    //BARRER TACHE CHECKED
    const taskCheckboxs = document.querySelectorAll(".taskCheckbox");

    const barrerText = (check,elemParent,elemBarrer) => {
        const taskText = check.closest(elemParent).querySelector(elemBarrer);
        lineText(check,taskText);
        check.onclick = () => {lineText(check,taskText);}
    }


    const lineText= (check,text) => {
        if (check.checked === true){
            text.style.textDecoration = "line-through";
        }
        else{
            text.style.textDecoration = "none";;
        }
    }
    taskCheckboxs.forEach((taskCheckbox) => {
        barrerText(taskCheckbox,".task","h3")
    });
}