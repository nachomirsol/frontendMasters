const double = num => 2 * num;
const doubleEach = input => input.map(double);

const howMapWorks = (array, fn) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(fn(array[i]));
  }
  return result;
};
