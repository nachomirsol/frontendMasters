# FUNDAMENTALS 1

url: http://btholt.github.io/four-semesters-of-cs/

## Big O

The way how we analyze how efficient algorithms, focusing to the important things that makes the result really consume big resources. For example Big O for 3x2 + x + 1 is (x2)

## Recursion

Recursion is when you define something in terms of itself, example of triangles made of triangles.
Functions that calls itself. Sometimes we use loops instead because of the footprint they have. Perfect for readeability
It is really important in recursion to know when to stop, if not you get stucked.

## SORTING

### Bubble sort

In bubble sort, we're going to loop through the array and compare each index with the index next to it. If the those two numbers are out of order (the lesser index's value is greater than the greater index's value) we swap those two numbers' places in the array. We keep looping over that array until everything is in place and nothing was swapped during the last iteration.

What's the Big O on this? Well, there's an inner loop to check to see if indexes need to be swapped, and an outer loop that's just checking to see if anything was swapped. That would be make it O(n²). Not efficient, but a great learning too

### Insertion sort

We're going to start at the beginning of the list and assume we have a sorted list of length 1 where the first element is only sorted element. We're then going to grab the second element, and insert it into the correct spot in our sorted list, either the 0 index or the 1 index, depending if it's smaller or larger than our first element. We now have a sorted list of length 2. We then continue on down the line, inserting elements in our sorted side of the list as the unsorted side dwindles.
Big O is n2 but can be n in best scenario

### Merge sort

The basic gist of merge sort is that you're going to take your big list, and first divide down in two half size lists and recursively call merge sort on those smaller list, which in turn will do the same. The base case is when you have a list of one, at which point you will return that sorted list of one. On the way up the recursive calls, you will merge those sorted lists together (preferably by another merge function you'll write) that walks through both lists simultaneously and inserts the smaller value first, effectively creating a bigger sorted list.

### Quick sort

Quicksort is one of the most useful and powerful sorting algorithms out there. Divide and conquer. The basic gist is that you take the last element in the list and call that the pivot. Everything that's smaller than the pivot gets put into a "left" list and everything that's greater get's put in a "right" list. Another Big O of O(n log n) but takes up less memory than mergesort so it is often favored. However it does really poorly if you pass it a sorted list

### Median value

Find the mid index of 2 or more given arrays, we can use merge sort to solve this. Divide and conquer.

## DATA STRUCTURES - INTERFACES

### Set

You'll also hear them called collections depending which language you're working with. A set allows allows at least four things: add, remove, contains, and toList. The basic idea is that you can add items to a set and then later check if they're there. Example: List of usernames.

### Map

Maps are quite similar to simple JavaScript objects. Maps are a set/collection of keys that have values associated with those keys. Unlike objects, they don't have prototypes, inheritance, methods, or anything of that sort. Maps are also similar to associative arrays in other languages.

### Stack

Stack is an interface that adheres to the "Last-In First-Out" (LIFO) mantra. In a stack, you can only push (add) or pop (remove.) The last thing you pushed will be what pop returns to you (pop will also remove it from the stack.) Often they'll have a method called peek too which just looks at the top value of the stack without modifying the stack.
Example:

```javascript
function double(x) {
  return 2 * x;
}
function squareAndAddFive(y) {
  return square(y) + 5;
}
function square(z) {
  return z * z;
}

function maths(num) {
  var answer = double(num);
  answer = squareAndAddFive(answer);
  return answer;
}

maths(5);
```

-> maths is called; JS pushes maths call on its call stack
-> inside maths, double is called; JS pushes double onto its call stack
-> doubles completes, returns value 10; JS pops double off its call stack
-> back inside maths, squareAndAddFive is called;
JS pushes squareAndAddFive on its call stack
-> inside squareAndAddFive, square is called;
JS pushes square on its call stack

Let's look at call stack right now

square
squareAndAddFive
maths
main

-> square completes, returns 100
-> squareAndAddFive completes, returns 105
-> maths completes, returns 105

As you can see, your code is modeled using a stack, and if you've done any amount of modern (often C based) programming, that should make some sense to you.

### Queue

Can't talk about a stack without talking about a queue. Queues adhere to the "First-In First-Out" mantra. As the name may invoke the imagery for you, it's similar to people queueing in line (hopefully.) All stacks need to have the methods enqueue (add/push) and dequeue (remove/pop). Like stacks, they'll have peek to see what the next element is to dequeue.

Queues are useful for lots of programming problems. How about print jobs? Usually you want things to print in the order sent to the printer; otherwise Janice from Accounting is going to be printing all of her documents before you can print anything.

There are also priority queues as well. In a priority queue you also assign a priority to the elements that are enqueued. Items that have higher priorities get dequeued first. This is useful for networking; some packets are more important than others. If you're streaming video, that gets a high priority because getting a packet later means likely skipping some frames, whereas syncing to Dropbox can wait for a lull in network traffic to continue syncing.

## ARRAY LIST

We are going to talk about two types of implementations of array, ArrayList and LinkedList (terms we're borrowing from Java.) What we're going to do is to approximate how these work underneath the hood; in reality since JavaScript is a garbage-collected language that you don't have worry about allocation and de-allocation, it is simplified.

ArrayList is done by directly interacting with an allocated piece of memory. You then interact with that allocated piece of memory by addressing the specific indices in the array. In other words, you just treat it like a normal array. However things get a bit more complicated when deleting items from an ArrayList: you have to collapse the list down to the spot where you deleted.

[a,b,c,d,e,f,g]
-> delete index 3
-> array is [a,b,c,(blank),e,f,g]
-> shift elements 4,5,6 back one index
-> array is [a,b,c,e,f,g]
-> decrement length

Your index is descriptive of where to go to get the thing you are looking for. Shifting array elements like insert into array something or delete elements in an array becomes expensive because all the elements have to move.

## LINKED LIST

For our second data structure, we're going to implement a LinkedList. LinkedList is made of a bunch of nodes that point to the next one in the list. Every node in a LinkedLists has two properties, the value of whatever is being store and a pointer to the next node in the list.

gETS ARE RE

LinkedLists have their ups and downs. On one hand, adding and removing is a breeze: you just have the change the next pointer on the previous node and that's it. Getting is a pain though: if .get is called you have to loop through the nodes until you get to the right node. And that's the tradeoff between LinkedList and ArrayList: LinkedList's adds and deletes are O(1) but the gets are O(n); ArrayList's adds and deletes are O(n) but the gets are O(1). So which one is better? It depends! If you're doing a bunch of adds and deletes but not many gets, stick to LinkedLists. Doing a bunch of gets? ArrayLists. Both? You decide!

Let's dissect a delete.

value: [a][b] [c][d]
next: [ ]-> [ ]-> [ ]-> [ ]-> null

-> delete is called on index 2 (value 'c')
-> grab the head (value 'a')
-> loop through the nexts until you get the index
before the one to be deleted (value 'b')
-> change the the next of index 1 to be the next of index 2
-> decrement length
-> return the value of the deleted node
