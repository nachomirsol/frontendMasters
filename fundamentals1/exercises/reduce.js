const concatenateStringsWithSpaces = list => {
  return list.reduce((acc, string) => acc + string + " ", "");
};

const howReduceWorks = (list, fn, seed) => {
  let result = seed;
  for (let i = 0; i < list.length; i++) {
    result = fn(result, list[i]);
  }
  return result;
};
