const password = document.querySelector(".obligatoire1");
const password2 = document.querySelector(".obligatoire2")
const testbutton = document.querySelector(".test");
const sucess = document.querySelector(".messError2");

testbutton.addEventListener('click' , event =>{
    event.preventDefault();
    if(password.value == ""){
        sucess.style.display = "none";
    }
    else if(password2.value == ""){
        sucess.style.display = "none"
    }
    else{
       sucess.style.display = "block",
       password.value ="",
       password2.value=""
    }
    })
