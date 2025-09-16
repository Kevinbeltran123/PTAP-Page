/**
 * Tooltip Manager - Handles hover tooltips
 * Author: Kevin Beltrán
 */

class TooltipManager {
    constructor() {
        this.tooltip = null;
        this.isVisible = false;
        this.createTooltip();
    }

    createTooltip() {
        // Check if tooltip already exists
        if (document.getElementById('tooltip')) {
            this.tooltip = document.getElementById('tooltip');
            return;
        }

        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.className = 'tooltip';
        tooltip.setAttribute('role', 'tooltip');
        tooltip.setAttribute('aria-hidden', 'true');
        
        document.body.appendChild(tooltip);
        this.tooltip = tooltip;
    }

    show(event, content) {
        if (!content || this.isVisible) return;

        // Support both text and HTML content
        if (typeof content === 'string' && content.includes('<')) {
            this.tooltip.innerHTML = content;
        } else {
            this.tooltip.textContent = content;
        }
        
        this.tooltip.classList.add('show');
        this.tooltip.setAttribute('aria-hidden', 'false');
        this.isVisible = true;

        this.updatePosition(event);

        // Update position on mouse move
        this.mouseMoveHandler = (e) => this.updatePosition(e);
        document.addEventListener('mousemove', this.mouseMoveHandler);
    }

    hide() {
        if (!this.isVisible) return;

        this.tooltip.classList.remove('show');
        this.tooltip.setAttribute('aria-hidden', 'true');
        this.isVisible = false;

        // Remove mouse move listener
        if (this.mouseMoveHandler) {
            document.removeEventListener('mousemove', this.mouseMoveHandler);
            this.mouseMoveHandler = null;
        }
    }

    updatePosition(event) {
        if (!this.isVisible) return;

        // First set position to measure tooltip dimensions
        this.tooltip.style.left = '0px';
        this.tooltip.style.top = '0px';
        
        const tooltipRect = this.tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let x = event.clientX + 15;
        let y = event.clientY - tooltipRect.height - 15;

        // Adjust horizontal position if tooltip goes off screen
        if (x + tooltipRect.width > viewportWidth - 20) {
            x = event.clientX - tooltipRect.width - 15;
        }

        // Adjust vertical position if tooltip goes off screen
        if (y < 20) {
            y = event.clientY + 15;
        }

        // Ensure tooltip doesn't go below viewport
        if (y + tooltipRect.height > viewportHeight - 20) {
            y = viewportHeight - tooltipRect.height - 20;
        }

        // Ensure tooltip doesn't go too far left
        if (x < 20) {
            x = 20;
        }

        this.tooltip.style.left = `${x}px`;
        this.tooltip.style.top = `${y}px`;
    }

    isTooltipVisible() {
        return this.isVisible;
    }
}

// Make globally available
window.TooltipManager = TooltipManager;