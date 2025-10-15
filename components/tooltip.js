export function createTooltip(element, text) {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip-content";
    tooltip.textContent = text;

    element.classList.add("tooltip");
    element.appendChild(tooltip);

    element.addEventListener("mouseenter", () => {
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";
    });

    element.addEventListener("mouseleave", () => {
        tooltip.style.visibility = "hidden";
        tooltip.style.opacity = "0";
    });
}
