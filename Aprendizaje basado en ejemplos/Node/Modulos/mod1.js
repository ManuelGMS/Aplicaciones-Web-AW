"use strict";

function ec2First(a,b,c) {
    return (-b + Math.sqrt(Math.pow(b,2) - 4 * a * c)) / 2 * a;
}

function ec2Second(a,b,c) {
    return (-b - Math.sqrt(Math.pow(b,2) - 4 * a * c)) / 2 * a;
}

module.exports = {
    ec2First: ec2First,
    ec2Second: ec2Second
}