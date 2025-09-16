/**
 * Process Animations - Handles specific animations for each treatment process
 * Author: Kevin Beltrán
 */

class ProcessAnimations {
    constructor() {
        this.activeAnimations = new Map();
        this.animationIntervals = new Map();
    }

    showYouTubeVideo(videoId, title) {
        console.log('🎬 Intentando mostrar video:', videoId, title);
        
        // Intentar múltiples veces hasta encontrar el modal
        const tryAddVideo = (attempts = 0) => {
            const modalContent = document.getElementById('modalContent');
            console.log('📍 Intento', attempts + 1, '- modalContent encontrado:', !!modalContent);
            
            if (modalContent && modalContent.offsetParent !== null) {
                // Solo eliminar videos anteriores y contenedores de animación visual
                const existingVideos = modalContent.querySelectorAll('.youtube-video-container, .video-title');
                existingVideos.forEach(video => video.remove());
                
                // Eliminar específicamente los contenedores de animación visual
                const animationContainers = modalContent.querySelectorAll('.animation-container');
                animationContainers.forEach(container => container.remove());

                // Crear título del video
                const videoTitle = document.createElement('h4');
                videoTitle.className = 'video-title';
                videoTitle.textContent = '🎥 ' + title;
                videoTitle.style.cssText = 'color: #1565C0; margin: 20px 0 10px 0; font-size: 18px; text-align: center; font-weight: 600;';

                // Crear contenedor del video
                const videoContainer = document.createElement('div');
                videoContainer.className = 'youtube-video-container';
                videoContainer.style.cssText = 'position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin: 0 0 20px 0; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.15); background: #000;';

                // Crear iframe
                const iframe = document.createElement('iframe');
                iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=0&rel=0&modestbranding=1&fs=1';
                iframe.title = title;
                iframe.frameBorder = '0';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                iframe.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 12px;';

                videoContainer.appendChild(iframe);

                // Insertar el video al inicio del contenido del modal, manteniendo el resto
                modalContent.insertBefore(videoTitle, modalContent.firstChild);
                modalContent.insertBefore(videoContainer, modalContent.children[1]);
                console.log('✅ Video insertado exitosamente');
                
            } else if (attempts < 10) {
                // Reintentar después de un breve delay
                setTimeout(() => tryAddVideo(attempts + 1), 200);
            } else {
                console.error('❌ No se pudo encontrar modalContent después de 10 intentos');
            }
        };

        // Iniciar el proceso
        tryAddVideo();
    }

    startProcessAnimations(processId) {
        console.log('🎯 startProcessAnimations llamado para:', processId);
        
        // Stop any existing animations for this process
        this.stopProcessAnimations(processId);

        switch (processId) {
            case 'captacion':
                console.log('➡️ Ejecutando captacion');
                this.startCaptacionAnimations();
                break;
            case 'desarenador':
                console.log('➡️ Ejecutando desarenador');
                this.startDesarenadorAnimations();
                break;
            case 'coagulacion':
                console.log('➡️ Ejecutando coagulacion');
                this.startCoagulacionAnimations();
                break;
            case 'sedimentacion':
                console.log('➡️ Ejecutando sedimentacion');
                this.startSedimentacionAnimations();
                break;
            case 'filtracion':
                console.log('➡️ Ejecutando filtracion');
                this.startFiltracionAnimations();
                break;
            case 'desinfeccion':
                console.log('➡️ Ejecutando desinfeccion');
                this.startDesinfeccionAnimations();
                break;
            case 'almacenamiento':
                console.log('➡️ Ejecutando almacenamiento');
                this.startAlmacenamientoAnimations();
                break;
            case 'distribucion':
                console.log('➡️ Ejecutando distribucion');
                this.startDistribucionAnimations();
                break;
            default:
                console.log('❌ ProcessId no reconocido:', processId);
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
        console.log('🏔️ Proceso de captación - No hay animaciones configuradas');
        // No animations needed for captacion process
    }

    startDesarenadorAnimations() {
        console.log('🔧 Iniciando animación de desarenador');
        // Mostrar video educativo sobre desarenación
        this.showYouTubeVideo('WfQjHYWOdTc', 'Proceso de Desarenación - Tratamiento de Agua');
    }

    startCoagulacionAnimations() {
        console.log('🧪 Iniciando animación de coagulación-floculación');
        // Mostrar video educativo sobre coagulación y floculación
        this.showYouTubeVideo('YHRqGJx0uEo', 'Coagulación y Floculación en Tratamiento de Agua');
    }

    startSedimentacionAnimations() {
        console.log('🏗️ Iniciando animación de sedimentación');
        // Mostrar video educativo sobre sedimentación
        this.showYouTubeVideo('Z5OvTdJ7JIE', 'Proceso de Sedimentación en Plantas de Tratamiento');
    }

    startFiltracionAnimations() {
        console.log('🏭 Iniciando animación de filtración');
        // Mostrar video educativo sobre filtración
        this.showYouTubeVideo('8XEQhVELWz4', 'Sistemas de Filtración en Tratamiento de Agua');
    }

    startDesinfeccionAnimations() {
        console.log('☢️ Iniciando animación de desinfección');
        // Mostrar video educativo sobre desinfección
        this.showYouTubeVideo('dG8QZf1E6es', 'Desinfección del Agua con Cloro - PTAP');
    }

    startAlmacenamientoAnimations() {
        console.log('🏪 Iniciando animación de almacenamiento');
        // Mostrar video educativo sobre almacenamiento de agua
        this.showYouTubeVideo('p4K8YluGWTk', 'Sistemas de Almacenamiento de Agua Tratada');
    }

    startDistribucionAnimations() {
        console.log('🏘️ Proceso de distribución - No hay animaciones configuradas');
        // No animations needed for distribucion process
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