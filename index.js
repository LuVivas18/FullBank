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


if (window.location.pathname==="/user-login.html"){
    const database = firebase.database();
    var database_ref = database.ref();
    var ref = firebase.database().ref("sesion");
    var lastloginSesion, childData2;
    ref.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        lastloginSesion = childSnapshot.val().last_login 
        // if (childSnapshot.val().full_name === ""){
        //     prof_name.value = childSnapshot.val().full_name;
        //     prof_birthday.value = childSnapshot.val().birthday;
        //     prof_email.value = childSnapshot.val().email;
        //     prof_phone.value = childSnapshot.val().phone;
        //     prof_phone2.value = "None";
        //     prof_address.value = childSnapshot.val().address;
        // }
    });

    });
    var ref2 = firebase.database().ref("user");
    var Uuser_data;
    ref2.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            childData2 = childSnapshot.val()
            if (childSnapshot.val().last_login === lastloginSesion){
                Uuser_data = {
                    email: childSnapshot.val().email,
                    full_name: childSnapshot.val().full_name,
                    birthday: childSnapshot.val().birthday,
                    phone: childSnapshot.val().phone,
                    address: childSnapshot.val().address,
                }
                database_ref.child('sesion/ultimo_usuario').update(Uuser_data);
                document.getElementById("titulo-dashboard").innerHTML = ('Dashboard - ' + childSnapshot.val().full_name); 
            }
        });
    });
    

}

if (window.location.pathname==="/user-perfil.html"){
        const auth = firebase.auth();
        const database = firebase.database();
        var ref = firebase.database().ref("sesion");
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
            database_ref.child('sesion/ultimo_usuario').set(user_data);
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
 /* Notificaciones */ 
              
 

 function dates() {
    var fechaInicio = new Date('2022-01-10');
    var fechaFin    = new Date('2022-01-13');
    var lista = []
    while(fechaFin.getTime() >= fechaInicio.getTime()){
        fechaInicio.setDate(fechaInicio.getDate() + 1);
        lista.push(fechaInicio.getFullYear() + '-0' + (fechaInicio.getMonth() + 1) + '-' + fechaInicio.getDate());
    }
    lista = lista.reverse();
    return lista;
  }
let btnNotifications = document.getElementById("btnNotifications");
    if (btnNotifications){
        btnNotifications.addEventListener('click', function(){
        utc = new Date().toJSON().slice(0,10);
        var days = dates()
        var cryp = ["BTC","ETH","DASH","LTC"]
        var tm = "";
        var tm2 = "";
        var td= "";
        var tc= "";
        var msj= [];
        var msj2=[];
        var dats=[];
        var crt=[];
        var cep = 1;
        switch (cep) { // recolectar variables de base de datos
                case 1: // bitcoin
                    ref = firebase.database().ref("Notificaciones");
                    childData;
                    for (var i = 0; i < days.length; i++) {
                        for (var j = 0; j < cryp.length; j++) {
                            ref.on("value", function(snapshot) {
                                snapshot.forEach(function(childSnapshot) {
                                    childData = {...childSnapshot.val()}   
                                    if (childSnapshot.val().labels ===cryp[j] && childSnapshot.val().fecha === days[i]){
                                        tm = childSnapshot.val().msj;
                                        tm2 = childSnapshot.val().msj2;
                                        td = childSnapshot.val().fecha;
                                        tc = childSnapshot.val().labels;
                                        msj.push(tm);
                                        msj2.push(tm2);
                                        crt.push(tc);
                                        dats.push(td)
                                }        
                                    });
                                    });
                            
                         }
                        
                     }
                    
                     console.log(msj)
                     console.log(msj2)
                     console.log(crt)
                     console.log(dats)
                        break;
                default:
                  console.log('nada');

     }});}
    
    

var predictionsG = []; 
var cur = "";
var actualsG = [];
var labelsG =[];
var NextDay=0;
var hours = [];
var EUR=0.873975;
var YEN=114.59;
var BFS=4.64;
var PESOC=3979.17;



var kike = document.getElementById("PredictionsChart");
var myChart = new Chart(kike, {
        type: 'line',
        data: {
          labels: labelsG,
          datasets: [
            { 
              data: predictionsG,
              label: 'Predictions',
              borderColor: "#19f26e" ,
              borderWidth: 1,
              fill: false,
              radius: 2,
            },
            {
              data: actualsG,
              label: 'Actual',
              borderColor: "#3e95cd",
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
           
    var hoursP = document.getElementById("hoursPredictions");
    var mChart = new Chart(hoursP, {
    type: 'line',
    data: {
        labels: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
        datasets: [
        { 
            data: hours,
            label: 'Predictions hours',
            borderColor: "#19f26e",
            borderWidth: 1,
            fill: false,
            radius: 2,
        },
        ]},}) ;          


let btnGrafica = document.getElementById("btnGrafica");
    if (btnGrafica){
        btnGrafica.addEventListener('click', function(){
            predictionsG = []; 
         cur = "";
         actualsG = [];
         labelsG =[];
         NextDay=0;
         hours = [];
        const crypto = parseInt( document.getElementById("Crypto").value);
        const coin =  parseInt(document.getElementById("Coin").value);
        utc = document.getElementById("Calendar").value;
        switch (crypto) { // recolectar variables de base de datos
                case 1: // bitcoin
                    myChart.destroy()
                    mChart.destroy()
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
                            labelsG = childSnapshot.val().labels;
                            predictionsG.push(NextDay);
                        }
                    });
                    });
                    break;
                case 2: // etherum
                    myChart.destroy()
                    mChart.destroy()
                    utc = document.getElementById("Calendar").value;
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
                            labelsG = childSnapshot.val().labels;
                            predictionsG.push(NextDay);
                        }
                    });
                    });
                    break;
                case 3: //Litecoin
                    myChart.destroy()
                    mChart.destroy()
                    utc = document.getElementById("Calendar").value;
                    var ref = firebase.database().ref("LTC");
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
                            labelsG = childSnapshot.val().labels;
                            predictionsG.push(NextDay);
                        }
                    });
                    });
                    break;
                case 4://Dash
                    myChart.destroy()
                    mChart.destroy()
                    utc =document.getElementById("Calendar").value;
                    var ref = firebase.database().ref("DASH");
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
                            labelsG = childSnapshot.val().labels;
                            predictionsG.push(NextDay);
                        }
                    });
                    });
                    break;
                default:
                  console.log('nada');
              }
              switch (coin) { 
                case 1: // USD
                    break;
                case 2: // Euros
                    predictionsG=currencyExchange(predictionsG,EUR);
                    actualsG = currencyExchange(actualsG,EUR);
                    NextDay=currencyExchangeNextDay(NextDay,EUR);
                    hours = currencyExchange(hours,EUR);
                    break;
                case 3: //Yen
                    predictionsG=currencyExchange(predictionsG,YEN);
                    actualsG = currencyExchange(actualsG,YEN);
                    NextDay=currencyExchangeNextDay(NextDay,YEN);
                    hours = currencyExchange(hours,YEN);
                    break;
                case 4://Bolivares venezolanos
                    predictionsG=currencyExchange(predictionsG,BFS);
                    actualsG = currencyExchange(actualsG,BFS);
                    NextDay=currencyExchangeNextDay(NextDay,BFS); 
                    hours = currencyExchange(hours,BFS);            
                    break;
                case 5://Peso colombiano
                    predictionsG=currencyExchange(predictionsG,PESOC);
                    actualsG = currencyExchange(actualsG,PESOC);
                    NextDay=currencyExchangeNextDay(NextDay,PESOC); 
                    hours = currencyExchange(hours,PESOC);            
                    break;
                default:
                  console.log('nada');
              }
              
        //console.log(actualsG[actualsG.length-1]); // ver esto
        let resultado = (actualsG[actualsG.length-1]-NextDay);
        var span = document.getElementById("msj");
        var span2 = document.getElementById("msj2");
        var span3 = document.getElementById("msj3");
        if(resultado<=0){
            span.textContent = "Estimated losses of -$" + (-1*resultado);
            span2.textContent = "Time to sell!";
            span3.textContent = "Estimated predictions for tomorrow $" + NextDay;
        }else{
            span.textContent = "Estimated earnings of $" + resultado;
            span2.textContent = "Time to invert!";
            span3.textContent = "Estimated predictions for tomorrow $" + NextDay;
        }
        
             
        kike = document.getElementById("PredictionsChart");
        myChart = new Chart(kike, {
          type: 'line',
          data: {
            labels: labelsG,
            datasets: [
              { 
                data: predictionsG,
                label: 'Predictions',
                borderColor: "#19f26e",
                borderWidth: 1,
                fill: false,
                radius: 2,
              },
              {
                data: actualsG,
                label: 'Actual',
                borderColor: "#3e95cd",
                borderWidth: 1,
                fill: false,
                radius: 2,
              }]},});

        hoursP = document.getElementById("hoursPredictions");
        mChart = new Chart(hoursP, {
        type: 'line',
        data: {
            labels: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
            datasets: [
            { 
                data: hours,
                label: 'Predictions hours',
                borderColor: "#19f26e",
                borderWidth: 1,
                fill: false,
                radius: 2,
            },
            ]},});


        
        });
        

    }
    
    function currencyExchangeNextDay(day ,multi) {
        return day*multi;
    }
    
    function currencyExchange(lista,multi) {
        for (var i = 0; i < lista.length; i++) {
            lista[i]= lista[i]*multi;
         }
        return lista;
      }
    
    


    

     