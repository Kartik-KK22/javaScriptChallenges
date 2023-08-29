/* Given an array of integers, the goal is to determine if it is possible to split the array 
   into two parts such that the sum of the elements in both parts is equal. If such a split is possible,
   the algorithm should return the two partitions; otherwise, it should indicate that no valid split exists. 
*/
function splitArrayIntoEqualParts(arr) {
    function isIntegerArray(arr) {
        for (const num of arr) {
            if (!Number.isInteger(num)) {
                return false;
            }
        }
        return true;
    }

    if (!isIntegerArray(arr)) {
        return "Input array must contain only integers";
    }

    const arrayLength = arr.length;
    const halfLength = arrayLength / 2;

    // Check if the input array length is even
    if (arrayLength % 2 !== 0) {
        return "Input array length must be even";
    }

    const totalSum = arr.reduce((acc, num) => acc + num, 0);
    const targetSum = totalSum / 2;

    // Helper function to find all combinations of a certain length
    function findCombinations(arr, length, start = 0, currentSum = 0, currentCombination = []) {
        if (currentSum === targetSum && currentCombination.length === length) {
            return [currentCombination.slice()];
        }
        if (currentSum > targetSum || start >= arr.length || currentCombination.length >= length) {
            return [];
        }

        const combinations = [];

        // Include the current element
        currentCombination.push(arr[start]);
        combinations.push(...findCombinations(arr, length, start + 1, currentSum + arr[start], currentCombination));

        // Exclude the current element
        currentCombination.pop();
        combinations.push(...findCombinations(arr, length, start + 1, currentSum, currentCombination));

        return combinations;
    }

    // Find all combinations of halfLength elements
    const allCombinations = findCombinations(arr, halfLength);

    // Check if there are any combinations to consider
    if (allCombinations.length === 0) {
        return "No valid combinations found";
    }

    // Check if any combination sums up to the targetSum
    for (const combination of allCombinations) {
        const remaining = [...arr];
        for (const num of combination) {
            const index = remaining.indexOf(num);
            if (index !== -1) {
                remaining.splice(index, 1);
            }
        }
        const remainingSum = remaining.reduce((acc, num) => acc + num, 0);

        if (remainingSum === targetSum) {
            return [combination, remaining];
        }
    }

    return "No valid split found";
}

const inputArray = [1, 2, 4, 0, 3, 0];
const result = splitArrayIntoEqualParts(inputArray);

console.log(result); // Print the split arrays or error message