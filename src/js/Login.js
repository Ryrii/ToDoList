const mail = document.querySelector(".obligatoire1");
const password = document.querySelector(".obligatoire2");
const saisirmdp = document.querySelector(".saisirmdp");
const saisirmdp2 = document.querySelector(".saisirmdp2")
const testbutton = document.querySelector(".test")
const form = document.querySelector("form")

form.onsubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify({email : (mail.value), password: (password.value)}),
        headers: { "Content-Type" : "application/json"},
    });

    const result = await response;
    console.log(result.status)
    if (result.status == 200) {
        document.location.href="http://127.0.0.1:5501/html/home.html";
    }
    
    
}

testbutton.addEventListener('click' , event =>{
if(mail.value == ""){
    saisirmdp.style.display = "block";
}
else{
    saisirmdp.style.display = "none"
}
})

testbutton.addEventListener('click' , event =>{
    if(password.value == ""){
        saisirmdp2.style.display = "block";
    }
    else{
        saisirmdp2.style.display = "none"
    }
    })

