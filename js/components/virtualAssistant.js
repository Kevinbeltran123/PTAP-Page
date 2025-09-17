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
                    description: "Desestabilización y aglomeración de partículas coloidales",
                    chemical: "Sulfato de Aluminio (15-40 mg/L)",
                    time: "15-20 minutos",
                    keywords: ["coagulacion", "floculacion", "sulfato", "aluminio", "quimicos"]
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
                    chemical: "Cloro gaseoso (0.8-2.0 mg/L)",
                    contact_time: "30 minutos mínimo",
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
                    coverage: "85% población ibaguereña",
                    keywords: ["distribucion", "distritos", "suscriptores", "cobertura"]
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
                    "Puedo ayudarte con:\n• Información sobre procesos de tratamiento\n• Datos de tanques y capacidades\n• Estadísticas de distritos hidráulicos\n• 📚 Glosario técnico especializado\n• Explicaciones técnicas\n• Navegación por la aplicación\n\n💡 Tip: Escribe '/glosario' para explorar términos técnicos",
                    "Pregúntame sobre cualquier proceso de la PTAP, capacidades de tanques, distritos hidráulicos o términos técnicos específicos.\n\n📖 ¿Sabías que tengo un glosario técnico completo? Prueba escribiendo '/glosario [término]'"
                ],
                unknown: [
                    "No estoy seguro de esa información específica. ¿Podrías reformular tu pregunta?\n\n💡 Tip: Si es un término técnico, prueba '/glosario [término]'",
                    "Hmm, no tengo esa información exacta. Prueba preguntando sobre procesos, tanques, distritos hidráulicos o consultando el glosario técnico.",
                    "No encontré información sobre eso. ¿Te interesa saber sobre algún proceso específico de tratamiento o consultar algún término técnico?"
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
                    <button class="quick-btn" data-query="¿Cómo funciona la coagulación?">Coagulación</button>
                    <button class="quick-btn" data-query="Muéstrame los tanques">Tanques</button>
                    <button class="quick-btn" data-query="/glosario">📚 Glosario</button>
                    <button class="quick-btn" data-query="¿Cuántos distritos hay?">Distritos</button>
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
    
    addAssistantMessage(message, isTyping = true) {
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
                messageDiv.innerHTML = `
                    <div class="message-content">${message}</div>
                    <div class="message-time">${this.getCurrentTime()}</div>
                `;
                this.scrollToBottom();
            }, 1000 + Math.random() * 1000);
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">${message}</div>
                <div class="message-time">${this.getCurrentTime()}</div>
            `;
            messagesContainer.appendChild(messageDiv);
            this.scrollToBottom();
        }
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
        // Glossary search (detect technical terms)
        else if (this.detectTechnicalTerm(normalizedQuery)) {
            response = this.searchGlossaryTerm(normalizedQuery);
        }
        // Process-specific queries
        else if (this.matchesKeywords(normalizedQuery, ['captacion', 'fuentes', 'combeima', 'cay', 'chembe'])) {
            response = this.getProcessInfo('captacion');
        }
        else if (this.matchesKeywords(normalizedQuery, ['desarenador', 'arenas', 'pretratamiento'])) {
            response = this.getProcessInfo('desarenador');
        }
        else if (this.matchesKeywords(normalizedQuery, ['coagulacion', 'floculacion', 'sulfato', 'aluminio'])) {
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
        // Calculation queries
        else if (this.matchesKeywords(normalizedQuery, ['total', 'suma', 'cuanto', 'cuantos'])) {
            response = this.handleCalculations(normalizedQuery);
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
            return `❓ No encontré el término "${query}" en el glosario.\n\n💡 Sugerencias:\n• Verifica la ortografía\n• Prueba con sinónimos\n• Usa /categorias para explorar temas\n• Escribe términos como: turbiedad, coagulación, pH, caudal`;
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
            "coagulacion": "Proceso de desestabilización de partículas coloidales mediante sulfato de aluminio (15-40 mg/L) en PTAP La Pola.",
            "ph": "Medida de acidez o alcalinidad del agua. Rango óptimo 6.5-8.5 en agua cruda, 6.5-8.0 en agua tratada.",
            "caudal": "Volumen de agua que pasa por una sección en la unidad de tiempo. PTAP La Pola maneja 2,170 L/s de capacidad total.",
            "cloro residual": "Cantidad de cloro libre disponible después de la desinfección. PTAP La Pola mantiene 0.3-0.8 mg/L en red.",
            "irca": "Índice de Riesgo de la Calidad del Agua. PTAP La Pola mantiene IRCA declarado de 0.0% (sin riesgo).",
            "macromedidor": "Equipo de medición de caudal de gran diámetro. PTAP La Pola tiene 6 macromedidores en captaciones y entradas."
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
        
        return `❓ No encontré el término "${query}" en el glosario básico.\n\n💡 Términos disponibles: turbiedad, coagulación, pH, caudal, cloro residual, IRCA, macromedidor`;
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
        const technicalKeywords = [
            'turbiedad', 'ph', 'caudal', 'coagulacion', 'floculacion', 'sedimentacion',
            'filtracion', 'desinfeccion', 'cloro', 'aluminio', 'bocatoma', 'macromedidor',
            'irca', 'coliformes', 'alcalinidad', 'antracita', 'retrolavado', 'distrito',
            'tanque', 'capacidad', 'ntu', 'mg/l', 'ppm', 'tiempo de retencion'
        ];
        
        return technicalKeywords.some(keyword => 
            query.toLowerCase().includes(keyword)
        );
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