# Lesson 2: Variables and State
## Building Your First Interactive Story

### Duration: 30-45 minutes

---

## Learning Objectives
By the end of this lesson, students will:
1. Understand what variables are and why we need them
2. Learn to modify HTML content with JavaScript
3. Create their first interactive story
4. Understand the concept of "state" in a program

---

## Part 1: What Are Variables? (10 minutes)

### Real-World Analogy
Variables are like labeled boxes where we store information:
- 📦 **Box Label** = Variable name
- 📝 **What's Inside** = Variable value
- 🔄 **Can Change** = We can put new things in the box

### JavaScript Variables

```javascript
// Creating variables (let = "let me create a box")
let playerName = "Alex";
let playerHealth = 100;
let currentLocation = "forest";

// Changing variable values
playerHealth = 75;  // Took some damage!
currentLocation = "cave";  // Moved to a new place
```

### Variable Types We'll Use Today

```javascript
// Text (Strings) - Use quotes
let storyText = "Once upon a time...";
let characterName = "Brave Knight";

// Numbers
let goldCoins = 50;
let playerLevel = 1;

// True/False (Booleans)
let hasKey = false;
let doorIsOpen = true;
```

---

## Part 2: Building Our Adventure (20 minutes)

### Starting Code Structure

We'll build a simple story step by step. Start with `cyoa-starter.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Adventure</title>
</head>
<body>
    <h1>The Mysterious Door</h1>
    
    <!-- This div will hold our story text -->
    <div id="story">
        You stand before a mysterious door...
    </div>
    
    <!-- This div will hold our choice buttons -->
    <div id="choices">
        <button onclick="openDoor()">Open the door</button>
        <button onclick="walkAway()">Walk away</button>
    </div>
    
    <script>
        // Our JavaScript goes here!
    </script>
</body>
</html>
```

### Step 1: Create Story Variables

```javascript
// Story variables to track player progress
let playerName = "Adventurer";
let hasKey = false;
let goldFound = 0;
```

### Step 2: Create Story Functions

```javascript
function openDoor() {
    // Change the story text
    document.getElementById('story').innerHTML = 
        "The door creaks open. Inside, you see a glowing chest!";
    
    // Change the choices
    document.getElementById('choices').innerHTML = 
        '<button onclick="openChest()">Open the chest</button>' +
        '<button onclick="leave()">Leave quickly</button>';
}

function walkAway() {
    document.getElementById('story').innerHTML = 
        "You walk away safely. The End.";
    
    document.getElementById('choices').innerHTML = 
        '<button onclick="restart()">Start Over</button>';
}
```

### Step 3: Understanding `document.getElementById()`

This is how we grab HTML elements and change them:

```javascript
// Find the element with id="story"
let storyElement = document.getElementById('story');

// Change what's inside it
storyElement.innerHTML = "New story text!";

// We can do it in one line too:
document.getElementById('story').innerHTML = "Even newer text!";
```

---

## Part 3: Adding State to Our Story (10 minutes)

### Making Choices Matter

Let's add variables that track what the player has done:

```javascript
// Game state variables
let hasVisitedCave = false;
let hasSword = false;
let defeatedDragon = false;

function enterCave() {
    hasVisitedCave = true;  // Remember we've been here
    
    if (hasSword) {
        // Player has sword - show one story
        document.getElementById('story').innerHTML = 
            "With your sword gleaming, you bravely enter the cave.";
    } else {
        // Player has no sword - show different story
        document.getElementById('story').innerHTML = 
            "You enter the dark cave with only your wits.";
    }
}
```

### Complete Example: Treasure Counter

```javascript
let goldCoins = 0;  // Start with no gold

function findTreasure() {
    goldCoins = goldCoins + 10;  // Add 10 gold
    
    document.getElementById('story').innerHTML = 
        "You found 10 gold coins! Total gold: " + goldCoins;
    
    if (goldCoins >= 30) {
        document.getElementById('choices').innerHTML = 
            '<button onclick="buyShip()">Buy a ship (30 gold)</button>';
    }
}
```

---

## Part 4: Your Turn! (5 minutes)

### Modify the Starter Story

Try adding these features to `cyoa-starter.html`:

1. **Add a gold counter:**
```javascript
let gold = 0;

function findGold() {
    gold = gold + 5;
    document.getElementById('story').innerHTML = 
        "You found 5 gold! Total: " + gold;
}
```

2. **Add player health:**
```javascript
let health = 100;

function takeDamage() {
    health = health - 10;
    if (health <= 0) {
        document.getElementById('story').innerHTML = "Game Over!";
    }
}
```

3. **Add inventory:**
```javascript
let hasKey = false;
let hasMap = false;

function findKey() {
    hasKey = true;
    document.getElementById('story').innerHTML = 
        "You found a rusty key!";
}
```

---

## Homework: Create Your Story

### Assignment: Personal Adventure

Create your own 6-scene adventure story! Requirements:

1. **At least 3 variables** tracking player state:
   - Example: `playerHealth`, `hasWeapon`, `friendshipPoints`

2. **At least 6 different story scenes** (functions)

3. **Meaningful choices** that affect the story

4. **At least 2 different endings**

### Story Ideas:
- 🏴‍☠️ Pirate treasure hunt
- 🚀 Space exploration
- 🏫 School mystery
- 🦖 Time travel adventure
- 🏰 Medieval quest

### Template to Get Started:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Unique Adventure</title>
    <style>
        /* Make it look nice! */
        body {
            font-family: Arial;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
    </style>
</head>
<body>
    <h1>Your Title Here</h1>
    <div id="story">Introduction text...</div>
    <div id="choices">
        <button onclick="choice1()">First choice</button>
        <button onclick="choice2()">Second choice</button>
    </div>
    
    <script>
        // Variables
        let score = 0;
        // Add more variables
        
        // Functions for each scene
        function choice1() {
            // Your code here
        }
        
        function choice2() {
            // Your code here
        }
        
        // Add more functions for more scenes
    </script>
</body>
</html>
```

---

## Teacher Notes

### Common Mistakes to Address:
1. **Forgetting quotes around strings**: `let name = Alex;` ❌ vs `let name = "Alex";` ✅
2. **Misspelling getElementById**: It's case-sensitive!
3. **Missing + for concatenation**: Show how to combine strings

### Debugging Tips for Students:
- Use `console.log(variableName)` to check values
- Press F12 to open browser console
- Check for red error messages

### Extension Activities:
- Add images to scenes: `<img src="castle.jpg">`
- Add CSS animations
- Create a score display that's always visible

### Assessment Rubric:
- **Basic (C)**: 3 variables, 4 scenes, 1 ending
- **Proficient (B)**: 3+ variables used meaningfully, 6 scenes, 2 endings
- **Advanced (A)**: Complex state tracking, 8+ scenes, multiple paths

### Next Lesson Preview:
"Next time, we'll learn about functions to make our code reusable and organized!"

---

## Quick Reference Card

### HTML Elements We Use:
```javascript
// Get an element
document.getElementById('id-name')

// Change its content
.innerHTML = "new content"
```

### Variable Operations:
```javascript
// Create
let variableName = value;

// Change
variableName = newValue;

// Add to number
score = score + 10;

// Combine strings
message = "Hello " + playerName;
```

### Function Structure:
```javascript
function functionName() {
    // Code goes here
}
```

### Button HTML:
```html
<button onclick="functionName()">Button Text</button>
```