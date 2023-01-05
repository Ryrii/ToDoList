export const main = (title)=>{
    const page = document.querySelector('.page')
    page.innerHTML = `
    <div class="pageHeader">
        <h1 class="h1Page"> `+title+`</h1>
        <button class="listDeleteButton , openDeleteList">
            <div class="listDeleteBin"><img src="../logos/listDeleteBin.svg" alt=""></div>
            <p>Supprimer la liste</p>
        </button>
    </div>
    <ul class="tasks">
        
    </ul>
    <div  class="pageNewTask , task">
        <div class="addNewTask"><img src="../logos/plus.svg" alt=""></div>
        <input  type="text" class="addTaskInput" name="pageNewTask" placeholder="Ajouter une tâche ...">
    </div>
    `
    const listDelete = document.querySelector('.listDeleteAlertScreen')
    listDelete.innerHTML = `
        <section class="listDeleteAlert">
            <h2>Supprimer la liste ?</h2>
            <p>Après avoir été supprimée, une liste ne peut pas être récupérée. Êtes-vous certain(e) de vouloir supprimer la liste “Projet tutoré” ?</p>
            <div class="listDeleteButtons">
                <div class="listDeleteButton , deleteList">
                    <div class="listDeleteBin"><img src="../logos/listDeleteBin.svg" alt=""></div>
                    <p >Supprimer la liste</p>
                </div>
                <div class="cancelButton">
                    <div class="listDeleteBin"><img src="../logos/cancel.svg" alt=""></div>
                    <p >Annuler</p>                    
                </div>
            </div>
        </section>
    `

    const openDeleteList = document.querySelector(".openDeleteList");
    const listDeleteAlertScreen = document.querySelector(".listDeleteAlertScreen")
    const cancelButton = document.querySelector(".cancelButton")


    openDeleteList.addEventListener("click",()=>{
        listDeleteAlertScreen.style.display = "flex"
    })
    cancelButton.addEventListener("click",()=>{
        listDeleteAlertScreen.style.display = "none"
    })
}
