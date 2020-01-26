"use strict";

const _ = require("underscore");

let sol = undefined;
let example0 = [1,8,2,6,9,11,21,3];
let example1 = [100,500,2,600,150,9];

sol = _.chunk(example0,2);
console.log("CHUNK: " + sol[0]);

sol = _.contains(example0,9,5);
console.log("CONTAINS: " + sol);
sol = _.contains(example0,9,2);
console.log("CONTAINS: " + sol);

sol = _.intersection(example0,example1);
console.log("INTERSECTION: " + sol);

sol = _.every(example0, function(num) {
    return num < 50;
});
console.log("EVERY: " + sol);

sol = _.sortBy(example0,function(num) {
    return Math.abs(num);
});
console.log("SORT: " + sol);
