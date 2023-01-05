export const task1 = {
    title : "Nouvelle tâche",
    steps : [
        "Aller sur github.com",
        "Créer le repository"
    ],
    deadline : "",
    note : ""
}
const list1 = {
    name : "To do today",
    tasks : [{
        name : "To do today task1",
        steps : [
            "TDT T1 step1",
            "etape numero2"
        ],
        deadline : "",
        note : ""
        },
        {
        name : "tache numero 2",
        steps : [
            "tache 2 etape 1",
            "Créer le repository"
        ],
        deadline : "",
        note : ""
        },
        {
        name : "Nouvelle tâche",
        steps : [
            "Aller sur github.com",
            "Créer le repository"
        ],
        deadline : "",
        note : ""
        }
    ]
}
const list2 = {
    name : "Projet tutoré",
    tasks : [{
        name : "Projet tutoré task1",
        steps : [
            "TDT T1 step1",
            "etape numero2"
        ],
        deadline : "",
        note : ""
        },
        {
        name : "tache numero 2",
        steps : [
            "tache 2 etape 1",
            "Créer le repository"
        ],
        deadline : "",
        note : ""
        },
        {
        name : "Nouvelle tâche",
        steps : [
            "Aller sur github.com",
            "Créer le repository"
        ],
        deadline : "",
        note : ""
        }
    ]
}
const list3 = {
    name : "Stage",
    tasks : null
}
export const lists =[list1,list2,list3]
export const suppTask = (listName,taskName) =>{
    lists.forEach(list => {
        if(listName===list.name){
            list.tasks.forEach((task,index) =>{
                if (taskName===task.name) {
                    console.log(index);
                    delete list.tasks[index]
                }
            })
        }
    });
    
}
// console.log('hee');
// export const suppTask = (listName,taskName) =>{
//     lists.forEach(list => {
//         if(listName===list.name){
//             list.tasks.forEach((task,index) =>{
//                 if (taskName===task.name) {
//                     console.log(index);
//                     delete list.tasks[index]
//                 }
//             })
//         }
//     });
    
// }
