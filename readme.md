# FUNDAMENTALS 1

url: http://btholt.github.io/four-semesters-of-cs/

## Big O

The way how we analyze how efficient algorithms, focusing to the important things that makes the result really consume big resources. For example Big O for 3x2 + x + 1 is (x2)

## Recursion

Recursion is when you define something in terms of itself, example of triangles made of triangles.
Functions that calls itself. Sometimes we use loops instead because of the footprint they have. Perfect for readeability
It is really important in recursion to know when to stop, if not you get stucked

## Bubble sort

In bubble sort, we're going to loop through the array and compare each index with the index next to it. If the those two numbers are out of order (the lesser index's value is greater than the greater index's value) we swap those two numbers' places in the array. We keep looping over that array until everything is in place and nothing was swapped during the last iteration.

What's the Big O on this? Well, there's an inner loop to check to see if indexes need to be swapped, and an outer loop that's just checking to see if anything was swapped. That would be make it O(n²). Not efficient, but a great learning too

## Insertion sort

We're going to start at the beginning of the list and assume we have a sorted list of length 1 where the first element is only sorted element. We're then going to grab the second element, and insert it into the correct spot in our sorted list, either the 0 index or the 1 index, depending if it's smaller or larger than our first element. We now have a sorted list of length 2. We then continue on down the line, inserting elements in our sorted side of the list as the unsorted side dwindles.
Big O is n2 but can be n in best scenario

## Merge sort

The basic gist of merge sort is that you're going to take your big list, and first divide down in two half size lists and recursively call merge sort on those smaller list, which in turn will do the same. The base case is when you have a list of one, at which point you will return that sorted list of one. On the way up the recursive calls, you will merge those sorted lists together (preferably by another merge function you'll write) that walks through both lists simultaneously and inserts the smaller value first, effectively creating a bigger sorted list.
