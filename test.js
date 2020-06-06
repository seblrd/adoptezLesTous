var tel = "0659915660"
var split = tel.match(/.{1,2}/g).join(".")
console.log(split)