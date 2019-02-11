# FUNDAMENTALS 2

url: https://btholt.github.io/four-semesters-of-cs-part-two/

## Bloom Filters

Bloom filters are an interesting data structure which are designed to tell you quickly and efficiently if an item is in a set. If you need a reminder of what a set is, see the previous course. In exchange for being really fast and memory efficient, bloom filters trade off the fact that it can't tell you definitely if an item is in the set; it can only tell you definitely that item is not in the set. Stated differently, bloom filters have a false positive rate but do not have false negatives.

Why is that useful? Sometimes you don't care about false positives, you just want to make sure something is not in the set. url: https://blog.medium.com/what-are-bloom-filters-1ec2a50c68ff has a great article on what they use bloom filters for: they use them to filter out artciles they don't want to show you in their recommendations, whether those are items you've read before or things they've recommended too many times. What about that false positive rate? Well, they'll just filter out something they could have shown you and then show you something they definitely can show you. It's an acceptable trade off.

Check out Wikipedia for some more examples of applications.

So let's talk about how they work.

Imagine you have an array with ten elements in it. Every element in the array is a 0 bit. This is an empty bloom filter. Now we want to add "Brian" to the array. I'm going to run "Brian" through three different hashing functions (see previous course for explanation on hashing functions.) Each hashing function should be fast and definitely not cryptographically secure (which are by-design slow.) This means don't use SHA or MD5. They should also have a uniform distribution as much as possible.

Okay, so I run my string through three different hashing functions and they give me 2, 5, and 8 (I'm making up the numbers; we won't implement hashing functions so it doesn't really matter how they work.) I'll flip all those bits at those indexes so my new array is [0, 0, 1, 0, 0, 1, 0, 0, 1, 0].

After doing this, I'll check to see if "Sarah" is in the array. After running through the hashing function, they give 2, 2, and 4. 2 is flipped but 4 is not, so I can definitively say that "Sarah" is not in the data set.

So let's add one more item to the array, "Simona". The indexes we get back 0, 4, and 5. So now our array is [1, 0, 1, 0, 1, 1, 0, 0, 1, 0]. We flip both 0 and 4 indexes and 5 was already flipped so we do nothing to it. Now what happens if we check "Sarah" again? This time we'll get a false positive that "Sarah" is in the dataset. That's why the two answers you can get back from the question "Is X in the bloom filter" are no and maybe.

That's it!

So when you add more items to a bloom filter, you'll increase your false positive rate. You can mitigate this by having a larger array, but you'll be trading off on having a larger memory footprint. You can also have more or less hashing functions, trading off on how quickly memory will fill up versus false positive rates.

So let's build one!

## Tree Traversal

### Depth-first Traversal

Trees are an essential part of storing data, or at computer scientists like to refer them as, data structures. Among their benefits is that they're optimized to be searchable. Occasionally you need to serialize the entire tree into a flat data structure. Today we'll show you how to do that.

Let's start with one variant depth-first traversals: pre-order traversal. The basic gist is that for each of the nodes, you process the node (in our case, save it to an array since we're serializing this tree,) then process the left subtree and then the right tree. Let's write out that works.

Given the above tree:

1- Call our method (let's call it preorderTraverse) on the root node, 8.
2- Add 8 to our array.
3- Call preorderTraverse on the left child, 3.
4- Add 3 to our array.
5- Call preorderTraverse on the left child, 1.
6- Add 1 to our array.
7- Has no children, returns.
8- Going back up the tree, we'll call preorderTraverse on 6.
9- Add 6 to our array.
10- Call preorderTraverse on the left child, 4.
11- Add 4 to our array.
12- No children, returns.
13- Going back up the tree, we'll call preorderTraverse on 7.
14- Add 7 to the array.
So on and so forth.

// preorder
[8, 3, 1, 6, 4, 7, 10, 14, 13]

// inorder
[1, 3, 5, 6, 7, 8, 10, 13, 14]

// postorder
[1, 4, 7, 6, 3, 13, 14, 10, 8]

### Breadth-first Traversal

Now that you've done depth-first, let's tackle breadth-first. Breadth-first isn't recursive processing of subtrees like depth-first. Instead we want to process one layer at a time. Using the tree above, we want the resulting order to [8, 3, 10, 1, 6, 14, 4, 7, 13]. In other words, we start at the root, and slowly make our way "down" the tree.

The way we accomplish this is using our old friend, the queue. If you want to review what queues are, check out the previous course's section on them here. The short of it is that queues are first-in first-out.

What we're going to do is process the node, then add the left child to the queue and then add the right child to the queue. After that, we'll just dequeue an item off of the queue and call our function recursively on that node. You keep going until there's no items left in the queue.

Let's do the exercise! This can be solved recursively or iteratively, with the iterative result being the preferred of the two.

## Pathfinding

Its the way to find the best path from one point to another.
