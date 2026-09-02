# Odin-Todo-List

A dynamic, responsive, and persistent Todo List web application built as part of The Odin Project's JavaScript curriculum. This project focuses on object-oriented programming, modular design using ES6 Modules, and bundler integration with Webpack.


## Features

- **Project Management:** Organize tasks into separate system channels (Default, Work, Personal) or create custom projects dynamically.
- **Advanced Task Filtering:** View your workflow instantly using smart time-bound filters (*All Tasks*, *Today*, *This Week*).
- **Full CRUD Operations:** Create, Read, Update (Edit directly via UI modal), and Delete tasks fluidly.
- **Task Attributes:** Manage task properties including Title, Description, Due Date, Priority Levels (Low, Medium, High), and detailed Notes.
- **State Persistence:** Integrated browser `localStorage` synchronization ensuring no data loss upon refresh or session closure.
- **Interactive UI:** Checkbox toggles to visually mark tasks as complete (strikethrough and opacity adjustments).

## Tech Stack & Architecture

- **Language:** Modern JavaScript (ES6+), HTML5, CSS3 (CSS Grid & Flexbox)
- **Module Bundler:** Webpack 5
- **Design Pattern:** Separation of Concerns (SoC) dividing the core business/filtering logic (`app.js`) from imperative DOM rendering operations (`dom.js`).

## Installation & Setup

Follow these steps to run the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd Odin-Todo-List
   ```

2. **Install development dependencies:**
   ```bash
   npm install
   ```

3. **Compile assets and watch for changes (Development):**
   ```bash
   npm run build
   ```

## Acknowledgments

- Inspired by the open-source curriculum of [The Odin Project](https://theodinproject.com).
- Built to practice clean code, modular software architecture, and native browser storage mechanics.


## Author

- **Sherdly Verne** 