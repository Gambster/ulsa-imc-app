/******************** INICIO POST A INICIO SESION ********************/

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
window.addEventListener("DOMContentLoaded", () => {
    
    const sandboxMode = true;
    let firebaseConfig = {};
    if( sandboxMode ){

        firebaseConfig = {
            apiKey: "AIzaSyDu7mOoS-v5mLtVGNVp5JqrJBwX1aVS1Xs",
            authDomain: "sumestra-sandbox.firebaseapp.com",
            projectId: "sumestra-sandbox",
            storageBucket: "sumestra-sandbox.appspot.com",
            messagingSenderId: "859976279228",
            appId: "1:859976279228:web:20723fcfc936b22bd75cb9"
          };

    }else{

        firebaseConfig = {
            apiKey: "AIzaSyBw5T8cJlbDCzmA5geM9sNwPSf9Lh1zr_k",
            authDomain: "sumestra-app.firebaseapp.com",
            projectId: "sumestra-app",
            storageBucket: "sumestra-app.appspot.com",
            messagingSenderId: "529309316653",
            appId: "1:529309316653:web:f6a853b334b13b6e156aa4"
          };

    }

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
document
.getElementById("login")
.addEventListener("submit", (event) => {
    event.preventDefault();
    var login = event.target.login.value
    var password = event.target.password.value
    console.log("correo: " + login)
    firebase
        .auth()
        .signInWithEmailAndPassword(login, password)
        .then(({ user }) => {
            return user.getIdToken().then((idToken) => {
            return fetch("/sign", {
                method: "POST",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "CSRF-Token": Cookies.get("XSRF-TOKEN"),
                },
                body: JSON.stringify({ idToken }),
            });
            });
        })
        .then(() => {
            return firebase.auth().signOut();
        })
        .then(() => {
            console.log("logeado")
            window.location.assign("/");
        })
        .catch(function(error) {
            console.log(error)
            if(error.code == "auth/user-not-found"){
                //var divElement = document.getElementById("error-div")
                //divElement.innerHTML = "<span id='wrongPassword' style='color:red;font-size:13px;'> El correo que estás ingresando no existe, verificalo. </span>"
            }else if(error.code == "auth/wrong-password"){
                //var divElement = document.getElementById("error-div")
                //divElement.innerHTML = "<span id='wrongPassword' style='color:red;font-size:13px;'> La contraseña ingresada es incorrecta. </span>"
            }else{
                //var divElement = document.getElementById("error-div")
                //divElement.innerHTML = "<span id='wrongPassword' style='color:red;font-size:13px;'> Error desconocido, favor de contactar con tu provedor. </span>"
            }
            
       })
        return false;
    
})
})

/******************** FIN POST A INICIO SESION ********************/


  