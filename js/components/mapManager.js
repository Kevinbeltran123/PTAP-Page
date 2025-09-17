/**
 * Map Manager - OpenStreetMap Integration with Leaflet
 * Manages interactive map with water source locations
 * Author: Kevin Beltrán
 */

class MapManager {
    constructor() {
        this.map = null;
        this.distributionMap = null;
        this.markers = [];
        this.districtLayers = [];
        this.districtMarkers = [];
        this.currentLayer = 'osm';
        this.isInitialized = false;
        this.isDistributionInitialized = false;
        this.showDistricts = true;
        
        // Coordenadas reales basadas en investigación geográfica oficial y tabla de macromedidores
        this.locations = {
            ibague: {
                lat: 4.4386,
                lng: -75.2108,
                name: "Ibagué",
                elevation: "1,285 msnm",
                description: "Capital del Tolima"
            },
            ptap: {
                lat: 4.4433,  // Barrio La Pola, zona noroccidental
                lng: -75.2233,
                name: "PTAP La Pola",
                type: "Planta de Tratamiento",
                capacity: "2,170 L/s total",
                location: "Barrio La Pola"
            },
            combeima: {
                lat: 4.4927,  // Coordenadas precisas de Vereda Llanitos
                lng: -75.2887,
                name: "Captación Río Combeima",
                flow: "1,830 L/s (concesión IBAL)",
                percentage: "82% del suministro",
                location: "Vereda Llanitos, Cañón del Combeima",
                elevation: "1,444-2,366 msnm",
                description: "Bocatoma principal en Vereda Llanitos"
            },
            cay: {
                lat: 4.4850,  // Ubicación estimada en cuenca Combeima
                lng: -75.2650,
                name: "Captación Quebrada Cay",
                flow: "375 L/s (concesión IBAL)",
                stability: "Fuente estable",
                elevation: "1,600-1,800 msnm",
                description: "Tributario en cuenca del Combeima"
            },
            chembe: {
                lat: 4.4600,  // Comuna 7, tributario del Alvarado
                lng: -75.2100,
                name: "Captación Quebrada Chembe",
                flow: "70 L/s",
                variability: "Alta variabilidad climática",
                elevation: "1,500-1,700 msnm",
                location: "Comuna 7",
                description: "Tributario del río Alvarado, subzona Totare"
            }
        };
        
        // Macromedidores y puntos de monitoreo según coordenadas oficiales IBAL
        this.macromedidores = {
            bocatoma_combeima: {
                lat: 4.482439,
                lng: -75.285877,
                name: "Bocatoma Combeima",
                tipo: "Captación",
                medicion: "Macromedición (X2): Sensor Ultrasónico",
                estado: "Operativo (Estado de arranque y calibración)",
                caudales: ["27\" = 800 L/s", "24\" = 950 L/s", "20\" = 400 L/s"],
                punto: "Captación"
            },
            bocatoma_cay: {
                lat: 4.452699425186609,
                lng: -75.249671150081729,
                name: "Bocatoma Cay",
                tipo: "Captación",
                medicion: "Macromedidor (X1): Electromagnético tipo Carrete",
                estado: "Operativo",
                caudales: ["16\" = 522 L/s"],
                punto: "Captación"
            },
            entrada_ptap_1: {
                lat: 4.452419348535335,
                lng: -75.249559171399092,
                name: "PTAP La Pola 1",
                tipo: "Entrada PTAP",
                medicion: "Medición por Regleta - Canaleta tipo Parshall - Sensor Ultrasónico de Nivel",
                estado: "Operativo",
                caudales: ["Canaleta Parshall = 1356 L/s"],
                punto: "Entrada PTAP"
            },
            entrada_ptap_2: {
                lat: 4.520908616270454,
                lng: -75.249490248467684,
                name: "PTAP La Pola 1",
                tipo: "Entrada PTAP",
                medicion: "Macromedición (X1): Sensor Ultrasónico",
                estado: "Operativo (Estado de arranque y calibración)",
                caudales: ["16\" = 630 L/s en lavado"],
                punto: "Entrada PTAP"
            },
            entrada_ptap_3: {
                lat: 4.451242512697746,
                lng: -75.249353017090992,
                name: "PTAP La Pola 2",
                tipo: "Entrada PTAP",
                medicion: "Medición por Regleta - Perfil de Creager - Sensor Ultrasónico de Nivel",
                estado: "Operativo",
                caudales: ["Perfil de Creager = 704 L/s"],
                punto: "Entrada PTAP"
            },
            salida_ptap_chembe: {
                lat: 4.476374330995315,
                lng: -75.166013181702978,
                name: "PTAP Chembe",
                tipo: "Salida PTAP",
                medicion: "Macromedidor (X1)",
                estado: "Operativo",
                caudales: ["6\" = 65 L/s"],
                punto: "Salida PTAP"
            }
        };
        
        // Distritos hidráulicos de distribución IBAL
        // Comunas de Ibagué para distribución de agua - IBAL
        this.districts = {
            comuna1: {
                id: 1,
                name: "Comuna 1 - Centro",
                center: [4.4386, -75.2322], // Centro histórico
                neighborhoods: ["Centro", "La Pola", "Tolima", "Santa Ana"],
                color: "#FF6B6B",
                population: "~35,000 hab."
            },
            comuna2: {
                id: 2,
                name: "Comuna 2 - Calambeo", 
                center: [4.4580, -75.2180], // Norte
                neighborhoods: ["Calambeo", "Belén", "El Recreo", "Modelo"],
                color: "#4ECDC4",
                population: "~25,000 hab."
            },
            comuna3: {
                id: 3,
                name: "Comuna 3 - San Simón",
                center: [4.4480, -75.2200], // Nor-occidente
                neighborhoods: ["San Simón", "Interlaken", "Ricaurte"],
                color: "#45B7D1",
                population: "~22,000 hab."
            },
            comuna5: {
                id: 5,
                name: "Comuna 5 - Jordán",
                center: [4.4350, -75.1950], // Oriente
                neighborhoods: ["Jordán", "San Antonio", "Villa Restrepo"],
                color: "#FFEAA7",
                population: "~32,000 hab."
            },
            comuna6: {
                id: 6,
                name: "Comuna 6 - Norte",
                center: [4.4520, -75.2100], // Norte
                neighborhoods: ["Los Mártires", "Villa Luz", "Buenos Aires"],
                color: "#DDA0DD",
                population: "~26,000 hab."
            },
            comuna7: {
                id: 7,
                name: "Comuna 7 - Salado",
                center: [4.4450, -75.2280], // Occidente
                neighborhoods: ["Salado", "Darío Echandía", "Kennedy"],
                color: "#FFB347",
                population: "~30,000 hab."
            },
            comuna8: {
                id: 8,
                name: "Comuna 8 - Ciudadela",
                center: [4.4180, -75.1850], // Sur-oriente
                neighborhoods: ["Ciudadela Simón Bolívar", "Ambala", "Villa Estadio"],
                color: "#87CEEB",
                population: "~35,000 hab."
            },
            comuna9: {
                id: 9,
                name: "Comuna 9 - Picaleña",
                center: [4.4150, -75.1980], // Sur
                neighborhoods: ["Picaleña", "Mirolindo", "Alfonso López"],
                color: "#98FB98",
                population: "~40,000 hab."
            },
            comuna10: {
                id: 10,
                name: "Comuna 10 - Sur",
                center: [4.4050, -75.2150], // Sur-occidente
                neighborhoods: ["Garibaldi", "Villa Hermosa", "Saldaña"],
                color: "#F0E68C",
                population: "~22,000 hab."
            },
            comuna12: {
                id: 12,
                name: "Comuna 12 - Tesorito",
                center: [4.4380, -75.2450], // Occidente extremo
                neighborhoods: ["Tesorito", "Villa Restrepo", "Minuto de Dios"],
                color: "#20B2AA",
                population: "~18,000 hab."
            }
        };
        
        // Configuración de capas de mapa
        this.mapLayers = {
            osm: {
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '© OpenStreetMap contributors',
                name: 'OpenStreetMap'
            },
            terrain: {
                url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
                attribution: '© OpenTopoMap (CC-BY-SA)',
                name: 'Topográfico'
            },
            satellite: {
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                attribution: '© Esri',
                name: 'Satélite'
            }
        };
    }
    
    /**
     * Initialize the map when modal is opened
     */
    initializeMap() {
        if (this.isInitialized) {
            return;
        }
        
        try {
            // Crear el mapa centrado en Ibagué con zoom optimizado para mostrar todas las fuentes
            this.map = L.map('captacionMap', {
                center: [4.470, -75.240], // Centro ajustado para mostrar todas las ubicaciones
                zoom: 12,
                zoomControl: true,
                attributionControl: true,
                preferCanvas: true
            });
            
            // Agregar capa base
            this.addBaseLayer();
            
            // Agregar marcadores
            this.addMarkers();
            
            // Configurar controles
            this.setupControls();
            
            this.isInitialized = true;
            console.log('✅ Mapa OpenStreetMap inicializado correctamente');
            
        } catch (error) {
            console.error('❌ Error inicializando el mapa:', error);
        }
    }
    
    /**
     * Add base layer to map
     */
    addBaseLayer() {
        const layerConfig = this.mapLayers[this.currentLayer];
        L.tileLayer(layerConfig.url, {
            attribution: layerConfig.attribution,
            maxZoom: 18,
            minZoom: 8
        }).addTo(this.map);
    }
    
    /**
     * Add markers for macromedidores only
     */
    addMarkers() {
        // Solo agregar macromedidores según coordenadas oficiales IBAL
        this.addMacromedidores();
    }
    
    /**
     * Add macromedidores to the map based on official IBAL coordinates
     */
    addMacromedidores() {
        Object.values(this.macromedidores).forEach(macro => {
            // Determinar icono según el tipo de punto
            let iconHTML, markerClass;
            
            switch (macro.tipo) {
                case 'Captación':
                    iconHTML = '<div class="marker-icon">📊</div><div class="marker-label">' + macro.name + '</div>';
                    markerClass = 'custom-marker macromedidor-captacion';
                    break;
                case 'Entrada PTAP':
                    iconHTML = '<div class="marker-icon">🔍</div><div class="marker-label">' + macro.name + '</div>';
                    markerClass = 'custom-marker macromedidor-entrada';
                    break;
                case 'Salida PTAP':
                    iconHTML = '<div class="marker-icon">📈</div><div class="marker-label">' + macro.name + '</div>';
                    markerClass = 'custom-marker macromedidor-salida';
                    break;
                default:
                    iconHTML = '<div class="marker-icon">⚙️</div><div class="marker-label">' + macro.name + '</div>';
                    markerClass = 'custom-marker macromedidor-general';
            }
            
            // Crear icono del macromedidor
            const macroIcon = L.divIcon({
                className: markerClass,
                html: iconHTML,
                iconSize: [55, 75],
                iconAnchor: [27, 65]
            });
            
            // Crear marcador
            const macroMarker = L.marker([macro.lat, macro.lng], {
                icon: macroIcon
            }).addTo(this.map);
            
            // Agregar popup con información detallada
            macroMarker.bindPopup(this.createMacromedidorPopup(macro));
            this.markers.push(macroMarker);
        });
    }
    
    /**
     * Create popup content for macromedidores
     */
    createMacromedidorPopup(macro) {
        return `
            <div class="map-popup macromedidor-popup">
                <h3>📊 ${macro.name}</h3>
                <div class="popup-details">
                    <p><strong>📍 Punto:</strong> ${macro.punto}</p>
                    <p><strong>🔧 Tipo:</strong> ${macro.tipo}</p>
                    <p><strong>📏 Medición:</strong> ${macro.medicion}</p>
                    <p><strong>⚡ Estado:</strong> ${macro.estado}</p>
                    <p><strong>💧 Caudales promedio:</strong></p>
                    <ul style="margin: 5px 0; padding-left: 20px;">
                        ${macro.caudales.map(caudal => `<li>${caudal}</li>`).join('')}
                    </ul>
                    <p><strong>🏢 Operador:</strong> IBAL S.A. ESP</p>
                    <p><strong>📌 Coordenadas:</strong> ${macro.lat.toFixed(6)}, ${macro.lng.toFixed(6)}</p>
                </div>
            </div>
        `;
    }
    
    /**
     * Create popup content for markers
     */
    createPopupContent(location, type) {
        let content = `<div class="map-popup">`;
        
        switch (type) {
            case 'ptap':
                content += `
                    <h3>🏭 ${location.name}</h3>
                    <div class="popup-details">
                        <p><strong>Tipo:</strong> ${location.type}</p>
                        <p><strong>Ubicación:</strong> ${location.location}</p>
                        <p><strong>Capacidad Total:</strong> ${location.capacity}</p>
                        <p><strong>Operador:</strong> IBAL S.A. ESP</p>
                        <p><strong>Procesos:</strong> Coagulación, Sedimentación, Filtración, Desinfección</p>
                        <p><strong>Modernización:</strong> Paneles tipo colmena (2023)</p>
                        <p><strong>Inversión:</strong> $2,119 millones (2023)</p>
                        <p><strong>Población Atendida:</strong> 180,000+ suscriptores</p>
                    </div>
                `;
                break;
                
            case 'source':
                content += `
                    <h3>${location.name}</h3>
                    <div class="popup-details">
                        <p><strong>💧 Caudal Concesión:</strong> ${location.flow}</p>
                        <p><strong>📍 Elevación:</strong> ${location.elevation}</p>
                        ${location.percentage ? `<p><strong>📊 Participación:</strong> ${location.percentage}</p>` : ''}
                        ${location.location ? `<p><strong>🗺️ Ubicación:</strong> ${location.location}</p>` : ''}
                        ${location.description ? `<p><strong>📄 Descripción:</strong> ${location.description}</p>` : ''}
                        ${location.stability ? `<p><strong>✅ Estabilidad:</strong> ${location.stability}</p>` : ''}
                        ${location.variability ? `<p><strong>⚠️ Variabilidad:</strong> ${location.variability}</p>` : ''}
                        <p><strong>🏢 Operador:</strong> IBAL S.A. ESP</p>
                    </div>
                `;
                break;
                
            case 'city':
                content += `
                    <h3>🏙️ ${location.name}</h3>
                    <div class="popup-details">
                        <p><strong>📍 Elevación:</strong> ${location.elevation}</p>
                        <p><strong>🌡️ Temperatura Media:</strong> 21°C</p>
                        <p><strong>👥 Población servida:</strong> 180,000+ suscriptores</p>
                        <p><strong>🚰 Cobertura IBAL:</strong> 85% de la población</p>
                        <p><strong>🗺️ Distritos hidráulicos:</strong> 10 sectores</p>
                        <p><strong>🏛️ Status:</strong> Capital del Tolima</p>
                        <p><strong>💧 Fuentes principales:</strong> Combeima, Cay, Chembe</p>
                    </div>
                `;
                break;
        }
        
        content += `</div>`;
        return content;
    }
    
    /**
     * Setup map controls
     */
    setupControls() {
        // Configurar botón de centrar
        document.getElementById('centerMapBtn')?.addEventListener('click', () => {
            this.centerMap();
        });
        
        // Configurar botón de cambiar capa
        document.getElementById('toggleTerrainBtn')?.addEventListener('click', () => {
            this.toggleLayer();
        });
    }
    
    /**
     * Center map on Ibagué and fit all markers
     */
    centerMap() {
        if (!this.map) return;
        
        const group = new L.featureGroup(this.markers);
        this.map.fitBounds(group.getBounds().pad(0.1));
    }
    
    /**
     * Toggle between map layers
     */
    toggleLayer() {
        if (!this.map) return;
        
        // Cycle through layers: osm -> terrain -> satellite -> osm
        const layers = Object.keys(this.mapLayers);
        const currentIndex = layers.indexOf(this.currentLayer);
        const nextIndex = (currentIndex + 1) % layers.length;
        this.currentLayer = layers[nextIndex];
        
        // Remove current layers
        this.map.eachLayer((layer) => {
            if (layer instanceof L.TileLayer) {
                this.map.removeLayer(layer);
            }
        });
        
        // Add new layer
        this.addBaseLayer();
        
        // Update button tooltip
        const btn = document.getElementById('toggleTerrainBtn');
        if (btn) {
            btn.title = `Vista: ${this.mapLayers[this.currentLayer].name}`;
        }
    }
    
    /**
     * Initialize distribution map for districts
     */
    initializeDistributionMap() {
        if (this.isDistributionInitialized) {
            return;
        }
        
        try {
            // Crear el mapa de distribución centrado en Ibagué urbano
            this.distributionMap = L.map('distribucionMap', {
                center: [4.4350, -75.2050], // Centro de Ibagué urbano
                zoom: 13,
                zoomControl: true,
                attributionControl: true,
                preferCanvas: true
            });
            
            // Agregar capa base
            this.addDistributionBaseLayer();
            
            // Agregar marcadores de distritos
            this.addDistrictMarkers();
            
            // Agregar capas de distrito
            this.addDistrictLayers();
            
            // Configurar controles de distribución
            this.setupDistributionControls();
            
            this.isDistributionInitialized = true;
            console.log('✅ Mapa de distribución inicializado correctamente');
            
        } catch (error) {
            console.error('❌ Error inicializando el mapa de distribución:', error);
        }
    }
    
    /**
     * Add base layer to distribution map
     */
    addDistributionBaseLayer() {
        const layerConfig = this.mapLayers[this.currentLayer];
        L.tileLayer(layerConfig.url, {
            attribution: layerConfig.attribution,
            maxZoom: 18,
            minZoom: 10
        }).addTo(this.distributionMap);
    }
    
    /**
     * Add district markers
     */
    addDistrictMarkers() {
        Object.values(this.districts).forEach(district => {
            // Crear icono tipo pin para comuna
            const districtIcon = L.divIcon({
                className: 'comuna-marker',
                html: `
                    <div class="comuna-pin" style="border-color: ${district.color}">
                        <div class="comuna-pin-head" style="background-color: ${district.color}">
                            <span class="comuna-number">${district.id}</span>
                        </div>
                        <div class="comuna-pin-point" style="border-top-color: ${district.color}"></div>
                    </div>
                    <div class="comuna-label">${district.name.split(' - ')[1] || district.name}</div>
                `,
                iconSize: [40, 50],
                iconAnchor: [20, 45]
            });
            
            // Crear marcador
            const marker = L.marker(district.center, {
                icon: districtIcon
            }).addTo(this.distributionMap);
            
            // Agregar popup
            marker.bindPopup(this.createDistrictPopup(district));
            this.districtMarkers.push(marker);
        });
    }
    
    /**
     * Add district boundary layers - removed circles to show only pins
     */
    addDistrictLayers() {
        // Solo pins de comunas, sin círculos superpuestos
        console.log('✅ Mostrando solo pins de comunas sin círculos');
    }
    
    /**
     * Create popup content for districts
     */
    createDistrictPopup(district) {
        return `
            <div class="map-popup district-popup">
                <h3 style="color: ${district.color}">🏘️ ${district.name}</h3>
                <div class="popup-details">
                    <p><strong>👥 Población estimada:</strong> ${district.population}</p>
                    <p><strong>🏘️ Barrios principales:</strong></p>
                    <ul style="margin: 5px 0; padding-left: 20px;">
                        ${district.neighborhoods.map(n => `<li>${n}</li>`).join('')}
                    </ul>
                    <p><strong>🏢 Operador:</strong> IBAL S.A. ESP</p>
                    <p><strong>⚙️ Sistema:</strong> Semaforización inteligente</p>
                    <p><strong>💧 Fuentes:</strong> PTAP La Pola y Chembe</p>
                </div>
            </div>
        `;
    }
    
    /**
     * Setup distribution map controls
     */
    setupDistributionControls() {
        // Configurar botón de centrar distritos
        document.getElementById('centerDistrictBtn')?.addEventListener('click', () => {
            this.centerDistributionMap();
        });
        
        // Configurar botón de mostrar/ocultar distritos
        document.getElementById('toggleDistrictsBtn')?.addEventListener('click', () => {
            this.toggleDistrictVisibility();
        });
        
        // Configurar botón de cambiar capa
        document.getElementById('toggleLayerBtn')?.addEventListener('click', () => {
            this.toggleDistributionLayer();
        });
    }
    
    /**
     * Center distribution map on all districts
     */
    centerDistributionMap() {
        if (!this.distributionMap) return;
        
        const group = new L.featureGroup([...this.districtMarkers, ...this.districtLayers]);
        this.distributionMap.fitBounds(group.getBounds().pad(0.05));
    }
    
    /**
     * Toggle district visibility
     */
    toggleDistrictVisibility() {
        if (!this.distributionMap) return;
        
        this.showDistricts = !this.showDistricts;
        
        this.districtLayers.forEach(layer => {
            if (this.showDistricts) {
                layer.addTo(this.distributionMap);
            } else {
                this.distributionMap.removeLayer(layer);
            }
        });
        
        // Update button
        const btn = document.getElementById('toggleDistrictsBtn');
        if (btn) {
            btn.textContent = this.showDistricts ? '👁️' : '🙈';
            btn.title = this.showDistricts ? 'Ocultar distritos' : 'Mostrar distritos';
        }
    }
    
    /**
     * Toggle distribution map layers
     */
    toggleDistributionLayer() {
        if (!this.distributionMap) return;
        
        // Cycle through layers
        const layers = Object.keys(this.mapLayers);
        const currentIndex = layers.indexOf(this.currentLayer);
        const nextIndex = (currentIndex + 1) % layers.length;
        this.currentLayer = layers[nextIndex];
        
        // Remove current layers
        this.distributionMap.eachLayer((layer) => {
            if (layer instanceof L.TileLayer) {
                this.distributionMap.removeLayer(layer);
            }
        });
        
        // Add new layer
        this.addDistributionBaseLayer();
        
        // Update button tooltip
        const btn = document.getElementById('toggleLayerBtn');
        if (btn) {
            btn.title = `Vista: ${this.mapLayers[this.currentLayer].name}`;
        }
    }
    
    /**
     * Destroy map instance
     */
    destroy() {
        if (this.map) {
            this.map.remove();
            this.map = null;
            this.markers = [];
            this.isInitialized = false;
        }
        
        if (this.distributionMap) {
            this.distributionMap.remove();
            this.distributionMap = null;
            this.districtMarkers = [];
            this.districtLayers = [];
            this.isDistributionInitialized = false;
        }
    }
    
    /**
     * Resize maps (useful when container size changes)
     */
    resize() {
        if (this.map) {
            setTimeout(() => {
                this.map.invalidateSize();
            }, 100);
        }
        
        if (this.distributionMap) {
            setTimeout(() => {
                this.distributionMap.invalidateSize();
            }, 100);
        }
    }
}

// Make globally available
window.MapManager = MapManager;