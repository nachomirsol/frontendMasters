/**
 * The function will return a number, the number of steps to reach the target. You can step over the 0, not over the 1 which is the wall.
We will have the following function parameters. The maze is the array of arrays of numbers, the first node origin and the other node origin.
They have to reach each other, intersect. 
First we put some flags
 *  */

const NO_ONE = 0;
const BY_A = 1;
const BY_B = 2;

const findShortestPathLength = (maze, [xA, yA], [xB, yB]) => {
  const visited = maze.map((row, y) => {
    return row.map((point, x) => {
      return {
        closed: point === 1,
        length: 0,
        openedBy: NO_ONE,
        x: x,
        y: y
      };
    });
  });

  visited[yA][xA].openedBy = BY_A;
  visited[yB][xB].openedBy = BY_B;

  let aQueue = [visited[yA][xA]];
  let BQueue = [visited[yB][xB]];

  let iteration = 0;
  while (aQueue.length && BQueue.length) {
    iteration++;
    const aNeighbors = aQueue.reduce((acc, neighbor) => {
      return acc.concat(getNeighbors(visited, neighbor.x, neighbor.y));
    }, []);

    aQueue = [];

    for (let i = 0; i < aNeighbors.length; i++) {
      const neighbor = aNeighbors[i];
      if (neighbor.openedBy === BY_B) {
        return neighbor.length + iteration;
      } else if (neighbor.openedBy === NO_ONE) {
        neighbor.length = iteration;
        neighbor.openedBy = BY_A;
        aQueue.push(neighbor);
      }
    }

    const bNeighbors = aQueue.reduce((acc, neighbor) => {
      return acc.concat(getNeighbors(visited, neighbor.x, neighbor.y));
    }, []);

    bQueue = [];

    for (let i = 0; i < bNeighbors.length; i++) {
      const neighbor = bNeighbors[i];
      if (neighbor.openedBy === BY_A) {
        return neighbor.length + iteration;
      } else if (neighbor.openedBy === NO_ONE) {
        neighbor.length = iteration;
        neighbor.openedBy = BY_B;
        bQueue.push(neighbor);
      }
    }
  }
  return -1;
};

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
    // Bottom
    neightbors.push(visited[y][x + 1]);
  }

  if (x - 1 >= 0 && !visited[y][x - 1].closed) {
    // Up
    neightbors.push(visited[y][x - 1]);
  }

  return neighbors;
};

const byFour = [[2, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 2]];
const arrayPosition = byFour[x][y];
