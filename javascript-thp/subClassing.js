// Solution 2 handcraft
function userCreator(name, score) {
  const newUser = Object.create(userFunctions);
  newUser.name = name;
  newUser.score = score;
  return newUser;
}

userFunctions = {
  sayName: function() {
    console.log("im " + this.name);
  },
  increment: function() {
    console.log(this.score++);
  }
};

const user1 = userCreator("Nachal", 8);
user1.sayName();

function paidUserCreator(paidName, paidScore, accountBalance) {
  const newPaidUser = userCreator(paidName, paidScore);
  Object.setPrototypeOf(newPaidUser, paidUserFunctions);
  newPaidUser.accountBalance = accountBalance;
  return newPaidUser;
}

const paidUserFunctions = {
  increaseBalance: function() {
    this.accountBalance++;
  }
};

Object.setPrototypeOf(paidUserFunctions, userFunctions);

const paidUser1 = paidUserCreator("Lucia", 9, 30);
paidUser1.increaseBalance();
paidUser1.sayName();
