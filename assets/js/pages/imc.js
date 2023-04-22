// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getDatabase, ref, onValue, set, onChildAdded  } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
import bim_results from "../../../constants/imc-results-position.js";
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

let imc_flag = true;
// Initialize Firebase

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const imc_ref = ref(database, '/imc/' );
let docs_length = 0
let i = 0;
const init_socket = ( async ()=> {
  console.log('init')
  await init_socket_value();
  console.log('next')
  await init_socket_child();
  
  
});
const init_socket_child = async() => {
  onChildAdded( imc_ref, (snapshot) => {
    i++;
    if( i <= docs_length ){
        return;
    }
    const data = snapshot.val();
    console.log({data});
  });
  return true;
};
const init_socket_value = async () => {
  onValue( imc_ref, snapshot => {
    
    if( imc_flag === false ){
        return;
    }
    imc_flag = false;
    const data = snapshot.val();
    docs_length = Object.keys( data ).length;
  });
  await timeout( 500 );
  return true;

};

init_socket();


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
$('#imc-form').submit( function( e ){
  e.preventDefault();
  
  const sex = $('.selected').hasClass('man') === true ? "man" : "woman";

  if( $('.selected').hasClass('man') === false && $('.selected').hasClass('woman') === false ){
    //show "you most select a genre!" notification
    return;
  }

  const arrayFormData = $( this ).serializeArray();
  const formObj = {};
  for( const { name, value } of arrayFormData ){
    formObj[name] = parseFloat(value.replace(/[^0-9.]/g, ''));
  }
  
  const { height, weight } = formObj;

  const bim = weight/( height * height );

  const bim_formatted = round(bim, 1);
  
  const results = bim_results.find( (obj) => bim_formatted >= obj.min && bim_formatted <= obj.max)

  const { class: className, text } = results;

  let max_weight, min_weight;

  if( sex === "man" ){
    max_weight = 25 * ( height * height );
    min_weight = 20 * ( height * height );
  }else if( sex === "woman" ){
    max_weight = 24 * ( height * height );
    min_weight = 10 * ( height * height );
  }
  $('#min-rec-weight').text(min_weight);
  $('#max-rec-weight').text(max_weight);

  $('#bim-text-info').text( text );

  $('#bmi-bargraph').addClass(className);
  $('#container-form-inputs').addClass('hide');
  $('#container-result').removeClass('hide');
  $('#bmi-score-p').text( bim_formatted );

  set(ref(database, 'imc/' + uuidv4()), {
    bim: bim_formatted,
    sex,
    max_weight,
    min_weight
  });


});
