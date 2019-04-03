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
