const mail = document.querySelector(".obligatoire1");
const password = document.querySelector(".obligatoire2");
const saisirmdp = document.querySelector(".saisirmdp");
const saisirmdp2 = document.querySelector(".saisirmdp2")
const testbutton = document.querySelector(".test")
const form = document.querySelector("form")
const idError = document.querySelector(".idError")

form.onsubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(' http://localhost:5000/login', {
      method: 'POST',
      credentials: "include",
      body: JSON.stringify({email : (mail.value), password: (password.value)}),
        headers: { "Content-Type" : "application/json"},
    });

    const result = await response;
    // console.log(result.status)
    console.log(mail.value!=="");
    console.log(result.status!== 200);
    if ((result.status === 200)) {
       
        document.location.href="http://localhost:3000/src/html/home.html?mail="+mail.value;
    }
    else if(mail.value!=="" && password.value){
        idError.style.display = "block";
        password.value =""
    }
    
    
}
testbutton.addEventListener('click' , event =>{
if(mail.value == ""){
    saisirmdp.style.display = "block";
    idError.style.display = "none";
}
else{
    saisirmdp.style.display = "none"
}
})

testbutton.addEventListener('click' , event =>{
    if(password.value == ""){
        saisirmdp2.style.display = "block";
        idError.style.display = "none";
    }
    else{
        saisirmdp2.style.display = "none"
    }
    })

