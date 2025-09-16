/**
 * Progress Manager - Handles progress tracking and indicators
 * Author: Kevin Beltrán
 */

class ProgressManager {
    constructor(totalProcesses = 8) {
        this.totalProcesses = totalProcesses;
        this.visitedProcesses = new Set();
        this.createProgressIndicator();
        this.bindEvents();
    }

    createProgressIndicator() {
        // Check if progress indicator already exists
        if (document.getElementById('progressIndicator')) {
            this.progressIndicator = document.getElementById('progressIndicator');
            return;
        }

        // Create progress indicator structure
        const progressHTML = `
            <div id="progressIndicator" class="progress-indicator">
                <div class="progress-header">
                    <h4>Progreso de Exploración</h4>
                    <button id="progressClose" class="progress-close" aria-label="Cerrar indicador de progreso">×</button>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
                <div class="progress-info">
                    <span id="visitedCount">0</span>/${this.totalProcesses} procesos explorados
                </div>
                <div class="process-indicators">
                    ${Array(this.totalProcesses).fill().map((_, i) => 
                        `<span class="process-indicator" data-process-index="${i}" title="Proceso ${i + 1}"></span>`
                    ).join('')}
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', progressHTML);
        this.progressIndicator = document.getElementById('progressIndicator');
        this.progressFill = document.getElementById('progressFill');
        this.visitedCount = document.getElementById('visitedCount');
    }

    bindEvents() {
        // Close button
        const closeButton = document.getElementById('progressClose');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.hide();
            });
        }

        // Process indicator clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('process-indicator')) {
                const processIndex = parseInt(e.target.dataset.processIndex);
                this.jumpToProcess(processIndex + 1);
            }
        });
    }

    updateProgress(visitedCount) {
        const percentage = (visitedCount / this.totalProcesses) * 100;
        
        this.progressFill.style.width = `${percentage}%`;
        this.visitedCount.textContent = visitedCount;

        // Update live region for accessibility
        const liveRegion = document.getElementById('progress-live-region');
        if (liveRegion) {
            liveRegion.textContent = `${visitedCount} de ${this.totalProcesses} procesos explorados`;
        }

        // Check for completion
        if (visitedCount === this.totalProcesses) {
            this.showCompletionAnimation();
        }
    }

    markProcessVisited(processId) {
        // Map process IDs to indices
        const processMap = {
            'captacion': 0,
            'desarenador': 1,
            'coagulacion': 2,
            'sedimentacion': 3,
            'filtracion': 4,
            'desinfeccion': 5,
            'almacenamiento': 6,
            'distribucion': 7
        };

        const index = processMap[processId];
        if (index !== undefined) {
            const indicator = document.querySelector(`[data-process-index="${index}"]`);
            if (indicator) {
                indicator.classList.add('visited');
            }
        }
    }

    jumpToProcess(processNumber) {
        const processBoxes = document.querySelectorAll('.process-box');
        if (processNumber >= 1 && processNumber <= processBoxes.length) {
            const targetBox = processBoxes[processNumber - 1];
            
            // Scroll to process
            targetBox.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Highlight briefly
            targetBox.classList.add('attention');
            setTimeout(() => {
                targetBox.classList.remove('attention');
            }, 2000);
        }
    }

    showCompletionAnimation() {
        this.progressIndicator.classList.add('completed');
        
        // Add celebration effect
        setTimeout(() => {
            this.progressIndicator.style.animation = 'bounce 0.6s ease-out';
        }, 100);
    }

    show() {
        this.progressIndicator.classList.remove('hidden');
    }

    hide() {
        this.progressIndicator.classList.add('hidden');
    }

    reset() {
        this.visitedProcesses.clear();
        this.updateProgress(0);
        
        document.querySelectorAll('.process-indicator').forEach(indicator => {
            indicator.classList.remove('visited');
        });
        
        this.progressIndicator.classList.remove('completed');
    }

    getProgress() {
        return {
            visited: this.visitedProcesses.size,
            total: this.totalProcesses,
            percentage: (this.visitedProcesses.size / this.totalProcesses) * 100
        };
    }
}

// Make globally available
window.ProgressManager = ProgressManager;