

export const init = async () => {

    try {
        const response = await fetch("http://localhost:5000/list", {
            method: "GET",
            credentials: "include",
            headers:{"Content-Type": "application/json"}
          })

        const lists = await response.json()
        const root = document.querySelector(".listes")
        root.innerHTML = ""
        const listsElem = lists.map((list) => createList(list))
        root.append(...listsElem)
      } catch (err) {
        console.error(err)
      }  
}

const createList = (list) => {
    const elem = document.createElement("li")
    elem.classList.add('list')
    elem.dataset.id = list.id
    elem.dataset.name = list.name
    const listName = document.createElement('p')
    listName.classList.add('listName')
    listName.textContent = list.name
    listName.setAttribute('onclick','listNameClick()')
    const listNbTask = document.createElement('p')
    if (list.Tasks.length != 0) {
        listNbTask.classList.add('listNbTask')
        listNbTask.textContent = list.Tasks.length
    }
    elem.append(listName,listNbTask)

    return elem
}

//ADD LIST
// export const addList = ()=>{
//     const addList = document.querySelector(".addList")
//     const newList = document.querySelector(".addListInput")
//     console.log(addList);
//     addList.addEventListener("click", async ()=>{
//         console.log('hi');
//         if(newList.value!==""){
//             try {
//                 const response = await fetch("http://localhost:5000/list", {
//                     method: "POST",
//                     credentials: "include",
//                     headers:{"Content-Type": "application/json"},
//                     body: JSON.stringify({
//                         name: newList.value
//                     })
//                 })
//                 const data = await response//.json()
//                 console.log(data)
//                 init()
            
//             } catch (err) {
//                 console.error(err)
//             }
//         }
//     })
// }
export const addList = async(listName)=>{
    try {
        const response = await fetch("http://localhost:5000/list", {
            method: "POST",
            credentials: "include",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                name: listName
            })
        })
        const data = await response//.json()
        console.log(data)
    
    } catch (err) {
        console.error(err)
    }
}

//SUPPRIMER LISTE
export const deleteList=(listId)=>{
    const listDelete = document.querySelector(".deleteList")
    listDelete.addEventListener("click", async ()=>{
            try {
                const response = await fetch("http://localhost:5000/list/"+listId, {
                    method: "DELETE",
                    credentials: "include",
                    headers:{"Content-Type": "application/json"}
                    })
                const data = await response//.json()
                console.log(data)
                location.reload()  
                
                } catch (err) {
                console.error(err)
                }
            
        })

}

//LIST DISPLAY

// export const listDisplay = ()=>{
//     const myLists = document.querySelectorAll('.list')
//     myLists.forEach(element => {
//         element.addEventListener("click", async ()=>{
//             console.log('hi')
//             Page.main(element.dataset.name)
//             deleteList(element.dataset.id)
//             await Tasks.init(element.dataset.id)
//             Tasks.addTask(element.dataset.id)
//         })
//     })
// }