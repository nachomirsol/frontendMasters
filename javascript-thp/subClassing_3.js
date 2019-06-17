function userCreator(name, score) {
  this.name = name;
  this.score = score;
}

userCreator.prototype.sayName = function() {
  console.log("im" + this.name);
};
userCreator.prototype.increment = function() {
  this.score++;
};

const user1 = new userCreator("Phil", 5);
const user2 = new userCreator("Tim", 8);
user1.sayName();

function paidUserCreator(paidName, paidScore, accountBalance) {
  userCreator.call(this, paidName, paidScore);
  Object.setPrototypeOf(newPaidUser, paidUserFunctions);
  this.accountBalance = accountBalance;
}

paidUserCreator.prototype = Object.create(userCreator.prototype);
paidUserCreator.prototype.increaseBalance = function() {
  this.accountBalance++;
};

const paidUser1 = new paidUserCreator("Lucia", 9, 30);
paidUser1.increaseBalance();
paidUser1.sayName();

/**
 *
 * The first part we have the only difference with the new keyword, which does a little stuff automatically
 * for us.
 * In the execution context this object is created.
 * 1- Creates the this label with the object in local execution context
 * 2- sets the __proto__ hidden property boned to prototype functions
 * 3- Return the object to global memory
 *
 * Then we declare a function paidUserCreator in global memory as a function object combo that has
 * its own protototype with its proto (instead of setPrototypeOf, object.create) we override the userCreator object
 * We want also this prototype object to link to the userCreator
 */
