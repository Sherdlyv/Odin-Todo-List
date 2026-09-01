import { createLayout } from "./dom.js";
import './style.css';



document.addEventListener("DOMContentLoaded", () => {
    
    const contentArea = document.querySelector("#content");
    
    if (contentArea) {
        contentArea.appendChild(createLayout()); 
    }
});
