// Hashing functions

class BloomFilter {
  _array = new Array(100).fill(0); // _array convention to private

  add(string) {
    this._array[h1(string)] = 1; // h1,h2,h3 are hash algorithm
    this._array[h2(string)] = 1;
    this._array[h3(string)] = 1;
  }

  contains(string) {
    return (
      !!this._array[h1(string)] &&
      this._array[h2(string)] &&
      this._array[h3(string)]
    );
  }
}
// another solution included hash library and jasmine test https://codepen.io/btholt/pen/LeXRwq?editors=0010
