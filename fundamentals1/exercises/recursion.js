function basicRecursion(max, current) {
  if (current > max) return; // This is the condition to stop
  console.log(current);
  basicRecursion(max, current + 1);
}
basicRecursion(5, 1);

/***************************************  ****************************************/
/** FIBONACCI */
/***************************************  ****************************************/

function fibonacci(n) {
  if (n <= 2) {
    // if(n === 0 || n === 1)
    return 1;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}
// Expected result {1,2,3,5,8,13,21,34.....}

/***************************************  ****************************************/
/** FACTORIALS */
/***************************************  ****************************************/
