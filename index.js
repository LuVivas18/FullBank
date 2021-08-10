import $ from 'jquery';
import firebase from "firebase";
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  } from 'chart.js';
  
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  );
// Init Firebase


const firebaseConfig = {
    apiKey: "AIzaSyAhI6GFlRsnaDZ9n-aaSyEr9pLhrcRmtU8",
    authDomain: "fullbank-cd4f4.firebaseapp.com",
    projectId: "fullbank-cd4f4",
    storageBucket: "fullbank-cd4f4.appspot.com",
    messagingSenderId: "311338410323",
    appId: "1:311338410323:web:3648c18197d731800501a6",
    measurementId: "G-0TWZRXHQSQ"
};

firebase.initializeApp(firebaseConfig);

class Autenticacion {
    autEmailPassword (email, password) {

    }

    crearCuentaEmailPassword (email,password,nombre){
        firebase
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .then(result =>{
            result.user.updateProfile({
                displayName: nombre
            })
            const configuracion = {
                url : 'http://localhost:1234/index.html'
            }
            result.user.sendEmailVerification()
            .catch(error =>{
                console.error(error)
                alert("error")
            })
            firebase.auth().signOut()

            // $('.modal').modal('close')

            console.log(result);

        })

        

        .catch(error =>{
            console.error(error)
            alert("error")
        })
    }

    verifyLogIn(email,password) {
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed 
            window.location = 'http://localhost:1234/user-login.html';
            // ...
            console.log(userCredential);
        })
        .catch((error) => {
            alert("Usuario no registrado")
        });
    }
}




$(()=>{

    $("#btnRegister").click(()=>{
        console.log("Click")
        const nombre = $('#user').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const auth = new Autenticacion()
        auth.crearCuentaEmailPassword(email,password,nombre)
    });


    $('btnInicioEmail').click(()=>{
        const email = $('#emailSesion').val();
        const password = $('#passwordSesion').val();

    })


    $('btnRegistrarse').click(() => {
        $('#modalSesion').modal('close');
        $('#modalRegistro').modal('open');

          
    })

    $('btnSignIn').click(() => {
        $('#modalRegistro').modal('close');
        $('#modalSesion').modal('open');
          
    })

})


let btnLogin = document.getElementById("btnLogin");
if (btnLogin){
    btnLogin.addEventListener('click', function(){
        const email = document.getElementById("emailLogin").value;
        const password = document.getElementById("passLogin").value;
        const auth = new Autenticacion()
        auth.verifyLogIn(email,password)
    });
}


// Our labels along the x-axis
var years = ['Enero','Febrero','Marzo','Abril','Mayo'];
// For drawing the lines
var africa = [86,114,106,106,107];
var europe = [168,170,178,190,203];
var latinAmerica = [40,20,10,16,24];
var northAmerica = [6,3,2,2,7,26];

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: years,
    datasets: [
      { 
        data: africa,
        label: '',
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
        fill: false
      },
      {
        data: europe,
        label: '',
        borderColor: "#3e95cd",
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
        fill: false
      },
      {
        data: latinAmerica,
        label: '',
        borderColor: "#3e95cd",
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
        fill: false
      },
      {
        data: northAmerica,
        label: '',
        borderColor: "#3e95cd",
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
        fill: false
      }
    ]
  }
});
