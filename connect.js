const createUser = document.querySelector('.createUser')
const connect = document.querySelector(".connect")
const check_login = document.querySelector(".check_login")
const getList = document.querySelector(".getList")


createUser.addEventListener("click",async ()=>{
    try {
    const response = await fetch("http://localhost:5000/userll", {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
            email: "ryry@gmail.com",
            password: "ryry@gmail.com"
        })


      })
    const data = await response.json()
    console.log(data)
    	

  } catch (err) {
    console.error(err)
  }
})

connect.addEventListener("click",async ()=>{
    try {
    const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
            email: "cperois@protonmail.com",
            password: "password"
        })
      })
    const data = await response//.json()
    console.log(data)
    	

  } catch (err) {
    console.error(err)
  }
})
check_login.addEventListener("click",async ()=>{
    try {
    const response = await fetch("http://localhost:5000/check_login", {
        method: "GET",
        credentials: "include",
        headers:{"Content-Type": "application/json"}

      })
    const data = await response//.json()
    console.log(data)
    	

  } catch (err) {
    console.error(err)
  }
})
getList.addEventListener("click",async ()=>{
    try {
    const response = await fetch("http://localhost:5000/list", {
        method: "GET",
        credentials: "include",
        headers:{"Content-Type": "application/json"}

      })
    const data = await response.json()
    console.log(data)
    	

  } catch (err) {
    console.error(err)
  }
})

const addList = document.querySelector(".addList")
addList.addEventListener("click", async (e)=>{
        try {
            const response = await fetch("http://localhost:5000/list", {
                method: "POST",
                credentials: "include",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: "newList"
                })
              })
            const data = await response//.json()
            console.log(data)
                
        
          } catch (err) {
            console.error(err)
          }
          e.preventDefault();
})

// const addList2 = document.querySelector(".addList2")
// const addListInput = document.querySelector(".addListInput")
// addList2.addEventListener("click", async ()=>{
//     if(addListInput.value!==""){
//         try {
//             const response = await fetch("http://localhost:5000/list", {
//                 method: "POST",
//                 credentials: "include",
//                 headers:{"Content-Type": "application/json"},
//                 body: JSON.stringify({
//                     name: addListInput.value
//                 })
//               })
//             const data = await response//.json()
//             console.log(data)
                
        
//           } catch (err) {
//             console.error(err)
//           }
//     }
// })