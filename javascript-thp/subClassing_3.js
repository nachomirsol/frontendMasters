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
