
// Reverse the string 
import { test } from '@playwright/test';

test('Reverse String Test', async () => {
let inputString = "Hello, World!";
let reversedString= inputString.split("").reverse().join("");
console.log("Reversed String: " + reversedString);
}
);
 
test('Resverse String without using built-in functions', async () => {
    let inputString = "Hello, World!";
    let reversedString = "";
    for (let i = inputString.length - 1; i >= 0; i--) {
        reversedString += inputString[i];
    }
    console.log("Reversed String: " + reversedString);
}
)

test('Find the occurrences of a character in a string', async () => {
    let inputString = "Hello, World!";
    let characterToFind = "o";
    let occurrences = 0;
    for (let i = 0; i < inputString.length; i++) {
        if (inputString[i] === characterToFind) {
            occurrences++;
        }
    }
    console.log(`The character "${characterToFind}" occurs ${occurrences} times in the string "${inputString}".`);
    console.log("The character " + characterToFind + " occurs " + occurrences + " times in the string \"" + inputString + "\".");
}           
)