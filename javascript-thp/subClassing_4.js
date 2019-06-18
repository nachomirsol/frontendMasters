class userCreator {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }

  sayName() {
    console.log("Im " + this.name);
  }

  increment() {
    this.score++;
  }
}

const user1 = new userCreator("Phil", 4);
const user2 = new userCreator("Tim", 6);
/**
 * Now we create a paidUser, that will have some bonus properties and functionality but still have access to userCreator stuff
 */
class PaidUserCreator extends userCreator {
  constructor(paidName, paidScore, accountBalance) {
    super(paidName, paidScore);
    this.accountBalance = accountBalance;
  }
  increaseBalance() {
    this.accountBalance++;
  }
}

const paidUser1 = new paidUserCreator("Alyssa", 8, 25);
paidUser1.increaseBalance();
paidUser1.sayName();

/**
 * Extends does 2 main things:
 * 1- Have the __proto__ for the prototype object created in paidUserCreator linking to userCreator functions
 * 2- The super will go to run the userCreator to create the object
 */
