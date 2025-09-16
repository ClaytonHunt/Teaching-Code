# Lesson 1: The Importance of Clean Code
## Introduction to Programming Through Mastermind

### Duration: 30-45 minutes

---

## Learning Objectives
By the end of this lesson, students will:
1. Experience the difference between unreadable and clean code
2. Understand that programming is about communication (with humans AND computers)
3. See a complete working program and identify basic structures
4. Learn about the Mastermind game logic

---

## Part 1: The Mystery Code (10 minutes)

### Activity: Code Detective
Open `mastermind-obfuscated.html` in your browser. Try to understand what the code does by looking at it.

### Classic Games Collection
We also have ports of two classic QBasic games to explore:
- **`nibbles.html`** - The classic snake game where you eat numbers to grow
- **`gorilla.html`** - Two gorillas throwing explosive bananas at each other

**Discussion Questions:**
- Can you figure out what this program does?
- Would you want to work with code like this?
- What makes it hard to understand?

### The Problems with Bad Code:
- **Cryptic variable names**: `_$`, `a`, `b`, `c` tell us nothing
- **No spacing or structure**: Everything is crammed together
- **No comments**: No explanation of what's happening
- **Obfuscation**: Deliberately made confusing

**Key Insight:** This code works perfectly! The computer understands it fine. But humans can't maintain, fix, or improve it.

---

## Part 2: The Same Program, But Clean (20 minutes)

### Activity: Compare and Contrast
Now open `mastermind-clean.html`. This is the EXACT same game, but written for humans to read.

### Clean Code Principles Demonstrated:

#### 1. **Meaningful Names**
```javascript
// BAD: What is 'a'?
var a = [];

// GOOD: The name tells you everything
let secretCode = [];
```

#### 2. **Clear Constants**
```javascript
// BAD: Magic numbers everywhere
if (i < 10) { }

// GOOD: Named constants explain the rules
const MAX_ATTEMPTS = 10;
if (attemptNumber < MAX_ATTEMPTS) { }
```

#### 3. **Self-Documenting Functions**
```javascript
// The function name tells you what it does
function generateSecretCode() {
    // The code inside is simple and clear
    const code = [];
    for (let position = 0; position < CODE_LENGTH; position++) {
        const randomColor = Math.floor(Math.random() * COLORS_AVAILABLE) + 1;
        code.push(randomColor);
    }
    return code;
}
```

#### 4. **Logical Organization**
The clean version is organized into sections:
- Configuration (game rules)
- State (what changes during play)
- Functions (actions the game can take)
- Display (showing the game to the player)

---

## Part 3: Understanding Mastermind (10 minutes)

### How the Game Works:

1. **The Secret**: Computer picks 4 colors (numbers 1-6)
   ```javascript
   secretCode = [3, 1, 4, 2]  // Example: Green, Red, Yellow, Blue
   ```

2. **Your Guess**: You try to guess the pattern
   ```javascript
   currentGuess = [1, 1, 4, 5]  // Red, Red, Yellow, Purple
   ```

3. **The Feedback**: Game tells you how close you are
   - 🟢 **Exact Match**: Right color in the right spot
   - 🟡 **Color Match**: Right color but wrong spot
   - ⚪ **No Match**: That color isn't in the code

### The Algorithm (Simplified):
```javascript
function evaluateGuess(guess, secret) {
    let exactMatches = 0;
    let colorMatches = 0;
    
    // Check each position
    for (let position = 0; position < 4; position++) {
        if (guess[position] === secret[position]) {
            exactMatches++;  // Right color, right place!
        }
    }
    
    // Then check for colors in wrong positions
    // (More complex logic here in real code)
    
    return { exactMatches, colorMatches };
}
```

---

## Part 4: Key Programming Concepts Spotted (5 minutes)

Looking at the clean code, we can identify:

### Variables (Storage)
```javascript
let secretCode = [];        // Stores the answer
let currentGuess = [];      // Stores what player is building
let attemptNumber = 0;      // Counts tries
```

### Functions (Actions)
```javascript
startNewGame()             // Resets everything
addColorToGuess(color)     // Adds a color to current guess
submitGuess()              // Checks if guess is correct
```

### Conditionals (Decisions)
```javascript
if (gameIsOver) return;    // Stop if game ended
if (currentGuess.length !== CODE_LENGTH) {
    alert('Please select 4 colors!');
}
```

### Loops (Repetition)
```javascript
for (let position = 0; position < CODE_LENGTH; position++) {
    // Do something for each position
}
```

---

## Homework Assignment: Code Explorer

### Task 1: Play and Observe
1. Play Mastermind at least 3 times
2. Try Nibbles and Gorilla games - these are direct ports from 1990s QBasic!
3. Write down one strategy you discovered for solving the puzzle

### Task 2: Code Modification (Challenge)
Try making ONE small change to `mastermind-clean.html`:

**Easy Changes:**
- Change `MAX_ATTEMPTS` from 10 to 12
- Change the victory message text
- Change the color emoji (like 🔴 to 🟥)

**Medium Changes:**
- Add a 7th color option
- Change the code length from 4 to 3 or 5
- Add sound effects (research `new Audio()`)

### Task 3: Reflection Questions
Answer in 2-3 sentences each:
1. Why do you think programmers care about "clean code" if the computer doesn't care?
2. What was the most confusing part of the code? What was the clearest?
3. If you had to explain the Mastermind algorithm to a friend, how would you do it?

---

## Teacher Notes

### Setup Required:
- Students need a text editor (Notepad++ or VS Code)
- Students need a web browser
- Provide all HTML files on USB or shared drive:
  - mastermind-obfuscated.html
  - mastermind-clean.html
  - nibbles.html (QBasic snake game port)
  - gorilla.html (QBasic gorilla game port)

### Common Questions:
- **"Why use numbers instead of actual colors?"** - It's easier to work with numbers in code, then convert to visuals for humans
- **"What does `Math.random()` do?"** - Generates a decimal between 0 and 1
- **"Why arrays start at 0?"** - Computer memory addressing tradition

### Discussion Points:
- Emphasize that professional programmers read code more than they write it
- Connect to writing essays: rough draft (working code) vs final draft (clean code)
- Mention that in teams, others need to understand your code

### Assessment:
- Participation in code comparison discussion
- Successful gameplay shows understanding of rules
- Any successful code modification shows engagement
- Reflection demonstrates critical thinking

### Next Lesson Preview:
"Next time, we'll start building our own game from scratch - a Choose Your Own Adventure story!"

---

## Code Snippets for Discussion

### Example 1: The Power of Names
```javascript
// Which is clearer?

// Version A:
function calc(x, y) {
    return x * y * 0.1;
}

// Version B:
function calculateTip(mealCost, tipPercent) {
    return mealCost * tipPercent * 0.01;
}
```

### Example 2: The Importance of Structure
```javascript
// Which is easier to modify?

// Version A:
if(score>10){pts+=100;lvl++;showMsg("Great!");}

// Version B:
if (score > LEVEL_THRESHOLD) {
    points += LEVEL_BONUS;
    currentLevel++;
    displayMessage("Level Up! Great job!");
}
```

### Example 3: Comments When Needed
```javascript
// Sometimes the WHY is more important than the WHAT

// Generate random number from 1-6 (dice roll)
const diceRoll = Math.floor(Math.random() * 6) + 1;
// We add 1 because Math.random() gives us 0-0.999...
// and floor() rounds down, giving us 0-5
// Adding 1 makes it 1-6 like a real die
```