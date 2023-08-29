/*
    Problem Statement:
    You are given an array 'arr' representing the arrangement of desks in a classroom. The array will be in the following format: [K, r1, r2, r3, ...], where:
    - K represents the number of desks in the classroom.
    - r1, r2, r3, ... are integers in sorted order representing the desks that are already occupied.
    
    All of the desks are arranged in 2 columns, where desk #1 is at the top left, desk #2 is at the top right, desk #3 is below #1, desk #4 is below #2, and so on.
    
    Your task is to implement a function 'SeatingStudents(arr)' that returns the number of ways 2 students can be seated next to each other. This means that one student is on the left and one student is on the right, or one student is directly above or below the other student.
    */

const test = (arr) => {
    // Destructure the array to get totalSeats and occupied seats
    let [totalSeats, ...seats] = arr;

    // Initialize an array to hold pairs of seats and another for possible pairs
    let temp2DArray = [];
    let temp = [];
    let possiblePairsArray = [];

    // Iterate through each seat number
    for (let i = 1; i <= totalSeats; i++) {
        // Check if the seat is occupied
        if (!seats.includes(String(i))) {
            temp.push({
                value: i,
                valid: true
            });
        } else {
            temp.push({
                value: i,
                valid: false
            });
        }

        // Check if two seats are collected, then add to the 2D array
        if (temp.length === 2) {
            temp2DArray.push(temp);
            temp = [];
        }
    }

    // Iterate through the 2D array to find possible pairs
    for (let k = 0; k < temp2DArray.length; k++) {
        if (temp2DArray[k][0]['valid'] && temp2DArray[k][1]['valid']) {
            // Both seats in the pair are available
            possiblePairsArray.push([temp2DArray[k][0]['value'], temp2DArray[k][1]['value']]);
        }
        if (k < temp2DArray.length - 1 && temp2DArray[k][0]['valid'] && temp2DArray[k + 1][0]['valid']) {
            // The first seat of the current pair and the first seat of the next pair are available
            possiblePairsArray.push([temp2DArray[k][0]['value'], temp2DArray[k + 1][0]['value']]);
        }
        if (k < temp2DArray.length - 1 && temp2DArray[k][1]['valid'] && temp2DArray[k + 1][1]['valid']) {
            // The second seat of the current pair and the second seat of the next pair are available
            possiblePairsArray.push([temp2DArray[k][1]['value'], temp2DArray[k + 1][1]['value']]);
        }
    }

    // Return the count of possible pairs
    return possiblePairsArray.length;
};

// Example input
let input = ['12', '2', '6', '7', '11'];

// Call the function and log the result
console.log(test(input));