const mail = document.querySelector(".obligatoire1");
const saisirmdp = document.querySelector(".saisirmdp");
const testbutton = document.querySelector(".test");
const sucess = document.querySelector(".messError2");

testbutton.addEventListener('click' , event =>{
    event.preventDefault();
    if(mail.value == ""){
        saisirmdp.style.display = "block"
        sucess.style.display = "none"
    }
    else if(mail.value !==""){
        sucess.style.display = "block",
        saisirmdp.style.display = "none"
    }
    else{
        saisirmdp.style.display ="none"
        
    }
    })
