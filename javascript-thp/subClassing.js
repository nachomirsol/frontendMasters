// Solution 2 handcraft factory function
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

/**
 * FIRST PART
 * 1- First we keep in memory userCreator function
 * 2- Next we create in memory an object userFunctions with properties sayName and Increment which are also functions
 * 3- First we declare const user 1 which has the call of the function, that creates the execution context or local memory
 * 4- Inside the execution context we first assign the arguments to the parameters
 * 5- It creates an empty object newUser made by Object.create with specific properties. It has a hidden property (proto)
 * that links to userFunctions object. We put the properties with the values
 * 6- Returns to global memory user1 object with its name, score... and hidden proto boned up to userFunctions.
 * 7- user1.sayName(), it looks for user1 object, then look to sayName, doesnt find it but javascript looks at the proto
 * that links to userFunctions, and then it find it
 */

/**
 * SECOND PART
 * 1- We keep in global memory paidUserCreator function
 * 2- Then we create in memory an object paidUserFunctions with property increaseBalance which is also a function. This object
 * has the property proto. We have to make this proto point to userFunctions so that paidUserFunction has access to userFunctions
 * and its own functions. But normal user cannot have access to paidUserFunctions
 * 3- Object.setPrototypeOf(paidUserFunctions, userFunctions) First parameterwe have the current functionallity second parameter
 * where we want to link the proto. This links the proto to userFunctions
 * 4- Create uninitiallized const paidUser1 with the call of the function paidUserCreator('Lucia','8','20') with the arguments
 * 5- Execution context local memory
 * 6- First parameters will be assigned with the arguments.
 * 7- We set a const newPaidUser with the return of userCreator, this creates a new execution context
 * 8- In its local memory we assign arguments to the parameters name:Lucia, score:8
 * 9- Then newUser empty object is created with the proto hidden property, linking to userFunctions, then inserts into the object
 * the key values arguments. Then returns the object newPaidUser to the function paidUserCreator with non usable proto because it links
 * to userFunctions
 * 10- We link the proto to the paidUserFunctions.
 * 11- Then we add a property accountBalance and return the object with the proto linking to paidUserFunctions
 
 */
