# Javascript: The hard parts of object oriented

Objects allows us to store data and add functionality to that data, however we are going to see step by step how to improve the way to bundle everything with the OOP paradigm in order to improve performance and readability. We will see different ways to create objects.

## Creating an Object

### Literal and manually

```javascript
const user1 = {
  name: "Nacho",
  score: 4,
  increment: function() {
    user1.score++;
  }
};
user1.increment();
```

### object dot notation

We create an empty object in memory and we fill it with properties, values and function. Its another way to create objects, but still handcraft everything.

```javascript
const user2 = {}; // create a const in memory, same position in memory with an empty object
user2.name = "Lucía";
user2.score = 5;
user2.increment = function() {
  user2.score++;
};
```

### object dot create

```javascript
const user3 = Object.create(null);
user3.name = "Eva";
user3.score = 9;
user3.increment = function() {
  user3.score++;
};
```

### Creating an object with a function

Creating the object with a function without handcrafting each object, generic object.

We save in memory storing the code with the function. We dont any of the code until we call it.

Store in memory the expected object result of user 1 before initializing function.
Everything inside the function its at a local memory that its being deleted after the execution.
First thing keep in local function memory are the function parameters, then the empty object with the properties and arguments.
After that we have the function and finally the return which is from the machine memory, not the local

Thats not so great because we call the function increment every time for each returned object.
Each time we create a new user, we make space in our computer's memory.
Ideally we could store all that functions in a single object.

We call the execution context when we run a function, all the space to run the functions code, with its own or local memory. The return the object out to global constant setted in memory we use the "return"

```javascript
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
```

### Creating an object with a function (Improving performance)

Bundle functionality and data.
First of all parameters are stored in memory. We never go inside of a function until we call it in terms of memory.
Then we declare the function userFunctionStore, which is an object properties with 2 functions.
Then we create a const with user 1 whith its execution context(local memory) first parameter which is assigned the argument...
After that we expect an empty object that links to the userFunctionStore.

Then when we call user1.increment() we go to the stored user 1 object and javascript looks for the function that links the userFunctionStore, but its just a link.
If we console log user 1 we only see the name and score with hidden properties with features, one of them is **proto** (img)

```javascript
function userCreator(name, score) {
  const newUser = Object.create(userFunctionStore);
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
```

### Constructor and keyword new

```javascript
const user1 = new UserCreator("Nacho", 5);
```

When we call the constructor function with new in front we automate 2 things:

1. Create a new user object
2. Return the new User Object

Functions are objects and functions When javascript thinks in functions in a way they give us a little place (an object) into which we can store a function. Lets see an example

```javascript
function multiplyBy2(num) {
  return num * 2;
}

multiplyBy2.stored = 5;
multiplyBy2(3); // 6
```

First we declare function multiplyBy2 saved in global memory as a function-object combo {f} so when we use dot notation we access the object. We still can call the function whith ()
When we declare a function automatically we get in the function object combo the property prototype (which is also an object)

#### another solution

```javascript
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
```

1. First of all we declare userCreator function in memory, which is a function + object that contains automatically prototype property, which is also an object (ímage of that draw). So prototype is an object property from the userCreator function-object combo.

2. Second we look to the prototype object property and we store the increment method property and the login.

3. We declare the constant user1, uninitialize in memory yet, we call user1 =new UserCreator() and we create a new execution context which has a lot of work done thank to the new keyword. In Local memory we Assign the arguments to the parameters but the new keyword makes for us some stuff(for example the this assignment to empty object in the local memory with the hidden property proto which is also alink to the userCreator.prototype object which is in global memory) Inside the auto created this object we have also the parameters with the arguments

- Image from the whiteboard

4. User1.increment(), We look for user1, we find it, then we look for the increment function, that its not inside user1, but it has the proto, which links to the prototype object from the userCreator function object, and there we find increment method, so we can execute it. That creates a new execution context, with its local and the this, which is generic, so that every user links to the same prototype.
   The this points to the left side of the dot.

- image for the execution context

```javascript
function UserCreator(name, score) {
  this.name = name;
  this.score = score;
}

UserCreator.prototype.increment = function() {
  function add1() {
    this.score++;
  }
  add1(); // This points to window
};
UserCreator.prototype.login = function() {
  console.log("login");
};

const user1 = new UserCreator("Eva", 9);
user1.increment();
```

- In this case add1() has not dot object, so this points to window object.
- To avoid this, we have flat arrow functions or (call,apply...)

```javascript
function UserCreator(name, score) {
  this.name = name;
  this.score = score;
}

UserCreator.prototype.increment = function() {
  const add1 = () => {
    this.score++;
  };
  add1(); // This points to window
};
UserCreator.prototype.login = function() {
  console.log("login");
};

const user1 = new UserCreator("Eva", 9);
user1.increment();
```

- Image of the flat arrow whith the this execution context

### Classes

Javascript will take care of keeping methods in the prototype object with the class and constructor solution.
We are writting our shared methods separately from our object constructor itself (off in the User.prototype object)
Other languages let us do this all in one place.
Nothing changes under the hood, only you have the name class and everything is wrapped.

Javascript uses this proto link to give objects, functions and arrays as a bunch of bonus functionality. All objects by default have **proto**

```javascript
const obj = { num: 3 };
obj.num; // 3
obj.hasOwnProperty("num");
Object.prototype;
```

- We create in memory an object with num:3 property value. Then we get the property with the value 3.
- Next property is a function that takes as an argument the string num. We look for obj in global memory, we find it, then we look for hasOwnProperty, there is not, but it doesnt give up, looks for the hidden property **proto** which points to...next step
- Automatically a function-object combo is created, which by default has the property prototype, which is another object that has the property hasOwnProperty, and other properties.
- Image

```javascript
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

const user1 = new UserCreator("Nachal", 10);
user1.increment();
```

```javascript
function multiplyBy2(num) {
  return num;
}
multiplyBy2.toString(); // Where is the method

Function.prototype; // {toString:FUNCTION, call:FUNCTION, bind: FUNCTION}

multiplyBy2.hasOwnProperty("score"); // Where is the function
Function.prototype.__proto__; // Object.property {hasOwnProperty: FUNCTION}
```

- First we declare the function-object combo multiplybY2 in global memory
- we look for multiplyBy2 in global memory, we find it, because of the dot notation we look for the property toString, we dont find it but dont panic, because of being an object it has automatically the hidden property \***\*proto\*\*** that refers to specific functions.prototype object (call, apply...)
- If i want to access multiplyBy2.hasOwnProperty, we look for multiplyBy2 in global memory, we find it, we look in its prototype, doesnt find it, but we look the proto, this points to prototype functions, doesnt find it but this prototype has its own proto wich points to the prototype object where we finally find it.
- Image

Arrays and functions are also objects, so they get access to all the functions in Objet.prototype but also more goodies.
When javascript loads we have another function object combo, which has also prototype which has an object with a bunch of functions in it, like toString(), call(), bind(), apply()...
Depending on if we have an object or a function, proto links to object functionality or function functionality properties, but thanks to the proto we can reach it in any case.

### Subclassing

subclassing img

When we have some objects with same properties and functionality but there are some new properties or functionality, we can do it, its called **inheritance**.
For example **user** and **paidUser**, paidUser shares the same functionality and properties that user but has some other new stuff.

- First line we create a function object combo in global memory
- Next line we create an object userFunctions {} with properties sayname and increment as functions.
- Create a const user1 (uninitialized), and this will be the return value of calling userCreator with their inputs so a new execution context is created.
- properties name and score are now in local memory inside the execution context, and then the empty object newUser {} but has the hidden property **proto** that links to userFunctions, and the properties inside the object name:'nachal',score:'8'
- the returns sends all this to global memory at the constant user1
- Then user1.sayName, we look to the user 1, we find it, we look for sayName, doesnt find it but look the proto which points the userFunctions, and there is it.

- After all that we save in global memory function paidUserCreator
- Then we save in global object paidUserFunction with increaseBalance function. Here the **proto** is also hidden. would be great that this paidUser has access to user functions. To make the proto link to userFunctions, with:

```javascript
Object.setPrototypeOf(paidUserFunctions, userFunctions); // this way we link the proto to userfunctions
```
