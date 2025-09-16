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
        
        // Coordenadas reales basadas en investigación geográfica oficial
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
     * Add markers for all water sources and facilities
     */
    addMarkers() {
        // PTAP La Pola - Planta principal
        const ptapIcon = L.divIcon({
            className: 'custom-marker ptap-marker',
            html: '<div class="marker-icon">🏭</div><div class="marker-label">PTAP La Pola</div>',
            iconSize: [60, 80],
            iconAnchor: [30, 70]
        });
        
        const ptapMarker = L.marker([this.locations.ptap.lat, this.locations.ptap.lng], {
            icon: ptapIcon
        }).addTo(this.map);
        
        ptapMarker.bindPopup(this.createPopupContent(this.locations.ptap, 'ptap'));
        this.markers.push(ptapMarker);
        
        // Río Combeima - Fuente principal
        const combeimaIcon = L.divIcon({
            className: 'custom-marker source-primary',
            html: '<div class="marker-icon">🏔️</div><div class="marker-label">Río Combeima</div>',
            iconSize: [50, 70],
            iconAnchor: [25, 60]
        });
        
        const combeimaMarker = L.marker([this.locations.combeima.lat, this.locations.combeima.lng], {
            icon: combeimaIcon
        }).addTo(this.map);
        
        combeimaMarker.bindPopup(this.createPopupContent(this.locations.combeima, 'source'));
        this.markers.push(combeimaMarker);
        
        // Quebrada Cay - Fuente secundaria
        const cayIcon = L.divIcon({
            className: 'custom-marker source-secondary',
            html: '<div class="marker-icon">🌊</div><div class="marker-label">Q. Cay</div>',
            iconSize: [45, 65],
            iconAnchor: [22, 55]
        });
        
        const cayMarker = L.marker([this.locations.cay.lat, this.locations.cay.lng], {
            icon: cayIcon
        }).addTo(this.map);
        
        cayMarker.bindPopup(this.createPopupContent(this.locations.cay, 'source'));
        this.markers.push(cayMarker);
        
        // Quebrada Chembe - Fuente menor
        const chembeIcon = L.divIcon({
            className: 'custom-marker source-minor',
            html: '<div class="marker-icon">💧</div><div class="marker-label">Q. Chembe</div>',
            iconSize: [40, 60],
            iconAnchor: [20, 50]
        });
        
        const chembeMarker = L.marker([this.locations.chembe.lat, this.locations.chembe.lng], {
            icon: chembeIcon
        }).addTo(this.map);
        
        chembeMarker.bindPopup(this.createPopupContent(this.locations.chembe, 'source'));
        this.markers.push(chembeMarker);
        
        // Ciudad de Ibagué - Referencia
        const cityIcon = L.divIcon({
            className: 'custom-marker city-marker',
            html: '<div class="marker-icon">🏙️</div><div class="marker-label">Ibagué</div>',
            iconSize: [50, 70],
            iconAnchor: [25, 60]
        });
        
        const cityMarker = L.marker([this.locations.ibague.lat, this.locations.ibague.lng], {
            icon: cityIcon
        }).addTo(this.map);
        
        cityMarker.bindPopup(this.createPopupContent(this.locations.ibague, 'city'));
        this.markers.push(cityMarker);
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