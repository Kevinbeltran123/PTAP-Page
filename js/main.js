/**
 * PTAP La Pola - Main Application Controller
 * Coordinates all interactive components and manages application state
 * Author: Kevin Beltrán
 * Version: 1.0.0
 */

class PTAPApp {
    constructor() {
        this.visitedProcesses = new Set();
        this.totalProcesses = 8;
        this.currentModal = null;
        this.isLoading = true;
        
        // Initialize components
        this.modal = null;
        this.tooltip = null;
        this.progress = null;
        
        // Bind methods
        this.handleProcessClick = this.handleProcessClick.bind(this);
        this.handleWaterSourceClick = this.handleWaterSourceClick.bind(this);
        this.handleHelpClick = this.handleHelpClick.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        
        this.init();
    }
    
    /**
     * Initialize the application
     */
    async init() {
        try {
            // Show loading screen
            this.showLoadingScreen();
            
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
            
            // Simulate loading time for better UX
            await this.simulateLoading();
            
        } catch (error) {
            console.error('Error initializing application:', error);
            this.handleError(error);
        }
    }
    
    /**
     * Setup application after DOM is ready
     */
    setup() {
        try {
            // Initialize components
            this.initializeComponents();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Setup accessibility
            this.setupAccessibility();
            
            // Initialize animations
            this.initializeAnimations();
            
            // Hide loading screen
            this.hideLoadingScreen();
            
            console.log('✅ PTAP Application initialized successfully');
            
        } catch (error) {
            console.error('Error during setup:', error);
            this.handleError(error);
        }
    }
    
    /**
     * Initialize all components
     */
    initializeComponents() {
        // Initialize modal system
        if (typeof ModalManager !== 'undefined') {
            this.modal = new ModalManager();
        }
        
        // Initialize tooltip system
        if (typeof TooltipManager !== 'undefined') {
            this.tooltip = new TooltipManager();
        }
        
        // Initialize progress tracking
        if (typeof ProgressManager !== 'undefined') {
            this.progress = new ProgressManager(this.totalProcesses);
        }
        
        // Initialize process animations
        if (typeof ProcessAnimations !== 'undefined') {
            this.animations = new ProcessAnimations();
        }
    }
    
    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Process box clicks
        document.querySelectorAll('.process-box').forEach(box => {
            box.addEventListener('click', this.handleProcessClick);
            
            // Add hover effects for tooltips
            box.addEventListener('mouseenter', (e) => {
                const processId = e.currentTarget.dataset.process;
                const tooltipText = this.getTooltipText(processId);
                if (this.tooltip) {
                    this.tooltip.show(e, tooltipText);
                }
            });
            
            box.addEventListener('mouseleave', () => {
                if (this.tooltip) {
                    this.tooltip.hide();
                }
            });
        });
        
        // Water source clicks (for captacion modal)
        document.addEventListener('click', this.handleWaterSourceClick);
        
        // Help button
        const helpButton = document.getElementById('helpButton');
        if (helpButton) {
            helpButton.addEventListener('click', this.handleHelpClick);
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeydown);
        
        // Progress indicator close button
        const progressClose = document.getElementById('progressClose');
        if (progressClose) {
            progressClose.addEventListener('click', () => {
                document.getElementById('progressIndicator').classList.add('hidden');
            });
        }
        
        // Window resize handler
        window.addEventListener('resize', () => {
            if (this.tooltip) {
                this.tooltip.hide();
            }
        });
        
        // Intersection Observer for scroll animations
        this.setupScrollAnimations();
    }
    
    /**
     * Handle process box clicks
     */
    handleProcessClick(event) {
        const processBox = event.currentTarget;
        const processId = processBox.dataset.process;
        
        if (!processId || !processData[processId]) {
            console.warn(`No data found for process: ${processId}`);
            return;
        }
        
        // Track visited process
        this.trackVisitedProcess(processId, processBox);
        
        // Show modal with process information
        this.showProcessModal(processId);
        
        // Update visual state
        this.updateActiveProcess(processBox);
        
        // Analytics (if implemented)
        this.trackEvent('process_clicked', { processId });
    }
    
    /**
     * Handle water source clicks in modal
     */
    handleWaterSourceClick(event) {
        if (event.target.classList.contains('water-source')) {
            const source = event.target.dataset.source;
            if (source && waterSourcesData[source]) {
                const sourceData = waterSourcesData[source];
                alert(sourceData.details);
            }
        }
    }
    
    /**
     * Handle help button click
     */
    handleHelpClick() {
        const helpText = `
🎯 GUÍA DE USO - PTAP La Pola Interactiva

📱 NAVEGACIÓN:
• Haz clic en cualquier proceso del flujo para ver detalles
• Usa el mouse sobre los procesos para ver información rápida
• Explora el mapa interactivo de fuentes de captación
• Observa las animaciones de cada proceso

📊 PROGRESO:
• Sigue tu progreso en el indicador superior derecha
• Completa los 8 procesos para dominar el sistema
• Los círculos verdes muestran procesos explorados

📋 INFORMACIÓN TÉCNICA:
• Datos basados en documentación oficial IBAL
• Especificaciones de modernización 2023
• Parámetros operativos en tiempo real
• Normatividad colombiana aplicable

🔧 CARACTERÍSTICAS:
• Diseño responsivo para móviles
• Animaciones educativas
• Mapas interactivos de captación
• Especificaciones técnicas detalladas

⌨️ ATAJOS DE TECLADO:
• ESC - Cerrar modal
• Espacio - Ayuda
• 1-8 - Saltar a proceso específico

¡Explora cada proceso para entender completamente el sistema de tratamiento!
        `;
        
        alert(helpText);
        this.trackEvent('help_opened');
    }
    
    /**
     * Handle keyboard navigation
     */
    handleKeydown(event) {
        switch (event.key) {
            case 'Escape':
                if (this.modal) {
                    this.modal.close();
                }
                break;
                
            case ' ': // Space bar
                event.preventDefault();
                this.handleHelpClick();
                break;
                
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
                event.preventDefault();
                this.jumpToProcess(parseInt(event.key));
                break;
        }
    }
    
    /**
     * Track visited processes and update progress
     */
    trackVisitedProcess(processId, processBox) {
        if (!this.visitedProcesses.has(processId)) {
            this.visitedProcesses.add(processId);
            
            // Update progress if manager is available
            if (this.progress) {
                this.progress.updateProgress(this.visitedProcesses.size);
                this.progress.markProcessVisited(processId);
            }
            
            // Check for completion
            this.checkCompletion();
        }
    }
    
    /**
     * Show process modal with detailed information
     */
    showProcessModal(processId) {
        const data = processData[processId];
        
        if (this.modal) {
            this.modal.show({
                title: data.title,
                subtitle: data.subtitle,
                content: data.content,
                processId: processId
            });
        }
        
        // Start process-specific animations
        setTimeout(() => {
            if (this.animations) {
                this.animations.startProcessAnimations(processId);
            }
        }, 300);
    }
    
    /**
     * Update active process visual state
     */
    updateActiveProcess(activeBox) {
        // Remove active class from all boxes
        document.querySelectorAll('.process-box').forEach(box => {
            box.classList.remove('active');
        });
        
        // Add active class to clicked box
        activeBox.classList.add('active');
    }
    
    /**
     * Get tooltip text for process
     */
    getTooltipText(processId) {
        const tooltips = {
            captacion: 'Río Combeima (1,500 L/s) + Q. Cay (600 L/s) + Q. Chembe (70 L/s)',
            desarenador: 'Remoción de arenas y sólidos gruesos - Eficiencia >85%',
            coagulacion: 'Sulfato de Aluminio 15-40 mg/L - TRH 15-20 min',
            sedimentacion: 'Paneles tipo colmena - Inversión $1,385M (2023)',
            filtracion: 'Multimedia: Antracita + Arena + Grava - <1.5 NTU',
            desinfeccion: 'Cloro gaseoso 0.8-2.0 mg/L - TC: 30 min',
            almacenamiento: 'Capacidad total: 25,000 m³ - Regulación y compensación',
            distribucion: '10 distritos hidráulicos - 180,000 suscriptores'
        };
        
        return tooltips[processId] || 'Información del proceso';
    }
    
    /**
     * Check if all processes have been explored
     */
    checkCompletion() {
        if (this.visitedProcesses.size === this.totalProcesses) {
            setTimeout(() => {
                this.showCompletionMessage();
            }, 500);
        }
    }
    
    /**
     * Show completion celebration
     */
    showCompletionMessage() {
        const message = `
🎉 ¡FELICITACIONES!

Has explorado todos los procesos de la PTAP La Pola.
Ahora tienes un conocimiento completo del sistema de tratamiento de agua potable.

✅ Procesos completados: ${this.totalProcesses}/${this.totalProcesses}
📊 Progreso: 100%

🎓 ¡Excelente trabajo en tu aprendizaje!
        `;
        
        alert(message);
        this.trackEvent('all_processes_completed');
        
        // Add completion class for special styling
        document.body.classList.add('all-processes-completed');
    }
    
    /**
     * Jump to specific process by number
     */
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
    
    /**
     * Setup scroll-based animations
     */
    setupScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-on-scroll', 'animated');
                    }
                });
            }, observerOptions);
            
            // Observe elements that should animate on scroll
            document.querySelectorAll('.stat-card, .parameter-card, .process-box').forEach(el => {
                observer.observe(el);
            });
        }
    }
    
    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Add ARIA labels to interactive elements
        document.querySelectorAll('.process-box').forEach((box, index) => {
            box.setAttribute('role', 'button');
            box.setAttribute('tabindex', '0');
            box.setAttribute('aria-label', `Explorar proceso ${index + 1}: ${box.querySelector('.process-title').textContent}`);
            
            // Add keyboard support
            box.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    box.click();
                }
            });
        });
        
        // Add live region for progress updates
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.setAttribute('class', 'sr-only');
        liveRegion.id = 'progress-live-region';
        document.body.appendChild(liveRegion);
    }
    
    /**
     * Initialize entrance animations
     */
    initializeAnimations() {
        // Stagger animation for process boxes
        document.querySelectorAll('.process-box').forEach((box, index) => {
            box.style.opacity = '0';
            box.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                box.style.transition = 'all 0.6s ease';
                box.style.opacity = '1';
                box.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        // Animate statistics cards
        setTimeout(() => {
            document.querySelectorAll('.stat-card').forEach((card, index) => {
                card.classList.add('fade-in');
                card.style.animationDelay = `${index * 0.1}s`;
            });
        }, 1000);
    }
    
    /**
     * Show loading screen
     */
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }
    
    /**
     * Hide loading screen with fade effect
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                this.isLoading = false;
            }, 500);
        }
    }
    
    /**
     * Simulate loading time for better UX
     */
    async simulateLoading() {
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        });
    }
    
    /**
     * Handle application errors
     */
    handleError(error) {
        console.error('Application Error:', error);
        
        // Show user-friendly error message
        const errorMessage = `
⚠️ Error de Aplicación

Ha ocurrido un error inesperado. 
Por favor, recarga la página e intenta nuevamente.

Si el problema persiste, contacta al soporte técnico.

Error: ${error.message}
        `;
        
        alert(errorMessage);
        
        // Hide loading screen in case of error
        this.hideLoadingScreen();
    }
    
    /**
     * Track events for analytics (placeholder)
     */
    trackEvent(eventName, eventData = {}) {
        // Placeholder for analytics implementation
        console.log(`📊 Event: ${eventName}`, eventData);
        
        // Could integrate with Google Analytics, Mixpanel, etc.
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    }
    
    /**
     * Get application state for debugging
     */
    getAppState() {
        return {
            visitedProcesses: Array.from(this.visitedProcesses),
            totalProcesses: this.totalProcesses,
            isLoading: this.isLoading,
            completionPercentage: (this.visitedProcesses.size / this.totalProcesses) * 100,
            currentModal: this.currentModal
        };
    }
}

// Initialize application when script loads
document.addEventListener('DOMContentLoaded', () => {
    // Make app globally available for debugging
    window.PTAPApp = new PTAPApp();
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.classList.add('paused');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('paused');
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('✅ Connection restored');
});

window.addEventListener('offline', () => {
    console.log('🔌 Connection lost - App running in offline mode');
});