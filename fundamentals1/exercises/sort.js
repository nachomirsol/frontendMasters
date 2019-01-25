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
