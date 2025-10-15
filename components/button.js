export function createButton(label, onClick, className = "") {
    const button = document.createElement("button");
    button.className = `btn ${className}`;
    button.textContent = label;
    button.addEventListener("click", onClick);
    return button;
}
