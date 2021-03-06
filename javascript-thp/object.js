/* Put functionality and data bundled in one object */
// object literal
const user1 = {
  name: "Nacho",
  score: 4,
  increment: function() {
    user1.score++;
  }
};
user1.increment();

// creating user2 user dot notation
const user2 = {}; // create a const in memory, same position in memory with an empty object
user2.name = "Lucía";
user2.score = 5;
user2.increment = function() {
  user2.score++;
};

// creating user3 user oBJECT.CREATE
const user3 = Object.create(null);
user3.name = "Eva";
user3.score = 9;
user3.increment = function() {
  user3.score++;
};

// creating the object with a function without handcrafting each object, generic object
// Thats not so great because we call the function increment every time for each returned object,
// Data will change every time but functions still the same so we are duplicating them each time, BAD PERFORMANCE
function userCreator(name, score) {
  const newUser = {};
  newUser.name = name;
  newUser.score = score;
  newUser.increment = function() {
    newUser.score++;
  };
  return newUser;
}
const user1 = userCreator("Nacho", 4);
const user2 = userCreator("Lucia", 5);
user1.increment();

// A better aproach is to have a single function for all the users out of the object to save space in memory

function userCreator(name, score) {
  const newUser = Object.create(userFunctionStore); // here we keep a link
  newUser.name = name;
  newUser.score = score;

  return newUser;
}

const userFunctionStore = {
  increment: function() {
    this.score++;
  },
  login: function() {
    console.log("you are logged in");
  }
};

const user1 = userCreator("Nacho", 4);
const user2 = userCreator("Lucia", 5);
user1.increment();
/*
  First we declare function userCreator and keep it space in memory
  Second we keep an object in to memory with 2 properties that are functions
  Then we create the user 1 function which is keept memory and execution context in local memory with the parameters and the empty object
  which links to the userFunctionStore function. Then we return the object with the values that links to the computer memory
*/

// Another solution
function UserCreator(name, score) {
  this.name = name;
  this.score = score;
}

UserCreator.prototype.increment = function() {
  this.score++;
};
UserCreator.prototype.login = function() {
  console.log("login");
};

const user1 = new UserCreator("Eva", 9);
user1.increment();

// Case this points to window object in add1()
function UserCreator(name, score) {
  this.name = name;
  this.score = score;
}

UserCreator.prototype.increment = function() {
  function add1() {
    this.score++;
  }
  add1();
};
UserCreator.prototype.login = function() {
  console.log("login");
};

const user1 = new UserCreator("Eva", 9);
user1.increment();

// Solving this scope issue with flat arrows, bind this lexically
// now this points to the right side of the dot, to user1
function UserCreator(name, score) {
  this.name = name;
  this.score = score;
}

UserCreator.prototype.increment = function() {
  const add1 = () => {
    this.score++;
  };
  add1();
};
UserCreator.prototype.login = function() {
  console.log("login");
};

const user1 = new UserCreator("Eva", 9);
user1.increment();

// Avoid using prototype by using javascript classes and constructor
class UserCreator {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }

  increment() {
    this.score++;
  }
  login() {
    console.log("login");
  }
}
const user1 = new UserCreator("Eva", 9);
user1.increment();
