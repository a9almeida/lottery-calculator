// let currentStep = 0;
// const gameData = {};
// let currentPrizeMatrix = []; // To track all prize inputs for Matrix 2 or Keno matches
// let currentMatchIndex = { primary: 0, secondary: 0 }; // Track the current match index
// const botPrompts = [
//   `Hi there! Welcome to the Interactive Lottery Chatbot. What would you like to do?<br>
//         1: Set up a Lottery Game<br>
//         2: Set up a Keno Game<br>
//         Type 'exit' to quit.<br><br>
//         <a href="instructions.pdf" target="_blank" style="color: #007bff; text-decoration: underline;">
//           📄 Download Instructions (PDF)
//         </a>`,
//   "How many matrices are you using? (1 or 2)?",
//   "Enter the primary matrix size (e.g., 69 for 5/69 game):",
//   "Enter the number of selected numbers for the primary matrix:",
//   "Enter the secondary matrix size (e.g., 26 for 1/26 game):",
//   "Enter the number of selected numbers for the secondary matrix:",
//   "Enter the game price (e.g., 2.5):",
//   "Enter the number of spots for the Keno game (1-12):",
// ];

// // Helper function: Calculate binomial coefficient
// function binomialCoefficient(n, k) {
//   if (k > n) return 0;
//   if (k === 0 || k === n) return 1;
//   let result = 1;
//   for (let i = 1; i <= k; i++) {
//     result *= n - (k - i);
//     result /= i;
//   }
//   return result;
// }

// // Make the chat automatically scroll for the latest messages
// function scrollToBottom() {
//   const messages = document.getElementById("messages");
//   const lastMessage = messages.lastElementChild;
//   if (lastMessage) {
//     lastMessage.scrollIntoView({ behavior: "smooth", block: "end" });
//   }
// }

// // // Function to append a message to the chat
// // function appendMessage(sender, text) {
// //   const messages = document.getElementById("messages");
// //   const message = document.createElement("div");
// //   message.classList.add("message");
// //   message.classList.add(sender === "user" ? "user-message" : "bot-message");
// //   message.innerText = text;
// //   messages.appendChild(message);

// //   // Auto-scroll after appending the message
// //   scrollToBottom();
// // }

// function appendMessage(sender, text) {
//   const messages = document.getElementById("messages");
//   const message = document.createElement("div");
//   message.classList.add("message");
//   message.classList.add(sender === "user" ? "user-message" : "bot-message");
  
//   if (sender === "bot") {
//     message.innerHTML = text; // Render HTML for bot messages
//   } else {
//     message.innerText = text; // Use plain text for user messages
//   }

//   messages.appendChild(message);
//   scrollToBottom();
// }


// let stepHistory = [];


// // Function to handle user input
// function handleUserInput() {
//   const userInput = document.getElementById("user-input").value.trim();
//   if (!userInput) return;

//   appendMessage("user", userInput);
//   document.getElementById("user-input").value = "";

//   if (userInput.toLowerCase() === "exit") {
//     appendMessage("bot", "Goodbye! Have a great day!");
//     return;
//   }

//     // handle "back" feature
//   if (userInput.toLowerCase() === "back") {
//     if (stepHistory.length > 0) {
//       currentStep = stepHistory.pop(); // Go back to the previous step
//       appendMessage("bot", `Let's go back. ${botPrompts[currentStep]}`);
//     } else {
//       appendMessage("bot", "You are already at the start of the process.");
//     }
//     return;
//   }

//   // Handle "edit" feature
//   if (userInput.toLowerCase().startsWith("edit")) {
//     const editStep = parseInt(userInput.split(" ")[1]);
//     if (!isNaN(editStep) && editStep < botPrompts.length) {
//       currentStep = editStep; // Go to the specific step
//       appendMessage("bot", `Editing step ${editStep}. ${botPrompts[currentStep]}`);
//     } else {
//       appendMessage("bot", "Invalid step number. Please try again.");
//     }
//     return;
//   }

//   // Store the current step in history before proceeding
//   stepHistory.push(currentStep);

//   if (currentStep === 0) {
//     if (userInput === "1") {
//       gameData.type = "Lottery";
//       appendMessage("bot", botPrompts[++currentStep]);
//     } else if (userInput === "2") {
//       gameData.type = "Keno";
//       appendMessage("bot", botPrompts[7]); // Ask for Keno spots
//       currentStep = 9; // Move to Keno-specific logic
//     } else {
//       appendMessage("bot", "Invalid input. Please type '1' for Lottery or '2' for Keno.");
//     }
  
//   } else if (currentStep === 1) {
//     if (userInput === "1" || userInput === "2") {
//       gameData.matrices = Number(userInput);
//       appendMessage("bot", botPrompts[++currentStep]);
//     } else {
//       appendMessage("bot", "Please enter '1' or '2'.");
//     }
//   } else if (currentStep === 2) {
//     gameData.matrix1Size = Number(userInput);
//     appendMessage("bot", botPrompts[++currentStep]);
//   } else if (currentStep === 3) {
//     gameData.selectedNumbers1 = Number(userInput);
//     if (gameData.matrices === 2) {
//       appendMessage("bot", botPrompts[++currentStep]); // Ask for Matrix 2 size
//     } else {
//       appendMessage("bot", botPrompts[6]); // Skip to game price
//       currentStep = 6;
//     }
//   } else if (currentStep === 4) {
//     gameData.matrix2Size = Number(userInput);
//     appendMessage("bot", botPrompts[++currentStep]);
//   } else if (currentStep === 5) {
//     gameData.selectedNumbers2 = Number(userInput);
//     appendMessage("bot", botPrompts[++currentStep]);
//   } 

//   else if (currentStep === 6) {
//     gameData.gamePrice = parseFloat(userInput);
//     if (gameData.matrices === 1) {
//       gameData.prizes = [];
//       gameData.currentMatchIndex = gameData.selectedNumbers1; // Initialize descending match count
//       currentStep = 8; // Start collecting prizes for Matrix 1
//       appendMessage(
//         "bot",
//         `Enter the prize for match ${gameData.currentMatchIndex} (or type 'Jackpot'):`
//       );
//     } else {
//       currentPrizeMatrix = [];
//       currentMatchIndex = { primary: gameData.selectedNumbers1, secondary: gameData.selectedNumbers2 };
//       appendMessage(
//         "bot",
//         `Enter the prize for ${currentMatchIndex.primary} + ${currentMatchIndex.secondary} match (or type 'Jackpot'):`
//       );
//       currentStep = 7;
//     }
//   }
  
//   else if (currentStep === 7) {
//     // Collect prizes for Matrix 2 combined matches
//     if (userInput.toLowerCase() === "jackpot") {
//       currentPrizeMatrix.push("Jackpot");
//     } else {
//       const prize = parseFloat(userInput);
//       if (isNaN(prize) || prize < 0) {
//         appendMessage("bot", "Invalid input. Please enter a numeric value or 'Jackpot'.");
//         return;
//       }
//       currentPrizeMatrix.push(prize);
//     }

//     // Check for the next match combination
//     if (currentMatchIndex.secondary > 0) {
//       currentMatchIndex.secondary--;
//     } else if (currentMatchIndex.primary > 0) {
//       currentMatchIndex.primary--;
//       currentMatchIndex.secondary = gameData.selectedNumbers2;
//     } else {
//       calculateTwoMatrixLottery(); // Trigger results calculation
//       return;
//     }

//     // Skip "0 + 0 match"
//     if (currentMatchIndex.primary === 0 && currentMatchIndex.secondary === 0) {
//       calculateTwoMatrixLottery();
//       return;
//     }

//     appendMessage(
//       "bot",
//       `Enter the prize for ${currentMatchIndex.primary} + ${currentMatchIndex.secondary} match (or type 'Jackpot'):`
//     );
//   } 
//   else if (currentStep === 8) {
//     // Collect prizes for Matrix 1 regular matches
//     if (userInput.toLowerCase() === "jackpot") {
//       gameData.prizes.push("Jackpot");
//     } else {
//       const prize = parseFloat(userInput);
//       if (isNaN(prize) || prize < 0) {
//         appendMessage("bot", "Invalid input. Please enter a numeric value or 'Jackpot'.");
//         return;
//       }
//       gameData.prizes.push(prize);
//     }
  
//     // Decrement match index and check if there are more matches
//     gameData.currentMatchIndex--;
//     if (gameData.currentMatchIndex > 0) {
//       appendMessage(
//         "bot",
//         `Enter the prize for match ${gameData.currentMatchIndex} (or type 'Jackpot'):`
//       );
//     } else {
//       calculateMatrix1Lottery(); // All prizes collected, move to calculation
//     }
//   }
//    else if (currentStep === 9) {
//     // Collect Keno type (number of spots)
//     const spots = parseInt(userInput);
//     if (isNaN(spots) || spots < 1 || spots > 12) {
//       appendMessage("bot", "Please enter a valid number of spots (1-12).");
//     } else {
//       gameData.kenoType = spots;
//       gameData.prizes = [];
//       appendMessage("bot", `Enter the game price for Keno (e.g., 2.5):`);
//       currentStep = 10;
//     }
//   } else if (currentStep === 10) {
//     // Collect Keno game price
//     gameData.gamePrice = parseFloat(userInput);
//     if (isNaN(gameData.gamePrice) || gameData.gamePrice <= 0) {
//       appendMessage("bot", "Invalid input. Please enter a positive numeric value for the game price.");
//     } else {
//       appendMessage("bot", `Enter the prize for ${gameData.kenoType} matches (or type 'Jackpot'):`);
//       currentPrizeMatrix = [];
//       currentStep = 11;
//     }
//   } else if (currentStep === 11) {
//     // Collect Keno prizes
//     if (userInput.toLowerCase() === "jackpot") {
//       currentPrizeMatrix.push("Jackpot");
//     } else {
//       const prize = parseFloat(userInput);
//       if (isNaN(prize) || prize < 0) {
//         appendMessage("bot", "Invalid input. Please enter a numeric value or 'Jackpot'.");
//         return;
//       }
//       currentPrizeMatrix.push(prize);
//     }

//     if (currentPrizeMatrix.length < gameData.kenoType + 1) {
//       appendMessage("bot", `Enter the prize for ${gameData.kenoType - currentPrizeMatrix.length} matches (or type 'Jackpot'):`);
//     } else {
//       calculateKenoPayout();
//     }
//   }
// }

// // Regular Matrix 1 Calculation
// function calculateMatrix1Lottery() {
//   const { matrix1Size, selectedNumbers1, gamePrice, prizes } = gameData;
//   const totalCombinations = binomialCoefficient(matrix1Size, selectedNumbers1);
//   const grossSales = gamePrice * totalCombinations;

//   const results = [];
//   let totalLiability = 0;
//   let totalWinners = 0;

//   // for (let matchCount = 1; matchCount <= selectedNumbers1; matchCount++) {
//   //   const prize = prizes[matchCount - 1];
//   for (let matchCount = selectedNumbers1; matchCount >= 1; matchCount--) {
//     const prize = prizes[selectedNumbers1 - matchCount]; // Reverse access
  
//     //if (prize === 0) continue; // Skip matches with $0 prize

//     const favorableCombinations =
//       binomialCoefficient(selectedNumbers1, matchCount) *
//       binomialCoefficient(matrix1Size - selectedNumbers1, selectedNumbers1 - matchCount);

//     const odds = totalCombinations / favorableCombinations;
//     const expectedWinners = totalCombinations / odds;

//     const liability = prize === "Jackpot" ? 0 : expectedWinners * prize;

//     results.push({
//       match: matchCount,
//       expectedWinners: Math.round(expectedWinners).toLocaleString(), // Format with commas
//       odds: Math.round(odds).toLocaleString(), // Format odds
//       //prize: prize.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), // Prize formatted with commas
//       prize: prize === 0 ? "$0.00" : `$${prize.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
//       liability: liability.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), // Liability formatted with commas
//     });
    

//     totalLiability += liability;
//     if (prize !== "Jackpot" && prize > 0) {
//       totalWinners += expectedWinners;
//     }
//   }

//   const totalProbability = totalLiability / grossSales || 0;
//   const overallOdds = totalCombinations / totalWinners || Infinity;

//   displayResults(results, totalProbability, overallOdds, totalLiability, totalWinners, grossSales);
// }

// // Two-Matrix Calculation
// function calculateTwoMatrixLottery() {
//   const {
//     matrix1Size,
//     selectedNumbers1,
//     matrix2Size,
//     selectedNumbers2,
//     gamePrice,
//   } = gameData;

//     const totalCombinations =
//     binomialCoefficient(matrix1Size, selectedNumbers1) *
//     binomialCoefficient(matrix2Size, selectedNumbers2);

//   const results = [];
//   let totalLiability = 0;
//   let totalWinners = 0; // Winners for non-zero prizes
//   //let totalSumWinners = 0; // Sum of all winners, including $0 and jackpots
//   let jackpotPresent = false;

//   let prizeIndex = 0;

//   for (let i = selectedNumbers1; i >= 0; i--) {
//     for (let j = selectedNumbers2; j >= 0; j--) {
//       if (i === 0 && j === 0) continue; // Skip "0 + 0 match"

//       const favorablePrimary =
//         binomialCoefficient(selectedNumbers1, i) *
//         binomialCoefficient(matrix1Size - selectedNumbers1, selectedNumbers1 - i);
//       const favorableSecondary =
//         binomialCoefficient(selectedNumbers2, j) *
//         binomialCoefficient(matrix2Size - selectedNumbers2, selectedNumbers2 - j);

//       const favorableCombinations = favorablePrimary * favorableSecondary;

//       if (favorableCombinations === 0) continue; // Skip invalid combinations

//       const odds = totalCombinations / favorableCombinations; // Odds per match
//       const expectedWinners = totalCombinations / odds; // Winners per match
//       //totalSumWinners += expectedWinners; // Add all winners

//       const prize = currentPrizeMatrix[prizeIndex++];
//       let liability = 0;

//       if (prize === "Jackpot") {
//         jackpotPresent = true; // Flag jackpot present
//         results.push({
//           match: `${i} + ${j}`,
//           expectedWinners: Math.round(expectedWinners),
//           odds: odds.toFixed(2),
//           prize: "Jackpot",
//           liability: "", // No liability for jackpot
//         });
//       } else {
//         liability = prize === 0 ? 0 : expectedWinners * prize;
//         totalLiability += liability; // Add to liability if not a jackpot

//         results.push({
//           match: `${i} + ${j}`,
//           expectedWinners: Math.round(expectedWinners).toLocaleString(),
//           odds: odds.toFixed(2).toLocaleString(),
//           prize: prize === 0 ? "$0.00" : `$${prize.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
//           liability: liability.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
//         });
//       }

//       // Count winners for non-zero prizes or jackpot
//       if (prize !== "Jackpot" && prize > 0) {
//         totalWinners += expectedWinners;
//       }
//     }
//   }

//   // Adjust total probability based on jackpot presence
//   const totalProbability = jackpotPresent
//     ? 0.5 // Fixed 50% for jackpots
//     : totalLiability / (gamePrice * totalCombinations);

//   // Overall odds calculation
//   const overallOdds = totalCombinations / totalWinners || Infinity;

//   displayResults(results, totalProbability, overallOdds, totalLiability, totalWinners, gamePrice * totalCombinations);
// }

// // Keno Calculation
// function calculateKenoPayout() {
//   const { kenoType } = gameData;
//   const totalCombinations = binomialCoefficient(80, 20); // Total ways to choose 20 numbers from 80
//   const results = [];
//   let totalLiability = 0;
//   let totalWinners = 0;
//   let totalSumWinners = 0; // Total winners include even $0 prize matches

//   for (let matchCount = 0; matchCount <= kenoType; matchCount++) {
//     const prize = currentPrizeMatrix[kenoType - matchCount]; // Match prizes in reverse order
//     const favorableCombinations =
//       binomialCoefficient(20, matchCount) *
//       binomialCoefficient(60, kenoType - matchCount);

//     const odds = totalCombinations / favorableCombinations; // Correct odds calculation
//     const expectedWinners = favorableCombinations; // Expected winners are based on favorable combinations
//     totalSumWinners += expectedWinners; // Include all winners, even for $0 prize matches

//     if (prize === "Jackpot") {
//       results.push({
//         match: matchCount,
//         expectedWinners: Math.round(expectedWinners),
//         odds: odds.toFixed(2),
//         prize: "Jackpot",
//         liability: "",
//       });
//     } else {
//       const liability = prize === 0 ? 0 : expectedWinners * prize; // Liability is 0 for $0 prizes
//       totalLiability += liability;

//       results.push({
//         match: matchCount,
//         expectedWinners: Math.round(expectedWinners),
//         odds: odds.toFixed(2),
//         prize: prize === 0 ? 0 : prize.toFixed(2), // Keep $0 for display
//         liability: liability.toFixed(2),
//       });
//     }

//     if (prize !== "Jackpot" && prize > 0) {
//       totalWinners += expectedWinners; // Only count winners for prizes > $0 or Jackpot
//     }
//   }

//   // Total probability is now relative to totalSumWinners
//   const totalProbability = totalLiability / totalSumWinners || 0;

//   // Overall odds based on totalSumWinners and totalWinners
//   const overallOdds = totalSumWinners / totalWinners || Infinity;

//   displayResults(results, totalProbability, overallOdds, totalLiability, totalWinners, totalSumWinners);
// }

// function createDownloadButton(results, totalProbability, overallOdds, totalLiability, totalWinners, grossSales) {
//   const downloadButton = document.createElement("button");
//   downloadButton.innerText = "Download Results (CSV)";
//   downloadButton.style.margin = "10px";
//   downloadButton.onclick = () => downloadResultsAsCSV(results, totalProbability, overallOdds, totalLiability, totalWinners, grossSales);

//   const messages = document.getElementById("messages");
//   messages.appendChild(downloadButton);
//   scrollToBottom();
// }

// function downloadResultsAsCSV(results, totalProbability, overallOdds, totalLiability, totalWinners, grossSales) {
//   let csvContent = "data:text/csv;charset=utf-8,";

//   // Add headers
//   csvContent += `"Match","Expected Winners","Odds (1 in)","Prize","Liability"\n`;

//   // Add results for each match
//   results.forEach(result => {
//     const match = result.match;
//     const expectedWinners = result.expectedWinners;
//     // const odds = result.odds;
//     const odds = result.odds ? (result.odds).toLocaleString(undefined, { minimumFractionDigits: 2 }) : "" ;
//     const prize = result.prize === "Jackpot" ? "Jackpot" : `${(result.prize).toLocaleString()}`;
//     const liability = result.liability ? `$${(result.liability).toLocaleString()}` : "";

//     // Add the row to the CSV
//     csvContent += `"${match}","${expectedWinners}","${odds}","${prize}","${liability}"\n`;
//   });

//   // Add summary section with proper alignment
//   csvContent += `\n"Total Probability","${(totalProbability * 100).toFixed(2)}%"\n`;
//   csvContent += `"Overall Odds","1 in ${overallOdds.toFixed(2)}"\n`;
//   csvContent += `"Total Liability","$${totalLiability.toLocaleString()}"\n`;
//   csvContent += `"Total Number of Winners","${totalWinners.toLocaleString()}"\n`;
//   csvContent += `"Total Gross Sales","$${grossSales.toLocaleString()}"\n`;

//   // Create download link
//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", "lottery_results.csv");
//   document.body.appendChild(link);

//   link.click();
//   document.body.removeChild(link);
// }


// // Display results in the chat
// function displayResults(results, totalProbability, overallOdds, totalLiability, totalWinners, grossSales) {
//   appendMessage("bot", "Calculation complete! Here are the results:");

//   results.sort((a, b) => (b.match > a.match ? 1 : -1));
//   results.forEach((result) => {
//   //   appendMessage(
//   //     "bot",
//   //     `Match: ${result.match} \nExpected Winners: ${result.expectedWinners} \nOdds: 1 in ${result.odds} \nPrize: $${result.prize} \nLiability: $${result.liability}`
//   //   );
//   // });
//   // appendMessage("bot", `Total Probability: ${(totalProbability * 100).toFixed(2)}%`);
//   // appendMessage("bot", `Overall Odds: 1 in ${overallOdds.toFixed(2)}`);
//   // appendMessage("bot", `Total Liability: $${totalLiability.toFixed(2)}`);
//   // appendMessage("bot", `Total Number of Winners: ${totalWinners}`);
//   // appendMessage("bot", `Total Gross Sales: $${grossSales.toFixed(2)}`);

//   appendMessage(
//     "bot",
//     `Match: ${result.match} \nExpected Winners: ${result.expectedWinners} \nOdds: 1 in ${result.odds} \nPrize: $${result.prize} \nLiability: $${result.liability}`
//   )});
//   appendMessage("bot", `Total Probability: ${(totalProbability * 100).toFixed(2)}%`);
//   appendMessage("bot", `Overall Odds: 1 in ${overallOdds.toFixed(2).toLocaleString()}`);
//   appendMessage("bot", `Total Liability: $${totalLiability.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
//   appendMessage("bot", `Total Number of Winners: ${totalWinners.toLocaleString()}`);
//   appendMessage("bot", `Total Gross Sales: $${grossSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  

//   // add download button
//   createDownloadButton(results, totalProbability, overallOdds, totalLiability, totalWinners, grossSales)

//   // Reset prompt
//   appendMessage("bot", "Would you like to do another one? \n1: Set up a Lottery Game\n2: Set up a Keno Game\nType 'exit' to quit.");

//   // Reset state for new calculation
//   currentStep = 0;
//   gameData = {}; // Clear previous data
// }

// // Attach event listeners
// document.getElementById("send-button").addEventListener("click", handleUserInput);
// document.getElementById("user-input").addEventListener("keypress", (e) => {
//   if (e.key === "Enter") handleUserInput();
// });

// // Initialize chatbot with a greeting
// window.onload = () => appendMessage("bot", botPrompts[currentStep]);



let currentStep = 0;
const gameData = {};
let currentPrizeMatrix = []; // To track all prize inputs for Matrix 2 or Keno matches
let currentMatchIndex = { primary: 0, secondary: 0 }; // Track the current match index
const botPrompts = [
  `Hi there! Welcome to the Interactive Lottery Chatbot. What would you like to do?<br>
        1: Set up a Lottery Game<br>
        2: Set up a Keno Game<br>
        3: View Calculations from Other Games (Excel)<br>
        Type 'exit' to quit.<br><br>
        <a href="instructions.pdf" target="_blank" style="color: #007bff; text-decoration: underline;">
          📄 Download Instructions (PDF)
        </a>`,
  "How many matrices are you using? (1 or 2)?",
  "Enter the primary matrix size (e.g., 69 for 5/69 game):",
  "Enter the number of selected numbers for the primary matrix:",
  "Enter the secondary matrix size (e.g., 26 for 1/26 game):",
  "Enter the number of selected numbers for the secondary matrix:",
  "Enter the game price (e.g., 2.5):",
  "Enter the number of spots for the Keno game (1-12):",
];

// Helper function: Calculate binomial coefficient
function binomialCoefficient(n, k) {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result *= n - (k - i);
    result /= i;
  }
  return result;
}

// Make the chat automatically scroll for the latest messages 
function scrollToBottom() {
  const messages = document.getElementById("messages");
  const lastMessage = messages.lastElementChild;
  if (lastMessage) {
    lastMessage.scrollIntoView({ behavior: "smooth", block: "end" });
  }
}


function appendMessage(sender, text) {
  const messages = document.getElementById("messages");
  const message = document.createElement("div");
  message.classList.add("message");
  message.classList.add(sender === "user" ? "user-message" : "bot-message");
  
  if (sender === "bot") {
    message.innerHTML = text; // Render HTML for bot messages
  } else {
    message.innerText = text; // Use plain text for user messages
  }

  messages.appendChild(message);
  scrollToBottom();
}


let stepHistory = [];


// Function to handle user input
// function handleUserInput() {
//   const userInput = document.getElementById("user-input").value.trim();
//   if (!userInput) return;

//   appendMessage("user", userInput);
//   document.getElementById("user-input").value = "";

//   if (userInput.toLowerCase() === "exit") {
//     appendMessage("bot", "Goodbye! Have a great day!");
//     return;
//   }

//     // handle "back" feature
//   if (userInput.toLowerCase() === "back") {
//     if (stepHistory.length > 0) {
//       currentStep = stepHistory.pop(); // Go back to the previous step
//       appendMessage("bot", `Let's go back. ${botPrompts[currentStep]}`);
//     } else {
//       appendMessage("bot", "You are already at the start of the process.");
//     }
//     return;
//   }

//   // Handle "edit" feature
//   if (userInput.toLowerCase().startsWith("edit")) {
//     const editStep = parseInt(userInput.split(" ")[1]);
//     if (!isNaN(editStep) && editStep < botPrompts.length) {
//       currentStep = editStep; // Go to the specific step
//       appendMessage("bot", `Editing step ${editStep}. ${botPrompts[currentStep]}`);
//     } else {
//       appendMessage("bot", "Invalid step number. Please try again.");
//     }
//     return;
//   }

//   // Store the current step in history before proceeding
//   stepHistory.push(currentStep);

//   if (currentStep === 0) {
//     if (userInput === "1") {
//       gameData.type = "Lottery";
//       appendMessage("bot", botPrompts[++currentStep]);
//     } else if (userInput === "2") {
//       gameData.type = "Keno";
//       appendMessage("bot", botPrompts[7]); // Ask for Keno spots
//       currentStep = 9; // Move to Keno-specific logic
//     } else {
//       appendMessage("bot", "Invalid input. Please type '1' for Lottery or '2' for Keno.");
//     }
  
//   } else if (currentStep === 1) {
//     if (userInput === "1" || userInput === "2") {
//       gameData.matrices = Number(userInput);
//       appendMessage("bot", botPrompts[++currentStep]);
//     } else {
//       appendMessage("bot", "Please enter '1' or '2'.");
//     }
//   } else if (currentStep === 2) {
//     gameData.matrix1Size = Number(userInput);
//     appendMessage("bot", botPrompts[++currentStep]);
//   } else if (currentStep === 3) {
//     gameData.selectedNumbers1 = Number(userInput);
//     if (gameData.matrices === 2) {
//       appendMessage("bot", botPrompts[++currentStep]); // Ask for Matrix 2 size
//     } else {
//       appendMessage("bot", botPrompts[6]); // Skip to game price
//       currentStep = 6;
//     }
//   } else if (currentStep === 4) {
//     gameData.matrix2Size = Number(userInput);
//     appendMessage("bot", botPrompts[++currentStep]);
//   } else if (currentStep === 5) {
//     gameData.selectedNumbers2 = Number(userInput);
//     appendMessage("bot", botPrompts[++currentStep]);
//   } 

//   else if (currentStep === 6) {
//     gameData.gamePrice = parseFloat(userInput);
//     if (gameData.matrices === 1) {
//       gameData.prizes = [];
//       gameData.currentMatchIndex = gameData.selectedNumbers1; // Initialize descending match count
//       currentStep = 8; // Start collecting prizes for Matrix 1
//       appendMessage(
//         "bot",
//         `Enter the prize for match ${gameData.currentMatchIndex} (or type 'Jackpot'):`
//       );
//     } else {
//       currentPrizeMatrix = [];
//       currentMatchIndex = { primary: gameData.selectedNumbers1, secondary: gameData.selectedNumbers2 };
//       appendMessage(
//         "bot",
//         `Enter the prize for ${currentMatchIndex.primary} + ${currentMatchIndex.secondary} match (or type 'Jackpot'):`
//       );
//       currentStep = 7;
//     }
//   }
  
//   else if (currentStep === 7) {
//     // Collect prizes for Matrix 2 combined matches
//     if (userInput.toLowerCase() === "jackpot") {
//       currentPrizeMatrix.push("Jackpot");
//     } else {
//       const prize = parseFloat(userInput);
//       if (isNaN(prize) || prize < 0) {
//         appendMessage("bot", "Invalid input. Please enter a numeric value or 'Jackpot'.");
//         return;
//       }
//       currentPrizeMatrix.push(prize);
//     }

//     // Check for the next match combination
//     if (currentMatchIndex.secondary > 0) {
//       currentMatchIndex.secondary--;
//     } else if (currentMatchIndex.primary > 0) {
//       currentMatchIndex.primary--;
//       currentMatchIndex.secondary = gameData.selectedNumbers2;
//     } else {
//       calculateTwoMatrixLottery(); // Trigger results calculation
//       return;
//     }

//     // Skip "0 + 0 match"
//     if (currentMatchIndex.primary === 0 && currentMatchIndex.secondary === 0) {
//       calculateTwoMatrixLottery();
//       return;
//     }

//     appendMessage(
//       "bot",
//       `Enter the prize for ${currentMatchIndex.primary} + ${currentMatchIndex.secondary} match (or type 'Jackpot'):`
//     );
//   } 
//   else if (currentStep === 8) {
//     // Collect prizes for Matrix 1 regular matches
//     if (userInput.toLowerCase() === "jackpot") {
//       gameData.prizes.push("Jackpot");
//     } else {
//       const prize = parseFloat(userInput);
//       if (isNaN(prize) || prize < 0) {
//         appendMessage("bot", "Invalid input. Please enter a numeric value or 'Jackpot'.");
//         return;
//       }
//       gameData.prizes.push(prize);
//     }
  
//     // Decrement match index and check if there are more matches
//     gameData.currentMatchIndex--;
//     if (gameData.currentMatchIndex > 0) {
//       appendMessage(
//         "bot",
//         `Enter the prize for match ${gameData.currentMatchIndex} (or type 'Jackpot'):`
//       );
//     } else {
//       calculateMatrix1Lottery(); // All prizes collected, move to calculation
//     }
//   }
//    else if (currentStep === 9) {
//     // Collect Keno type (number of spots)
//     const spots = parseInt(userInput);
//     if (isNaN(spots) || spots < 1 || spots > 12) {
//       appendMessage("bot", "Please enter a valid number of spots (1-12).");
//     } else {
//       gameData.kenoType = spots;
//       gameData.prizes = [];
//       appendMessage("bot", `Enter the game price for Keno (e.g., 2.5):`);
//       currentStep = 10;
//     }
//   } else if (currentStep === 10) {
//     // Collect Keno game price
//     gameData.gamePrice = parseFloat(userInput);
//     if (isNaN(gameData.gamePrice) || gameData.gamePrice <= 0) {
//       appendMessage("bot", "Invalid input. Please enter a positive numeric value for the game price.");
//     } else {
//       appendMessage("bot", `Enter the prize for ${gameData.kenoType} matches (or type 'Jackpot'):`);
//       currentPrizeMatrix = [];
//       currentStep = 11;
//     }
//   } else if (currentStep === 11) {
//     // Collect Keno prizes
//     if (userInput.toLowerCase() === "jackpot") {
//       currentPrizeMatrix.push("Jackpot");
//     } else {
//       const prize = parseFloat(userInput);
//       if (isNaN(prize) || prize < 0) {
//         appendMessage("bot", "Invalid input. Please enter a numeric value or 'Jackpot'.");
//         return;
//       }
//       currentPrizeMatrix.push(prize);
//     }

//     if (currentPrizeMatrix.length < gameData.kenoType + 1) {
//       appendMessage("bot", `Enter the prize for ${gameData.kenoType - currentPrizeMatrix.length} matches (or type 'Jackpot'):`);
//     } else {
//       calculateKenoPayout();
//     }
//   }
// }

// Function to handle user input
function handleUserInput() {
  const userInput = document.getElementById("user-input").value.trim();
  if (!userInput) return;

  appendMessage("user", userInput);
  document.getElementById("user-input").value = "";

  if (userInput.toLowerCase() === "exit") {
    appendMessage("bot", "Goodbye! Have a great day!");
    return;
  }

  // Handle "back" feature
  if (userInput.toLowerCase() === "back") {
    if (stepHistory.length > 0) {
      currentStep = stepHistory.pop(); // Go back to the previous step
      appendMessage("bot", `Let's go back. ${botPrompts[currentStep]}`);
    } else {
      appendMessage("bot", "You are already at the start of the process.");
    }
    return;
  }

  // Handle "edit" feature
  if (userInput.toLowerCase().startsWith("edit")) {
    const editStep = parseInt(userInput.split(" ")[1]);
    if (!isNaN(editStep) && editStep < botPrompts.length) {
      currentStep = editStep; // Go to the specific step
      appendMessage("bot", `Editing step ${editStep}. ${botPrompts[currentStep]}`);
    } else {
      appendMessage("bot", "Invalid step number. Please try again.");
    }
    return;
  }

  // Store the current step in history before proceeding
  stepHistory.push(currentStep);

  // if (currentStep === 0) {
  //   if (userInput === "1") {
  //     gameData.type = "Lottery";
  //     appendMessage("bot", botPrompts[++currentStep]);
  //   } else if (userInput === "2") {
  //     gameData.type = "Keno";
  //     appendMessage("bot", botPrompts[7]); // Ask for Keno spots
  //     currentStep = 9; // Move to Keno-specific logic
  //   } else if (userInput === "3") {
  //     // New Option 3: View Excel spreadsheet
  //     appendMessage(
  //       "bot",
  //       `Here's an Excel file with key metrics for other games. You can download it below!<br><br>
  //       <a href="other_games_metrics.xlsx" download="Other_Games_Metrics.xlsx" style="color: #007bff; text-decoration: underline;">
  //         📊 Download Metrics (Excel)
  //       </a>`
  //     );
  //   } else {
  //     appendMessage("bot", "Invalid input. Please type '1' for Lottery, '2' for Keno, or '3' to view metrics.");
  //   }
  // }

  if (currentStep === 0) {
    if (userInput === "1") {
        gameData.type = "Lottery";
        appendMessage("bot", botPrompts[++currentStep]);
    } else if (userInput === "2") {
        gameData.type = "Keno";
        appendMessage("bot", botPrompts[7]); // Ask for Keno spots
        currentStep = 9; // Move to Keno-specific logic
    } else if (userInput === "3") {
        // Option to download the Excel file
        appendMessage(
            "bot",
            `Here's an Excel file with key metrics for other games. You can download it below!<br><br>
            <a href="Lotto Games.xlsx" download="Lotto Games.xlsx" style="color: #007bff; text-decoration: underline;">
              📊 Download Lottery Games (Excel)
            </a>`
        );
    } else {
        appendMessage("bot", "Invalid input. Please type '1' for Lottery, '2' for Keno, or '3' to view metrics.");
    }
}

   else if (currentStep === 1) {
    if (userInput === "1" || userInput === "2") {
      gameData.matrices = Number(userInput);
      appendMessage("bot", botPrompts[++currentStep]);
    } else {
      appendMessage("bot", "Please enter '1' or '2'.");
    }
  } else if (currentStep === 2) {
    gameData.matrix1Size = Number(userInput);
    appendMessage("bot", botPrompts[++currentStep]);
  } else if (currentStep === 3) {
    gameData.selectedNumbers1 = Number(userInput);
    if (gameData.matrices === 2) {
      appendMessage("bot", botPrompts[++currentStep]); // Ask for Matrix 2 size
    } else {
      appendMessage("bot", botPrompts[6]); // Skip to game price
      currentStep = 6;
    }
  } else if (currentStep === 4) {
    gameData.matrix2Size = Number(userInput);
    appendMessage("bot", botPrompts[++currentStep]);
  } else if (currentStep === 5) {
    gameData.selectedNumbers2 = Number(userInput);
    appendMessage("bot", botPrompts[++currentStep]);
  } else if (currentStep === 6) {
    gameData.gamePrice = parseFloat(userInput);
    if (gameData.matrices === 1) {
      gameData.prizes = [];
      gameData.currentMatchIndex = gameData.selectedNumbers1; // Initialize descending match count
      currentStep = 8; // Start collecting prizes for Matrix 1
      appendMessage(
        "bot",
        `Enter the prize for match ${gameData.currentMatchIndex} (or type 'Jackpot'):`
      );
    } else {
      currentPrizeMatrix = [];
      currentMatchIndex = { primary: gameData.selectedNumbers1, secondary: gameData.selectedNumbers2 };
      appendMessage(
        "bot",
        `Enter the prize for ${currentMatchIndex.primary} + ${currentMatchIndex.secondary} match (or type 'Jackpot'):`
      );
      currentStep = 7;
    }
  } else if (currentStep === 7) {
    // Collect prizes for Matrix 2 combined matches
    if (userInput.toLowerCase() === "jackpot") {
      currentPrizeMatrix.push("Jackpot");
    } else {
      const prize = parseFloat(userInput);
      if (isNaN(prize) || prize < 0) {
        appendMessage("bot", "Invalid input. Please enter a numeric value or 'Jackpot'.");
        return;
      }
      currentPrizeMatrix.push(prize);
    }

    // Check for the next match combination
    if (currentMatchIndex.secondary > 0) {
      currentMatchIndex.secondary--;
    } else if (currentMatchIndex.primary > 0) {
      currentMatchIndex.primary--;
      currentMatchIndex.secondary = gameData.selectedNumbers2;
    } else {
      calculateTwoMatrixLottery(); // Trigger results calculation
      return;
    }

    // Skip "0 + 0 match"
    if (currentMatchIndex.primary === 0 && currentMatchIndex.secondary === 0) {
      calculateTwoMatrixLottery();
      return;
    }

    appendMessage(
      "bot",
      `Enter the prize for ${currentMatchIndex.primary} + ${currentMatchIndex.secondary} match (or type 'Jackpot'):`
    );
  } else if (currentStep === 8) {
    // Collect prizes for Matrix 1 regular matches
    if (userInput.toLowerCase() === "jackpot") {
      gameData.prizes.push("Jackpot");
    } else {
      const prize = parseFloat(userInput);
      if (isNaN(prize) || prize < 0) {
        appendMessage("bot", "Invalid input. Please enter a numeric value or 'Jackpot'.");
        return;
      }
      gameData.prizes.push(prize);
    }

    // Decrement match index and check if there are more matches
    gameData.currentMatchIndex--;
    if (gameData.currentMatchIndex > 0) {
      appendMessage(
        "bot",
        `Enter the prize for match ${gameData.currentMatchIndex} (or type 'Jackpot'):`
      );
    } else {
      calculateMatrix1Lottery(); // All prizes collected, move to calculation
    }
  // } else if (currentStep === 9) {
  //   // Collect Keno type (number of spots)
  //   const spots = parseInt(userInput);
  //   if (isNaN(spots) || spots < 1 || spots > 12) {
  //     appendMessage("bot", "Please enter a valid number of spots (1-12).");
  //   } else {
  //     gameData.kenoType = spots;
  //     gameData.prizes = [];
  //     appendMessage("bot", `Enter the game price for Keno (e.g., 2.5):`);
  //     currentStep = 10;
  //   }
  // } else if (currentStep === 10) {
  //   // Collect Keno game price
  //   gameData.gamePrice = parseFloat(userInput);
  //   if (isNaN(gameData.gamePrice) || gameData.gamePrice <= 0) {
  //     appendMessage("bot", "Invalid input. Please enter a positive numeric value for the game price.");
  //   } else {
  //     appendMessage("bot", `Enter the prize for ${gameData.kenoType} matches (or type 'Jackpot'):`);
  //     currentPrizeMatrix = [];
  //     currentStep = 11;
  //   }
  // } else if (currentStep === 11) {
  //   // Collect Keno prizes
  //   if (userInput.toLowerCase() === "jackpot") {
  //     currentPrizeMatrix.push("Jackpot");
  //   } else {
  //     const prize = parseFloat(userInput);
  //     if (isNaN(prize) || prize < 0) {
  //       appendMessage("bot", "Invalid input. Please enter a numeric value or 'Jackpot'.");
  //       return;
  //     }
  //     currentPrizeMatrix.push(prize);
  //   }

  //   if (currentPrizeMatrix.length < gameData.kenoType + 1) {
  //     appendMessage("bot", `Enter the prize for ${gameData.kenoType - currentPrizeMatrix.length} matches (or type 'Jackpot'):`);
  //   } else {
  //     calculateKenoPayout();
  //   }
  // }

  } else if (currentStep === 9) {
    // Collect Keno type (number of spots)
    const spots = parseInt(userInput);
    if (isNaN(spots) || spots < 1 || spots > 12) {
      appendMessage("bot", "Please enter a valid number of spots (1-12).");
    } else {
      gameData.kenoType = spots;
      gameData.prizes = [];
      appendMessage("bot", `Enter the prize for ${gameData.kenoType} matches (or type 'Jackpot'):`);
      currentPrizeMatrix = [];
      currentStep = 10; // Move to collecting Keno prizes
    }
  } else if (currentStep === 10) {
    // Collect Keno prizes
    if (userInput.toLowerCase() === "jackpot") {
      currentPrizeMatrix.push("Jackpot");
    } else {
      const prize = parseFloat(userInput);
      if (isNaN(prize) || prize < 0) {
        appendMessage("bot", "Invalid input. Please enter a numeric value or 'Jackpot'.");
        return;
      }
      currentPrizeMatrix.push(prize);
    }

    if (currentPrizeMatrix.length < gameData.kenoType + 1) {
      appendMessage("bot", `Enter the prize for ${gameData.kenoType - currentPrizeMatrix.length} matches (or type 'Jackpot'):`);
    } else {
      calculateKenoPayout(); // Trigger Keno calculation
    }
  }


}


// Regular Matrix 1 Calculation
function calculateMatrix1Lottery() {
  const { matrix1Size, selectedNumbers1, gamePrice, prizes } = gameData;
  const totalCombinations = binomialCoefficient(matrix1Size, selectedNumbers1);
  const grossSales = gamePrice * totalCombinations;

  const results = [];
  let totalLiability = 0;
  let totalWinners = 0;

  // for (let matchCount = 1; matchCount <= selectedNumbers1; matchCount++) {
  //   const prize = prizes[matchCount - 1];
  for (let matchCount = selectedNumbers1; matchCount >= 1; matchCount--) {
    const prize = prizes[selectedNumbers1 - matchCount]; // Reverse access
  
    //if (prize === 0) continue; // Skip matches with $0 prize

    const favorableCombinations =
      binomialCoefficient(selectedNumbers1, matchCount) *
      binomialCoefficient(matrix1Size - selectedNumbers1, selectedNumbers1 - matchCount);

    const odds = totalCombinations / favorableCombinations;
    const expectedWinners = totalCombinations / odds;

    const liability = prize === "Jackpot" ? 0 : expectedWinners * prize;

    results.push({
      match: matchCount,
      expectedWinners: Math.round(expectedWinners).toLocaleString(), // Format with commas
      odds: Math.round(odds).toLocaleString(), // Format odds
      //prize: prize.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), // Prize formatted with commas
      prize: prize === 0 ? "$0.00" : `$${prize.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      liability: liability.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), // Liability formatted with commas
    });
    

    totalLiability += liability;
    if (prize !== "Jackpot" && prize > 0) {
      totalWinners += expectedWinners;
    }
  }

  const totalProbability = totalLiability / grossSales || 0;
  const overallOdds = totalCombinations / totalWinners || Infinity;

  displayResults(results, totalProbability, overallOdds, totalLiability, totalWinners, grossSales);
}

// Two-Matrix Calculation
function calculateTwoMatrixLottery() {
  const {
    matrix1Size,
    selectedNumbers1,
    matrix2Size,
    selectedNumbers2,
    gamePrice,
  } = gameData;

    const totalCombinations =
    binomialCoefficient(matrix1Size, selectedNumbers1) *
    binomialCoefficient(matrix2Size, selectedNumbers2);

  const results = [];
  let totalLiability = 0;
  let totalWinners = 0; // Winners for non-zero prizes
  //let totalSumWinners = 0; // Sum of all winners, including $0 and jackpots
  let jackpotPresent = false;

  let prizeIndex = 0;

  for (let i = selectedNumbers1; i >= 0; i--) {
    for (let j = selectedNumbers2; j >= 0; j--) {
      if (i === 0 && j === 0) continue; // Skip "0 + 0 match"

      const favorablePrimary =
        binomialCoefficient(selectedNumbers1, i) *
        binomialCoefficient(matrix1Size - selectedNumbers1, selectedNumbers1 - i);
      const favorableSecondary =
        binomialCoefficient(selectedNumbers2, j) *
        binomialCoefficient(matrix2Size - selectedNumbers2, selectedNumbers2 - j);

      const favorableCombinations = favorablePrimary * favorableSecondary;

      if (favorableCombinations === 0) continue; // Skip invalid combinations

      const odds = totalCombinations / favorableCombinations; // Odds per match
      const expectedWinners = totalCombinations / odds; // Winners per match
      //totalSumWinners += expectedWinners; // Add all winners

      const prize = currentPrizeMatrix[prizeIndex++];
      let liability = 0;

      if (prize === "Jackpot") {
        jackpotPresent = true; // Flag jackpot present
        results.push({
          match: `${i} + ${j}`,
          expectedWinners: Math.round(expectedWinners),
          odds: odds.toFixed(2),
          prize: "Jackpot",
          liability: "", // No liability for jackpot
        });
      } else {
        liability = prize === 0 ? 0 : expectedWinners * prize;
        totalLiability += liability; // Add to liability if not a jackpot

        results.push({
          match: `${i} + ${j}`,
          expectedWinners: Math.round(expectedWinners).toLocaleString(),
          odds: odds.toFixed(2).toLocaleString(),
          prize: prize === 0 ? "$0.00" : `$${prize.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          liability: liability.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        });
      }

      // Count winners for non-zero prizes or jackpot
      if (prize !== "Jackpot" && prize > 0) {
        totalWinners += expectedWinners;
      }
    }
  }

  // Adjust total probability based on jackpot presence
  const totalProbability = jackpotPresent
    ? 0.5 // Fixed 50% for jackpots
    : totalLiability / (gamePrice * totalCombinations);

  // Overall odds calculation
  const overallOdds = totalCombinations / totalWinners || Infinity;

  displayResults(results, totalProbability, overallOdds, totalLiability, totalWinners, gamePrice * totalCombinations);
}

// Keno Calculation
function calculateKenoPayout() {
  const { kenoType } = gameData;
  const totalCombinations = binomialCoefficient(80, 20); // Total ways to choose 20 numbers from 80
  const results = [];
  let totalLiability = 0;
  let totalWinners = 0;
  let totalSumWinners = 0; // Total winners include even $0 prize matches

  for (let matchCount = 0; matchCount <= kenoType; matchCount++) {
    const prize = currentPrizeMatrix[kenoType - matchCount]; // Match prizes in reverse order
    const favorableCombinations =
      binomialCoefficient(20, matchCount) *
      binomialCoefficient(60, kenoType - matchCount);

    const odds = totalCombinations / favorableCombinations; // Correct odds calculation
    const expectedWinners = favorableCombinations; // Expected winners are based on favorable combinations
    totalSumWinners += expectedWinners; // Include all winners, even for $0 prize matches

    if (prize === "Jackpot") {
      results.push({
        match: matchCount,
        expectedWinners: Math.round(expectedWinners),
        odds: odds.toFixed(2),
        prize: "Jackpot",
        liability: "",
      });
    } else {
      const liability = prize === 0 ? 0 : expectedWinners * prize; // Liability is 0 for $0 prizes
      totalLiability += liability;

      results.push({
        match: matchCount,
        expectedWinners: Math.round(expectedWinners),
        odds: odds.toFixed(2),
        prize: prize === 0 ? 0 : prize.toFixed(2), // Keep $0 for display
        liability: liability.toFixed(2),
      });
    }

    if (prize !== "Jackpot" && prize > 0) {
      totalWinners += expectedWinners; // Only count winners for prizes > $0 or Jackpot
    }
  }

  // Total probability is now relative to totalSumWinners
  const totalProbability = totalLiability / totalSumWinners || 0;

  // Overall odds based on totalSumWinners and totalWinners
  const overallOdds = totalSumWinners / totalWinners || Infinity;

  displayResults(results, totalProbability, overallOdds, totalLiability, totalWinners, totalSumWinners);
}

function createDownloadButton(results, totalProbability, overallOdds, totalLiability, totalWinners, grossSales) {
  const downloadButton = document.createElement("button");
  downloadButton.innerText = "Download Results (CSV)";
  downloadButton.style.margin = "10px";
  downloadButton.onclick = () => downloadResultsAsCSV(results, totalProbability, overallOdds, totalLiability, totalWinners, grossSales);

  const messages = document.getElementById("messages");
  messages.appendChild(downloadButton);
  scrollToBottom();
}

function downloadResultsAsCSV(results, totalProbability, overallOdds, totalLiability, totalWinners, grossSales) {
  let csvContent = "data:text/csv;charset=utf-8,";

  // Add headers
  csvContent += `"Match","Expected Winners","Odds (1 in)","Prize","Liability"\n`;

  // Add results for each match
  results.forEach(result => {
    const match = result.match;
    const expectedWinners = result.expectedWinners;
    // const odds = result.odds;
    const odds = result.odds ? (result.odds).toLocaleString(undefined, { minimumFractionDigits: 2 }) : "" ;
    const prize = result.prize === "Jackpot" ? "Jackpot" : `${(result.prize).toLocaleString()}`;
    const liability = result.liability ? `$${(result.liability).toLocaleString()}` : "";

    // Add the row to the CSV
    csvContent += `"${match}","${expectedWinners}","${odds}","${prize}","${liability}"\n`;
  });

  // Add summary section with proper alignment
  csvContent += `\n"Total Probability","${(totalProbability * 100).toFixed(2)}%"\n`;
  csvContent += `"Overall Odds","1 in ${overallOdds.toFixed(2)}"\n`;
  csvContent += `"Total Liability","$${totalLiability.toLocaleString()}"\n`;
  csvContent += `"Total Number of Winners","${totalWinners.toLocaleString()}"\n`;
  csvContent += `"Total Gross Sales","$${grossSales.toLocaleString()}"\n`;

  // Create download link
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "lottery_results.csv");
  document.body.appendChild(link);

  link.click();
  document.body.removeChild(link);
}


// Display results in the chat
function displayResults(results, totalProbability, overallOdds, totalLiability, totalWinners, grossSales) {
  appendMessage("bot", "Calculation complete! Here are the results:");

  results.sort((a, b) => (b.match > a.match ? 1 : -1));
  results.forEach((result) => {

  appendMessage(
    "bot",
    `Match: ${result.match} \nExpected Winners: ${result.expectedWinners} \nOdds: 1 in ${result.odds} \nPrize: $${result.prize} \nLiability: $${result.liability}`
  )});
  appendMessage("bot", `Total Probability: ${(totalProbability * 100).toFixed(2)}%`);
  appendMessage("bot", `Overall Odds: 1 in ${overallOdds.toFixed(2).toLocaleString()}`);
  appendMessage("bot", `Total Liability: $${totalLiability.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  appendMessage("bot", `Total Number of Winners: ${totalWinners.toLocaleString()}`);
  appendMessage("bot", `Total Gross Sales: $${grossSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  

  // add download button
  createDownloadButton(results, totalProbability, overallOdds, totalLiability, totalWinners, grossSales)

  // Reset prompt
  appendMessage("bot", "Would you like to do another one? \n1: Set up a Lottery Game\n2: Set up a Keno Game\nType 'exit' to quit.");

  // Reset state for new calculation
  currentStep = 0;
  gameData = {}; // Clear previous data
}

// Attach event listeners
document.getElementById("send-button").addEventListener("click", handleUserInput);
document.getElementById("user-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleUserInput();
});

// Initialize chatbot with a greeting
window.onload = () => appendMessage("bot", botPrompts[currentStep]);
