"use strict";

var _idOpen = sessionStorage.getItem("userSportiv");

var _idUser = sessionStorage.getItem("myID");

var _role = sessionStorage.getItem("role");

function OpenAccount() {
  var add = document.getElementsByClassName("admin");
  var con = document.getElementsByClassName("myacc");

  if (_idOpen == _idUser) {
    //contul meu
    for (var i = 0; i < con.length; i++) {
      con[i].style.visibility = "visible";
      con[i].style.display = "block";
    }

    for (var i = 0; i < add.length; i++) {
      add[i].style.visibility = "hidden";
      add[i].style.display = "none";
    }
  } else {
    document.getElementById("cursmele").innerHTML = "Cursurile sportivului";

    for (var i = 0; i < con.length; i++) {
      con[i].style.visibility = "hidden";
      con[i].style.display = "none";
    }

    for (var i = 0; i < add.length; i++) {
      add[i].style.visibility = "visible";
      add[i].style.display = "block";
    }
  }
}

OpenAccount();
var logbutton = document.getElementById('logout');

logbutton.onclick = function Logout() {
  sessionStorage.setItem("userSportiv", 0);
  sessionStorage.setItem("myID", 0);
  sessionStorage.setItem("role", 0);
  window.location = "/";
};

var promote = document.getElementById('promote');

promote.onclick = function PromoveazaSportiv() {
  //deschid un formular intr o fereastra noua ce va fi un post catre upgrade]
  //se incarca acolo numele si campurile ce vor trebui incarcate
  window.open("/addelements/upgradeUser.html", target = "_blank", "width:200px,height:200px");
};

function RetragereCurs(idcurs) {
  window.open('/user/removeCourse/' + _idUser + "/" + idcurs, target = "_blank", "width:200px,height:200px");
}