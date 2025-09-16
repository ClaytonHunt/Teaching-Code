# Conditionals and Game Logic - Quick Reference

## Core Concepts

### What Are Conditionals?
Conditionals are **decision-making tools** that make your games react intelligently:
- 🚪 **Digital Bouncer** - Check if conditions are met before allowing actions
- 🎯 **Smart Responses** - Different outcomes based on player choices
- 🔀 **Branching Logic** - Multiple paths through your story
- 🎮 **Game Intelligence** - React to player stats, inventory, and actions

### Why Conditionals Matter
```javascript
// Without conditionals: Same outcome every time
let hasKey = true;
console.log("You enter the room.");

// With conditionals: Smart game responses
if (hasKey) {
    console.log("The door opens! You enter safely.");
} else {
    console.log("The door is locked. You need a key!");
}
```

---

## Essential Conditional Patterns

### Basic If Statement
```javascript
// The fundamental decision maker
let playerHealth = 75;

if (playerHealth > 0) {
    console.log("You're still alive!");
}

// If-else for two outcomes
let playerGold = 30;

if (playerGold >= 50) {
    console.log("You can afford the magic sword!");
} else {
    console.log("You need more gold.");
}
```

### Multiple Conditions (If-Else Chain)
```javascript
let playerLevel = 7;

if (playerLevel >= 10) {
    console.log("You're a master adventurer!");
} else if (playerLevel >= 5) {
    console.log("You're an experienced explorer!");
} else if (playerLevel >= 1) {
    console.log("You're a brave beginner!");
} else {
    console.log("Your journey starts now!");
}
```

---

## Comparison Operators

### Essential Comparisons
```javascript
// === : Exactly equals (ALWAYS use this!)
// !== : Not exactly equals
// > : Greater than
// < : Less than
// >= : Greater than or equal
// <= : Less than or equal

let gold = 50;
let swordPrice = 30;

if (gold >= swordPrice) {
    console.log("You can afford the sword!");
}

// String comparisons
let password = "secret123";
let userInput = "secret123";

if (userInput === password) {
    console.log("Access granted!");
}
```

### Avoid == and !=
```javascript
// BAD: Confusing behavior
5 == "5"     // true (converts types)

// GOOD: Safe and predictable
5 === "5"    // false (different types)
```

---

## Logical Operators

### AND Operator (&&)
Both conditions must be true:
```javascript
// Need both sword AND shield
let hasSword = true;
let hasShield = true;

if (hasSword && hasShield) {
    console.log("You're fully equipped for battle!");
}

// Multiple conditions
let playerHealth = 100;
let enemyHealth = 50;

if (playerHealth > 0 && enemyHealth > 0) {
    console.log("The battle continues!");
}
```

### OR Operator (||)
At least one condition must be true:
```javascript
// Either magic key OR lockpicks work
let hasMagicKey = false;
let hasLockpicks = true;

if (hasMagicKey || hasLockpicks) {
    console.log("You can open the chest!");
}

// Class-based abilities
let playerClass = "Wizard";

if (playerClass === "Wizard" || playerClass === "Sorcerer") {
    console.log("You can cast spells!");
}
```

### NOT Operator (!)
Reverses true/false:
```javascript
// Check if something is missing
let hasTorch = false;

if (!hasTorch) {
    console.log("It's too dark to see!");
}

// Reverse boolean values
let isDaytime = false;

if (!isDaytime) {
    console.log("Monsters come out at night!");
}
```

---

## Practical Game Patterns

### Equipment Requirements
```javascript
let playerLevel = 7;
let hasTorch = true;

if (playerLevel >= 5) {
    if (hasTorch) {
        console.log("You explore the dungeon safely.");
        // Find treasure logic here
    } else {
        console.log("You need a torch to see in the dark!");
    }
} else {
    console.log("You're not experienced enough! (Need level 5)");
}
```

### Combat Readiness Check
```javascript
let hasSword = true;
let hasShield = false;
let playerHealth = 60;

// Need weapon AND shield AND enough health
if ((hasSword || hasMagicStaff) && hasShield && playerHealth >= 50) {
    console.log("You're ready to fight the dragon!");
} else {
    console.log("You're not prepared for this battle!");

    // Give specific feedback
    if (playerHealth < 50) {
        console.log("Your health is too low for this battle!");
    } else if (!hasShield) {
        console.log("You need a shield to protect yourself!");
    } else {
        console.log("You need a weapon to fight!");
    }
}
```

### Shop System with Discounts
```javascript
let itemPrice = 30;
let playerGold = 25;
let reputation = 15;

if (playerGold >= itemPrice) {
    // Can afford full price
    playerGold = playerGold - itemPrice;
    console.log("You bought the item!");
} else if (playerGold >= itemPrice - 5 && reputation >= 10) {
    // Discount for good reputation
    playerGold = playerGold - (itemPrice - 5);
    console.log("The shopkeeper gives you a discount! You bought the item!");
} else {
    // Can't afford
    let goldNeeded = itemPrice - playerGold;
    console.log("You need " + goldNeeded + " more gold to buy this item.");
}
```

### Dynamic Door System
```javascript
let doorColor = "red";
let hasRedKey = true;
let hasBlueKey = false;
let hasGoldKey = false;
let isThief = false;

if (doorColor === "red" && hasRedKey) {
    console.log("The red door opens with a satisfying click!");
} else if (doorColor === "blue" && hasBlueKey) {
    console.log("The blue door glows and opens!");
} else if (doorColor === "gold" && hasGoldKey) {
    console.log("Your gold key opens the golden door!");
} else if (isThief && doorColor !== "gold") {
    console.log("You pick the lock skillfully!");
} else {
    console.log("The door won't budge. You need the right key!");
}
```

---

## Your Assignment: Smart Story Quest

### Requirements
Build an intelligent story that reacts to player choices:

1. **Use All Conditional Types:**
   - Simple if statements
   - If-else chains
   - Combined conditions (&&, ||)
   - NOT operator (!)

2. **Implement Game Systems:**
   - **Inventory checks** - Different outcomes based on items
   - **Stat requirements** - Level, health, or skill checks
   - **Reputation system** - NPCs react differently based on past choices
   - **Dynamic pricing** - Shop prices change based on reputation

3. **Create Branching Storylines:**
   - At least 3 different endings
   - Multiple paths to reach each ending
   - Consequences that affect later choices

### Example Implementation
```javascript
// Story variables
let playerHealth = 100;
let playerGold = 25;
let hasKey = false;
let hasMap = true;
let playerLevel = 3;
let reputation = 10;

// Smart story logic
if (hasMap && playerLevel >= 3) {
    if (hasKey) {
        console.log("You use the map and key to find the secret treasure room!");
        playerGold = playerGold + 100;
    } else {
        console.log("You found the treasure room but it's locked!");
    }
} else if (hasMap && playerLevel < 3) {
    console.log("You have a map but lack the experience to read it properly.");
} else {
    console.log("You wander around lost without a map.");
}

// Reputation-based interactions
if (reputation >= 20) {
    console.log("The guards bow as you enter. The king greets you warmly!");
} else if (reputation >= 0) {
    console.log("The guards eye you suspiciously but let you pass.");
} else {
    console.log("Guards block your path. Your reputation is too poor!");
}
```

---

## Quick Reference

### Conditional Syntax
```javascript
// Basic if
if (condition) {
    // code here
}

// If-else
if (condition) {
    // code for true
} else {
    // code for false
}

// If-else chain
if (condition1) {
    // first option
} else if (condition2) {
    // second option
} else {
    // default option
}
```

### Operators Summary
```javascript
// Comparison
=== !== > < >= <=

// Logical
&& (and)  || (or)  ! (not)

// Examples
if (a === b && c > d) { }
if (x < 5 || y > 10) { }
if (!hasItem) { }
```

### Best Practices
- **Always use ===** instead of ==
- **Give specific feedback** when conditions fail
- **Test all paths** through your conditional logic
- **Use meaningful condition names** for clarity