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

Its the way to find the best path(x,y) from one point to another following some rules, you can step 1 node to the top, left, right or bottom, but not step to any corner. We can solve them as trees with for child.

Let's take what we've learned and go a step further. Imagine you have a 6 by 6 grid. You have point A at [1,1] and point B at [2,6]. ([0, 0] is top left.)

• • • • • •
• A • • • •
• • • • • •
• • • • • •
• • • • • •
• • B • • •
How would you write code that finds the shortest path between A and B (no diagonals.) You could probably write some variant of looking to see if yA (the y of the A coordinate) is less than yB (y of the B coordinate). If it is, move one square from yA to yB. Rinse and repeat for the x axis. This works and given the current constraint will find you one of the shortest paths. It'd look something like:

• • • • • •
• A • • • •
• 1 • • • •
• 2 • • • •
• 3 • • • •
• 4 5 • • •
Now let's add a wall to the mix.

• • • • • •
• A • • • •
• • • • • •
• X X X X X
• • • • • •
• • B • • •
Suddenly our algorithm falls apart. You could probably devise some strategy to mitigate this but we can keep making more complicated wall structures to make it harder. So let's try something different: Dijkstra's algorithm.

The basic gist of Dijkstra's algorithm is that we'll start at both the beginning and the end node and begin "spiraling" outwards, marking each node with how far away it is from from its original Node. We'll alternate spiraling one level with one node, and then one level with the other. After one iteration of the point A (doesn't matter if you start with the A or B) it'd look like:

• 1 • • • •
1 A 1 • • •
• 1 • • • •
• X X X X X
• • • • • •
• • B • • •
Then we'd do the same to point B which would like this:

• 1 • • • •
1 A 1 • • •
• 1 • • • •
• X X X X X
• • 1 • • •
• 1 B 1 • •
We'll do this until we intersect the two spirals. As soon as the spiral intersect we know we've found the shortest possible path. Let's keep going with point A:

2 1 2 • • •
1 A 1 • • •
2 1 2 • • •
• X X X X X
• • 1 • • •
• 1 B 1 • •
Notice this algorithm accounts for obstacles: if there's an obstacle, you just skip that node and keep going.

Now point B:

2 1 2 • • •
1 A 1 2 • •
2 1 2 • • •
• X X X X X
• 2 1 2 • •
2 1 B 1 2 •
You get the point, we alternate. So let's do the next steps for both point A and B.

2 1 2 3 • •
1 A 1 2 3 •
2 1 2 3 • •
3 X X X X X
3 2 1 2 3 •
2 1 B 1 2 3
You can see they've intersected but our algorithm hasn't made that connection yet. But on the next iteration, as the spiraling is happening, those that point will see that the node it's going to has been marked by another origin point. Because of that, we know that we've found one of the shortest paths (there could be other paths that connect of the same length.) As such we've solved our problem: the shortest path is of length six. If you were keeping track of the nodes, you could give the coordinates of the path.

So, given this as the basic gist, let's speak about the more technical details. The way to accomplish is very similar to what we just did with tree traversals. In fact it's literally the same algorithm applied a different way. Let's take point A and reimagine it as a tree.

        A [1,1]
     /  /     \   \

[1,0][0,1] [1,2][2,1]
/| |\ /| |\ /| |\ /| |\
 [lots more children]
Instead of each node having at most two children like a binary search tree, each node has at most four children. Okay, now that we're thinking of this matrix as a tree, what we want to do is investigate first the nodes surrounding it, or in tree terms: its immediate children. We literally just learned how to do that with trees. It's breadth-first traversal! Let's apply the same secret algorithmic sauce to our problem here. We're going to take the root node (A) and add all of its children (neighbors, really) to a queue, and then begin processing each node as we pop them off the queue. Remember we need to alternate processing point A and point B, so we'll just alternate which ones we're pushing on the queue. Finally we'll have to keep track of visited nodes and distances, we'll just keep a duplicate matrix and mark it with what length it was and which origin point marked it. That's it!

Technically what we're is actually breadth-first search, but the mechanics of Dijkstra's algorithm is the same and so the two are often conflated with each other. See here for a more thorough explanation.

## Graphs

Let's chat about a datastructure that is extremely useful, you probably interact with many on a daily basis, but you may not use them in your code on a day-to-day: graphs. Graphs are all about modeling relations between many items. For example, think of Facebook's Social Graph. I'm friends with you and you're friends with me. But you're also friends with six hundred other people which is about five hundred fifty too many. Those people in turn also have too friends. But many of my friends are your friends, so the connections aren't linear, they're … well, they're graph-like.

In the Facebook example, each person would be a node. A node represents some entity, much like a row in an SQL database. Every so-called "friendship" would be called an edge. An edge represents some connection between two items. In this case, our Facebook friendship is bidirectional: if I'm friends with you then you're friends with me. Twitter would be an example of a unidirectional edge: just because I follow you doesn't mean you follow me.

Graphs are everywhere. Your various social networks, your Internet of Things devices that have relationships with each other, your neural-networks machine-learning libraries, everywhere. As we continue to model more-and-more of the natural world in virtual space graphs become ever-more important since relationships between things and beings exist all around us.

In your example, you'll be tracing a made-up social network. In this social network, you're going to be trying to find the most common job title amongst the people you follow. At the first level, it's easy, you just look at your immediate connections and loop over them and see what their jobs are. However, if we go further than that, we have to look at connections' connections! Hopefully this sounds vaguely familiar … it sort of sounds like trees. Or pathfinding. Aw 💩 we have to use those same algorithms again!! So let's visualize a basic graph

Bob — Sally
/ \
me Alice
\ /
Maria
In this case, let's say I'm looking for what the job titles are for the people within my second degree network: my connections and their connections, or no more than two edges away from me. If hop first to Bob, then I'll count Sally and Alice in his connections. If I hop to Maria, then I'll count Alice in her connections … for the second time. This is where graphs differ a bit: since there's no clear parent-child relationship you need to be aware there will be cycles and other more difficult patterns to deal with. In this case, I'll just keep track of users I've crawled before and not add them to my total the second time.

So traversing algorithm fits best here? We're analysizing everything in a limited depth of a sub-tree and breadth-first is well equipped to do that. Instead of letting breadth-first traversal run to completion, we'll just limit how many times that outer loop runs, effectively limiting how many levels down it goes, or how many degrees of separation!

So let's give the exercise a try, see how you do!
