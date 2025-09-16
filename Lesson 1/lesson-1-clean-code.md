# Clean Code - Quick Reference

## Core Concepts

### What is Clean Code?
Clean code is written for **humans to read**, not just computers to execute:
- 🧹 **Clear and simple** - Easy to understand at a glance
- 📖 **Self-documenting** - The code tells its own story
- 🔧 **Easy to modify** - Can be changed without breaking things
- 👥 **Team-friendly** - Others can work with your code

### Why Clean Code Matters
```javascript
// Computer doesn't care about this:
var a,b=0,c=[],d=!1,e={1:'🔴',2:'🔵'...}

// But humans do care about this:
let secretCode = [];
let attemptNumber = 0;
let gameHistory = [];
let isGameOver = false;
```

---

## Clean Code Principles

### 1. Meaningful Names
```javascript
// BAD: Cryptic and confusing
var a = [];
function f() { }
if (i < 10) { }

// GOOD: Names explain themselves
let secretCode = [];
function generateSecretCode() { }
const MAX_ATTEMPTS = 10;
if (attemptNumber < MAX_ATTEMPTS) { }
```

### 2. Self-Documenting Functions
```javascript
// Function name tells you WHAT it does
function generateSecretCode() {
    const code = [];
    for (let position = 0; position < CODE_LENGTH; position++) {
        const randomColor = Math.floor(Math.random() * COLORS_AVAILABLE) + 1;
        code.push(randomColor);
    }
    return code;
}

// Variables and logic show you HOW it works
```

### 3. Logical Organization
Organize code into clear sections:
- **Configuration** - Game rules and constants
- **State** - Variables that change during play
- **Functions** - Actions the program can take
- **Main Logic** - How everything works together

---

## Programming Concepts in Mastermind

### Variables (Storage Boxes)
```javascript
let secretCode = [];        // Stores the hidden pattern
let currentGuess = [];      // Stores player's current attempt
let attemptNumber = 0;      // Counts how many tries
let gameHistory = [];       // Remembers all previous guesses
```

### Functions (Action Packages)
```javascript
startNewGame()             // Resets everything for a fresh start
addColorToGuess(color)     // Adds a color to current guess
submitGuess()              // Checks if guess matches secret
evaluateGuess(guess, secret) // Compares guess to secret code
```

### Conditionals (Decision Making)
```javascript
if (gameIsOver) return;    // Stop if game has ended

if (currentGuess.length !== CODE_LENGTH) {
    alert('Please select 4 colors!');
    return;
}
```

### Loops (Repetition)
```javascript
// Do something for each position in the code
for (let position = 0; position < CODE_LENGTH; position++) {
    if (guess[position] === secret[position]) {
        exactMatches++;
    }
}
```

---

## Mastermind Game Logic

### How the Game Works
1. **Secret Code**: Computer generates 4 random colors (1-6)
2. **Player Guess**: You select 4 colors to try to match
3. **Feedback**: Game shows how close you were

### Feedback System
- 🟢 **Exact Match**: Right color in the right position
- 🟡 **Color Match**: Right color but wrong position
- ⚪ **No Match**: That color isn't in the secret code

### Example Round
```javascript
secretCode = [3, 1, 4, 2]    // Green, Red, Yellow, Blue
playerGuess = [1, 1, 4, 5]   // Red, Red, Yellow, Purple

// Feedback: 1 exact match (Yellow in position 3)
//          1 color match (Red is in secret, but wrong position)
//          2 no matches (second Red and Purple aren't useful)
```

---

## Classic Game Collection

### 🦍 Gorilla
- Two gorillas throw explosive bananas
- Calculate angle and velocity
- Destroy buildings to hit your opponent
- Direct port from 1990s QBasic

---

## Your Assignment: Code Explorer

### Tasks
1. **Play the Games**
   - Try Mastermind and Gorilla
   - Notice how the games feel different but use similar programming concepts

2. **Compare the Code**
   - Look at `mastermind-obfuscated.html` vs `mastermind-clean.html`
   - Same game, completely different readability

3. **Experiment** (Optional)
   - Try changing one small thing in `mastermind-clean.html`
   - Ideas: number of attempts, victory message, add a color

### Reflection Questions
- Why do programmers care about clean code if computers don't?
- What made the obfuscated code hard to understand?
- How would you explain Mastermind's rules to a friend?

---

## Key Takeaways

### Programming is Communication
- 🤖 **With computers**: Code must work correctly
- 👥 **With humans**: Code must be readable and maintainable
- 🔄 **With future you**: You'll need to understand your own code later

### The Clean Code Mindset
- **Write for the human who comes next** (often yourself!)
- **Clarity over cleverness** - Simple beats complex
- **Names matter** - They're your main documentation tool
- **Structure helps** - Organized code is easier to navigate