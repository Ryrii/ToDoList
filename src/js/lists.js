
// INITIALISE LES LISTES
export const init = async () => {
    const lists = await getLists()
    const root = document.querySelector(".listes")
    root.innerHTML = ""
    const listsElem = lists.map((list) => createList(list))
    root.append(...listsElem)
}

//RECUPERE LES LISTES DU SERVEUR 
export const getLists = async ()=>{
    try {
        const response = await fetch("http://localhost:5000/list", {
            method: "GET",
            credentials: "include",
            headers:{"Content-Type": "application/json"}
          })
        const lists = await response.json()
        return lists

      } catch (err) {
        console.error(err)
      }  
}

// CREER LES LISTES
export const createList = (list) => {
    const elem = document.createElement("li")
    elem.classList.add('list')
    elem.dataset.listId = list.id
    elem.dataset.name = list.name
    const listName = document.createElement('p')
    listName.classList.add('listName')
    listName.textContent = list.name
    listName.setAttribute('onclick','listNameClick(this)')
    const listNbTask = document.createElement('p')
    listNbTask.classList.add('listNbTask')
    listNbTask.textContent = list.Tasks.length
    if (list.Tasks.length === 0) {
        listNbTask.style.display = "none"
    }
    elem.append(listName,listNbTask)

    return elem
}

//AJOUTER LISTE
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
        console.log(data);
        return data.status
    
    } catch (err) {
        console.error(err)
    }
}

//SUPPRIMER LISTE
export const deleteList= async (listId)=>{
    try {
        const response = await fetch("http://localhost:5000/list/"+listId, {
        method: "DELETE",
        credentials: "include",
        headers:{"Content-Type": "application/json"}
    })
    const data = await response//.json()
    console.log(data)
    return response.status
    } catch (err) {
        console.error(err)
    }
}

