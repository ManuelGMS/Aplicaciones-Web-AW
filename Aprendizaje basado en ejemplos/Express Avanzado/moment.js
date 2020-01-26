"use strict";

const moment = require("moment");

let hoy = moment();

console.log("HOY: " + hoy.toString());

let fech0 = moment(new Date(1984,1,1));
let fech1 = moment(new Date(2020,1,1));

console.log(fech1.diff(fech0,'years'));

fech0.set('year',2000);

console.log(fech0.toString());