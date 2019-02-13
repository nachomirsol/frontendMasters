/*
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

Example 1:

Input: ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
Note:

All given inputs are in lowercase letters a-z.
*/
function longestCommonPrefix(arr) {
  arrResult = [];
  for (var i = 0; i <= arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i][i] == arr[j][i]) {
        arrResult.push(arr[j][i]);
      } else {
        return "";
      }
    }
  }
  return arrResult;
}
longestCommonPrefix(["flower", "flow", "flat"]);
