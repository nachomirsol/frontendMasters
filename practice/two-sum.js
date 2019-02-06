/* 
Given an array of integers, return indices of the two numbers such that they add up to a specific target.
You may assume that each input would have exactly one solution, and you may not use the same element twice. 
Example:
Given nums = [2, 7, 11, 15], target = 9,
Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
*/

// Brute Force Solution
var twoSum = function(nums, target) {
  var result = [];

  for (var i = 0; i < nums.length; i++) {
    for (var j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        result.push(i);
        result.push(j);
      }
    }
  }
  return result;
};

// Improved version
var twoSum = function(nums, target) {
  var result = [];
  nums.forEach(function(num, i) {
    var diff = target - num;
    var k = nums.indexOf(diff);
    if (k > -1 && k !== i) {
      result.push(i);
      result.push(k);
    }
  });
  return result;
};

// Much improved solution using object
function twoSum(arr, target) {
  let numObject = {};
  for (var i = 0; i < arr.length; i++) {
    let thisNum = arr[i];
    numObject[thisNum] = i;
  }
  for (var i = 0; i < arr.length; i++) {
    let diff = target - arr[i];
    if (numObject.hasOwnProperty(diff) && numObject[diff] !== i) {
      return [i, numObject[diff]];
    }
  }
}

console.log(twoSum([2, 7, 11, 15], 9));
