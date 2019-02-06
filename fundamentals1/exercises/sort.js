/***************************************  ****************************************/
/** BUBBLE SORT */
/***************************************  ****************************************/

function bubbleSort(arr) {
  for (var i = 0; i <= arr.length - 1; i++) {
    for (var j = i + 1; j <= arr.length; j++) {
      if (arr[i] < arr[j]) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}
bubbleSort([2, 7, 4, 5]);

/***************************************  ****************************************/
/** INSERTION SORT */
/***************************************  ****************************************/
function insertion_sort(arr) {
  for (var i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] < arr[j]) {
        var spliced = arr.splice(i, 1); // we take 1 element in position i from the array, this return the removed element
        arr.splice(j, 0, spliced[0]); // We insert
      }
    }
  }
  return arr;
}

/***************************************  ****************************************/
/** MERGE SORT */
/***************************************  ****************************************/
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  var length = arr.length;
  var middle = Math.floor(length / 2);

  var left = arr.slice(0, middle);
  var right = arr.slice(middle, length);

  var sortedLeft = mergeSort(left);
  var sortedRight = mergeSort(right);

  return stitch(sortedLeft, sortedRight);
}

function stitch(left, right) {
  var arrayResult = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      arrayResult.push(left.shift());
    } else {
      arrayResult.push(right.shift());
    }
  }

  while (left.length) {
    arrayResult.push(left.shift());
  }

  while (right.length) {
    arrayResult.push(right.shift());
  }

  return arrayResult;
}

mergeSort([2, 1, 5, 3, 7, 6, 8, 4]);

/***************************************  ****************************************/
/** QUICK SORT */
/***************************************  ****************************************/
// Really not eficient for sorted arrays, look for quicksort 3
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  var pivot = arr[arr.length - 1];
  var left = [];
  var right = [];

  for (var i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}
quickSort([4, 1, 2, 7, 8, 6, 9, 3]);
