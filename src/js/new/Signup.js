const mdp1 = document.querySelector(".mdp1")
const mdp2 = document.querySelector(".mdp2")
const mdpDifferent = document.querySelector(".mdpDifferent")
const mail = document.querySelector(".obligatoire1");
const password = document.querySelector(".obligatoire2");
const saisirmdp = document.querySelector(".saisirmdp");
const saisirmdp2 = document.querySelector(".saisirmdp2")
const testbutton = document.querySelector(".test")
const form = document.querySelector("form")
const sucess = document.querySelector(".messError2");
const Iddexist = document.querySelector(".Iddexistant")


form.onsubmit = async (e) => {
    e.preventDefault()
    if (mail.value!=="" && password.value!=="") {
        
        if (mdp1.value===mdp2.value) {
            const response = await fetch('http://localhost:5000/user', {
                method: 'POST',
                credentials: "include",
                body: JSON.stringify({email : (mail.value), password: (password.value)}),
                headers: { "Content-Type" : "application/json"},
            });
            const result = await response.status
            console.log(result)
            if (result !== 201) {
                console.log('');
                
            }
            else{
                sucess.style.display = "block"
                form.reset()
                
                
            }
            
        }
    }

}

function verif (param1,param2){
    if(param1 == param2){
        mdpDifferent.style.display = "none";
        
    }
    else{
        mdpDifferent.style.display = "block";
    }
}
mdp2.oninput = function(){
    verif (mdp1.value, mdp2.value)
}

mdp1.oninput = function(){
    verif (mdp1.value, mdp2.value)
}

testbutton.addEventListener('click' , event =>{
    if(mail.value == ""){
        saisirmdp.style.display = "block";
        sucess.style.display = "none"
    }
    else{
        saisirmdp.style.display="none"
    }
    if(password.value == ""){
        saisirmdp2.style.display = "block";
        sucess.style.display = "none"
    }
    else{
        saisirmdp2.style.display="none"
    }
    if(mail.value == "jesmo@drazik.com"){
        Iddexist.style.display ="block"
        sucess.style.display = "none"
        event.preventDefault()
        
    }
    else{
        Iddexist.style.display="none"
    }
    })

   
