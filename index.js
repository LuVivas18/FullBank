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

// Registrarse 

let btnRegister = document.getElementById("btnRegister");
if (btnRegister){
    $("#btnRegister").click(()=>{
        const full_name = $('#user').val();
        const birthday = $('#birthday').val();
        const phone = $('#phone').val();
        const address = $('#address').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const identificacion = $('#Identificacion-transfer').val();
        const amount = 10000;
        const combo = document.getElementById("Crypto");
        const selected = combo.options[combo.selectedIndex].text;
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
                identificacion: identificacion,
                userUID: user.uid,
                amount: amount,
                fav_cripto: selected,
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
};



if (window.location.pathname==="/user-login.html"){
    const database = firebase.database();
    const database_ref = database.ref();
    const ref = firebase.database().ref("sesion");
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
    var estado=0;
    var aux=0; 
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
                    identificacion: childSnapshot.val().identificacion,
                    amount: childSnapshot.val().amount,
                    fav_cripto: childSnapshot.val().fav_cripto
                }
                database_ref.child('sesion/ultimo_usuario').update(Uuser_data);
                document.getElementById("titulo-dashboard").innerHTML = ('Tablero de mandos - ' + childSnapshot.val().full_name);
                document.getElementById("cuenta").innerHTML = ('$ ' + childSnapshot.val().amount);
                estado = childSnapshot.val().amount;
                document.getElementById("msj").innerHTML = ('Prediccion de la Criptomoneda ' + childSnapshot.val().fav_cripto);
                document.getElementById("Titulo").innerHTML = ('Proyecciones prox. 24hrs (' + childSnapshot.val().fav_cripto+')');
                document.getElementById("msj2").innerHTML = ('Crecimiento de Criptomoneda ' + childSnapshot.val().fav_cripto);
                document.getElementById("msj3").innerHTML = ('Conversion de su saldo en ' + childSnapshot.val().fav_cripto);
                
                
    var actualsG = [];
    var NextDay=0;
    var hours = [];
    var ref3 = firebase.database().ref(childSnapshot.val().fav_cripto);
    let date = new Date();
    let day = date.getDate() -2;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let utc;

    if(month < 10){
        utc = `${year}-0${month}-${day}`
    }else{
        utc = `${year}-${month}-${day}`
    }
    ref3.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        childData = {...childSnapshot.val()} 
        if (childSnapshot.val().fecha === utc){
            hours = childSnapshot.val().rama24;
            actualsG= childSnapshot.val().precios_reales;
            NextDay = childSnapshot.val().predicion;
            console.log('hours: ' + hours, "\n actualsG: " + actualsG,"\n NextDay: " + NextDay);
            var Incremento = ( actualsG[actualsG.length-1] - actualsG[actualsG.length-2])/actualsG[actualsG.length-2] *100
            
            document.getElementById("Predc").innerHTML = ('$ ' + NextDay.toFixed(2));
            var r = estado * actualsG[actualsG.length-1];
            document.getElementById("gocho").innerHTML = ('💰 ' + r.toFixed(2));
            if (Incremento<0){
                document.getElementById("porcentajeC2").innerHTML = ('');
                document.getElementById("porcentajeC1").innerHTML = ('En bajada');
                document.getElementById("crecimiento").innerHTML = ('- % ' + (-1*Incremento.toFixed(2)));
            }else{
                document.getElementById("porcentajeC1").innerHTML = ('');
                document.getElementById("porcentajeC2").innerHTML = ('En subida');
                document.getElementById("crecimiento").innerHTML = ('% ' + Incremento.toFixed(2));
            }
            var hoursP = document.getElementById("myChart");
            var mChart = new Chart(hoursP, {
            type: 'line',
            data: {
                labels: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
                datasets: [
                { 
                    data: hours,
                    label: 'Horas de predicciones',
                    borderColor: "#19f26e",
                    borderWidth: 1,
                    fill: false,
                    radius: 2,
                },
                ]},}) ;          
                        }
                    });
                    });
    
            }
        });
    })
    
    
    
    /*codigo para mostrar datos en home */
    //Incremento porcentual = (Valor final – Valor inicial)/Valor inicial *100
    
    
    


}

if (window.location.pathname==="/user-perfil.html"){
        const auth = firebase.auth();
        const database = firebase.database();
        var ref = firebase.database().ref("sesion");
        var childData;
        ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            childData = {...childSnapshot.val()}   
            prof_name.value = childSnapshot.val().full_name;
            prof_birthday.value = childSnapshot.val().birthday;
            prof_email.value = childSnapshot.val().email;
            prof_phone.value = childSnapshot.val().phone;
            prof_phone2.value = "None";
            prof_address.value = childSnapshot.val().address;
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
};   


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


if (window.location.pathname==="/user-login-transfer.html"){
    const database = firebase.database();
    const database_ref = database.ref();
    const ref = firebase.database().ref("sesion");
    var id, envia;
    var aux = "";
    var FromID = document.getElementById("FromID");
    ref.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        id = childSnapshot.val().identificacion;
        envia = childSnapshot.val().amount;
        aux = childSnapshot.val().userUID;
    });

    FromID.value = id;  
    });}


    let btnAccept = document.getElementById("btnAccept");
    if (btnAccept){
        btnAccept.addEventListener('click', function(){
            const database = firebase.database();
            const database_ref = database.ref();
            var ref2 = firebase.database().ref("user");
            var ToID = document.getElementById("ToID").value;
            var ToName = document.getElementById("ToName").value;
            var monto_enviar = document.getElementById("transfer").value;
            var monto_recibido=0, resta=0, recibe=0;
            var aux2="";
            var childData;
            ref2.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                childData = {...childSnapshot.val()}   
                    if (childSnapshot.val().identificacion === id){
                        envia = childSnapshot.val().amount;
                        resta = envia - monto_enviar; // nuevo monto del usuario que envia
                        aux = childSnapshot.val().userUID;
                    } 
                });
                });
                
                ref2.on("value", function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                    if (monto_enviar <= envia){
                        if ((childSnapshot.val().full_name === ToName) && (childSnapshot.val().identificacion === ToID)){
                            recibe = childSnapshot.val().amount; // el monto que tiene el que recibe
                            aux2= childSnapshot.val().userUID; 
                        }
                    }
                    });
                    });
                if (monto_enviar <= envia){
                    monto_recibido = parseInt(monto_enviar) + recibe; // el nuevo monto del usuario que recibio
                    database_ref.child('user/'+aux+'/amount').set(resta); 
                    database_ref.child('user/'+aux2+'/amount').set(monto_recibido);   
                }else{
                    alert("saldo insuficiente");
                }
        });
    }


    // dbRef.child("user").get().then((snapshot) => {
    //     if (snapshot.exists()) {
    //       usersData = snapshot.val();
    //     } else {
    //       console.log("No data available");
    //     }
    //   }).catch((error) => {
    //     console.error(error);
    //   });





 /* Notificaciones */ 
 function dates() {
    var fechaInicio = new Date('2022-01-10');
    var fechaFin    = new Date('2022-01-14');
    var lista = []
    while(fechaFin.getTime() >= fechaInicio.getTime()){
        fechaInicio.setDate(fechaInicio.getDate() + 1);
        lista.push(fechaInicio.getFullYear() + '-0' + (fechaInicio.getMonth() + 1) + '-' + fechaInicio.getDate());
    }
    lista = lista.reverse();
    return lista;
  }
      
 // insertando notificaciones
 let Boton = document.getElementById("Boton");
    if (Boton){
        Boton.addEventListener('click', function(){
            const prueba = document.getElementById('probando');
        var days = dates()
        var cryp = ["BTC","ETH","DASH","LTC"]
        let tm = "";
        let tm2 = "";
        let td= "";
        let tc= "";
        var msj= [];
        var msj2=[];
        var dats=[];
        var crt=[];
        
        var ref = firebase.database().ref("Notificaciones");
        for (var i = 0; i < days.length; i++) {
            
            for (var j = 0; j < cryp.length; j++) {
                ref.on("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                childData = {...childSnapshot.val()} 
                console.log(childSnapshot.val().labels)
                if ((childSnapshot.val().labels ===cryp[j]) && (childSnapshot.val().fecha === days[i])){
                    tm = childSnapshot.val().msj;
                    tm2 = childSnapshot.val().msj2;
                    td = childSnapshot.val().fecha;
                    tc = childSnapshot.val().labels;
                    console.log(tm)
                    msj.push(tm);
                    msj2.push(tm2); 
                    crt.push(tc);
                    dats.push(td);
                                }else{
                                    console.log('no')
                                }      
                                    });
                                    });
                            
                         }
                        
                     }
    for (let index = 0; index < msj.length; index++) {
        const div = document.createElement('div');
        const div2 = document.createElement('div');
            div.innerHTML = '<h3>Message<i class="fas fa-bell"></i></h3><h2>Finanzas de '+crt[index]+'</h2><p><span class="percentage-green">Fecha: '+dats[index]+'</span></p><p><span class="text-complement">Fecha: '+msj[index]+'</span></p>';
            prueba.appendChild(div);
        
            div2.innerHTML = '<h3>Message<i class="fas fa-bell"></i></h3><h2>Prediccion de '+crt[index]+'</h2><p><span class="percentage-green">Fecha: '+dats[index]+'</span></p><p><span class="text-complement">Fecha: '+msj2[index]+'</span></p>';
            prueba.appendChild(div2);
        
        
    }



        })}


 
        
                        
    
    

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
              label: 'predicciones',
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
            label: 'Horas de predicciones',
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
         var k1="",k2="";
        const crypto = parseInt( document.getElementById("Crypto").value);
        const coin =  parseInt(document.getElementById("Coin").value);
        utc = document.getElementById("Calendar").value;
        let LabelP = document.getElementById("LabelP");
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
                    k1 = 'BTC'
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
                    k1 = 'ETH'
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
                    k1 = 'LTC'
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
                    k1 = 'DASH'
                    break;
                default:
                  console.log('nada');
              }
              switch (coin) { 
                case 1: // USD
                    k2 = 'USD'
                    break;
                case 2: // Euros
                    predictionsG=currencyExchange(predictionsG,EUR);
                    actualsG = currencyExchange(actualsG,EUR);
                    NextDay=currencyExchangeNextDay(NextDay,EUR);
                    hours = currencyExchange(hours,EUR);
                    k2 = 'EUR'
                    break;
                case 3: //Yen
                    predictionsG=currencyExchange(predictionsG,YEN);
                    actualsG = currencyExchange(actualsG,YEN);
                    NextDay=currencyExchangeNextDay(NextDay,YEN);
                    hours = currencyExchange(hours,YEN);
                    k2 = 'YEN'
                    break;
                case 4://Bolivares venezolanos
                    predictionsG=currencyExchange(predictionsG,BFS);
                    actualsG = currencyExchange(actualsG,BFS);
                    NextDay=currencyExchangeNextDay(NextDay,BFS); 
                    hours = currencyExchange(hours,BFS);  
                    k2 = 'BsV'          
                    break;
                case 5://Peso colombiano
                    predictionsG=currencyExchange(predictionsG,PESOC);
                    actualsG = currencyExchange(actualsG,PESOC);
                    NextDay=currencyExchangeNextDay(NextDay,PESOC); 
                    hours = currencyExchange(hours,PESOC);    
                    k2 = 'COP'         
                    break;
                default:
                  console.log('nada');
              }
              
        //console.log(actualsG[actualsG.length-1]); // ver esto
        let resultado = (actualsG[actualsG.length-1]-NextDay);
        var span = document.getElementById("msj");
        var span2 = document.getElementById("msj2");
        var span3 = document.getElementById("msj3");
        

        if (cur=="true"){
            span3.textContent = "Predicciones estimadas para mañana $" + NextDay.toFixed(3)+" con una curva ascendente";
        }else{
            span3.textContent = "Predicciones estimadas para mañana $" + NextDay.toFixed(3)+" con una curva descendente";
        }
        if(resultado<=0){
            span.textContent = "Pérdidas estimadas de -$" + (-1*resultado).toFixed(3);
            span2.textContent = "Hora de vender!";
            
        }else{
            span.textContent = "Ganancias estimadas de $" + resultado.toFixed(3);
            span2.textContent = "Hora de invertir!";
        }
        
        LabelP.textContent = "Predicciones (" + k1+"-"+k2+")";
        kike = document.getElementById("PredictionsChart");
        myChart = new Chart(kike, {
          type: 'line',
          data: {
            labels: labelsG,
            datasets: [
              { 
                data: predictionsG,
                label: 'Predicciones',
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
                label: 'Horas de predicciones',
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
    
    


    

     