import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./auth.js";

let signup = document.getElementById("signup");
let signin = document.getElementById("signin");
let button = document.getElementById("rdlg");
let backtosignup = document.getElementById("bts");
let guest = document.getElementById("guest");



signup.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = e.target[0].value;
  let password = e.target[1].value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((x) => {
      if (x.user) {
        alert("user registered successfully");
        signin.style.display = "inline-block";
        signup.style.display = "none";
        button.style.display = "none";
        backtosignup.style.display = "inline-block";
      }
    })
    .catch((e) => {
      console.log(e), alert("unable to register user");
    });
});

signin.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = e.target[0].value;
  let password = e.target[1].value;
  signInWithEmailAndPassword(auth, email, password)
    .then((x) => {if(x.user.accessToken){
      alert("login successfully")
      location.replace("./music.html")
    }})
    .catch(() => {alert("somthing went wrong")});
});

button.addEventListener("click", () => {
  signin.style.display = "inline-block";
  signup.style.display = "none";
  button.style.display = "none";
  backtosignup.style.display = "inline-block";
  guest.style.display = "none"
  forgot.style.display = "inline-block"
});
backtosignup.addEventListener("click", () => {
  signup.style.display = "inline-block";
  signin.style.display = "none";
  backtosignup.style.display = "none";
  button.style.display = "inline-block";
  guest.style.display = "inline-block"
  forgot.style.display = "none"
});

guest.addEventListener("click" ,()=>{
  alert("guests are always welcome")
  location.replace("./music.html")
})


