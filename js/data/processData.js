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
                <h3>🗺️ Mapa Geográfico Interactivo - Región de Ibagué</h3>
                <div class="map-container">
                    <!-- Geographical Features -->
                    <div class="mountains">
                        <div class="mountain-labels">Cordillera Central</div>
                    </div>
                    
                    <!-- Rivers and Streams -->
                    <div class="rivers">
                        <div class="river-combeima"></div>
                        <div class="quebrada-cay"></div>
                        <div class="quebrada-chembe"></div>
                    </div>
                    
                    <!-- City and Plant -->
                    <div class="city-ibague">IBAGUÉ</div>
                    <div class="plant-location" title="PTAP La Pola">🏭</div>
                    
                    <!-- Water Sources -->
                    <div class="water-source source-combeima" data-source="combeima">
                        <div class="source-label">Río Combeima<br>1,500 L/s<br>📍 Vereda Llanitos</div>
                        🏔️
                    </div>
                    <div class="water-source source-cay" data-source="cay">
                        <div class="source-label">Q. Cay<br>600 L/s<br>💧 Fuente estable</div>
                        🌊
                    </div>
                    <div class="water-source source-chembe" data-source="chembe">
                        <div class="source-label">Q. Chembe<br>70 L/s<br>⚠️ Alta variabilidad</div>
                        💧
                    </div>
                </div>
                <div style="margin-top: 15px; font-size: 0.9em; color: #666; text-align: center;">
                    <strong>Leyenda:</strong> 🏔️ Captación principal • 🌊 Fuente secundaria • 💧 Fuente menor • 🏭 PTAP La Pola
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
                    <h4>⚗️ Proceso de Coagulación con Sulfato de Aluminio</h4>
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
                        <div class="spec-value">Sulfato de Aluminio (Al₂(SO₄)₃·18H₂O)</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Dosis Coagulante</div>
                        <div class="spec-value">15-40 mg/L (según turbiedad)</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Ayudante Coagulación</div>
                        <div class="spec-value">Polímeros catiónicos 0.1-0.5 mg/L</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">pH Óptimo</div>
                        <div class="spec-value">6.0 - 7.5</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Tiempo Mezcla Rápida</div>
                        <div class="spec-value">30-60 segundos</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Gradiente Velocidad</div>
                        <div class="spec-value">700-1000 s⁻¹</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">TRH Floculación</div>
                        <div class="spec-value">15-20 minutos</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Sistema Dosificación</div>
                        <div class="spec-value">Bombas peristálticas automáticas</div>
                    </div>
                </div>
            </div>
            
            <div class="technical-specs">
                <h4>🔄 Etapas de Floculación</h4>
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-label">Primera Etapa</div>
                        <div class="spec-value">Gradiente 60-80 s⁻¹</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Segunda Etapa</div>
                        <div class="spec-value">Gradiente 30-50 s⁻¹</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Tercera Etapa</div>
                        <div class="spec-value">Gradiente 15-25 s⁻¹</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Configuración</div>
                        <div class="spec-value">Múltiples cámaras en serie</div>
                    </div>
                </div>
            </div>
            
            <p><strong>🎯 Función:</strong> Desestabiliza partículas coloidales y materia orgánica disuelta mediante 
            neutralización de cargas superficiales, seguido de formación gradual de flóculos con densidad adecuada 
            para sedimentación eficiente.</p>
            
            <p><strong>⚙️ Control:</strong> Dosificación continua ajustada según ensayo de jarras diario y variaciones 
            de turbiedad. Sistema automatizado con sensores de flujo para optimización en tiempo real.</p>
        `
    },

    sedimentacion: {
        title: "SEDIMENTACIÓN DE ALTA EFICIENCIA",
        subtitle: "Tecnología de paneles tipo colmena - Modernización 2023",
        icon: "🏗️",
        content: `
            <div class="animation-container">
                <h4>🏗️ Sistema de Paneles Tipo Colmena</h4>
                <div style="display: flex; justify-content: center; align-items: center; gap: 30px;">
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <div style="font-weight: bold; margin-bottom: 10px;">Configuración Hexagonal</div>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;">
                            ${Array(9).fill().map(() => `
                                <div style="width: 25px; height: 25px; background: #4caf50; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);"></div>
                            `).join('')}
                        </div>
                        <div style="margin-top: 10px; font-size: 0.9em; color: #666;">Láminas inclinadas 60°</div>
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
                        <div class="spec-label">Inversión Total</div>
                        <div class="spec-value">$1,385 millones (2023)</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Tecnología Instalada</div>
                        <div class="spec-value">Paneles tipo colmena</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Configuración</div>
                        <div class="spec-value">Sedimentadores múltiples en paralelo</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Inclinación Láminas</div>
                        <div class="spec-value">60° configuración hexagonal</div>
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
                        <div class="spec-value">2-3 horas</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Material Tubos</div>
                        <div class="spec-value">PVC configuración hexagonal</div>
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
                        <div class="spec-label">Inversión</div>
                        <div class="spec-value">$734 millones</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Mejora Principal</div>
                        <div class="spec-value">Lechos filtrantes con antracita</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Material Antracita</div>
                        <div class="spec-value">Carbón mineral optimizado</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Beneficio</div>
                        <div class="spec-value">Mejora significativa remoción turbiedad</div>
                    </div>
                </div>
            </div>
            
            <div class="technical-specs">
                <h4>📊 Parámetros Operativos</h4>
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-label">Velocidad Filtración</div>
                        <div class="spec-value">120-200 m³/m²/día</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Configuración</div>
                        <div class="spec-value">Múltiples unidades independientes</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Operación</div>
                        <div class="spec-value">Tasa declinante - Flujo ascendente</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Turbiedad Efluente</div>
                        <div class="spec-value"><1.5 NTU</div>
                    </div>
                </div>
            </div>
            
            <p><strong>🎯 Función:</strong> La configuración multicapa permite mayor tiempo de contacto y distribución 
            uniforme del flujo. La antracita como capa superior mejora significativamente la remoción de turbiedad.</p>
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
                        <div class="spec-value">0.8-2.0 mg/L (según demanda)</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Tiempo Contacto</div>
                        <div class="spec-value">Mínimo 30 minutos</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Cloro Residual Red</div>
                        <div class="spec-value">0.3-0.8 mg/L</div>
                    </div>
                </div>
            </div>
            
            <p><strong>🎯 Función:</strong> Representa la barrera final contra contaminación microbiológica, garantizando 
            inactivación efectiva de microorganismos patógenos mediante mantenimiento de cloro residual libre adecuado.</p>
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
            
            <p><strong>🎯 Función:</strong> Proporciona regulación del suministro según variaciones de demanda, 
            compensación durante mantenimientos y reserva estratégica de emergencia.</p>
        `
    },

    distribucion: {
        title: "DISTRIBUCIÓN SECTORIZADA",
        subtitle: "10 distritos hidráulicos - 180,000 suscriptores",
        icon: "🏘️",
        content: `
            <div class="animation-container">
                <h4>🗺️ Red de Distribución por Distritos</h4>
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; max-width: 500px; margin: 0 auto;">
                    ${Array(10).fill().map((_, i) => `
                        <div style="background: linear-gradient(135deg, #ff9a9e, #fecfef); padding: 15px; border-radius: 8px; text-align: center; font-size: 0.8em; font-weight: bold; color: #333;">
                            Distrito ${i + 1}
                            ${i === 0 ? '<div style="font-size: 0.7em; margin-top: 5px;">87 barrios</div>' : 
                              i === 1 ? '<div style="font-size: 0.7em; margin-top: 5px;">Centro-Norte</div>' : ''}
                        </div>
                    `).join('')}
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <div style="font-weight: bold; font-size: 1.2em; color: #1976d2;">
                        Cobertura: 85% Población Ibaguereña
                    </div>
                    <div style="margin-top: 10px; color: #666;">
                        Sistema de "semaforización" según demanda y disponibilidad
                    </div>
                </div>
            </div>
            
            <div class="technical-specs">
                <h4>📊 Características del Sistema</h4>
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-label">Distritos Hidráulicos</div>
                        <div class="spec-value">10 sectores sectorizados</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Suscriptores Activos</div>
                        <div class="spec-value">Más de 180,000</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Cobertura IBAL</div>
                        <div class="spec-value">85% población ibaguereña</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Distribución Restante</div>
                        <div class="spec-value">15% - 32 acueductos comunitarios</div>
                    </div>
                </div>
            </div>
            
            <p><strong>🎯 Función:</strong> La sectorización permite control eficiente del suministro mediante 
            "semaforización" del servicio según demanda y disponibilidad, optimizando presiones según topografía.</p>
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