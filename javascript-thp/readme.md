# Javascript: The hard parts of object oriented

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

We create an empty object in memory and we fill it with properties, values and function

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
Ideally we could store all that functions in a single object

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
