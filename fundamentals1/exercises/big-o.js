function crossAdd(input) {
  var answer = [];
  for (var i = 0; i < input.length; i++) {
    var goingUp = input[i];
    var goingDown = input[input.length - 1 - i];
    answer.push(goingUp + goingDown);
  }
  return answer;
}
// The big O here is n because we go through inputs once in a looop

function find(needle, haystack) {
  for (i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle) return true;
  }
}

// also n is the Big O

function makeTuples(input) {
  var answer = [];
  for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < input.length; j++) {
      answer.push([input[i], input[j]]);
    }
  }
  return answer;
}
// expected if input = [123], [[1,2],[2,2],[2,3],[1,3]]...
// The Big O is n2, because we make to loops
