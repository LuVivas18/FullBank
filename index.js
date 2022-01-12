import $, { get } from 'jquery';
import firebase from "firebase";
import "firebase/database";
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
    measurementId: "G-0TWZRXHQSQ",
    databaseURL: "https://fullbank-cd4f4-default-rtdb.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
};

firebase.initializeApp(firebaseConfig);

class Autenticacion {

    
    // autEmailPassword (email, password) {

    // }

    // crearCuentaEmailPassword (email,password,nombre){
    //     firebase
    //     .auth()
    //     .createUserWithEmailAndPassword(email,password)
    //     .then(result =>{
    //         result.user.updateProfile({
    //             displayName: nombre
    //         })
    //         const configuracion = {
    //             url : 'http://localhost:1234/index.html'
    //         }
    //         result.user.sendEmailVerification()
    //         .catch(error =>{
    //             console.error(error)
    //             alert("error")
    //         })
    //         firebase.auth().signOut()

    //         // $('.modal').modal('close')

    //         console.log(result);

    //     })

        

    //     .catch(error =>{
    //         console.error(error)
    //         alert("error")
    //     })
    // }

    verifyLogIn(email,password) {
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed 
            window.location = 'http://localhost:1234/user-login.html';
            // ...
            console.log(userCredential)
        })
        .catch((error) => {
            alert("Usuario no registrado")
        });
    }
}


// $(()=>{


//     $('btnInicioEmail').click(()=>{
//         const email = $('#emailSesion').val();
//         const password = $('#passwordSesion').val();

//     })


//     $('btnRegistrarse').click(() => {
//         $('#modalSesion').modal('close');
//         $('#modalRegistro').modal('open');

          
//     })

//     $('btnSignIn').click(() => {
//         $('#modalRegistro').modal('close');
//         $('#modalSesion').modal('open');
          
//     })

// })


let btnRegister = document.getElementById("btnRegister");
if (btnRegister){
    $("#btnRegister").click(()=>{
        const full_name = $('#user').val();
        const birthday = $('#birthday').val();
        const phone = $('#phone').val();
        const address = $('#address').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const auth = firebase.auth();
        const database = firebase.database();
        
        auth.createUserWithEmailAndPassword(email,password)
        .then(function(){
            var user = auth.currentUser;
        
            // Add this user to firebase Database
            var database_ref = database.ref();
        
            // Create user data
            var user_data = {
                email: email,
                full_name: full_name,
                birthday: birthday,
                phone: phone,
                address: address,
                last_login: Date.now()
            }
        
            database_ref.child('user/' + user.uid).set(user_data);

            alert('User Created!');
            window.location = 'http://localhost:1234/login.html';
        })
        .catch(function(error){
            var error_code = error.code;
            var error_message = error.message;
        
            alert(error_message);
        });
    });
}


let btnProfile = document.getElementById("user-perfil");
if (btnProfile){
    $("#user-perfil").click(()=>{
        const full_name = $('#user').val();
        const birthday = $('#birthday').val();
        const phone = $('#phone').val();
        const address = $('#address').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const auth = firebase.auth();
        const database = firebase.database();
        var ref = firebase.database().ref("user");
        var childData;
        ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            childData = {...childSnapshot.val()}   
            if (childSnapshot.val().full_name === "test"){
                prof_name.value = childSnapshot.val().full_name;
                prof_birthday.value = childSnapshot.val().birthday;
                prof_email.value = childSnapshot.val().email;
                prof_phone.value = childSnapshot.val().phone;
                prof_phone2.value = "None";
                prof_address.value = childSnapshot.val().address;
            }
        });
        });
        
        // get(dbref.child()).then((snapshot)=>{
        //     if (snapshot.exists()){
        //         prof_name.value = snapshot.val().full_name;
        //         prof_birthday.value = snapshot.val().birthday;
        //         prof_email.value = snapshot.val().email;
        //         prof_phone.value = snapshot.val().phone;
        //         prof_address.value = snapshot.val().address;
        //     }
        //     else{
        //         alert("No data found");
        //     }
        // })
        // .catch((error)=>{
        //     alert("unsuccessful, error"+error);
        // });
    });
}

let btnLogin = document.getElementById("btnLogin");
if (btnLogin){
    btnLogin.addEventListener('click', function(){
        const email = document.getElementById("emailLogin").value;
        const password = document.getElementById("passLogin").value;
        const auth = firebase.auth();
        const database = firebase.database();
        auth.signInWithEmailAndPassword(email,password)
        .then(function(){
            var user = auth.currentUser;
                
            // Add this user to firebase Database
            var database_ref = database.ref();

            // Create user data
            var user_data = {
                last_login: Date.now()
            }

            database_ref.child('user/' + user.uid).update(user_data);
        })
        .catch(function(error){
            var error_code = error.code;
            var error_message = error.message;

            alert(error_message);
        });

        const autha = new Autenticacion()
        autha.verifyLogIn(email,password)
    });
}

const dbRef = firebase.database().ref();
let  usersData;
if (window.location.pathname==="/user-login-transfer.html"){
    dbRef.child("data").get().then((snapshot) => {
        if (snapshot.exists()) {
          usersData = snapshot.val();
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
}

let btnAccept = document.getElementById("btnAccept");
let saldo1 = 0;
if (btnAccept){
    btnAccept.addEventListener('click', function(){
        // const FromName = document.getElementById("FromName").value;
        const userId1 = parseInt(document.getElementById("FromID").value);
        // const ToName = document.getElementById("ToName").value;
        const userId2 = parseInt(document.getElementById("ToID").value);
        const amount = parseFloat(document.getElementById("transfer").value);
        usersData.forEach(user => {
            if(user.identificacion === userId1) {
                user.saldo -= amount;
            }
            if(user.identificacion === userId2) {
                user.saldo += amount;
            }
        }); 

        console.log('usersUpdated', usersData)
        dbRef.child('data').set(usersData);
        console.log('Transaccion exitosa!')
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
var predictionsG = []; 
var cur = "";
var actualsG = [];
var NextDay=0;
var hours = [];
var USD=0;
var EUR=0;
var YEN=0;
var BFS=0;
var sexo = [];


var kike = document.getElementById("PredictionsChart");
var myChart = new Chart(kike, {
        type: 'line',
        data: {
          labels: labelsG(predictionsG),
          datasets: [
            { 
              data: predictionsG,
              label: 'Actual',
              borderColor: "#3e95cd",
              borderWidth: 1,
              fill: false,
              radius: 2,
            },
            {
              data: actualsG,
              label: 'Predictions',
              borderColor: "#19f26e",
              borderWidth: 1,
              fill: false,
              radius: 2,
            }]},});
      
var utc = new Date().toJSON().slice(0,10);
var ref = firebase.database().ref("BTC");
var childData;
ref.on("value", function(snapshot) {
snapshot.forEach(function(childSnapshot) {
childData = {...childSnapshot.val()}   
if (childSnapshot.val().fecha === utc){
    predictionsG = childSnapshot.val().precios_predichos;
    cur = childSnapshot.val().curva;
    actualsG= childSnapshot.val().precios_reales;
    NextDay = childSnapshot.val().predicion;
    hours = childSnapshot.val().rama24;
    }
    });
    });
            
            

let btnGrafica = document.getElementById("btnGrafica");
    if (btnGrafica){
        btnGrafica.addEventListener('click', function(){
            const crypto = parseInt( document.getElementById("Crypto").value);
            const coin =  parseInt(document.getElementById("Coin").value);
            utc = new Date().toJSON().slice(0,10);
            switch (crypto) { // recolectar variables de base de datos
                case 1: // bitcoin
                    myChart.destroy()
                    var ref = firebase.database().ref("BTC");
                    var childData;
                    ref.on("value", function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        childData = {...childSnapshot.val()}   
                        if (childSnapshot.val().fecha === utc){
                            predictionsG = childSnapshot.val().precios_predichos;
                            cur = childSnapshot.val().curva;
                            actualsG= childSnapshot.val().precios_reales;
                            NextDay = childSnapshot.val().predicion;
                            hours = childSnapshot.val().rama24;

                        }
                    });
                    });
                    
                    break;
                case 2: // etherum
                    myChart.destroy()
                    utc = new Date().toJSON().slice(0,10);
                    var ref = firebase.database().ref("ETH");
                    var childData;
                    ref.on("value", function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        childData = {...childSnapshot.val()}   
                        if (childSnapshot.val().fecha === utc){
                            predictionsG = childSnapshot.val().precios_predichos;
                            cur = childSnapshot.val().curva;
                            actualsG= childSnapshot.val().precios_reales;
                            NextDay = childSnapshot.val().predicion;
                            hours = childSnapshot.val().rama24;
                        }
                    });
                    });
                    break;
                case 3: //Litecoin
                    predictionsG=0;
                    actualsG = 0;
                    NextDay=0;
                    hours = [];
                    break;
                case 4://Dash
                    predictionsG=0;
                    actualsG = 0;
                    NextDay=0;              
                    hours = [];
                    break;
                default:
                  console.log('Lo lamentamos, por ');
              }
              switch (coin) { // ver como recolectamos los precios
                case 1: // USD
                    
                    break;
                case 2: // EUR
                    predictionsG=currencyExchange(predictionsG,USD,EUR);
                    actualsG = currencyExchange(actualsG,USD,EUR);
                    NextDay=currencyExchange(NextDay,USD,EUR);
                    hours = currencyExchange(hours,USD,EUR);
                    break;
                case 3: //Litecoin
                    predictionsG=currencyExchange(predictionsG,USD,YEN);
                    actualsG = currencyExchange(actualsG,USD,YEN);
                    NextDay=currencyExchange(NextDay,USD,YEN);
                    hours = currencyExchange(hours,USD,YEN);
                    break;
                case 4://Dash
                    predictionsG=currencyExchange(predictionsG,USD,BFS);
                    actualsG = currencyExchange(actualsG,USD,BFS);
                    NextDay=currencyExchange(NextDay,USD,BFS);   
                    hours = currencyExchange(hours,USD,BFS);            
                    break;
                default:
                  console.log('Lo lamentamos, por el momento no disponemos de ');
              }
              //let resultado = (actualsG[actualsG.length]-NextDay);
              let resultado = (4000-4500); // prueba
              var span = document.getElementById("msj");
              var span2 = document.getElementById("msj2");
              if(resultado<=0){
                span.textContent = "Estimated losses of -$" + (-1*resultado);
                span2.textContent = "Time to sell!";
              }else{
                span.textContent = "Estimated earnings of $" + resultado;
                span2.textContent = "Time to invert!";
              }
              
        
        kike = document.getElementById("PredictionsChart");
        myChart = new Chart(kike, {
          type: 'line',
          data: {
            labels: labelsG(predictionsG),
            datasets: [
              { 
                data: predictionsG,
                label: 'Actual',
                borderColor: "#3e95cd",
                borderWidth: 1,
                fill: false,
                radius: 2,
              },
              {
                data: actualsG,
                label: 'Predictions',
                borderColor: "#19f26e",
                borderWidth: 1,
                fill: false,
                radius: 2,
              }]},});
        
        });
        

    }

    function currencyExchange(lista,division,multi) {
        for (var i = 0; i < lista.length; i++) {
            lista[i]= (lista[i]/division)*multi;
         }
        return lista;
      }
    function labelsG(lista) {
        var labess=[];
        for (var i = 0; i <= lista.length; i++) {
            labess.push(i);
         }
        return labess;
      }
      
              
    var hoursP = document.getElementById("hoursPredictions");
    var mChart = new Chart(hoursP, {
    type: 'line',
    data: {
        labels: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
        datasets: [
        { 
            data: [],
            label: 'Predictions hours',
            borderColor: "#19f26e",
            borderWidth: 1,
            fill: false,
            radius: 2,
        },
        ]},});

    
    

     