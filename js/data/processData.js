/**
 * PTAP La Pola - Process Data
 * Detailed information for each treatment process
 * Based on official IBAL documentation
 * Author: Kevin Beltrán
 */

const processData = {
    captacion: {
        title: "CAPTACIÓN DE AGUA CRUDA",
        subtitle: "Sistema de captación desde múltiples fuentes hídricas",
        icon: "🏔️",
        content: `
            <div class="water-sources-map">
                <h3>🗺️ Sistema de Captación PTAP La Pola - Ibagué, Tolima</h3>
                <div class="osm-map-container">
                    <div id="captacionMap" class="leaflet-map"></div>
                    <div class="map-controls">
                        <button id="centerMapBtn" class="map-control-btn" title="Centrar en Ibagué">🎯</button>
                        <button id="toggleTerrainBtn" class="map-control-btn" title="Cambiar vista">🗺️</button>
                    </div>
                </div>
                <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.9); border-radius: 10px; font-size: 0.85em; color: #333;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px; margin-bottom: 10px;">
                        <div><strong>🏔️ Río Combeima:</strong> 1,500 L/s (82% del suministro)</div>
                        <div><strong>🌊 Q. Cay:</strong> 600 L/s (Fuente estable)</div>
                        <div><strong>💧 Q. Chembe:</strong> 70 L/s (Alta variabilidad)</div>
                        <div><strong>🏭 PTAP La Pola:</strong> Planta de tratamiento</div>
                    </div>
                    <div style="border-top: 1px solid #ddd; padding-top: 8px; font-size: 0.8em; color: #666;">
                        <strong>Datos topográficos:</strong> Basado en elevaciones reales del SRTM. Rango altitudinal: 308m - 5,212m snm
                    </div>
                </div>
            </div>
            
            <div class="technical-specs">
                <h4>📊 Especificaciones Técnicas del Sistema de Captación</h4>
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-label">Fuente Principal</div>
                        <div class="spec-value">Río Combeima (82% del suministro)</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Ubicación Bocatoma</div>
                        <div class="spec-value">Vereda Llanitos</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Cierres 2022</div>
                        <div class="spec-value">19 por turbiedad >12,000 NTU</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Operación Normal</div>
                        <div class="spec-value">Turbiedad <500 NTU, pH 6.5-8.5</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Afluentes Contribuyentes</div>
                        <div class="spec-value">Las Perlas, Guamal, La Cristalina</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Capacidad Total</div>
                        <div class="spec-value">2,170 L/s (todas las fuentes)</div>
                    </div>
                </div>
            </div>
            
            <p><strong>🎯 Función:</strong> El sistema de captación opera desde tres fuentes principales con alta vulnerabilidad climática. 
            Durante temporadas lluviosas, la turbiedad puede superar los 12,000 NTU, activando protocolos de suspensión automática.</p>
            
            <p><strong>⚠️ Desafíos:</strong> Alta dependencia del Río Combeima (82%) y variabilidad estacional extrema que 
            puede generar suspensiones de hasta 40-45 días continuos en quebradas menores.</p>
        `
    },

    desarenador: {
        title: "DESARENACIÓN Y PRETRATAMIENTO",
        subtitle: "Remoción de sólidos gruesos y material de arrastre",
        icon: "🔄",
        content: `
            <div class="animation-container">
                <div class="sedimentation-animation">
                    <h4>🔄 Proceso de Sedimentación de Arenas</h4>
                    <div style="display: flex; align-items: center; gap: 20px; justify-content: center;">
                        <div style="width: 200px; height: 100px; border: 2px solid #333; border-radius: 10px; background: linear-gradient(to bottom, #87ceeb 0%, #4682b4 100%); position: relative;">
                            <div style="position: absolute; bottom: 0; width: 100%; height: 30%; background: #8b7355; border-radius: 0 0 8px 8px;"></div>
                            <div class="settling-particles" style="position: absolute; top: 20%; left: 10%; width: 4px; height: 4px; background: #654321; border-radius: 50%;"></div>
                            <div class="settling-particles" style="position: absolute; top: 20%; left: 30%; width: 3px; height: 3px; background: #654321; border-radius: 50%; animation-delay: 0.5s;"></div>
                            <div class="settling-particles" style="position: absolute; top: 20%; left: 50%; width: 5px; height: 5px; background: #654321; border-radius: 50%; animation-delay: 1s;"></div>
                        </div>
                        <div style="font-size: 2em;">→</div>
                        <div style="width: 150px; height: 80px; border: 2px solid #333; border-radius: 10px; background: #87ceeb;"></div>
                    </div>
                </div>
            </div>
            
            <div class="technical-specs">
                <h4>📊 Parámetros de Operación</h4>
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-label">Objetivo Principal</div>
                        <div class="spec-value">Remoción arenas y sólidos gruesos</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Velocidad Sedimentación</div>
                        <div class="spec-value">0.15 - 0.30 m/s</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Tiempo Retención</div>
                        <div class="spec-value">2 - 5 minutos</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Eficiencia Remoción</div>
                        <div class="spec-value">>85% sólidos >0.2 mm</div>
                    </div>
                </div>
            </div>
            
            <p><strong>🎯 Función:</strong> Protege los procesos posteriores de tratamiento removiendo material particulado 
            grueso que podría interferir con la coagulación-floculación y sobrecargar los sedimentadores.</p>
        `
    },

    coagulacion: {
        title: "COAGULACIÓN Y FLOCULACIÓN",
        subtitle: "Desestabilización y aglomeración de partículas coloidales",
        icon: "⚗️",
        content: `
            <div class="animation-container">
                <div class="coagulation-animation">
                    <h4>⚗️ Proceso de Coagulación con Mackenfloc</h4>
                    <div style="display: flex; align-items: center; gap: 30px; justify-content: center;">
                        <div class="mixing-chamber" style="width: 100px; height: 100px; border: 3px solid #4facfe; border-radius: 50%; position: relative; overflow: hidden;">
                            <div class="particles" style="animation-delay: 0s;"></div>
                            <div class="particles" style="animation-delay: 0.5s;"></div>
                            <div class="particles" style="animation-delay: 1s;"></div>
                            <div class="particles" style="animation-delay: 1.5s;"></div>
                        </div>
                        <div style="font-size: 1.5em; margin: 0 20px;">→</div>
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <div style="font-weight: bold; margin-bottom: 10px;">Formación de Flóculos</div>
                            <div style="display: flex; gap: 5px;">
                                <div style="width: 20px; height: 20px; background: #ff9800; border-radius: 50%; opacity: 0.8;"></div>
                                <div style="width: 25px; height: 25px; background: #f57c00; border-radius: 50%; opacity: 0.8;"></div>
                                <div style="width: 30px; height: 30px; background: #ef6c00; border-radius: 50%; opacity: 0.8;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="technical-specs">
                <h4>📊 Parámetros Químicos de Coagulación</h4>
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-label">Coagulante Principal</div>
                        <div class="spec-value">Mackenfloc (coagulante químico)</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Dosis Coagulante</div>
                        <div class="spec-value">15-40 mg/L (según turbiedad)</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Aplicación</div>
                        <div class="spec-value">Goteo al resalto hidráulico</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">pH Óptimo</div>
                        <div class="spec-value">6.0 - 7.5</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Tiempo Mezcla Rápida</div>
                        <div class="spec-value">1-3 segundos</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Gradiente Velocidad</div>
                        <div class="spec-value">700-1000 s⁻¹</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">TRH Floculación</div>
                        <div class="spec-value">20-30 minutos</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Sistema Dosificación</div>
                        <div class="spec-value">Bombas peristálticas automáticas</div>
                    </div>
                </div>
            </div>
            
            <p><strong>🎯 Función:</strong> La PTAP La Pola 1 opera con floculadores mecánicos horizontales y verticales con 
            volumen total de 735,53 m³ por módulo. La Pola 2 usa floculadores hidráulicos con tiempos de retención 
            extendidos de 25-30 minutos.</p>
            
            <p><strong>⚙️ Control:</strong> Mackenfloc es un líquido marrón oscuro con pH 2.0-3.0, densidad 1,32 g/mL a 20°C. 
            La dosificación se optimiza mediante variación de gradientes de velocidad según calidad del agua cruda.</p>
        `
    },

    sedimentacion: {
        title: "SEDIMENTACIÓN ACELERADA",
        subtitle: "Módulos hexagonales de polipropileno - Modernización 2024",
        icon: "🏗️",
        content: `
            <div class="animation-container">
                <h4>🏗️ Sistema de Paneles Tipo Colmena</h4>
                <div style="display: flex; justify-content: center; align-items: center; gap: 30px;">
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <div style="font-weight: bold; margin-bottom: 10px;">Módulos Hexagonales Polipropileno</div>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;">
                            ${Array(9).fill().map(() => `
                                <div style="width: 25px; height: 25px; background: #4caf50; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);"></div>
                            `).join('')}
                        </div>
                        <div style="margin-top: 10px; font-size: 0.9em; color: #666;">Reemplazo asbesto-cemento</div>
                    </div>
                    <div style="font-size: 2em;">→</div>
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <div style="font-weight: bold; margin-bottom: 10px;">Agua Clarificada</div>
                        <div style="width: 100px; height: 60px; background: linear-gradient(to bottom, #e3f2fd, #bbdefb); border: 2px solid #2196f3; border-radius: 10px;"></div>
                        <div style="margin-top: 10px; font-size: 0.9em; color: #666;">Turbiedad <5 NTU</div>
                    </div>
                </div>
            </div>
            
            <div class="technical-specs">
                <h4>💰 Inversión y Modernización PTAP No. 1</h4>
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-label">Proyecto Optimización</div>
                        <div class="spec-value">PTAP La Pola No.1 (2024)</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Tecnología Instalada</div>
                        <div class="spec-value">Módulos hexagonales alta densidad</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Mejora Capacidad</div>
                        <div class="spec-value">Incremento 40% por módulo</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Material Anterior</div>
                        <div class="spec-value">Módulos asbesto-cemento</div>
                    </div>
                </div>
            </div>
            
            <div class="technical-specs">
                <h4>📊 Parámetros de Operación</h4>
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-label">Velocidad Superficial</div>
                        <div class="spec-value">15-25 m/día</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Tiempo Retención</div>
                        <div class="spec-value">1.5-2 horas optimizado</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Material Nuevo</div>
                        <div class="spec-value">Polipropileno alta densidad</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Eficiencia Remoción</div>
                        <div class="spec-value">>90% sólidos suspendidos</div>
                    </div>
                </div>
            </div>
            
            <p><strong>🎯 Función:</strong> Los paneles tipo colmena optimizan la separación gravitacional de flóculos 
            proporcionando mayor área superficial específica e incrementando significativamente la eficiencia de remoción 
            de sólidos suspendidos comparado con sedimentadores convencionales.</p>
        `
    },

    filtracion: {
        title: "FILTRACIÓN MULTIMEDIA AVANZADA",
        subtitle: "Sistema multicapa con antracita, arena y grava",
        icon: "🏭",
        content: `
            <div class="animation-container">
                <div class="filter-animation">
                    <h4>🏗️ Configuración del Lecho Multimedia</h4>
                    <div class="filter-layers" style="width: 200px; height: 150px; border: 2px solid #333; border-radius: 5px; position: relative; overflow: hidden; margin: 0 auto;">
                        <div class="filter-layer anthracite" style="width: 100%; height: 50px; background: #2c2c2c; position: absolute; top: 0; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.7em; font-weight: bold;">
                            ANTRACITA<br>60 cm
                        </div>
                        <div class="filter-layer sand" style="width: 100%; height: 50px; background: #f4a460; position: absolute; top: 50px; display: flex; align-items: center; justify-content: center; color: #333; font-size: 0.7em; font-weight: bold;">
                            ARENA<br>40 cm
                        </div>
                        <div class="filter-layer gravel" style="width: 100%; height: 50px; background: #8b7355; position: absolute; top: 100px; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.7em; font-weight: bold;">
                            GRAVA<br>40 cm
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 10px; font-weight: bold;">
                        ⬇️ Flujo Descendente - Filtración por Gravedad
                    </div>
                </div>
            </div>
            
            <div class="technical-specs">
                <h4>💰 Modernización PTAP No. 2</h4>
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-label">Contrato</div>
                        <div class="spec-value">135 de 2021</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Mejora Principal</div>
                        <div class="spec-value">Recambio completo materiales filtrantes</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Incluye</div>
                        <div class="spec-value">Gravas, arena y antracita</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Mejoras Adicionales</div>
                        <div class="spec-value">Recubrimiento epóxico + aireación</div>
                    </div>
                </div>
            </div>
            
            <div class="technical-specs">
                <h4>📊 Parámetros Operativos</h4>
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-label">Velocidad Filtración</div>
                        <div class="spec-value">3-6 gpm/ft²</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">La Pola 1</div>
                        <div class="spec-value">6 filtros x 250 L/s c/u</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Sistema Retrolavado</div>
                        <div class="spec-value">Agua tanque Belén - 160 L/s</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Turbiedad Efluente</div>
                        <div class="spec-value"><0.3 NTU</div>
                    </div>
                </div>
            </div>
            
            <p><strong>🎯 Función:</strong> Sistema Leopold de falso fondo garantiza distribución uniforme del retrolavado. 
            Reducción de 30-60% en tiempo de retrolavado y carreras de filtración >24 horas tras modernización.</p>
        `
    },

    desinfeccion: {
        title: "DESINFECCIÓN Y CONTROL MICROBIOLÓGICO",
        subtitle: "Barrera final contra contaminación microbiológica",
        icon: "☢️",
        content: `
            <div class="animation-container">
                <h4>☢️ Proceso de Desinfección con Cloro Gaseoso</h4>
                <div style="display: flex; justify-content: center; align-items: center; gap: 30px;">
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <div style="font-weight: bold; margin-bottom: 10px;">Inyección Cl₂</div>
                        <div style="width: 60px; height: 60px; background: #ffeb3b; border: 3px solid #f57f17; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5em;">
                            Cl₂
                        </div>
                        <div style="margin-top: 10px; font-size: 0.8em;">0.8-2.0 mg/L</div>
                    </div>
                    <div style="font-size: 2em;">+</div>
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <div style="font-weight: bold; margin-bottom: 10px;">Tiempo Contacto</div>
                        <div style="width: 80px; height: 50px; background: linear-gradient(to right, #e3f2fd, #1976d2); border: 2px solid #1976d2; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                            30 min
                        </div>
                        <div style="margin-top: 10px; font-size: 0.8em;">TC mínimo</div>
                    </div>
                    <div style="font-size: 2em;">=</div>
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <div style="font-weight: bold; margin-bottom: 10px;">Agua Segura</div>
                        <div style="width: 60px; height: 60px; background: #4caf50; border: 3px solid #2e7d32; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2em; color: white;">
                            ✓
                        </div>
                        <div style="margin-top: 10px; font-size: 0.8em;">0 UFC/100mL</div>
                    </div>
                </div>
            </div>
            
            <div class="technical-specs">
                <h4>📊 Parámetros de Desinfección</h4>
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-label">Desinfectante Principal</div>
                        <div class="spec-value">Cloro gaseoso (Cl₂)</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Dosis Aplicada</div>
                        <div class="spec-value">1-3 mg/L desinfección primaria</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Tiempo Contacto</div>
                        <div class="spec-value">Mínimo 30 minutos</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Cloro Residual Red</div>
                        <div class="spec-value">0.5-1.5 mg/L operativo</div>
                    </div>
                </div>
            </div>
            
            <div class="technical-specs">
                <h4>⚙️ Equipamiento de Cloración</h4>
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-label">Clorinadores</div>
                        <div class="spec-value">2 unidades de 450 kg/día</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Capacidad Total</div>
                        <div class="spec-value">900 kg/día combinada</div>
                    </div>
                </div>
            </div>
            
            <p><strong>🎯 Función:</strong> Dos clorinadores de 450 kg/día proporcionan desinfección post-filtración. 
            La modernización de filtros redujo la turbidez de salida, mejorando la eficacia de la desinfección.</p>
        `
    },

    almacenamiento: {
        title: "ALMACENAMIENTO Y REGULACIÓN",
        subtitle: "Sistema de tanques de compensación - 25,000 m³ total",
        icon: "🏪",
        content: `
            <div class="animation-container">
                <h4>🏗️ Sistema de Almacenamiento Estratégico</h4>
                <div style="display: flex; justify-content: center; align-items: end; gap: 20px;">
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <div style="font-weight: bold; margin-bottom: 10px;">Tanque PTAP La Pola</div>
                        <div style="width: 80px; height: 60px; background: linear-gradient(to bottom, #2196f3, #1976d2); border: 3px solid #0d47a1; border-radius: 0 0 10px 10px; position: relative;">
                            <div style="position: absolute; top: -3px; left: -3px; right: -3px; height: 8px; background: #263238; border-radius: 10px 10px 0 0;"></div>
                            <div style="color: white; text-align: center; padding-top: 20px; font-size: 0.7em; font-weight: bold;">15,000 m³</div>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <div style="font-weight: bold; margin-bottom: 10px;">Tanques Elevados</div>
                        <div style="width: 60px; height: 40px; background: linear-gradient(to bottom, #4caf50, #388e3c); border: 3px solid #2e7d32; border-radius: 0 0 10px 10px; position: relative;">
                            <div style="position: absolute; top: -3px; left: -3px; right: -3px; height: 6px; background: #263238; border-radius: 8px 8px 0 0;"></div>
                            <div style="color: white; text-align: center; padding-top: 10px; font-size: 0.6em; font-weight: bold;">10,000 m³</div>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <div style="font-weight: bold; font-size: 1.2em; color: #1976d2;">
                        Capacidad Total: 25,000 m³
                    </div>
                    <div style="margin-top: 10px; color: #666;">
                        Regulación • Compensación • Reserva de Emergencia
                    </div>
                </div>
            </div>
            
            <div class="technical-specs">
                <h4>📊 Especificaciones del Sistema</h4>
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-label">Capacidad Total</div>
                        <div class="spec-value">25,000 m³ distribuidos estratégicamente</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Ubicaciones</div>
                        <div class="spec-value">PTAP + elevaciones estratégicas</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Sistema Control</div>
                        <div class="spec-value">Válvulas control presión/topografía</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Función Principal</div>
                        <div class="spec-value">Regulación y compensación demanda</div>
                    </div>
                </div>
            </div>
            
            <div class="technical-specs">
                <h4>🏭 Control de Calidad</h4>
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-label">Laboratorio</div>
                        <div class="spec-value">Autorizado Res. 229/2024</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Puntos Muestreo</div>
                        <div class="spec-value">30 concertados con Secretaría</div>
                    </div>
                </div>
            </div>
            
            <p><strong>🎯 Función:</strong> Sistema de 13 tanques estratégicamente ubicados proporciona regulación del suministro. 
            Control de calidad mediante laboratorio autorizado con 30 puntos de muestreo concertados.</p>
        `
    },

    distribucion: {
        title: "DISTRIBUCIÓN SECTORIZADA",
        subtitle: "10 distritos hidráulicos - 688.65 km de redes",
        icon: "🏘️",
        content: `
            <div class="technical-specs">
                <h4>📊 Características del Sistema de Distribución</h4>
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-label">Distritos Hidráulicos</div>
                        <div class="spec-value">10 sectores operativos</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Suscriptores Activos</div>
                        <div class="spec-value">180,000 acueducto / 176,000 alcant.</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Barrios Atendidos</div>
                        <div class="spec-value">~500 barrios</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Cobertura IBAL</div>
                        <div class="spec-value">87-90% ambos servicios</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Tanques de Suministro</div>
                        <div class="spec-value">13 tanques distribuidos</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Longitud Redes</div>
                        <div class="spec-value">688.65 km totales</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Continuidad</div>
                        <div class="spec-value">23.5-24 horas diarias promedio</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Restante</div>
                        <div class="spec-value">15% - 32 acueductos comunitarios</div>
                    </div>
                </div>
            </div>
            
            <div class="technical-specs">
                <h4>📊 Calidad del Agua y IRCA</h4>
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-label">IRCA 2023</div>
                        <div class="spec-value">0-0.9% sin riesgo (mayoría meses)</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Episodios Puntuales</div>
                        <div class="spec-value">8.6% marzo, 7.3% noviembre</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Clasificación Agua</div>
                        <div class="spec-value">Apta para consumo humano</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Cumplimiento</div>
                        <div class="spec-value">Frecuencias mínimas Res. 2115/2007</div>
                    </div>
                </div>
            </div>
            
            <p><strong>🎯 Función:</strong> IBAL suministra agua apta para consumo con IRCA <5% salvo episodios puntuales. 
            Control operativo mediante 10 distritos hidráulicos con monitoreo continuo.</p>
            
            <p><strong>⚙️ Control de Calidad:</strong> Laboratorio autorizado ejecuta monitoreo antes, durante y después del tratamiento 
            con muestras diarias en puntos concertados con Secretaría de Salud.</p>
        `
    }
};

// Water sources detailed information
const waterSourcesData = {
    combeima: {
        name: "RÍO COMBEIMA",
        type: "Fuente Principal",
        flow: "1,400-1,500 L/s",
        percentage: "82% del suministro total",
        location: "Vereda Llanitos (bocatoma lateral)",
        vulnerability: "19 cierres registrados en 2022",
        turbidityLimit: ">12,000 NTU (suspensión automática)",
        normalOperation: "<500 NTU, pH 6.5-8.5",
        tributaries: "Las Perlas, Guamal, La Cristalina, La Platica, La Honda",
        details: `🏔️ RÍO COMBEIMA - Fuente Principal
📍 Ubicación: Vereda Llanitos (bocatoma lateral)
💧 Caudal: 1,400-1,500 L/s (82% del suministro total)
⚠️ Vulnerabilidad: 19 cierres registrados en 2022
🌡️ Turbiedad crítica: >12,000 NTU (suspensión automática)
🔄 Operación normal: <500 NTU, pH 6.5-8.5
🌊 Afluentes: Las Perlas, Guamal, La Cristalina, La Platica, La Honda`
    },
    cay: {
        name: "QUEBRADA CAY",
        type: "Fuente Secundaria",
        flow: "600 L/s",
        percentage: "Constante",
        stability: "Menor variabilidad estacional",
        backup: "Funciona durante suspensiones del Combeima",
        operationLimit: "Turbiedad <8,000 NTU",
        reliability: "Alta, pocos cortes por clima",
        details: `🌊 QUEBRADA CAY - Fuente Secundaria
💧 Caudal: 600 L/s constante
✅ Estabilidad: Menor variabilidad estacional
🔄 Respaldo: Funciona durante suspensiones del Combeima
🌡️ Operación: Turbiedad <8,000 NTU
📊 Confiabilidad: Alta, pocos cortes por clima`
    },
    chembe: {
        name: "QUEBRADA CHEMBE",
        type: "Fuente Menor",
        flow: "70 L/s",
        percentage: "Variable",
        vulnerability: "Alta susceptibilidad climática",
        suspensions: "Hasta 40-45 días continuos",
        operationLimit: "Turbiedad >8,000 NTU",
        seasonality: "Muy afectada por temporadas lluviosas",
        details: `💧 QUEBRADA CHEMBE - Fuente Menor
💧 Caudal: 70 L/s variable
⚠️ Vulnerabilidad: Alta susceptibilidad climática
⏰ Suspensiones: Hasta 40-45 días continuos
🌡️ Límite operativo: Turbiedad >8,000 NTU
🌧️ Estacionalidad: Muy afectada por temporadas lluviosas`
    }
};

// Export data for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { processData, waterSourcesData };
}