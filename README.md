# 📍PImage — Interactive Map Viewer & Editor

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

![Preview do site](https://pimage.byissa.tech/assets/images/tutorial/preview.png)

<p align="center">
  <a href="#about">About</a> •
  <a href="#features">Features</a> •
  <a href="#structure">Structure</a> •
  <a href="#technologies">Technologies</a> •
  <a href="#how_to_use">How to Use</a> •
  <a href="#tutorial">Tutorial</a>
</p>

<h2 id="about">📌 About</h2>

PImage is a simple, interactive image mapping tool created as a lightweight solution for viewing and editing map-based data in a web interface. It consists of two modules:

View Mode: A viewer for loading and navigating map images with interaction points.

Edit Mode: An editor allowing the addition, modification, and deletion of markers and labels over a base image.

Originally created for quick prototyping and local demonstrations, **PImage** is ideal for use cases like cemetery mapping, visual seating charts, classroom layouts, or any image-based spatial representation.

[![project](https://img.shields.io/badge/📱Visit_this_project-000?style=for-the-badge&logo=project)](https://pimage.byissa.tech)

<h2 id="features">✨ Features</h2>

- Toggle between Edit Mode and View Mode
- Add, move, rename, or delete pins
- Show/hide labels and pin icons
- Integrated search functionality by pin name
- Map-style background with pixel grid precision

<h2 id="structure">📁 Structure</h2>

```txt
📆 PImage
 ├ ✂ index.html               # Landing page
 ├ ✂ tutorial.html            # Guide with usage instructions
 ├ ✂ README.md
 ├ 📂 assets/
 │ ├ 📂 css/
 │ │ └ ✂ style.css            # Global styles
 │ └ 📂 images/
 │   ├ 📂 tools/               # Tool icons
 │   └ 📂 tutorial/            # Screenshots used in tutorial
 ├ 📂 editMode/
 │ ├ ✂ index.html             # Edit mode interface
 │ └ ✂ script.js              # Logic for pin creation and editing
 └ 📂 viewMode/
   ├ ✂ index.html             # View-only mode interface
   └ ✂ script.js              # Logic for viewing and interacting
```

<h2 id="technologies">🧪 Technologies</h2>

- HTML5
- CSS3
- JavaScript

No dependencies. Everything runs in the browser.

<h2 id="how_to_use">🚀 How to Use</h2>

1. Open `index.html` in your browser to access the landing page.
2. Choose **Edit Mode** to create and modify pins.
3. Use **View Mode** to explore the map interactively.

<h2 id="tutorial">📘 Tutorial</h2>

A visual walkthrough is available in tutorial.html, showing how to:

- Add and move pins
- Rename or delete them
- Use the search and visibility features

The images used in the tutorial are located under assets/images/tutorial/.