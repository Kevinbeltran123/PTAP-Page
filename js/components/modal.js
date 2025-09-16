/**
 * Modal Manager - Handles modal windows and overlays
 * Author: Kevin Beltrán
 */

class ModalManager {
    constructor() {
        this.currentModal = null;
        this.isOpen = false;
        this.createModalStructure();
        this.bindEvents();
    }

    createModalStructure() {
        // Check if modal already exists
        if (document.getElementById('processModal')) {
            this.modal = document.getElementById('processModal');
            return;
        }

        // Create modal structure
        const modalHTML = `
            <div id="processModal" class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalContent">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="modal-close" aria-label="Cerrar modal">&times;</button>
                        <h2 class="modal-title" id="modalTitle"></h2>
                        <p class="modal-subtitle" id="modalSubtitle"></p>
                    </div>
                    <div class="modal-body">
                        <div id="modalContent"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('processModal');
    }

    bindEvents() {
        // Close button
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close')) {
                this.close();
            }
        });

        // Overlay click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.close();
            }
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    show(data) {
        const { title, subtitle, content, processId } = data;
        
        // Update modal content
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalSubtitle').textContent = subtitle;
        document.getElementById('modalContent').innerHTML = content;

        // Show modal
        this.modal.style.display = 'block';
        this.modal.classList.add('show');
        this.isOpen = true;
        this.currentModal = processId;

        // Focus management
        this.modal.focus();
        document.body.style.overflow = 'hidden';

        // Track in live region
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = `Explorando ${title}`;
        }
        
        // Trigger map resize if needed
        setTimeout(() => {
            if (window.PTAPApp && window.PTAPApp.mapManager) {
                window.PTAPApp.mapManager.resize();
            }
        }, 300);
    }

    close() {
        if (!this.isOpen) return;

        this.modal.classList.remove('show');
        this.isOpen = false;
        this.currentModal = null;

        setTimeout(() => {
            this.modal.style.display = 'none';
            document.body.style.overflow = '';
            
            // Remove active class from all process boxes
            document.querySelectorAll('.process-box').forEach(box => {
                box.classList.remove('active');
            });
        }, 300);
    }

    isModalOpen() {
        return this.isOpen;
    }

    getCurrentModal() {
        return this.currentModal;
    }
}

// Make globally available
window.ModalManager = ModalManager;