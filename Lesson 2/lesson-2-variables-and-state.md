# Variables and Interactivity - Quick Reference

## Core Concepts

### What Are Variables?
Variables are like **labeled boxes** where we store information:
- 📦 **Box Label** = Variable name
- 📝 **What's Inside** = Variable value
- 🔄 **Can Change** = We can put new things in the box

### Variable Types

```javascript
// Text (Strings) - Always use quotes
let playerName = "Alex";
let storyText = "Once upon a time...";

// Numbers
let health = 100;
let gold = 50;

// True/False (Booleans)
let hasKey = false;
let doorIsOpen = true;
```

---

## Essential JavaScript Patterns

### Creating and Changing Variables
```javascript
// Create
let playerHealth = 100;

// Change
playerHealth = 75;

// Add to numbers
gold = gold + 10;

// Combine text
message = "Hello " + playerName;
```

### DOM Manipulation
```javascript
// Get an HTML element
document.getElementById('story')

// Change what's inside it
document.getElementById('story').innerHTML = "New text!";

// Store element in variable for reuse
let storyElement = document.getElementById('story');
storyElement.innerHTML = "Updated story!";
```

### Functions: Packages of Instructions
Think of functions like **recipe cards** - they contain named sets of instructions:

```javascript
// Function structure (the recipe card)
function functionName() {
    // Your instructions here
}

// HTML button that calls function (following the recipe)
<button onclick="functionName()">Click me</button>
```

**Key concepts:**
- `function` = creates a package of instructions
- `functionName` = what you call the package
- `()` = required syntax (we'll learn why in Lesson 3)
- Button `onclick` = runs the function when clicked

*Note: We're using functions as tools here. In Lesson 3, you'll learn how to make functions flexible with parameters and return values!*

---

## Interactive Story Structure

### Basic HTML Template
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Adventure</title>
</head>
<body>
    <h1>Adventure Title</h1>
    <div id="story">Story text goes here...</div>
    <div id="choices">
        <button onclick="choice1()">Option 1</button>
        <button onclick="choice2()">Option 2</button>
    </div>

    <script>
        // Variables and functions go here
    </script>
</body>
</html>
```

---

## Common Patterns

### Choice Navigation
```javascript
function makeChoice() {
    // Update story
    document.getElementById('story').innerHTML = "What happened next...";

    // Update buttons
    document.getElementById('choices').innerHTML =
        '<button onclick="nextChoice()">Continue</button>' +
        '<button onclick="goBack()">Go back</button>';
}
```

### String Combination
```javascript
// Combine variables with text to create messages
function updateGoldDisplay() {
    let message = "You have " + gold + " gold coins.";
    document.getElementById('story').innerHTML = message;
}

// Update player status
function showPlayerInfo() {
    let info = playerName + " has " + health + " health points.";
    document.getElementById('story').innerHTML = info;
}
```

---

## Debugging Tips

### Common Mistakes
- **Missing quotes**: `let name = Alex;` ❌ → `let name = "Alex";` ✅
- **Case sensitivity**: `getElementByID` ❌ → `getElementById` ✅
- **Missing +**: `"Hello" playerName` ❌ → `"Hello " + playerName` ✅

### Debug Tools
```javascript
// Check variable values
console.log(playerHealth);

// Check if element exists
console.log(document.getElementById('story'));

// Add breakpoints
debugger; // Pauses execution here
```

**Open browser console**: Press F12 → Console tab

---

## Assignment Checklist

### Requirements
- [ ] At least 3 variables tracking player state
- [ ] At least 6 different story scenes (functions)
- [ ] Meaningful choices that affect the story
- [ ] At least 2 different endings

### Story Ideas
🏴‍☠️ Pirate treasure hunt | 🚀 Space exploration | 🏫 School mystery | 🦖 Time travel | 🏰 Medieval quest

### Testing Your Story
1. Play through each possible path
2. Check that variables update correctly
3. Verify all buttons work
4. Test different endings