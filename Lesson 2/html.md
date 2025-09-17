# HTML Quick Reference for Programming Class

## What You Need to Know

This class focuses on **programming concepts**, not web design. However, our interactive games and projects use HTML as the foundation. This guide covers only what you need to complete assignments successfully.

---

## Essential HTML Structure

Every HTML file needs this basic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Game</title>
</head>
<body>
    <!-- Your content goes here -->
</body>
</html>
```

**What this means:**
- `<!DOCTYPE html>` - Tells browser this is modern HTML
- `<html>` - Root container for everything
- `<head>` - Information about the page (not visible)
- `<body>` - Visible content of your page

---

## Elements You'll Use in Projects

### Content Elements
```html
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<p>A paragraph of text</p>
<div>A container for grouping elements</div>
<span>Inline text styling</span>
```

### Interactive Elements
```html
<button onclick="myFunction()">Click Me</button>
<button id="startBtn">Start Game</button>
```

### Lists (for inventory, menus)
```html
<ul>
    <li>Health Potion</li>
    <li>Magic Sword</li>
    <li>Gold: 150</li>
</ul>
```

---

## Critical Attributes for Programming

### The `id` Attribute
**Most important for JavaScript!** Each `id` must be unique on the page.

```html
<div id="health">100</div>
<div id="gold">50</div>
<button id="attackBtn">Attack</button>
```

**In JavaScript:**
```javascript
document.getElementById('health').textContent = '80';
document.getElementById('attackBtn').onclick = attack;
```

### The `class` Attribute
Used for styling groups of elements and JavaScript selection.

```html
<div class="stat-card">Health: 100</div>
<div class="stat-card">Mana: 50</div>
<button class="choice-button">Go North</button>
<button class="choice-button">Go South</button>
```

### The `onclick` Attribute
**Essential for game interactivity!** Runs JavaScript when clicked.

```html
<button onclick="exploreForest()">Explore Forest</button>
<button onclick="buyItem('sword')">Buy Sword</button>
<button onclick="usePotion()">Use Health Potion</button>
```

---

## Connecting HTML to CSS and JavaScript

### Link CSS File
```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

### Link JavaScript File
```html
<body>
    <!-- Your HTML content -->
    <script src="game.js"></script>
</body>
```

---

## Common Game Interface Patterns

### Player Stats Display
```html
<div class="status-panel">
    <div class="stat-card">
        <div class="stat-label">Health</div>
        <div class="stat-value" id="health">100</div>
    </div>
    <div class="stat-card">
        <div class="stat-label">Gold</div>
        <div class="stat-value" id="gold">50</div>
    </div>
</div>
```

### Story Text Area
```html
<div id="story" class="story-text">
    Welcome to your adventure! Choose your path wisely.
</div>
```

### Choice Buttons
```html
<div id="choices" class="choices">
    <button onclick="goNorth()">🧭 Go North</button>
    <button onclick="goSouth()">🏔️ Go South</button>
    <button onclick="rest()">😴 Rest</button>
</div>
```

### Inventory Display
```html
<div id="inventory" class="inventory">
    <h4>📦 Inventory</h4>
    <div class="inventory-item">
        <span>Health Potion x3</span>
        <button onclick="useItem('health_potion')">Use</button>
    </div>
</div>
```

---

## What You DON'T Need to Learn

- Complex HTML5 semantic elements
- Form validation
- Advanced accessibility features
- HTML tables
- Embedded media elements

**Remember:** We're using HTML as a foundation for programming, not building websites. Focus on understanding how HTML structure supports your JavaScript code!

---

## Quick Troubleshooting

### Common Issues:
1. **JavaScript can't find element** → Check your `id` spelling
2. **Button doesn't work** → Check your `onclick` function name
3. **Styling not working** → Check your `class` names match CSS
4. **Page is blank** → Check for missing closing tags `</div>`, `</body>`, etc.

### Best Practices:
- Use descriptive `id` names: `playerHealth` not `h1`
- Keep `onclick` functions simple: `onclick="attack()"` not complex code
- Use consistent naming: `camelCase` for JavaScript, `kebab-case` for CSS classes