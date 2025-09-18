/**
 * Virtual Assistant - PTAP La Pola Educational Assistant
 * Hybrid intelligent assistant for water treatment plant queries
 * Author: Kevin Beltrán
 */

class VirtualAssistant {
    constructor() {
        this.isOpen = false;
        this.isTyping = false;
        this.conversationHistory = [];
        this.currentContext = null;
        this.glossaryMode = false;
        
        // Knowledge base with PTAP La Pola data
        this.knowledgeBase = {
            processes: {
                captacion: {
                    name: "Captación",
                    description: "Sistema de captación desde múltiples fuentes hídricas",
                    sources: ["Río Combeima (1,500 L/s)", "Q. Cay (600 L/s)", "Q. Chembe (70 L/s)"],
                    capacity: "2,170 L/s total",
                    keywords: ["captacion", "fuentes", "combeima", "cay", "chembe", "bocatoma"]
                },
                desarenador: {
                    name: "Desarenación",
                    description: "Remoción de sólidos gruesos y material de arrastre",
                    efficiency: ">85% sólidos >0.2 mm",
                    retention: "2-5 minutos",
                    keywords: ["desarenador", "arenas", "solidos", "pretratamiento"]
                },
                coagulacion: {
                    name: "Coagulación-Floculación",
                    description: "Desestabilización y aglomeración de partículas coloidales usando Mackenfloc",
                    chemical: "Mackenfloc (15-40 mg/L)",
                    time: "20-30 minutos",
                    keywords: ["coagulacion", "floculacion", "mackenfloc", "quinsa", "quimicos"]
                },
                sedimentacion: {
                    name: "Sedimentación",
                    description: "Tecnología de paneles tipo colmena",
                    technology: "Paneles tipo colmena",
                    investment: "$1,385 millones (2023)",
                    efficiency: ">90% sólidos suspendidos",
                    keywords: ["sedimentacion", "colmena", "paneles", "clarificacion"]
                },
                filtracion: {
                    name: "Filtración",
                    description: "Sistema multicapa con antracita, arena y grava",
                    layers: ["Antracita (60 cm)", "Arena (40 cm)", "Grava (40 cm)"],
                    investment: "$734 millones",
                    keywords: ["filtracion", "antracita", "arena", "grava", "multimedia"]
                },
                desinfeccion: {
                    name: "Desinfección",
                    description: "Barrera final contra contaminación microbiológica",
                    chemical: "Cloro gaseoso (1-3 mg/L)",
                    contact_time: "30 minutos mínimo",
                    consumption: "450 kg/día x2 cilindros",
                    keywords: ["desinfeccion", "cloro", "microbiologico", "patogenos"]
                },
                almacenamiento: {
                    name: "Almacenamiento",
                    description: "Sistema de tanques de compensación",
                    capacity: "31,400 m³ total",
                    tanks: 13,
                    keywords: ["almacenamiento", "tanques", "reserva", "compensacion"]
                },
                distribucion: {
                    name: "Distribución",
                    description: "10 distritos hidráulicos",
                    districts: 10,
                    subscribers: "179,547 suscriptores",
                    coverage: "87-90% población ibaguereña",
                    keywords: ["distribucion", "distritos", "suscriptores", "cobertura"]
                }
            },
            
            // Normatividad Colombiana
            regulations: {
                resolution_0330: {
                    name: "Resolución 0330 de 2017",
                    entity: "Ministerio de Vivienda, Ciudad y Territorio",
                    description: "Reglamento Técnico para el Sector de Agua Potable y Saneamiento Básico (RAS)",
                    scope: "Establece criterios básicos y requisitos mínimos que deben cumplir los proyectos del sector",
                    application: "Marco normativo que rige el diseño y operación de PTAP La Pola",
                    keywords: ["ras", "resolucion 0330", "normatividad", "diseno", "operacion"]
                },
                decree_1575: {
                    name: "Decreto 1575 de 2007",
                    entity: "Ministerio de Protección Social",
                    description: "Sistema para la Protección y Control de la Calidad del Agua para Consumo Humano",
                    scope: "Establece el sistema de vigilancia y control de calidad del agua",
                    application: "Sistema de vigilancia aplicado por IBAL para garantizar calidad del agua",
                    keywords: ["decreto 1575", "proteccion", "control", "vigilancia", "calidad"]
                },
                resolution_2115: {
                    name: "Resolución 2115 de 2007",
                    entity: "Ministerio de Protección Social y Ministerio de Ambiente",
                    description: "Características, instrumentos básicos y frecuencias del sistema de control y vigilancia",
                    scope: "Define parámetros físicos, químicos y microbiológicos del agua potable",
                    parameters: ["pH: 6.5-9.0", "Turbiedad: <2 NTU", "Cloro residual: 0.3-2.0 mg/L", "Coliformes totales: 0 UFC/100mL"],
                    application: "Parámetros de calidad aplicados en PTAP La Pola para cumplimiento IRCA",
                    keywords: ["resolucion 2115", "parametros", "irca", "calidad", "estandares"]
                }
            },
            
            // Historia y Contexto de IBAL
            ibal_info: {
                history: {
                    name: "Historia de IBAL",
                    foundation: "Empresa Ibaguereña de Acueducto y Alcantarillado",
                    legal_nature: "Sociedad Anónima - Empresa de Servicios Públicos (S.A. E.S.P.)",
                    mission: "Prestación de servicios de acueducto y alcantarillado en Ibagué",
                    coverage_aqueduct: "87-90% ambos servicios en zona urbana",
                    subscribers_total: "179,547 suscriptores de acueducto",
                    keywords: ["ibal", "historia", "empresa", "servicios publicos", "ibague"]
                },
                modernization: {
                    name: "Modernización PTAP La Pola",
                    total_investment: "$2,119 millones",
                    year: "2023-2024",
                    improvements: [
                        "Sedimentadores con módulos hexagonales ($1,385 M)",
                        "Filtros multimedia modernizados ($734 M)",
                        "Sistema de control automatizado",
                        "Optimización hidráulica"
                    ],
                    impact: "Mejora en eficiencia de remoción y estabilidad operativa",
                    keywords: ["modernizacion", "inversion", "mejoras", "eficiencia"]
                },
                quality_control: {
                    name: "Control de Calidad",
                    laboratory: "Laboratorio autorizado por IDEAM",
                    irca_status: "IRCA declarado 0.0% (sin riesgo) mayoría de meses 2023",
                    monitoring: "Monitoreo continuo en 10 distritos hidráulicos",
                    parameters: "Cumplimiento Resolución 2115/2007",
                    certifications: "Laboratorio acreditado para análisis físico-químicos y microbiológicos",
                    keywords: ["laboratorio", "irca", "monitoreo", "calidad", "ideam"]
                }
            },
            
            // Conceptos Técnicos Adicionales
            technical_concepts: {
                water_importance: {
                    name: "Importancia del Tratamiento de Agua",
                    context: "Acceso a agua potable como derecho fundamental en Colombia",
                    health_impact: "Prevención de enfermedades hídricas y mejora de calidad de vida",
                    environmental: "Protección de recursos hídricos y sostenibilidad",
                    economic: "Desarrollo económico y social de comunidades",
                    keywords: ["importancia", "salud", "derecho", "sostenibilidad"]
                },
                irca_system: {
                    name: "Sistema IRCA",
                    full_name: "Índice de Riesgo de la Calidad del Agua",
                    classification: [
                        "Sin riesgo: 0-5%",
                        "Riesgo bajo: 5.1-14%", 
                        "Riesgo medio: 14.1-35%",
                        "Riesgo alto: 35.1-80%",
                        "Riesgo inviable: 80.1-100%"
                    ],
                    ptap_status: "PTAP La Pola mantiene 0-0.9% (sin riesgo) en mayoría de meses",
                    keywords: ["irca", "riesgo", "clasificacion", "calidad", "indice"]
                },
                hexagonal_modules: {
                    name: "Módulos Hexagonales de Sedimentación",
                    technology: "Polipropileno de alta densidad",
                    function: "Incremento del área superficial específica",
                    benefits: ["Mayor eficiencia de sedimentación", "Reducción de tiempo de retención", "Optimización de espacio"],
                    investment_year: "2023 - $1,385 millones",
                    keywords: ["hexagonales", "sedimentacion", "polipropileno", "eficiencia"]
                }
            },
            
            tanks: [
                {id: 1, name: "Tanque de Belén", capacity: 3000, location: "Calle 2ª con Carrera 3ª"},
                {id: 2, name: "Tanque Ciudad", capacity: 3000, location: "Calle 2ª con Carrera 3ª"},
                {id: 3, name: "Tanque de Belén - La Aurora", capacity: 1500, location: "Altos Barrio Augusto E. Medina"},
                {id: 4, name: "Tanque de Cerrogordo", capacity: 2000, location: "Cerrogordo (Barrio Cerrogordo)"},
                {id: 5, name: "Tanque de La 15", capacity: 4000, location: "Calle 15 Carrera 6ª y 7ª"},
                {id: 6, name: "Tanque de Interlaken", capacity: 500, location: "Carrera 7ª A Calle 16"},
                {id: 7, name: "Tanque de La 29", capacity: 4000, location: "Calle 29 Carrera 4D"},
                {id: 8, name: "Tanque de La 30", capacity: 2000, location: "Calle 30 Carrera 4D"},
                {id: 9, name: "Tanque de Piedrapintada", capacity: 5000, location: "Carrera 5ª Calle 47"},
                {id: 10, name: "Tanque La Alsacia (El Salado)", capacity: 1000, location: "Hacienda La Alsacia sector de El Salado"},
                {id: 11, name: "Tanque Mirolindo", capacity: 1000, location: "Vía Ibagué - Bogotá calzada izquierda sector de Mirolindo"},
                {id: 12, name: "Tanque Picaleña", capacity: 1400, location: "Vía Ibagué - Bogotá calzada izquierda sector de Club Campestre"},
                {id: 13, name: "Tanque de Ambalá", capacity: 10000, location: "Sector Hacienda El Vergel"}
            ],
            
            districts: [
                {code: "DH1", subscribers: 10565, name: "Centro - Belén"},
                {code: "DH2", subscribers: 7882, name: "Ancón - Malabar"},
                {code: "DH3", subscribers: 11948, name: "Norte - Calambeo"},
                {code: "DH4", subscribers: 10422, name: "Occidente - San Simón"},
                {code: "DH5", subscribers: 20502, name: "Comfenalco - Santa Rita"},
                {code: "DH6", subscribers: 46866, name: "Principal - Jordán"},
                {code: "DH7", subscribers: 24305, name: "Montecarlo - El Vergel"},
                {code: "DH8", subscribers: 18359, name: "Los Tunjos - Comuna 8"},
                {code: "DH9", subscribers: 6795, name: "Picaleña - Sur"},
                {code: "DH10", subscribers: 21903, name: "Ciudadela Simón Bolívar"}
            ],
            
            // Predefined responses for common questions
            responses: {
                greeting: [
                    "¡Hola! Soy el asistente virtual de PTAP La Pola. ¿En qué puedo ayudarte hoy?",
                    "¡Bienvenido! Estoy aquí para responder tus preguntas sobre el tratamiento de agua en IBAL.",
                    "¡Hola! Soy tu guía para conocer todo sobre la Planta de Tratamiento La Pola."
                ],
                help: [
                    "Puedo ayudarte con:\n• Información sobre procesos de tratamiento\n• Datos de tanques y capacidades\n• Estadísticas de distritos hidráulicos\n• 📚 Glosario técnico especializado\n• 📋 Normatividad colombiana (RAS, IRCA, etc.)\n• 🏢 Historia y modernización de IBAL\n• 💧 Importancia del tratamiento de agua\n• Explicaciones técnicas\n\n💡 Tip: Escribe '/glosario' para explorar términos técnicos",
                    "Pregúntame sobre cualquier proceso de la PTAP, normatividad colombiana, historia de IBAL, modernización, capacidades de tanques, distritos hidráulicos o términos técnicos específicos.\n\n📖 ¿Sabías que tengo información completa sobre las regulaciones colombianas? Prueba preguntando sobre la Resolución 0330 o el sistema IRCA."
                ],
                unknown: [
                    "No estoy seguro de esa información específica. ¿Podrías reformular tu pregunta?\n\n💡 Prueba estas sugerencias:\n📋 Normatividad: \"¿Qué es el RAS?\"\n🏢 IBAL: \"Historia de IBAL\"\n💧 Procesos: \"¿Cómo funciona la coagulación?\"\n🧪 Calidad: \"¿Qué es el IRCA?\"\n🏗️ Infraestructura: \"Muéstrame los tanques\"",
                    "Hmm, no tengo esa información exacta. Aquí tienes algunas sugerencias:\n\n• \"Háblame sobre la normatividad\"\n• \"¿Cuál es la historia de IBAL?\"\n• \"¿Qué son los módulos hexagonales?\"\n• \"Parámetros de calidad del agua\"\n• \"¿Cuántos distritos hidráulicos hay?\"\n• \"/glosario [término técnico]\"",
                    "No encontré información sobre eso. ¿Te interesa alguno de estos temas?\n\n🔹 Marco normativo colombiano\n🔹 Modernización de PTAP La Pola\n🔹 Procesos de tratamiento\n🔹 Control de calidad (IRCA)\n🔹 Sistema de distribución\n🔹 Glosario técnico especializado"
                ]
            }
        };
        
        this.init();
    }
    
    init() {
        this.createAssistantUI();
        this.attachEventListeners();
    }
    
    createAssistantUI() {
        // Create floating assistant button
        const assistantButton = document.createElement('button');
        assistantButton.id = 'assistantButton';
        assistantButton.className = 'assistant-button';
        assistantButton.innerHTML = '🤖';
        assistantButton.title = 'Asistente Virtual PTAP';
        
        // Create chat window
        const chatWindow = document.createElement('div');
        chatWindow.id = 'assistantChat';
        chatWindow.className = 'assistant-chat';
        chatWindow.innerHTML = `
            <div class="chat-header">
                <div class="assistant-info">
                    <div class="assistant-avatar">🤖</div>
                    <div class="assistant-details">
                        <h4>Asistente PTAP La Pola</h4>
                        <span class="status">En línea</span>
                    </div>
                </div>
                <button class="chat-close" id="chatClose">×</button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="message assistant-message">
                    <div class="message-content">
                        ¡Hola! Soy el asistente virtual de PTAP La Pola. ¿En qué puedo ayudarte hoy?
                    </div>
                    <div class="message-time">${this.getCurrentTime()}</div>
                </div>
            </div>
            <div class="chat-input-container">
                <div class="quick-actions">
                    <button class="quick-btn" data-query="¿Cómo funciona la coagulación?">Procesos</button>
                    <button class="quick-btn" data-query="Háblame sobre la normatividad">📋 Normativa</button>
                    <button class="quick-btn" data-query="Historia de IBAL">🏢 IBAL</button>
                    <button class="quick-btn" data-query="/glosario">📚 Glosario</button>
                </div>
                <div class="input-area">
                    <input type="text" id="chatInput" placeholder="Escribe tu pregunta aquí..." maxlength="200">
                    <button id="sendMessage" class="send-btn">📨</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(assistantButton);
        document.body.appendChild(chatWindow);
    }
    
    attachEventListeners() {
        // Toggle chat window
        document.getElementById('assistantButton').addEventListener('click', () => {
            this.toggleChat();
        });
        
        // Close chat
        document.getElementById('chatClose').addEventListener('click', () => {
            this.closeChat();
        });
        
        // Send message
        document.getElementById('sendMessage').addEventListener('click', () => {
            this.sendMessage();
        });
        
        // Enter key to send
        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Quick action buttons
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const query = e.target.dataset.query;
                this.processQuery(query);
                document.getElementById('chatInput').value = '';
            });
        });
    }
    
    toggleChat() {
        const chatWindow = document.getElementById('assistantChat');
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            chatWindow.style.display = 'flex';
            setTimeout(() => {
                chatWindow.classList.add('open');
                document.getElementById('chatInput').focus();
            }, 10);
        } else {
            this.closeChat();
        }
    }
    
    closeChat() {
        const chatWindow = document.getElementById('assistantChat');
        chatWindow.classList.remove('open');
        setTimeout(() => {
            chatWindow.style.display = 'none';
        }, 300);
        this.isOpen = false;
    }
    
    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (message) {
            this.addUserMessage(message);
            this.processQuery(message);
            input.value = '';
        }
    }
    
    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">${this.getCurrentTime()}</div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addAssistantMessage(message, isTyping = true, showSuggestions = false) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message assistant-message';
        
        if (isTyping) {
            messageDiv.innerHTML = `
                <div class="message-content typing">
                    <div class="typing-indicator">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            `;
            messagesContainer.appendChild(messageDiv);
            this.scrollToBottom();
            
            // Simulate typing delay
            setTimeout(() => {
                const content = this.formatMessageWithSuggestions(message);
                messageDiv.innerHTML = `
                    <div class="message-content">${content}</div>
                    <div class="message-time">${this.getCurrentTime()}</div>
                `;
                
                // Add click listeners for suggestion buttons
                this.attachSuggestionListeners(messageDiv);
                this.scrollToBottom();
            }, 1000 + Math.random() * 1000);
        } else {
            const content = this.formatMessageWithSuggestions(message);
            messageDiv.innerHTML = `
                <div class="message-content">${content}</div>
                <div class="message-time">${this.getCurrentTime()}</div>
            `;
            messagesContainer.appendChild(messageDiv);
            
            // Add click listeners for suggestion buttons
            this.attachSuggestionListeners(messageDiv);
            this.scrollToBottom();
        }
    }
    
    formatMessageWithSuggestions(message) {
        // Check if message contains suggestions and convert them to clickable buttons
        if (message.includes('💡 Sugerencias sobre') || message.includes('💡 Prueba estas sugerencias')) {
            return this.addSuggestionButtons(message);
        }
        return message;
    }
    
    addSuggestionButtons(message) {
        // Extract suggestions in quotes and make them clickable
        let formattedMessage = message;
        
        // Find suggestions in quotes and replace with buttons
        const suggestionRegex = /"([^"]+)"/g;
        let match;
        const suggestions = [];
        
        while ((match = suggestionRegex.exec(message)) !== null) {
            suggestions.push(match[1]);
        }
        
        if (suggestions.length > 0) {
            formattedMessage += '\n\n<div class="suggestion-buttons">';
            suggestions.forEach((suggestion, index) => {
                formattedMessage += `<button class="suggestion-btn" data-suggestion="${suggestion}" style="
                    margin: 2px;
                    padding: 4px 8px;
                    background: #e3f2fd;
                    border: 1px solid #2196f3;
                    border-radius: 12px;
                    color: #1976d2;
                    font-size: 11px;
                    cursor: pointer;
                    display: inline-block;
                ">${suggestion}</button>`;
            });
            formattedMessage += '</div>';
        }
        
        return formattedMessage;
    }
    
    attachSuggestionListeners(messageDiv) {
        const suggestionBtns = messageDiv.querySelectorAll('.suggestion-btn');
        suggestionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const suggestion = e.target.dataset.suggestion;
                document.getElementById('chatInput').value = suggestion;
                this.sendMessage();
            });
        });
    }
    
    processQuery(query) {
        const normalizedQuery = query.toLowerCase();
        let response = "";
        
        // Command detection (starts with /)
        if (query.startsWith('/')) {
            response = this.handleCommand(query);
        }
        // Glossary mode queries
        else if (this.glossaryMode) {
            response = this.handleGlossaryQuery(query);
        }
        // Greeting detection
        else if (this.matchesKeywords(normalizedQuery, ['hola', 'hello', 'hi', 'buenos', 'buenas'])) {
            response = this.getRandomResponse('greeting');
        }
        // Help requests
        else if (this.matchesKeywords(normalizedQuery, ['ayuda', 'help', 'que puedes', 'como funciona'])) {
            response = this.getRandomResponse('help');
        }
        // Process-specific queries (prioritize over glossary)
        else if (this.matchesKeywords(normalizedQuery, ['captacion', 'fuentes', 'combeima', 'cay', 'chembe'])) {
            response = this.getProcessInfo('captacion');
        }
        else if (this.matchesKeywords(normalizedQuery, ['desarenador', 'arenas', 'pretratamiento'])) {
            response = this.getProcessInfo('desarenador');
        }
        else if (this.matchesKeywords(normalizedQuery, ['coagulacion', 'floculacion', 'mackenfloc', 'quinsa'])) {
            response = this.getProcessInfo('coagulacion');
        }
        else if (this.matchesKeywords(normalizedQuery, ['sedimentacion', 'colmena', 'paneles'])) {
            response = this.getProcessInfo('sedimentacion');
        }
        else if (this.matchesKeywords(normalizedQuery, ['filtracion', 'antracita', 'arena', 'grava'])) {
            response = this.getProcessInfo('filtracion');
        }
        else if (this.matchesKeywords(normalizedQuery, ['desinfeccion', 'cloro', 'microbiologico'])) {
            response = this.getProcessInfo('desinfeccion');
        }
        else if (this.matchesKeywords(normalizedQuery, ['almacenamiento', 'tanques', 'reserva'])) {
            response = this.getTanksInfo();
        }
        else if (this.matchesKeywords(normalizedQuery, ['distribucion', 'distritos', 'suscriptores'])) {
            response = this.getDistrictsInfo();
        }
        // Specific tank queries
        else if (this.matchesKeywords(normalizedQuery, ['tanque', 'capacidad', 'ubicacion'])) {
            response = this.searchTanks(normalizedQuery);
        }
        // District queries
        else if (this.matchesKeywords(normalizedQuery, ['distrito', 'dh1', 'dh2', 'dh3', 'dh4', 'dh5', 'dh6', 'dh7', 'dh8', 'dh9', 'dh10'])) {
            response = this.searchDistricts(normalizedQuery);
        }
        // Normatividad queries
        else if (this.matchesKeywords(normalizedQuery, ['normatividad', 'normativa', 'regulacion', 'ras', 'resolucion', 'decreto', 'que es el ras', 'que es ras'])) {
            response = this.getRegulationInfo(normalizedQuery);
        }
        // IBAL history and modernization
        else if (this.matchesKeywords(normalizedQuery, ['ibal', 'historia', 'empresa', 'modernizacion', 'inversion'])) {
            response = this.getIBALInfo(normalizedQuery);
        }
        // Water treatment importance
        else if (this.matchesKeywords(normalizedQuery, ['importancia', 'por que', 'derecho', 'salud', 'agua potable'])) {
            response = this.getWaterImportanceInfo();
        }
        // IRCA system
        else if (this.matchesKeywords(normalizedQuery, ['irca', 'indice', 'riesgo', 'calidad'])) {
            response = this.getIRCAInfo();
        }
        // Calculation queries
        else if (this.matchesKeywords(normalizedQuery, ['total', 'suma', 'cuanto', 'cuantos'])) {
            response = this.handleCalculations(normalizedQuery);
        }
        // Glossary search (only if no specific match found)
        else if (this.detectTechnicalTerm(normalizedQuery)) {
            response = this.searchGlossaryTerm(normalizedQuery);
        }
        // Default response
        else {
            response = this.getRandomResponse('unknown');
        }
        
        this.addAssistantMessage(response);
    }
    
    getProcessInfo(processKey) {
        const process = this.knowledgeBase.processes[processKey];
        let info = `<strong>💧 ${process.name}</strong>\n\n`;
        info += `${process.description}\n\n`;
        
        if (process.sources) {
            info += `<strong>Fuentes:</strong>\n${process.sources.join('\n')}\n\n`;
        }
        if (process.chemical) {
            info += `<strong>Químico:</strong> ${process.chemical}\n`;
        }
        if (process.efficiency) {
            info += `<strong>Eficiencia:</strong> ${process.efficiency}\n`;
        }
        if (process.time || process.retention) {
            info += `<strong>Tiempo:</strong> ${process.time || process.retention}\n`;
        }
        if (process.investment) {
            info += `<strong>Inversión:</strong> ${process.investment}\n`;
        }
        if (process.capacity) {
            info += `<strong>Capacidad:</strong> ${process.capacity}`;
        }
        if (process.consumption) {
            info += `<strong>Consumo:</strong> ${process.consumption}`;
        }
        
        return info;
    }
    
    getTanksInfo() {
        const totalCapacity = this.knowledgeBase.tanks.reduce((sum, tank) => sum + tank.capacity, 0);
        const largestTank = this.knowledgeBase.tanks.reduce((max, tank) => tank.capacity > max.capacity ? tank : max);
        
        let info = `<strong>🏪 Sistema de Almacenamiento IBAL</strong>\n\n`;
        info += `<strong>Tanques totales:</strong> ${this.knowledgeBase.tanks.length}\n`;
        info += `<strong>Capacidad total:</strong> ${totalCapacity.toLocaleString()} m³\n`;
        info += `<strong>Tanque más grande:</strong> ${largestTank.name} (${largestTank.capacity.toLocaleString()} m³)\n\n`;
        info += `¿Te interesa información específica de algún tanque?`;
        
        return info;
    }
    
    getDistrictsInfo() {
        const totalSubscribers = this.knowledgeBase.districts.reduce((sum, district) => sum + district.subscribers, 0);
        const largestDistrict = this.knowledgeBase.districts.reduce((max, district) => district.subscribers > max.subscribers ? district : max);
        
        let info = `<strong>🏘️ Distritos Hidráulicos IBAL</strong>\n\n`;
        info += `<strong>Total distritos:</strong> ${this.knowledgeBase.districts.length}\n`;
        info += `<strong>Suscriptores totales:</strong> ${totalSubscribers.toLocaleString()}\n`;
        info += `<strong>Distrito más grande:</strong> ${largestDistrict.code} - ${largestDistrict.name} (${largestDistrict.subscribers.toLocaleString()} suscriptores)\n\n`;
        info += `¿Quieres información específica de algún distrito?`;
        
        return info;
    }
    
    searchTanks(query) {
        const matches = this.knowledgeBase.tanks.filter(tank => {
            return tank.name.toLowerCase().includes(query) || 
                   tank.location.toLowerCase().includes(query) ||
                   query.includes(tank.id.toString());
        });
        
        if (matches.length > 0) {
            let info = `<strong>🔍 Tanques encontrados:</strong>\n\n`;
            matches.forEach(tank => {
                info += `<strong>${tank.name}</strong>\n`;
                info += `Capacidad: ${tank.capacity.toLocaleString()} m³\n`;
                info += `Ubicación: ${tank.location}\n\n`;
            });
            return info;
        }
        
        return "No encontré tanques con esa descripción. ¿Podrías ser más específico?";
    }
    
    searchDistricts(query) {
        const matches = this.knowledgeBase.districts.filter(district => {
            return district.code.toLowerCase().includes(query) || 
                   district.name.toLowerCase().includes(query);
        });
        
        if (matches.length > 0) {
            let info = `<strong>🔍 Distritos encontrados:</strong>\n\n`;
            matches.forEach(district => {
                const percentage = ((district.subscribers / 179547) * 100).toFixed(1);
                info += `<strong>${district.code} - ${district.name}</strong>\n`;
                info += `Suscriptores: ${district.subscribers.toLocaleString()} (${percentage}%)\n\n`;
            });
            return info;
        }
        
        return "No encontré distritos con esa descripción. Los distritos van del DH1 al DH10.";
    }
    
    handleCalculations(query) {
        if (this.matchesKeywords(query, ['tanques', 'almacenamiento', 'capacidad'])) {
            const total = this.knowledgeBase.tanks.reduce((sum, tank) => sum + tank.capacity, 0);
            return `<strong>📊 Capacidad total de almacenamiento:</strong> ${total.toLocaleString()} m³`;
        }
        
        if (this.matchesKeywords(query, ['suscriptores', 'usuarios', 'distritos'])) {
            const total = this.knowledgeBase.districts.reduce((sum, district) => sum + district.subscribers, 0);
            return `<strong>📊 Total de suscriptores:</strong> ${total.toLocaleString()}`;
        }
        
        if (this.matchesKeywords(query, ['procesos', 'etapas'])) {
            return `<strong>📊 Total de procesos principales:</strong> 8 etapas\n(Captación, Desarenación, Coagulación, Sedimentación, Filtración, Desinfección, Almacenamiento, Distribución)`;
        }
        
        return "¿Qué te gustaría calcular? Puedo sumar capacidades de tanques, suscriptores, o contar procesos.";
    }
    
    // NEW METHODS FOR REGULATIONS AND IBAL INFO
    
    getRegulationInfo(query) {
        const normalizedQuery = query.toLowerCase();
        
        // Specific regulation queries
        if (this.matchesKeywords(normalizedQuery, ['0330', 'ras', 'reglamento técnico'])) {
            return this.formatRegulationInfo('resolution_0330');
        }
        else if (this.matchesKeywords(normalizedQuery, ['1575', 'protección', 'sistema'])) {
            return this.formatRegulationInfo('decree_1575');
        }
        else if (this.matchesKeywords(normalizedQuery, ['2115', 'características', 'parámetros'])) {
            return this.formatRegulationInfo('resolution_2115');
        }
        
        // General normatividad overview
        let info = `<strong>📋 Marco Normativo Colombiano - Agua Potable</strong>\n\n`;
        info += `Colombia cuenta con un robusto marco normativo para garantizar la calidad del agua potable:\n\n`;
        
        info += `<strong>🔹 Resolución 0330 de 2017 (RAS)</strong>\n`;
        info += `Ministerio de Vivienda - Reglamento Técnico del Sector\n\n`;
        
        info += `<strong>🔹 Decreto 1575 de 2007</strong>\n`;
        info += `Sistema de Protección y Control de Calidad\n\n`;
        
        info += `<strong>🔹 Resolución 2115 de 2007</strong>\n`;
        info += `Parámetros y frecuencias de vigilancia\n\n`;
        
        info += `💡 Pregunta por una norma específica para obtener detalles completos.`;
        
        return info;
    }
    
    formatRegulationInfo(regulationKey) {
        const reg = this.knowledgeBase.regulations[regulationKey];
        
        let info = `<strong>📋 ${reg.name}</strong>\n`;
        info += `<em>Entidad: ${reg.entity}</em>\n\n`;
        info += `<strong>Descripción:</strong>\n${reg.description}\n\n`;
        info += `<strong>Alcance:</strong>\n${reg.scope}\n\n`;
        
        if (reg.parameters) {
            info += `<strong>Parámetros principales:</strong>\n`;
            reg.parameters.forEach(param => {
                info += `• ${param}\n`;
            });
            info += `\n`;
        }
        
        info += `<strong>🏭 Aplicación en PTAP La Pola:</strong>\n${reg.application}`;
        
        return info;
    }
    
    getIBALInfo(query) {
        const normalizedQuery = query.toLowerCase();
        
        // Specific IBAL queries
        if (this.matchesKeywords(normalizedQuery, ['modernizacion', 'inversion', 'mejoras'])) {
            return this.getModernizationInfo();
        }
        else if (this.matchesKeywords(normalizedQuery, ['laboratorio', 'control', 'calidad', 'ideam'])) {
            return this.getQualityControlInfo();
        }
        
        // General IBAL info
        const ibal = this.knowledgeBase.ibal_info.history;
        
        let info = `<strong>🏢 ${ibal.name}</strong>\n\n`;
        info += `<strong>Razón Social:</strong> ${ibal.foundation}\n`;
        info += `<strong>Naturaleza Jurídica:</strong> ${ibal.legal_nature}\n\n`;
        info += `<strong>Misión:</strong>\n${ibal.mission}\n\n`;
        info += `<strong>📊 Indicadores Clave:</strong>\n`;
        info += `• Cobertura: ${ibal.coverage_aqueduct}\n`;
        info += `• Suscriptores: ${ibal.subscribers_total}\n\n`;
        info += `💡 Pregunta sobre "modernización" o "control de calidad" para más detalles específicos.`;
        
        return info;
    }
    
    getModernizationInfo() {
        const mod = this.knowledgeBase.ibal_info.modernization;
        
        let info = `<strong>🚀 ${mod.name}</strong>\n\n`;
        info += `<strong>Período:</strong> ${mod.year}\n`;
        info += `<strong>Inversión Total:</strong> ${mod.total_investment}\n\n`;
        info += `<strong>Mejoras Implementadas:</strong>\n`;
        mod.improvements.forEach(improvement => {
            info += `• ${improvement}\n`;
        });
        info += `\n<strong>Impacto:</strong>\n${mod.impact}\n\n`;
        
        // Add hexagonal modules detail
        const hex = this.knowledgeBase.technical_concepts.hexagonal_modules;
        info += `<strong>🔹 Detalle Módulos Hexagonales:</strong>\n`;
        info += `• Material: ${hex.technology}\n`;
        info += `• Función: ${hex.function}\n`;
        info += `• Inversión: ${hex.investment_year}`;
        
        return info;
    }
    
    getQualityControlInfo() {
        const qc = this.knowledgeBase.ibal_info.quality_control;
        
        let info = `<strong>🔬 ${qc.name}</strong>\n\n`;
        info += `<strong>Laboratorio:</strong> ${qc.laboratory}\n`;
        info += `<strong>Certificaciones:</strong> ${qc.certifications}\n\n`;
        info += `<strong>Estado IRCA:</strong>\n${qc.irca_status}\n\n`;
        info += `<strong>Monitoreo:</strong> ${qc.monitoring}\n`;
        info += `<strong>Cumplimiento:</strong> ${qc.parameters}`;
        
        return info;
    }
    
    getWaterImportanceInfo() {
        const importance = this.knowledgeBase.technical_concepts.water_importance;
        
        let info = `<strong>💧 ${importance.name}</strong>\n\n`;
        info += `<strong>Contexto Legal:</strong>\n${importance.context}\n\n`;
        info += `<strong>🏥 Impacto en Salud:</strong>\n${importance.health_impact}\n\n`;
        info += `<strong>🌱 Impacto Ambiental:</strong>\n${importance.environmental}\n\n`;
        info += `<strong>💰 Impacto Económico:</strong>\n${importance.economic}\n\n`;
        info += `En Colombia, el acceso a agua potable es un derecho fundamental constitucional, y empresas como IBAL garantizan este derecho a través de sistemas como PTAP La Pola.`;
        
        return info;
    }
    
    getIRCAInfo() {
        const irca = this.knowledgeBase.technical_concepts.irca_system;
        
        let info = `<strong>📊 ${irca.name}</strong>\n`;
        info += `<em>${irca.full_name}</em>\n\n`;
        info += `<strong>Clasificación del Riesgo:</strong>\n`;
        irca.classification.forEach(level => {
            info += `• ${level}\n`;
        });
        info += `\n<strong>🏭 Estado PTAP La Pola:</strong>\n${irca.ptap_status}\n\n`;
        info += `El IRCA es una herramienta fundamental para evaluar la calidad del agua suministrada a la población, establecida por la Resolución 2115 de 2007.`;
        
        return info;
    }
    
    matchesKeywords(query, keywords) {
        return keywords.some(keyword => query.includes(keyword.toLowerCase()));
    }
    
    getRandomResponse(type) {
        const responses = this.knowledgeBase.responses[type];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    getCurrentTime() {
        return new Date().toLocaleTimeString('es-CO', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
    
    scrollToBottom() {
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Glossary Methods
    handleCommand(command) {
        const parts = command.toLowerCase().split(' ');
        const cmd = parts[0];
        const args = parts.slice(1).join(' ');
        
        switch (cmd) {
            case '/glosario':
                if (args) {
                    return this.searchGlossaryTerm(args);
                } else {
                    return this.showGlossaryMenu();
                }
            case '/categorias':
                return this.showGlossaryCategories();
            case '/salir':
                this.glossaryMode = false;
                return "📚 Has salido del modo glosario. ¿En qué más puedo ayudarte?";
            case '/help':
            case '/ayuda':
                return this.getGlossaryHelp();
            default:
                return `❓ Comando no reconocido: ${cmd}\n\nComandos disponibles:\n• /glosario [término] - Buscar término específico\n• /categorias - Ver categorías disponibles\n• /ayuda - Ayuda del glosario\n• /salir - Salir del modo glosario`;
        }
    }
    
    handleGlossaryQuery(query) {
        if (query.toLowerCase() === 'salir' || query.toLowerCase() === 'exit') {
            this.glossaryMode = false;
            return "📚 Has salido del modo glosario. ¿En qué más puedo ayudarte?";
        }
        
        return this.searchGlossaryTerm(query);
    }
    
    showGlossaryMenu() {
        this.glossaryMode = true;
        let menu = `<strong>📚 Glosario Técnico PTAP La Pola</strong>\n\n`;
        menu += `¡Bienvenido al glosario técnico! Aquí encontrarás definiciones especializadas sobre tratamiento de agua.\n\n`;
        menu += `<strong>🔍 Cómo usar:</strong>\n`;
        menu += `• Escribe cualquier término técnico\n`;
        menu += `• Usa /glosario [término] para buscar\n`;
        menu += `• Escribe /categorias para ver temas\n`;
        menu += `• Escribe "salir" para volver al modo normal\n\n`;
        menu += `<strong>💡 Términos populares:</strong>\n`;
        menu += `• Coagulación\n• Turbiedad\n• Paneles colmena\n• Cloro residual\n• IRCA\n• Macromedidor\n\n`;
        menu += `¿Qué término te gustaría consultar?`;
        
        return menu;
    }
    
    showGlossaryCategories() {
        if (typeof glossaryCategories === 'undefined') {
            return "📚 Categorías del glosario:\n\n• Captación\n• Pretratamiento\n• Tratamiento Químico\n• Separación Física\n• Hidráulica\n• Calidad del Agua\n• Distribución\n• Almacenamiento\n\n¿Qué categoría te interesa?";
        }
        
        let categories = `<strong>📂 Categorías del Glosario Técnico</strong>\n\n`;
        Object.entries(glossaryCategories).forEach(([key, category]) => {
            categories += `${category.icon} <strong>${key}</strong>\n${category.description}\n\n`;
        });
        categories += `Escribe el nombre de una categoría o un término específico para obtener más información.`;
        
        return categories;
    }
    
    searchGlossaryTerm(query) {
        // Load glossary if available
        if (typeof technicalGlossary === 'undefined') {
            return this.searchLocalGlossary(query);
        }
        
        const results = this.performGlossarySearch(query);
        
        if (results.length === 0) {
            return this.getSuggestionsForQuery(query);
        }
        
        if (results.length === 1) {
            return this.formatGlossaryEntry(results[0]);
        }
        
        // Multiple results
        let response = `🔍 Encontré ${results.length} términos relacionados con "${query}":\n\n`;
        results.slice(0, 3).forEach((term, index) => {
            response += `${index + 1}. <strong>${term.term}</strong> (${term.category})\n`;
            response += `${term.definition.substring(0, 100)}...\n\n`;
        });
        
        if (results.length > 3) {
            response += `... y ${results.length - 3} términos más.\n\n`;
        }
        
        response += `💡 Escribe el nombre exacto del término para ver la definición completa.`;
        return response;
    }
    
    searchLocalGlossary(query) {
        // Fallback local glossary when external file not loaded
        const localTerms = {
            "turbiedad": "Medida de la claridad del agua, expresada por la cantidad de partículas suspendidas. En PTAP La Pola, valores >12,000 NTU activan suspensión automática.",
            "coagulacion": "Proceso de desestabilización de partículas coloidales mediante Mackenfloc (15-40 mg/L) en PTAP La Pola.",
            "mackenfloc": "Coagulante y clarificante químico líquido desarrollado por Quinsa para tratamiento de aguas potables y residuales. Dosis 15-40 mg/L en PTAP La Pola.",
            "ph": "Medida de acidez o alcalinidad del agua. Rango óptimo 6.5-8.5 en agua cruda, 6.5-8.0 en agua tratada.",
            "caudal": "Volumen de agua que pasa por una sección en la unidad de tiempo. PTAP La Pola maneja 2,170 L/s de capacidad total.",
            "cloro residual": "Cantidad de cloro libre disponible después de la desinfección. PTAP La Pola mantiene 0.3-0.8 mg/L en red.",
            "irca": "Índice de Riesgo de la Calidad del Agua para consumo humano. PTAP La Pola mantiene IRCA declarado de 0.0% (sin riesgo) mayoría de meses 2023.",
            "macromedidor": "Equipo de medición de caudal de gran diámetro. PTAP La Pola tiene 6 macromedidores en captaciones y entradas.",
            "ras": "Reglamento Técnico para el Sector de Agua Potable y Saneamiento Básico, establecido por Resolución 0330 de 2017.",
            "modulos hexagonales": "Tecnología de polipropileno de alta densidad para sedimentación acelerada. Inversión $1,385 millones en PTAP La Pola (2023).",
            "resolucion 2115": "Resolución que establece características, instrumentos básicos y frecuencias del sistema de control y vigilancia para la calidad del agua potable.",
            "decreto 1575": "Decreto que establece el Sistema para la Protección y Control de la Calidad del Agua para Consumo Humano en Colombia."
        };
        
        const normalizedQuery = query.toLowerCase();
        
        if (localTerms[normalizedQuery]) {
            return `<strong>📖 ${normalizedQuery.charAt(0).toUpperCase() + normalizedQuery.slice(1)}</strong>\n\n${localTerms[normalizedQuery]}\n\n💡 Para acceso completo al glosario, asegúrate de que todos los scripts estén cargados.`;
        }
        
        // Search in partial matches
        const matches = Object.keys(localTerms).filter(term => 
            term.includes(normalizedQuery) || normalizedQuery.includes(term)
        );
        
        if (matches.length > 0) {
            let response = `🔍 Términos relacionados encontrados:\n\n`;
            matches.forEach(match => {
                response += `<strong>${match.charAt(0).toUpperCase() + match.slice(1)}</strong>\n${localTerms[match]}\n\n`;
            });
            return response;
        }
        
        return `❓ No encontré el término "${query}" en el glosario básico.\n\n💡 Términos disponibles: turbiedad, coagulación, mackenfloc, pH, caudal, cloro residual, IRCA, macromedidor, RAS, módulos hexagonales, resolución 2115, decreto 1575`;
    }
    
    performGlossarySearch(query) {
        if (typeof searchGlossary === 'function') {
            return searchGlossary(query);
        }
        
        // Fallback search
        const normalizedQuery = query.toLowerCase();
        const results = [];
        
        Object.values(technicalGlossary).forEach(entry => {
            if (entry.term.toLowerCase().includes(normalizedQuery) ||
                entry.definition.toLowerCase().includes(normalizedQuery) ||
                (entry.synonyms && entry.synonyms.some(synonym => 
                    synonym.toLowerCase().includes(normalizedQuery)))) {
                results.push(entry);
            }
        });
        
        return results;
    }
    
    formatGlossaryEntry(entry) {
        let formatted = `<strong>📖 ${entry.term}</strong>\n`;
        formatted += `<em>${entry.category}</em>\n\n`;
        formatted += `<strong>Definición:</strong>\n${entry.definition}\n\n`;
        
        if (entry.application) {
            formatted += `<strong>🏭 Aplicación en PTAP La Pola:</strong>\n${entry.application}\n\n`;
        }
        
        if (entry.units) {
            formatted += `<strong>📏 Unidades:</strong> ${entry.units}\n\n`;
        }
        
        if (entry.synonyms && entry.synonyms.length > 0) {
            formatted += `<strong>🔄 Sinónimos:</strong> ${entry.synonyms.join(', ')}\n\n`;
        }
        
        if (entry.relatedTerms && entry.relatedTerms.length > 0) {
            formatted += `<strong>🔗 Términos relacionados:</strong> ${entry.relatedTerms.join(', ')}\n\n`;
        }
        
        formatted += `💡 Usa /glosario [término relacionado] para más información`;
        
        return formatted;
    }
    
    detectTechnicalTerm(query) {
        // Only detect specific technical terms that are likely to be in the glossary
        const specificTechnicalTerms = [
            'turbiedad', 'ph', 'coagulacion', 'floculacion', 'sedimentacion',
            'filtracion', 'desinfeccion', 'mackenfloc', 'bocatoma', 'macromedidor',
            'coliformes', 'alcalinidad', 'antracita', 'retrolavado',
            'ntu', 'mg/l', 'ppm', 'tiempo de retencion', 'modulos hexagonales',
            'polipropileno', 'ideam'
        ];
        
        // Don't treat as technical term if it's a conversational question
        if (query.toLowerCase().includes('que es') || query.toLowerCase().includes('qué es') || 
            query.toLowerCase().includes('como') || query.toLowerCase().includes('cómo') ||
            query.toLowerCase().includes('hablame') || query.toLowerCase().includes('háblame') ||
            query.toLowerCase().includes('explica') || query.toLowerCase().includes('cuanto') ||
            query.toLowerCase().includes('historia') || query.toLowerCase().includes('porque')) {
            return false;
        }
        
        return specificTechnicalTerms.some(keyword => 
            query.toLowerCase().includes(keyword)
        );
    }
    
    getSuggestionsForQuery(query) {
        const normalizedQuery = query.toLowerCase();
        
        // Normatividad suggestions
        if (this.matchesKeywords(normalizedQuery, ['normatividad', 'normativa', 'regulacion', 'ley', 'decreto', 'resolucion'])) {
            return `❓ No encontré el término "${query}" en el glosario.\n\n💡 Sugerencias sobre Normatividad:\n• "¿Qué es la Resolución 0330?"\n• "Háblame del Decreto 1575"\n• "¿Qué parámetros establece la Resolución 2115?"\n• "¿Qué es el RAS?"\n• "Marco normativo colombiano"\n• "Normatividad agua potable"\n\n🔍 También puedes usar: /glosario RAS`;
        }
        
        // IBAL history suggestions
        if (this.matchesKeywords(normalizedQuery, ['ibal', 'historia', 'empresa', 'modernizacion', 'inversion'])) {
            return `❓ No encontré el término "${query}" en el glosario.\n\n💡 Sugerencias sobre IBAL:\n• "¿Cuál es la historia de IBAL?"\n• "Háblame de la modernización de PTAP"\n• "¿Cuánto invirtió IBAL en mejoras?"\n• "¿Qué es IBAL como empresa?"\n• "Control de calidad IBAL"\n• "Cobertura de servicios IBAL"\n\n🔍 También puedes preguntar: "Historia de IBAL"`;
        }
        
        // Process suggestions
        if (this.matchesKeywords(normalizedQuery, ['proceso', 'tratamiento', 'captacion', 'coagulacion', 'sedimentacion', 'filtracion'])) {
            return `❓ No encontré el término "${query}" en el glosario.\n\n💡 Sugerencias sobre Procesos:\n• "¿Cómo funciona la coagulación?"\n• "Explícame la sedimentación"\n• "¿Qué son los módulos hexagonales?"\n• "Proceso de filtración"\n• "Desinfección con cloro"\n• "Captación de agua"\n\n🔍 También puedes usar: /glosario coagulación`;
        }
        
        // Water quality suggestions
        if (this.matchesKeywords(normalizedQuery, ['calidad', 'agua', 'potable', 'irca', 'parametros'])) {
            return `❓ No encontré el término "${query}" en el glosario.\n\n💡 Sugerencias sobre Calidad del Agua:\n• "¿Qué es el IRCA?"\n• "Parámetros de calidad del agua"\n• "¿Por qué es importante el tratamiento?"\n• "Turbiedad del agua"\n• "pH del agua"\n• "Cloro residual"\n\n🔍 También puedes usar: /glosario IRCA`;
        }
        
        // Chemical suggestions
        if (this.matchesKeywords(normalizedQuery, ['quimico', 'sulfato', 'aluminio', 'mackenfloc', 'cloro'])) {
            return `❓ No encontré el término "${query}" en el glosario.\n\n💡 Sugerencias sobre Químicos:\n• "¿Qué es Mackenfloc?"\n• "Sulfato de aluminio vs Mackenfloc"\n• "Dosificación de químicos"\n• "Cloro gaseoso"\n• "Coagulantes en PTAP"\n• "Polímeros de ayuda"\n\n🔍 También puedes usar: /glosario mackenfloc`;
        }
        
        // Infrastructure suggestions
        if (this.matchesKeywords(normalizedQuery, ['tanque', 'distrito', 'infraestructura', 'almacenamiento', 'distribucion'])) {
            return `❓ No encontré el término "${query}" en el glosario.\n\n💡 Sugerencias sobre Infraestructura:\n• "Muéstrame los tanques"\n• "¿Cuántos distritos hidráulicos hay?"\n• "Capacidad de almacenamiento"\n• "Sistema de distribución"\n• "Tanque más grande"\n• "Distritos de Ibagué"\n\n🔍 También puedes preguntar: "¿Cuántos distritos hay?"`;
        }
        
        // Technology suggestions
        if (this.matchesKeywords(normalizedQuery, ['tecnologia', 'hexagonal', 'modulo', 'automatizacion', 'control'])) {
            return `❓ No encontré el término "${query}" en el glosario.\n\n💡 Sugerencias sobre Tecnología:\n• "¿Qué son los módulos hexagonales?"\n• "Tecnología de sedimentación"\n• "Modernización tecnológica"\n• "Sistema de control automatizado"\n• "Paneles tipo colmena"\n• "Polipropileno de alta densidad"\n\n🔍 También puedes usar: /glosario módulos hexagonales`;
        }
        
        // Default suggestions with context-aware categories
        return `❓ No encontré el término "${query}" en el glosario.\n\n💡 Sugerencias por categorías:\n\n📋 <strong>Normatividad:</strong> "¿Qué es el RAS?", "Resolución 2115"\n🏢 <strong>IBAL:</strong> "Historia de IBAL", "Modernización PTAP"\n💧 <strong>Procesos:</strong> "Coagulación", "Módulos hexagonales"\n🧪 <strong>Calidad:</strong> "¿Qué es el IRCA?", "Parámetros agua"\n🏗️ <strong>Infraestructura:</strong> "Tanques", "Distritos"\n\n🔍 O usa: /categorias para explorar temas`;
    }
    
    getGlossaryHelp() {
        return `<strong>📚 Ayuda del Glosario Técnico</strong>\n\n<strong>Comandos disponibles:</strong>\n• /glosario [término] - Buscar término específico\n• /categorias - Ver todas las categorías\n• /ayuda - Mostrar esta ayuda\n• /salir - Salir del modo glosario\n\n<strong>Búsqueda inteligente:</strong>\n• Busca por término exacto\n• Busca por sinónimos\n• Busca en definiciones\n• Busca por categoría\n\n<strong>Ejemplos:</strong>\n• /glosario turbiedad\n• /glosario pH\n• /glosario cloro residual\n• coagulación\n• paneles colmena\n\n<strong>Categorías disponibles:</strong>\nCaptación, Pretratamiento, Tratamiento Químico, Separación Física, Hidráulica, Calidad del Agua, Distribución, Almacenamiento`;
    }
}

// Initialize assistant when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.virtualAssistant = new VirtualAssistant();
});

// Make globally available
window.VirtualAssistant = VirtualAssistant;