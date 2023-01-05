const openDeleteList = document.querySelector(".openDeleteList");
const listDeleteAlertScreen = document.querySelector(".listDeleteAlertScreen")
const cancelButton = document.querySelector(".cancelButton")


openDeleteList.addEventListener("click",()=>{
    listDeleteAlertScreen.style.display = "flex"
})
cancelButton.addEventListener("click",()=>{
    listDeleteAlertScreen.style.display = "none"
})