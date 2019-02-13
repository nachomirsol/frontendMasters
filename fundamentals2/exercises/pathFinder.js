/**
 * The function will return a number, the number of steps to reach the target. You can step over the 0, not over the 1 which is the wall.
We will have the following function parameters. The maze is the array of arrays of numbers, the first node origin and the other node origin.
They have to reach each other, intersect. 
First we put some flags
 *  */

const NO_ONE = 0;
const BY_A = 1;
const BY_B = 2;

const findShortestPathLength = (maze, [xA, yA], [xB, yB]) => {};

// We need a useful function to look for the next points up, left, right, bottom...
const getNeighbors = (visited, x, y) => {
  const neighbors = [];
  if (y - 1 >= 0 && !visited[y - 1][x].closed) {
    // left
    neightbors.push(visited[y - 1][x]);
  }

  if (y + 1 < visited.length && !visited[y + 1][x].closed) {
    // right
    neightbors.push(visited[y + 1][x]);
  }

  if (x + 1 < visited[0].length && !visited[y][x + 1].closed) {
    // up
    neightbors.push(visited[y][x + 1]);
  }

  return neighbors;
};

const byFour = [[2, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 2]];
