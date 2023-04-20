// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBk7FLaYa2Yxm-Lqg-imgV8O5EVZE4s4vU",

  authDomain: "ulsa-app.firebaseapp.com",

  projectId: "ulsa-app",

  storageBucket: "ulsa-app.appspot.com",

  messagingSenderId: "274863273714",

  appId: "1:274863273714:web:9a2c0946c330ebd766826b",
  databaseURL: "https://ulsa-app-default-rtdb.firebaseio.com/",
};

let imc_flag = false;
// Initialize Firebase

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const imc_ref = ref(database, '/imc/' );

onValue( imc_ref, (snapshot) => {
    if( imc_flag === false ){
        imc_flag = true;
        return;
    }
  const data = snapshot.val();
  console.log({data})
});

$("#weight-range").on( "input", function(e){
  const value = $(this).val();
  $("#weight-input").attr( "readonly", false )
  $("#weight-input").val(`${value}   kg`)
  $("#weight-input").attr( "readonly", "readonly" );
});
$("#height-range").on( "input", function(e){
  const value = $(this).val();
  $("#height-input").attr( "readonly", false )
  $("#height-input").val(`${value}   mt`)
  $("#height-input").attr( "readonly", "readonly" );
});
$('.avatar-btn').on('click', function(e){
  $(".avatar-btn").each( ( index, elm ) => $(elm).find("img").removeClass("selected") );
  $(this).find("img").addClass("selected");
});