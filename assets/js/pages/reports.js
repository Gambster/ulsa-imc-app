// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getDatabase, ref, onValue, set, onChildAdded  } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"
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

var options = {
    series: [{
    data: [0, 0, 0, 0,]
  }],
    chart: {
    height: 350,
    type: 'bar',
    events: {
      click: function(chart, w, e) {
        // console.log(chart, w, e)
      }
    }
  },
  colors:  ['#2E93fA', '#66DA26', '#FF9800', '#E91E63'],
  plotOptions: {
    bar: {
      columnWidth: '45%',
      distributed: true,
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  xaxis: {
    categories: [
      'Bajos de peso',
      'Normal',
      'Sobrepeso',
      'Obesidad',
    ],
    labels: {
      style: {
        colors: ['#2E93fA', '#66DA26', '#FF9800', '#E91E63'],
        fontSize: '12px'
      }
    }
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const imc_ref = ref(database, '/imc/' );
let counter_low = 0, counter_normal = 0, counter_overweight = 0, counter_obesity = 0;
onChildAdded( imc_ref, (snapshot) => {
    
    const data = snapshot.val();
    const { bim } = data;

    if( bim >= 0 && bim <= 18.4 ){
        counter_low++;
    }else if( bim >= 18.5 && bim <= 24.9 ){
        counter_normal++;
    }else if( bim >= 25 && bim <= 29.9 ){
        counter_overweight++;
    }else if( bim >= 30 ){
        counter_obesity++;
    }
    chart.updateOptions({
        series: [{
            data: [counter_low, counter_normal, counter_overweight, counter_obesity]
        }],
    })
});
