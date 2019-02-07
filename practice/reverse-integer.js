// with for loop
function reverseInteger(input) {
  var arr = input.toString().split("");
  var arrayReversed = [];
  for (var i = arr.length; i >= 0; i--) {
    arrayReversed.push(arr[i]);
  }
  return arrayReversed.join("");
}
console.log(reverseInteger("Hola que tal"));

function reverseInteger(input) {
  var arr = input.toString().split("");
  return arr.reverse().join("");
}
console.log(reverseInteger("Hola que tal"));
