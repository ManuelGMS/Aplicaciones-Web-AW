"use strict";

let uno = document.getElementById("Uno");

uno.style.backgroundColor = "red";

let dosTres = document.getElementsByClassName("secundario");

dosTres[0].style.color = "white";
dosTres[1].style.color = "green";

let parrafos = document.getElementsByTagName("p");

parrafos[0].innerHTML = "<p>Otro parrafo</p>";
