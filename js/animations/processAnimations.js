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

    showTankTable() {
        console.log('📊 Intentando mostrar tabla de tanques');
        
        // Datos de tanques de almacenamiento IBAL
        const tanques = [
            {id: 1, nombre: "Tanque de Belén", capacidad: 3000, lat: 4.4517, lng: -75.2495, ubicacion: "Calle 2ª con Carrera 3ª"},
            {id: 2, nombre: "Tanque Ciudad", capacidad: 3000, lat: 4.4520, lng: -75.2493, ubicacion: "Calle 2ª con Carrera 3ª"},
            {id: 3, nombre: "Tanque de Belén - La Aurora", capacidad: 1500, lat: 4.4585, lng: -75.2380, ubicacion: "Altos Barrio Augusto E. Medina"},
            {id: 4, nombre: "Tanque de Cerrogordo", capacidad: 2000, lat: 4.4680, lng: -75.2020, ubicacion: "Cerrogordo (Barrio Cerrogordo)"},
            {id: 5, nombre: "Tanque de La 15", capacidad: 4000, lat: 4.4396, lng: -75.2354, ubicacion: "Calle 15 Carrera 6ª y 7ª"},
            {id: 6, nombre: "Tanque de Interlaken", capacidad: 500, lat: 4.4384, lng: -75.2345, ubicacion: "Carrera 7ª A Calle 16"},
            {id: 7, nombre: "Tanque de La 29", capacidad: 4000, lat: 4.4073, lng: -75.2467, ubicacion: "Calle 29 Carrera 4D"},
            {id: 8, nombre: "Tanque de La 30", capacidad: 2000, lat: 4.4063, lng: -75.2465, ubicacion: "Calle 30 Carrera 4D"},
            {id: 9, nombre: "Tanque de Piedrapintada", capacidad: 5000, lat: 4.3795, lng: -75.2425, ubicacion: "Carrera 5ª Calle 47"},
            {id: 10, nombre: "Tanque La Alsacia (El Salado)", capacidad: 1000, lat: 4.4255, lng: -75.2580, ubicacion: "Hacienda La Alsacia sector de El Salado"},
            {id: 11, nombre: "Tanque Mirolindo", capacidad: 1000, lat: 4.4450, lng: -75.1820, ubicacion: "Vía Ibagué - Bogotá calzada izquierda sector de Mirolindo"},
            {id: 12, nombre: "Tanque Picaleña", capacidad: 1400, lat: 4.4380, lng: -75.1750, ubicacion: "Vía Ibagué - Bogotá calzada izquierda sector de Club Campestre"},
            {id: 13, nombre: "Tanque de Ambalá", capacidad: 10000, lat: 4.4100, lng: -75.2100, ubicacion: "Sector Hacienda El Vergel"}
        ];
        
        const tryAddTable = (attempts = 0) => {
            const modalContent = document.getElementById('modalContent');
            console.log('📍 Intento', attempts + 1, '- modalContent encontrado:', !!modalContent);
            
            if (modalContent && modalContent.offsetParent !== null) {
                // Solo eliminar tablas anteriores y contenedores de animación visual
                const existingTables = modalContent.querySelectorAll('.tank-table-container, .table-title');
                existingTables.forEach(table => table.remove());
                
                // Eliminar específicamente los contenedores de animación visual
                const animationContainers = modalContent.querySelectorAll('.animation-container');
                animationContainers.forEach(container => container.remove());

                // Crear título de la tabla
                const tableTitle = document.createElement('h4');
                tableTitle.className = 'table-title';
                tableTitle.textContent = '🏪 Sistema de Tanques de Almacenamiento IBAL';
                tableTitle.style.cssText = 'color: #1565C0; margin: 20px 0 15px 0; font-size: 18px; text-align: center; font-weight: 600;';

                // Crear contenedor de la tabla
                const tableContainer = document.createElement('div');
                tableContainer.className = 'tank-table-container';
                tableContainer.style.cssText = 'overflow-x: auto; margin: 0 0 20px 0; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); background: white;';

                // Crear tabla
                const table = document.createElement('table');
                table.style.cssText = 'width: 100%; border-collapse: collapse; font-size: 14px; background: white;';

                // Crear encabezado
                const thead = document.createElement('thead');
                thead.innerHTML = `
                    <tr style="background: linear-gradient(135deg, #1565C0, #1976D2); color: white;">
                        <th style="padding: 12px 8px; text-align: center; font-weight: 600; border-right: 1px solid rgba(255,255,255,0.2);">No.</th>
                        <th style="padding: 12px 10px; text-align: left; font-weight: 600; border-right: 1px solid rgba(255,255,255,0.2);">Nombre del Tanque</th>
                        <th style="padding: 12px 8px; text-align: center; font-weight: 600; border-right: 1px solid rgba(255,255,255,0.2);">Capacidad (m³)</th>
                        <th style="padding: 12px 10px; text-align: left; font-weight: 600; border-right: 1px solid rgba(255,255,255,0.2);">Ubicación</th>
                        <th style="padding: 12px 8px; text-align: center; font-weight: 600;">Coordenadas</th>
                    </tr>
                `;

                // Crear cuerpo de la tabla
                const tbody = document.createElement('tbody');
                
                // Ordenar tanques por capacidad (mayor a menor)
                const tanquesOrdenados = tanques.sort((a, b) => b.capacidad - a.capacidad);
                
                tanquesOrdenados.forEach((tanque, index) => {
                    // Determinar color de la fila según capacidad
                    let rowColor;
                    if (tanque.capacidad >= 5000) {
                        rowColor = 'rgba(211, 47, 47, 0.05)'; // Rojo muy suave
                    } else if (tanque.capacidad >= 3000) {
                        rowColor = 'rgba(245, 124, 0, 0.05)'; // Naranja muy suave
                    } else if (tanque.capacidad >= 1500) {
                        rowColor = 'rgba(25, 118, 210, 0.05)'; // Azul muy suave
                    } else {
                        rowColor = 'rgba(56, 142, 60, 0.05)'; // Verde muy suave
                    }
                    
                    const row = document.createElement('tr');
                    row.style.cssText = `background: ${rowColor}; border-bottom: 1px solid #e0e0e0; transition: background-color 0.2s ease;`;
                    row.addEventListener('mouseenter', () => row.style.background = 'rgba(33, 150, 243, 0.1)');
                    row.addEventListener('mouseleave', () => row.style.background = rowColor);
                    
                    row.innerHTML = `
                        <td style="padding: 10px 8px; text-align: center; font-weight: 600; color: #1565C0; border-right: 1px solid #f0f0f0;">${tanque.id}</td>
                        <td style="padding: 10px; font-weight: 600; color: #333; border-right: 1px solid #f0f0f0;">${tanque.nombre}</td>
                        <td style="padding: 10px 8px; text-align: center; font-weight: 700; color: #D32F2F; border-right: 1px solid #f0f0f0;">${tanque.capacidad.toLocaleString()}</td>
                        <td style="padding: 10px; color: #555; font-size: 13px; border-right: 1px solid #f0f0f0;">${tanque.ubicacion}</td>
                        <td style="padding: 10px 8px; text-align: center; font-size: 12px; color: #666; font-family: monospace;">${tanque.lat.toFixed(4)}<br>${tanque.lng.toFixed(4)}</td>
                    `;
                    tbody.appendChild(row);
                });

                // Agregar fila de totales
                const totalCapacidad = tanques.reduce((sum, tanque) => sum + tanque.capacidad, 0);
                const totalRow = document.createElement('tr');
                totalRow.style.cssText = 'background: linear-gradient(135deg, #f5f5f5, #e8e8e8); border-top: 2px solid #1565C0; font-weight: 700;';
                totalRow.innerHTML = `
                    <td style="padding: 12px 8px; text-align: center; color: #1565C0; border-right: 1px solid #ddd;">-</td>
                    <td style="padding: 12px; color: #333; border-right: 1px solid #ddd;">TOTAL SISTEMA</td>
                    <td style="padding: 12px 8px; text-align: center; color: #D32F2F; font-size: 16px; border-right: 1px solid #ddd;">${totalCapacidad.toLocaleString()}</td>
                    <td style="padding: 12px; color: #555; border-right: 1px solid #ddd;">${tanques.length} tanques en total</td>
                    <td style="padding: 12px 8px; text-align: center; color: #666;">IBAL S.A. ESP</td>
                `;
                tbody.appendChild(totalRow);

                table.appendChild(thead);
                table.appendChild(tbody);
                tableContainer.appendChild(table);

                // Insertar la tabla al inicio del contenido del modal, manteniendo el resto
                modalContent.insertBefore(tableTitle, modalContent.firstChild);
                modalContent.insertBefore(tableContainer, modalContent.children[1]);
                
                console.log('✅ Tabla de tanques insertada exitosamente');
                
            } else if (attempts < 10) {
                // Reintentar después de un breve delay
                setTimeout(() => tryAddTable(attempts + 1), 200);
            } else {
                console.error('❌ No se pudo encontrar modalContent después de 10 intentos');
            }
        };

        // Iniciar el proceso
        tryAddTable();
    }

    showDistrictTable() {
        console.log('🏘️ Intentando mostrar tabla de distritos hidráulicos');
        
        // Datos de distritos hidráulicos IBAL - Marzo 2024
        const distritos = [
            {distrito: "DH1", suscriptores: 10565, nombre: "Centro - Belén"},
            {distrito: "DH2", suscriptores: 7882, nombre: "Ancón - Malabar"},
            {distrito: "DH3", suscriptores: 11948, nombre: "Norte - Calambeo"},
            {distrito: "DH4", suscriptores: 10422, nombre: "Occidente - San Simón"},
            {distrito: "DH5", suscriptores: 20502, nombre: "Comfenalco - Santa Rita"},
            {distrito: "DH6", suscriptores: 46866, nombre: "Principal - Jordán"},
            {distrito: "DH7", suscriptores: 24305, nombre: "Montecarlo - El Vergel"},
            {distrito: "DH8", suscriptores: 18359, nombre: "Los Tunjos - Comuna 8"},
            {distrito: "DH9", suscriptores: 6795, nombre: "Picaleña - Sur"},
            {distrito: "DH10", suscriptores: 21903, nombre: "Ciudadela Simón Bolívar"}
        ];
        
        const tryAddDistrictTable = (attempts = 0) => {
            const modalContent = document.getElementById('modalContent');
            console.log('📍 Intento', attempts + 1, '- modalContent encontrado:', !!modalContent);
            
            if (modalContent && modalContent.offsetParent !== null) {
                // Solo eliminar tablas anteriores y contenedores de animación visual
                const existingTables = modalContent.querySelectorAll('.district-table-container, .district-table-title');
                existingTables.forEach(table => table.remove());
                
                // Eliminar específicamente los contenedores de animación visual
                const animationContainers = modalContent.querySelectorAll('.animation-container');
                animationContainers.forEach(container => container.remove());

                // Crear título de la tabla
                const tableTitle = document.createElement('h4');
                tableTitle.className = 'district-table-title';
                tableTitle.textContent = '🏘️ Distritos Hidráulicos de Distribución IBAL';
                tableTitle.style.cssText = 'color: #1565C0; margin: 20px 0 15px 0; font-size: 18px; text-align: center; font-weight: 600;';

                // Crear subtítulo con fecha
                const subtitle = document.createElement('p');
                subtitle.textContent = 'Suscriptores activos por distrito - Marzo 2024';
                subtitle.style.cssText = 'color: #666; margin: 0 0 15px 0; font-size: 14px; text-align: center; font-style: italic;';

                // Crear contenedor de la tabla
                const tableContainer = document.createElement('div');
                tableContainer.className = 'district-table-container';
                tableContainer.style.cssText = 'overflow-x: auto; margin: 0 0 20px 0; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); background: white;';

                // Crear tabla
                const table = document.createElement('table');
                table.style.cssText = 'width: 100%; border-collapse: collapse; font-size: 14px; background: white;';

                // Crear encabezado
                const thead = document.createElement('thead');
                thead.innerHTML = `
                    <tr style="background: linear-gradient(135deg, #2E7D32, #4CAF50); color: white;">
                        <th style="padding: 12px 8px; text-align: center; font-weight: 600; border-right: 1px solid rgba(255,255,255,0.2);">Distrito</th>
                        <th style="padding: 12px 15px; text-align: left; font-weight: 600; border-right: 1px solid rgba(255,255,255,0.2);">Área de Cobertura</th>
                        <th style="padding: 12px 8px; text-align: center; font-weight: 600; border-right: 1px solid rgba(255,255,255,0.2);">Suscriptores</th>
                        <th style="padding: 12px 8px; text-align: center; font-weight: 600;">% del Total</th>
                    </tr>
                `;

                // Crear cuerpo de la tabla
                const tbody = document.createElement('tbody');
                
                // Calcular total de suscriptores
                const totalSuscriptores = distritos.reduce((sum, distrito) => sum + distrito.suscriptores, 0);
                
                // Ordenar distritos por número de suscriptores (mayor a menor)
                const distritosOrdenados = distritos.sort((a, b) => b.suscriptores - a.suscriptores);
                
                distritosOrdenados.forEach((distrito, index) => {
                    // Determinar color de la fila según número de suscriptores
                    let rowColor, barColor;
                    const porcentaje = ((distrito.suscriptores / totalSuscriptores) * 100);
                    
                    if (distrito.suscriptores >= 30000) {
                        rowColor = 'rgba(211, 47, 47, 0.05)'; // Rojo muy suave
                        barColor = '#D32F2F';
                    } else if (distrito.suscriptores >= 20000) {
                        rowColor = 'rgba(245, 124, 0, 0.05)'; // Naranja muy suave
                        barColor = '#F57C00';
                    } else if (distrito.suscriptores >= 15000) {
                        rowColor = 'rgba(25, 118, 210, 0.05)'; // Azul muy suave
                        barColor = '#1976D2';
                    } else if (distrito.suscriptores >= 10000) {
                        rowColor = 'rgba(56, 142, 60, 0.05)'; // Verde muy suave
                        barColor = '#388E3C';
                    } else {
                        rowColor = 'rgba(156, 39, 176, 0.05)'; // Púrpura muy suave
                        barColor = '#9C27B0';
                    }
                    
                    const row = document.createElement('tr');
                    row.style.cssText = `background: ${rowColor}; border-bottom: 1px solid #e0e0e0; transition: background-color 0.2s ease;`;
                    row.addEventListener('mouseenter', () => row.style.background = 'rgba(33, 150, 243, 0.1)');
                    row.addEventListener('mouseleave', () => row.style.background = rowColor);
                    
                    row.innerHTML = `
                        <td style="padding: 12px 8px; text-align: center; font-weight: 700; color: ${barColor}; font-size: 16px; border-right: 1px solid #f0f0f0;">${distrito.distrito}</td>
                        <td style="padding: 12px 15px; font-weight: 600; color: #333; border-right: 1px solid #f0f0f0;">${distrito.nombre}</td>
                        <td style="padding: 12px 8px; text-align: center; font-weight: 700; color: #D32F2F; border-right: 1px solid #f0f0f0;">${distrito.suscriptores.toLocaleString()}</td>
                        <td style="padding: 12px 8px; text-align: center; font-weight: 600; color: #666;">
                            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                                <div style="width: 50px; height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden;">
                                    <div style="width: ${porcentaje}%; height: 100%; background: ${barColor}; transition: width 0.3s ease;"></div>
                                </div>
                                <span>${porcentaje.toFixed(1)}%</span>
                            </div>
                        </td>
                    `;
                    tbody.appendChild(row);
                });

                // Agregar fila de totales
                const totalRow = document.createElement('tr');
                totalRow.style.cssText = 'background: linear-gradient(135deg, #f5f5f5, #e8e8e8); border-top: 2px solid #2E7D32; font-weight: 700;';
                totalRow.innerHTML = `
                    <td style="padding: 12px 8px; text-align: center; color: #2E7D32; font-size: 16px; border-right: 1px solid #ddd;">TOTAL</td>
                    <td style="padding: 12px 15px; color: #333; border-right: 1px solid #ddd;">SISTEMA COMPLETO IBAL</td>
                    <td style="padding: 12px 8px; text-align: center; color: #D32F2F; font-size: 16px; border-right: 1px solid #ddd;">${totalSuscriptores.toLocaleString()}</td>
                    <td style="padding: 12px 8px; text-align: center; color: #2E7D32; font-weight: 700;">100.0%</td>
                `;
                tbody.appendChild(totalRow);

                table.appendChild(thead);
                table.appendChild(tbody);
                tableContainer.appendChild(table);

                // Crear estadísticas adicionales
                const statsContainer = document.createElement('div');
                statsContainer.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; padding: 15px; background: rgba(46, 125, 50, 0.05); border-radius: 8px; border-left: 4px solid #2E7D32;';
                
                const mayorDistrito = distritosOrdenados[0];
                const menorDistrito = distritosOrdenados[distritosOrdenados.length - 1];
                const promedioSuscriptores = Math.round(totalSuscriptores / distritos.length);
                
                statsContainer.innerHTML = `
                    <div style="text-align: center;">
                        <div style="font-size: 24px; font-weight: 700; color: #D32F2F;">${mayorDistrito.suscriptores.toLocaleString()}</div>
                        <div style="font-size: 12px; color: #666; margin-top: 2px;">Mayor distrito: ${mayorDistrito.distrito}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 24px; font-weight: 700; color: #9C27B0;">${menorDistrito.suscriptores.toLocaleString()}</div>
                        <div style="font-size: 12px; color: #666; margin-top: 2px;">Menor distrito: ${menorDistrito.distrito}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 24px; font-weight: 700; color: #1976D2;">${promedioSuscriptores.toLocaleString()}</div>
                        <div style="font-size: 12px; color: #666; margin-top: 2px;">Promedio por distrito</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 24px; font-weight: 700; color: #2E7D32;">10</div>
                        <div style="font-size: 12px; color: #666; margin-top: 2px;">Distritos activos</div>
                    </div>
                `;

                // Insertar todo al inicio del contenido del modal, manteniendo el resto
                modalContent.insertBefore(tableTitle, modalContent.firstChild);
                modalContent.insertBefore(subtitle, modalContent.children[1]);
                modalContent.insertBefore(tableContainer, modalContent.children[2]);
                modalContent.insertBefore(statsContainer, modalContent.children[3]);
                
                console.log('✅ Tabla de distritos hidráulicos insertada exitosamente');
                
            } else if (attempts < 10) {
                // Reintentar después de un breve delay
                setTimeout(() => tryAddDistrictTable(attempts + 1), 200);
            } else {
                console.error('❌ No se pudo encontrar modalContent después de 10 intentos');
            }
        };

        // Iniciar el proceso
        tryAddDistrictTable();
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
        console.log('🏪 Iniciando tabla de tanques de almacenamiento');
        // Mostrar tabla de tanques de almacenamiento
        this.showTankTable();
    }

    startDistribucionAnimations() {
        console.log('🏘️ Iniciando tabla de distritos hidráulicos');
        // Mostrar tabla de distritos hidráulicos de distribución
        this.showDistrictTable();
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