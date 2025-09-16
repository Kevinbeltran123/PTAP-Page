/**
 * PTAP La Pola - Parameter Simulator Component
 * Real-time simulation of treatment parameters with interactive controls
 * Educational tool for understanding process optimization
 */

class ParameterSimulator {
    constructor() {
        this.parameters = {
            coagulation: {
                aluminumSulfate: { value: 25, min: 15, max: 40, unit: 'mg/L' },
                pH: { value: 6.8, min: 6.0, max: 8.0, unit: '' },
                temperature: { value: 18, min: 12, max: 28, unit: '°C' },
                turbidity: { value: 12, min: 5, max: 50, unit: 'NTU' }
            },
            filtration: {
                flowRate: { value: 180, min: 120, max: 250, unit: 'm³/h' },
                backwashFreq: { value: 24, min: 12, max: 48, unit: 'hours' },
                bedDepth: { value: 80, min: 60, max: 120, unit: 'cm' },
                effluent: { value: 0.8, min: 0.1, max: 2.0, unit: 'NTU' }
            },
            disinfection: {
                chlorineDose: { value: 1.2, min: 0.8, max: 2.0, unit: 'mg/L' },
                contactTime: { value: 30, min: 20, max: 45, unit: 'min' },
                residualChlorine: { value: 0.5, min: 0.2, max: 1.0, unit: 'mg/L' },
                ctValue: { value: 36, min: 16, max: 90, unit: 'mg·min/L' }
            }
        };
        
        this.charts = {};
        this.isSimulating = false;
        this.simulationInterval = null;
        
        this.init();
    }
    
    init() {
        this.createSimulatorInterface();
        this.setupEventListeners();
        this.initializeCharts();
        this.updateAllCalculations();
    }
    
    createSimulatorInterface() {
        const simulatorHTML = `
            <div class="parameter-simulator" id="parameterSimulator">
                <div class="simulator-header">
                    <h3>🧪 Simulador de Parámetros PTAP</h3>
                    <div class="simulator-controls">
                        <button id="startSimulation" class="btn-simulate">
                            <span class="icon">▶️</span> Iniciar Simulación
                        </button>
                        <button id="resetParameters" class="btn-reset">
                            <span class="icon">🔄</span> Restablecer
                        </button>
                        <button id="savePreset" class="btn-save">
                            <span class="icon">💾</span> Guardar
                        </button>
                    </div>
                </div>
                
                <div class="simulator-content">
                    <div class="process-tabs">
                        <button class="tab-button active" data-process="coagulation">Coagulación</button>
                        <button class="tab-button" data-process="filtration">Filtración</button>
                        <button class="tab-button" data-process="disinfection">Desinfección</button>
                    </div>
                    
                    <div class="parameter-panels">
                        ${this.createParameterPanel('coagulation')}
                        ${this.createParameterPanel('filtration')}
                        ${this.createParameterPanel('disinfection')}
                    </div>
                    
                    <div class="simulation-results">
                        <div class="efficiency-display">
                            <div class="efficiency-card">
                                <h4>Eficiencia Global</h4>
                                <div class="efficiency-value" id="globalEfficiency">87.5%</div>
                                <div class="efficiency-indicator" id="efficiencyIndicator"></div>
                            </div>
                            <div class="cost-display">
                                <h4>Costo Operativo</h4>
                                <div class="cost-value" id="operationCost">$2,450/día</div>
                            </div>
                        </div>
                        
                        <div class="charts-container">
                            <canvas id="efficiencyChart" width="400" height="200"></canvas>
                            <canvas id="qualityChart" width="400" height="200"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', simulatorHTML);
    }
    
    createParameterPanel(processType) {
        const parameters = this.parameters[processType];
        const processNames = {
            coagulation: 'Coagulación-Floculación',
            filtration: 'Filtración',
            disinfection: 'Desinfección'
        };
        
        let panelHTML = `
            <div class="parameter-panel" data-process="${processType}" ${processType !== 'coagulation' ? 'style="display:none"' : ''}>
                <h4>${processNames[processType]}</h4>
                <div class="parameters-grid">
        `;
        
        for (const [key, param] of Object.entries(parameters)) {
            const displayName = this.getParameterDisplayName(key);
            panelHTML += `
                <div class="parameter-control">
                    <label for="${processType}_${key}">${displayName}</label>
                    <div class="slider-container">
                        <input type="range" 
                               id="${processType}_${key}" 
                               min="${param.min}" 
                               max="${param.max}" 
                               step="${this.getParameterStep(key)}"
                               value="${param.value}"
                               class="parameter-slider">
                        <div class="value-display">
                            <span id="${processType}_${key}_value">${param.value}</span>
                            <span class="unit">${param.unit}</span>
                        </div>
                    </div>
                    <div class="parameter-impact" id="${processType}_${key}_impact">
                        <div class="impact-bar"></div>
                    </div>
                </div>
            `;
        }
        
        panelHTML += `
                </div>
                <div class="process-efficiency">
                    <div class="efficiency-meter">
                        <div class="meter-fill" id="${processType}_efficiency"></div>
                        <span class="efficiency-text" id="${processType}_efficiency_text">0%</span>
                    </div>
                </div>
            </div>
        `;
        
        return panelHTML;
    }
    
    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.process);
            });
        });
        
        // Parameter sliders
        document.querySelectorAll('.parameter-slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                this.updateParameter(e.target);
            });
        });
        
        // Simulation controls
        document.getElementById('startSimulation').addEventListener('click', () => {
            this.toggleSimulation();
        });
        
        document.getElementById('resetParameters').addEventListener('click', () => {
            this.resetAllParameters();
        });
        
        document.getElementById('savePreset').addEventListener('click', () => {
            this.saveCurrentPreset();
        });
    }
    
    switchTab(processType) {
        // Update tab buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-process="${processType}"]`).classList.add('active');
        
        // Show corresponding panel
        document.querySelectorAll('.parameter-panel').forEach(panel => {
            panel.style.display = 'none';
        });
        document.querySelector(`.parameter-panel[data-process="${processType}"]`).style.display = 'block';
    }
    
    updateParameter(slider) {
        const [processType, paramName] = slider.id.split('_');
        const value = parseFloat(slider.value);
        
        // Update parameter value
        this.parameters[processType][paramName].value = value;
        
        // Update display
        document.getElementById(`${slider.id}_value`).textContent = value;
        
        // Calculate and show impact
        this.updateParameterImpact(processType, paramName, value);
        
        // Update process efficiency
        this.updateProcessEfficiency(processType);
        
        // Update global calculations
        this.updateAllCalculations();
        
        // Update charts
        this.updateCharts();
    }
    
    updateParameterImpact(processType, paramName, value) {
        const param = this.parameters[processType][paramName];
        const normalizedValue = (value - param.min) / (param.max - param.min);
        
        // Calculate optimal range (typically 60-80% of range)
        const optimalMin = 0.3;
        const optimalMax = 0.8;
        
        let impactLevel;
        let impactColor;
        
        if (normalizedValue >= optimalMin && normalizedValue <= optimalMax) {
            impactLevel = 'optimal';
            impactColor = '#4CAF50';
        } else if (normalizedValue < 0.2 || normalizedValue > 0.9) {
            impactLevel = 'critical';
            impactColor = '#f44336';
        } else {
            impactLevel = 'suboptimal';
            impactColor = '#FF9800';
        }
        
        const impactElement = document.getElementById(`${processType}_${paramName}_impact`);
        const impactBar = impactElement.querySelector('.impact-bar');
        impactBar.style.width = `${normalizedValue * 100}%`;
        impactBar.style.backgroundColor = impactColor;
        impactElement.className = `parameter-impact ${impactLevel}`;
    }
    
    updateProcessEfficiency(processType) {
        const parameters = this.parameters[processType];
        let totalEfficiency = 0;
        let paramCount = 0;
        
        for (const [key, param] of Object.entries(parameters)) {
            const normalizedValue = (param.value - param.min) / (param.max - param.min);
            const efficiency = this.calculateParameterEfficiency(processType, key, normalizedValue);
            totalEfficiency += efficiency;
            paramCount++;
        }
        
        const processEfficiency = totalEfficiency / paramCount;
        const efficiencyElement = document.getElementById(`${processType}_efficiency`);
        const textElement = document.getElementById(`${processType}_efficiency_text`);
        
        efficiencyElement.style.width = `${processEfficiency}%`;
        textElement.textContent = `${processEfficiency.toFixed(1)}%`;
        
        // Color coding
        if (processEfficiency >= 85) {
            efficiencyElement.style.backgroundColor = '#4CAF50';
        } else if (processEfficiency >= 70) {
            efficiencyElement.style.backgroundColor = '#FF9800';
        } else {
            efficiencyElement.style.backgroundColor = '#f44336';
        }
    }
    
    calculateParameterEfficiency(processType, paramName, normalizedValue) {
        // Specific efficiency curves for different parameters
        const efficiencyCurves = {
            coagulation: {
                aluminumSulfate: (x) => 100 * (1 - Math.pow(x - 0.6, 2) * 2),
                pH: (x) => 100 * (1 - Math.pow(x - 0.4, 2) * 3),
                temperature: (x) => 90 + 10 * (1 - Math.abs(x - 0.5)),
                turbidity: (x) => 100 * (1 - x * 0.5)
            },
            filtration: {
                flowRate: (x) => 100 * (1 - Math.pow(x - 0.7, 2) * 2),
                backwashFreq: (x) => 85 + 15 * (1 - Math.abs(x - 0.5)),
                bedDepth: (x) => 80 + 20 * x,
                effluent: (x) => 100 * (1 - x)
            },
            disinfection: {
                chlorineDose: (x) => 100 * (1 - Math.pow(x - 0.5, 2) * 2),
                contactTime: (x) => 90 + 10 * x,
                residualChlorine: (x) => 100 * (1 - Math.pow(x - 0.4, 2) * 3),
                ctValue: (x) => 95 + 5 * (1 - Math.abs(x - 0.6))
            }
        };
        
        const curve = efficiencyCurves[processType][paramName];
        return Math.max(0, Math.min(100, curve(normalizedValue)));
    }
    
    updateAllCalculations() {
        const globalEfficiency = this.calculateGlobalEfficiency();
        const operationCost = this.calculateOperationCost();
        
        document.getElementById('globalEfficiency').textContent = `${globalEfficiency.toFixed(1)}%`;
        document.getElementById('operationCost').textContent = `$${operationCost.toLocaleString()}/día`;
        
        this.updateEfficiencyIndicator(globalEfficiency);
    }
    
    calculateGlobalEfficiency() {
        let totalEfficiency = 0;
        let processCount = 0;
        
        for (const processType of Object.keys(this.parameters)) {
            const parameters = this.parameters[processType];
            let processEfficiency = 0;
            let paramCount = 0;
            
            for (const [key, param] of Object.entries(parameters)) {
                const normalizedValue = (param.value - param.min) / (param.max - param.min);
                processEfficiency += this.calculateParameterEfficiency(processType, key, normalizedValue);
                paramCount++;
            }
            
            totalEfficiency += processEfficiency / paramCount;
            processCount++;
        }
        
        return totalEfficiency / processCount;
    }
    
    calculateOperationCost() {
        const coag = this.parameters.coagulation;
        const dis = this.parameters.disinfection;
        const filt = this.parameters.filtration;
        
        // Cost calculations based on chemical consumption and energy
        const aluminumCost = (coag.aluminumSulfate.value * 2100 * 0.45) / 1000; // $/day
        const chlorineCost = (dis.chlorineDose.value * 2100 * 0.85) / 1000; // $/day
        const energyCost = (filt.flowRate.value * 24 * 0.12) / 100; // $/day
        const maintenanceCost = 450; // Fixed daily cost
        
        return aluminumCost + chlorineCost + energyCost + maintenanceCost;
    }
    
    updateEfficiencyIndicator(efficiency) {
        const indicator = document.getElementById('efficiencyIndicator');
        indicator.className = 'efficiency-indicator';
        
        if (efficiency >= 90) {
            indicator.classList.add('excellent');
            indicator.textContent = '🏆 Excelente';
        } else if (efficiency >= 80) {
            indicator.classList.add('good');
            indicator.textContent = '✅ Bueno';
        } else if (efficiency >= 70) {
            indicator.classList.add('fair');
            indicator.textContent = '⚠️ Regular';
        } else {
            indicator.classList.add('poor');
            indicator.textContent = '❌ Deficiente';
        }
    }
    
    initializeCharts() {
        // Simple canvas-based charts for efficiency trends
        this.createEfficiencyChart();
        this.createQualityChart();
    }
    
    createEfficiencyChart() {
        const canvas = document.getElementById('efficiencyChart');
        const ctx = canvas.getContext('2d');
        
        // Chart setup and drawing logic would go here
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Tendencia de Eficiencia', canvas.width / 2, 20);
    }
    
    createQualityChart() {
        const canvas = document.getElementById('qualityChart');
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Calidad de Agua', canvas.width / 2, 20);
    }
    
    updateCharts() {
        // Update chart data with current parameter values
        this.createEfficiencyChart();
        this.createQualityChart();
    }
    
    toggleSimulation() {
        const button = document.getElementById('startSimulation');
        
        if (!this.isSimulating) {
            this.startSimulation();
            button.innerHTML = '<span class="icon">⏸️</span> Pausar Simulación';
            button.classList.add('active');
        } else {
            this.stopSimulation();
            button.innerHTML = '<span class="icon">▶️</span> Iniciar Simulación';
            button.classList.remove('active');
        }
    }
    
    startSimulation() {
        this.isSimulating = true;
        
        this.simulationInterval = setInterval(() => {
            // Simulate realistic parameter fluctuations
            this.simulateParameterChanges();
        }, 2000);
    }
    
    stopSimulation() {
        this.isSimulating = false;
        
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
            this.simulationInterval = null;
        }
    }
    
    simulateParameterChanges() {
        // Simulate realistic variations in parameters
        const variations = {
            'coagulation_turbidity': () => this.parameters.coagulation.turbidity.value + (Math.random() - 0.5) * 4,
            'coagulation_temperature': () => this.parameters.coagulation.temperature.value + (Math.random() - 0.5) * 2,
            'filtration_effluent': () => Math.max(0.1, this.parameters.filtration.effluent.value + (Math.random() - 0.5) * 0.3)
        };
        
        const paramToUpdate = Object.keys(variations)[Math.floor(Math.random() * Object.keys(variations).length)];
        const newValue = variations[paramToUpdate]();
        
        const slider = document.getElementById(paramToUpdate);
        if (slider) {
            const param = this.parameters[paramToUpdate.split('_')[0]][paramToUpdate.split('_')[1]];
            const clampedValue = Math.max(param.min, Math.min(param.max, newValue));
            
            slider.value = clampedValue;
            this.updateParameter(slider);
        }
    }
    
    resetAllParameters() {
        // Reset to optimal values
        const optimalValues = {
            coagulation: {
                aluminumSulfate: 28,
                pH: 6.5,
                temperature: 20,
                turbidity: 8
            },
            filtration: {
                flowRate: 200,
                backwashFreq: 24,
                bedDepth: 90,
                effluent: 0.5
            },
            disinfection: {
                chlorineDose: 1.5,
                contactTime: 35,
                residualChlorine: 0.7,
                ctValue: 52
            }
        };
        
        for (const [processType, parameters] of Object.entries(optimalValues)) {
            for (const [paramName, value] of Object.entries(parameters)) {
                this.parameters[processType][paramName].value = value;
                
                const slider = document.getElementById(`${processType}_${paramName}`);
                if (slider) {
                    slider.value = value;
                    this.updateParameter(slider);
                }
            }
        }
    }
    
    saveCurrentPreset() {
        const preset = {
            name: `Preset_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}`,
            parameters: JSON.parse(JSON.stringify(this.parameters)),
            efficiency: this.calculateGlobalEfficiency(),
            cost: this.calculateOperationCost()
        };
        
        // Save to localStorage
        const savedPresets = JSON.parse(localStorage.getItem('ptap_presets') || '[]');
        savedPresets.push(preset);
        localStorage.setItem('ptap_presets', JSON.stringify(savedPresets));
        
        alert(`✅ Preset guardado: ${preset.name}\nEficiencia: ${preset.efficiency.toFixed(1)}%\nCosto: $${preset.cost.toLocaleString()}/día`);
    }
    
    getParameterDisplayName(key) {
        const names = {
            aluminumSulfate: 'Sulfato de Aluminio',
            pH: 'pH',
            temperature: 'Temperatura',
            turbidity: 'Turbidez Entrada',
            flowRate: 'Caudal',
            backwashFreq: 'Frecuencia Retrolavado',
            bedDepth: 'Profundidad Lecho',
            effluent: 'Turbidez Salida',
            chlorineDose: 'Dosis Cloro',
            contactTime: 'Tiempo Contacto',
            residualChlorine: 'Cloro Residual',
            ctValue: 'Valor CT'
        };
        
        return names[key] || key;
    }
    
    getParameterStep(key) {
        const steps = {
            aluminumSulfate: 1,
            pH: 0.1,
            temperature: 1,
            turbidity: 1,
            flowRate: 5,
            backwashFreq: 1,
            bedDepth: 5,
            effluent: 0.1,
            chlorineDose: 0.1,
            contactTime: 1,
            residualChlorine: 0.1,
            ctValue: 1
        };
        
        return steps[key] || 1;
    }
    
    show() {
        document.getElementById('parameterSimulator').style.display = 'block';
    }
    
    hide() {
        document.getElementById('parameterSimulator').style.display = 'none';
        this.stopSimulation();
    }
}