/**
 * Process Animations - Handles specific animations for each treatment process
 * Author: Kevin Beltrán
 */

class ProcessAnimations {
    constructor() {
        this.activeAnimations = new Map();
        this.animationIntervals = new Map();
    }

    startProcessAnimations(processId) {
        // Stop any existing animations for this process
        this.stopProcessAnimations(processId);

        switch (processId) {
            case 'captacion':
                this.startCaptacionAnimations();
                break;
            case 'desarenador':
                this.startDesarenadorAnimations();
                break;
            case 'coagulacion':
                this.startCoagulacionAnimations();
                break;
            case 'sedimentacion':
                this.startSedimentacionAnimations();
                break;
            case 'filtracion':
                this.startFiltracionAnimations();
                break;
            case 'desinfeccion':
                this.startDesinfeccionAnimations();
                break;
            case 'almacenamiento':
                this.startAlmacenamientoAnimations();
                break;
            case 'distribucion':
                this.startDistribucionAnimations();
                break;
        }
    }

    stopProcessAnimations(processId) {
        if (this.animationIntervals.has(processId)) {
            const intervals = this.animationIntervals.get(processId);
            intervals.forEach(interval => clearInterval(interval));
            this.animationIntervals.delete(processId);
        }
    }

    startCaptacionAnimations() {
        // Animate water sources
        const waterSources = document.querySelectorAll('.water-source');
        waterSources.forEach((source, index) => {
            setTimeout(() => {
                source.style.animation = `waterPulse ${2 + index * 0.5}s ease-in-out infinite`;
            }, index * 200);
        });
    }

    startDesarenadorAnimations() {
        // Animate settling particles
        const particles = document.querySelectorAll('.settling-particles');
        particles.forEach((particle, index) => {
            particle.style.animation = `sandFall ${3 + index * 0.5}s linear infinite`;
            particle.style.animationDelay = `${index * 0.3}s`;
        });
    }

    startCoagulacionAnimations() {
        const mixingChamber = document.querySelector('.mixing-chamber');
        if (mixingChamber) {
            // Add innovative chemical reaction particles
            const particleCount = 12;
            
            // Add water quality improvement demo
            const waterQualityDemo = document.createElement('div');
            waterQualityDemo.className = 'water-quality-demo';
            waterQualityDemo.style.position = 'absolute';
            waterQualityDemo.style.top = '10px';
            waterQualityDemo.style.left = '50%';
            waterQualityDemo.style.transform = 'translateX(-50%)';
            mixingChamber.appendChild(waterQualityDemo);
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'chemical-particle';
                particle.style.animationDelay = `${i * 0.2}s`;
                particle.style.left = `${20 + Math.random() * 60}%`;
                particle.style.top = `${20 + Math.random() * 60}%`;
                mixingChamber.appendChild(particle);
            }

            // Add floating text indicator
            const qualityIndicator = document.createElement('div');
            qualityIndicator.innerHTML = '💧→✨';
            qualityIndicator.style.position = 'absolute';
            qualityIndicator.style.bottom = '5px';
            qualityIndicator.style.left = '50%';
            qualityIndicator.style.transform = 'translateX(-50%)';
            qualityIndicator.style.fontSize = '14px';
            qualityIndicator.style.animation = 'bounce 2s infinite';
            mixingChamber.appendChild(qualityIndicator);

            // Clean up particles after animation
            setTimeout(() => {
                const particles = mixingChamber.querySelectorAll('.chemical-particle, .water-quality-demo');
                particles.forEach(p => {
                    if (p.parentNode === mixingChamber) {
                        mixingChamber.removeChild(p);
                    }
                });
            }, 15000);
        }
    }

    startSedimentacionAnimations() {
        // Animate hexagonal panels with advanced settling
        const hexagons = document.querySelectorAll('[style*="clip-path: polygon"]');
        const container = document.querySelector('.animation-container');
        
        if (container) {
            // Create advanced settling particles
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.className = 'advanced-settling-particle';
                particle.style.left = `${Math.random() * 80 + 10}%`;
                particle.style.animationDelay = `${i * 0.3}s`;
                container.appendChild(particle);
            }
            
            // Add sediment accumulation visualization
            const sedimentLayer = document.createElement('div');
            sedimentLayer.style.position = 'absolute';
            sedimentLayer.style.bottom = '0';
            sedimentLayer.style.left = '0';
            sedimentLayer.style.right = '0';
            sedimentLayer.style.height = '0px';
            sedimentLayer.style.background = 'linear-gradient(to top, #8b4513, rgba(139, 69, 19, 0.5))';
            sedimentLayer.style.borderRadius = '0 0 10px 10px';
            sedimentLayer.style.transition = 'height 3s ease-out';
            container.appendChild(sedimentLayer);
            
            // Gradually increase sediment layer
            setTimeout(() => {
                sedimentLayer.style.height = '20px';
            }, 1000);
        }
        
        hexagons.forEach((hex, index) => {
            setTimeout(() => {
                hex.style.animation = 'scaleIn 0.5s ease-out';
                hex.style.transform = 'scale(1.1)';
                
                setTimeout(() => {
                    hex.style.transform = 'scale(1)';
                }, 500);
            }, index * 100);
        });
    }

    startFiltracionAnimations() {
        const filterLayers = document.querySelector('.filter-layers');
        if (filterLayers) {
            // Create flowing water particles
            const createWaterParticle = () => {
                const particle = document.createElement('div');
                particle.className = 'water-particles';
                particle.style.left = `${Math.random() * 90 + 5}%`;
                particle.style.animationDelay = '0s';
                filterLayers.appendChild(particle);
                
                // Remove particle after animation
                setTimeout(() => {
                    if (particle.parentNode === filterLayers) {
                        filterLayers.removeChild(particle);
                    }
                }, 3000);
            };

            // Create particles at intervals
            const interval = setInterval(createWaterParticle, 400);
            this.addAnimationInterval('filtracion', interval);

            // Stop creating particles after 15 seconds
            setTimeout(() => {
                clearInterval(interval);
            }, 15000);
        }
    }

    startDesinfeccionAnimations() {
        const container = document.querySelector('.animation-container');
        
        if (container) {
            // Create bacteria particles that get eliminated
            for (let i = 0; i < 6; i++) {
                const bacteria = document.createElement('div');
                bacteria.className = 'bacteria-particle';
                bacteria.innerHTML = '🦠';
                bacteria.style.left = `${Math.random() * 70 + 15}%`;
                bacteria.style.top = `${Math.random() * 60 + 20}%`;
                bacteria.style.animationDelay = `${i * 0.5}s`;
                bacteria.style.fontSize = '12px';
                container.appendChild(bacteria);
            }
            
            // Add chlorine gas effect
            const chlorineEffect = document.createElement('div');
            chlorineEffect.style.position = 'absolute';
            chlorineEffect.style.top = '0';
            chlorineEffect.style.left = '0';
            chlorineEffect.style.right = '0';
            chlorineEffect.style.bottom = '0';
            chlorineEffect.style.background = 'radial-gradient(circle, rgba(255, 255, 0, 0.2) 0%, transparent 60%)';
            chlorineEffect.style.animation = 'pulse 3s ease-in-out infinite';
            chlorineEffect.style.borderRadius = '10px';
            container.appendChild(chlorineEffect);
            
            // Add success indicator
            setTimeout(() => {
                const successIndicator = document.createElement('div');
                successIndicator.innerHTML = '✅ Agua Segura';
                successIndicator.style.position = 'absolute';
                successIndicator.style.bottom = '10px';
                successIndicator.style.left = '50%';
                successIndicator.style.transform = 'translateX(-50%)';
                successIndicator.style.fontSize = '12px';
                successIndicator.style.fontWeight = 'bold';
                successIndicator.style.color = '#059669';
                successIndicator.style.animation = 'fadeIn 2s ease-in-out';
                container.appendChild(successIndicator);
            }, 3000);
        }

        // Animate chlorine injection
        const chlorineIcon = document.querySelector('[style*="Cl₂"]')?.parentElement;
        if (chlorineIcon) {
            chlorineIcon.style.animation = 'pulse 2s infinite';
        }

        // Animate contact time
        const contactTime = document.querySelector('[style*="30 min"]');
        if (contactTime) {
            contactTime.style.animation = 'fadeIn 2s ease-in-out infinite alternate';
        }
    }

    startAlmacenamientoAnimations() {
        // Animate storage tanks filling
        const tanks = document.querySelectorAll('[style*="linear-gradient(to bottom, #2196f3"], [style*="linear-gradient(to bottom, #4caf50"]');
        tanks.forEach((tank, index) => {
            setTimeout(() => {
                tank.style.animation = 'floating 3s ease-in-out infinite';
            }, index * 500);
        });
    }

    startDistribucionAnimations() {
        // Animate distribution districts
        const districts = document.querySelectorAll('[style*="Distrito"]');
        districts.forEach((district, index) => {
            setTimeout(() => {
                district.style.animation = 'fadeIn 0.5s ease-out';
                district.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    district.style.transform = 'scale(1)';
                }, 500);
            }, index * 100);
        });
    }

    addAnimationInterval(processId, interval) {
        if (!this.animationIntervals.has(processId)) {
            this.animationIntervals.set(processId, []);
        }
        this.animationIntervals.get(processId).push(interval);
    }

    stopAllAnimations() {
        this.animationIntervals.forEach((intervals, processId) => {
            intervals.forEach(interval => clearInterval(interval));
        });
        this.animationIntervals.clear();
    }

    // Animation utilities
    createParticle(container, options = {}) {
        const particle = document.createElement('div');
        particle.className = options.className || 'animated-particle';
        
        // Set properties
        Object.assign(particle.style, {
            position: 'absolute',
            width: options.size || '4px',
            height: options.size || '4px',
            background: options.color || '#4facfe',
            borderRadius: '50%',
            left: options.left || '50%',
            top: options.top || '0%',
            animation: options.animation || 'waterFlow 3s linear infinite',
            animationDelay: options.delay || '0s',
            ...options.style
        });

        container.appendChild(particle);
        
        // Auto-remove after animation
        const duration = options.duration || 3000;
        setTimeout(() => {
            if (particle.parentNode === container) {
                container.removeChild(particle);
            }
        }, duration);

        return particle;
    }

    createRipple(element, options = {}) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        
        Object.assign(ripple.style, {
            position: 'absolute',
            borderRadius: '50%',
            background: options.color || 'rgba(255, 255, 255, 0.5)',
            transform: 'scale(0)',
            animation: 'ripple 0.6s linear',
            left: options.x + 'px' || '50%',
            top: options.y + 'px' || '50%',
            width: options.size || '20px',
            height: options.size || '20px',
            pointerEvents: 'none'
        });

        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode === element) {
                element.removeChild(ripple);
            }
        }, 600);
    }
}

// Make globally available
window.ProcessAnimations = ProcessAnimations;