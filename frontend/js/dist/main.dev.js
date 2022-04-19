"use strict";

var sections = document.querySelectorAll("section");
var navLi = document.querySelectorAll("nav .meniu ul li"); //alert(sections.length);

window.addEventListener("scroll", function () {
  var current = "";
  var pos = 0;
  sections.forEach(function (section) {
    var sectionTop = section.offsetTop;
    var sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id"); //alert(current);
    }
  }); //vezi daca nu e nici una activa sa o pui prima, home ul
  //vezi cand e la contact 

  pos = 0;
  navLi.forEach(function (li) {
    li.classList.remove("active");

    if (li.classList.contains(current)) {
      li.classList.add("active");
      pos = 1;
    }
  });

  if (pos == 0) {
    navLi[0].classList.add("active");
  }
}); //slider

var slider = tns({
  container: ".my-slider",
  "slideBy": 1,
  "speed": 400,
  "nav": false,
  controlsContainer: "#controls",
  prevButton: ".prev",
  nextButton: ".next",
  autoWidth: true,
  loop: true,
  center: 'true',
  responsive: {
    1200: {
      items: 4,
      gutter: 20
    },
    980: {
      items: 3,
      gutter: 20
    },
    800: {
      items: 1,
      gutter: 10
    },
    400: {
      items: 1
    }
  }
}); //hamburger menu

function displayMenu() {
  var x = document.getElementById("menu"); // x.style.display="block";

  x.style.visibility = "visible";
  x.style.opacity = "1";
  x.style.width = "15em";
  var y = document.getElementById("nc"); // y.style.display="block";

  y.style.visibility = "visible";
  y.style.opacity = "1";
  y.style.width = "15em";
  var z = document.getElementById("mobile-cta"); //z.style.display="none";

  z.style.visibility = "hidden";
  x.style.opacity = "1";
  var z1 = document.getElementById("mobile-exit"); //z1.style.display="block";

  z1.style.visibility = "visible";
  z1.style.opacity = "1";
  z1.style.right = "12em";
}

function hideMenu() {
  var x = document.getElementById("menu"); // x.style.display="none";

  x.style.visibility = "hidden";
  x.style.opacity = "0";
  x.style.width = "0";
  var y = document.getElementById("nc"); //y.style.display="none";

  y.style.visibility = "hidden";
  y.style.opacity = "0";
  y.style.width = "0";
  var z = document.getElementById("mobile-cta"); //z.style.display="block";

  z.style.visibility = "visible";
  z.style.opacity = "1";
  var z1 = document.getElementById("mobile-exit"); //z1.style.display="none";

  z1.style.visibility = "hidden";
  z1.style.opacity = "0";
  z1.style.right = "0";
} //functii


var _idUser = 1;
var role = 0; //0-guest, 1-sportiv, 2-instructor(admin);

sessionStorage.setItem('myID', _idUser);
sessionStorage.setItem('role', role);
sessionStorage.setItem('userSportiv', _idUser);
var u = sessionStorage.getItem('myID');

function InscriereCurs(idCurs) {
  alert("inscriere la cursul " + idCurs);
}

function AdaugareArticol() {
  alert("Adauga articol nou");
}

function AdaugareCurs() {
  alert("adauga curs nou");
}

function OpenProfile(idSportiv) {
  //daca eu sunt admin at deschid profilul cu datele necesare
  //altfel nu
  sessionStorage.setItem('userSportiv', idSportiv);

  if (role == 2) {
    //sunt admin deci deschid profilul la sportivul cu numele(id ul)
    //transmit cumva sa mi incarce in pagina sportivului acel id.
    //alert(role);
    window.location = "profil.html";
  }
}

function PromoveazaSportiv(idSportiv) {}

ShowCustomAccount();

function ShowCustomAccount() {
  var con = document.getElementsByClassName("con");
  var add = document.getElementsByClassName("adminOnly");
  var orr = document.getElementsByClassName("orar-dynamic");

  if (role == 0) {
    //guest
    for (var i = 0; i < con.length; i++) {
      con[i].style.visibility = "hidden";
      con[i].style.display = "none";
    }

    for (var i = 0; i < add.length; i++) {
      add[i].style.visibility = "hidden";
      add[i].style.display = "none";
    } //myacc nu are treaba ca e in pagina de profil

  } else if (role == 1) {
    //sportiv
    for (var i = 0; i < con.length; i++) {
      con[i].style.visibility = "visible";
      con[i].style.display = "block";
    }

    for (var i = 0; i < add.length; i++) {
      add[i].style.visibility = "hidden";
      add[i].style.display = "none";
    }

    for (var i = 0; i < orr.length; i++) {
      orr[i].style.visibility = "visible";
      orr[i].style.display = "table";
    }
  } else {
    //admin
    for (var i = 0; i < con.length; i++) {
      con[i].style.visibility = "visible";
      con[i].style.display = "block";
    }

    for (var i = 0; i < add.length; i++) {
      add[i].style.visibility = "visible";
      add[i].style.display = "block";
    }

    for (var i = 0; i < orr.length; i++) {
      orr[i].style.visibility = "visible";
      orr[i].style.display = "table";
    }
  }
}

ShowCustomAccount();

function LoginUser() {
  //iau usernameul si parola si verific cu baza de date
  //pun id ul in variabila _idUser 
  //
  ShowCustomAccount();
}

function OpenProfileOrLogin() {
  //daca sunt conectat deschid profilul
  //daca nu sunt conectat deschid login
  if (role == 0) {
    window.location = "login.html";
  } else {
    sessionStorage.setItem('userSportiv', _idUser);
    window.location = "profil.html";
  }
}