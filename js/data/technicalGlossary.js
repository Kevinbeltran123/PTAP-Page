/**
 * Technical Glossary - PTAP La Pola
 * Comprehensive technical terms for water treatment
 * Author: Kevin Beltrán
 */

const technicalGlossary = {
    // Términos de Captación
    "bocatoma": {
        term: "Bocatoma",
        category: "Captación",
        definition: "Estructura hidráulica que permite la derivación del agua desde una fuente superficial hacia el sistema de conducción de una planta de tratamiento.",
        application: "En PTAP La Pola se ubican en el Río Combeima, Q. Cay y Q. Chembe",
        units: "L/s (litros por segundo)",
        synonyms: ["toma", "captación", "obra de captación"],
        relatedTerms: ["caudal", "turbiedad", "aforador"]
    },
    
    "turbiedad": {
        term: "Turbiedad",
        category: "Calidad del Agua",
        definition: "Medida de la claridad del agua, expresada por la cantidad de partículas suspendidas que reducen la transmisión de luz.",
        application: "Parámetro crítico en PTAP La Pola. Valores >12,000 NTU activan suspensión automática",
        units: "NTU (Nephelometric Turbidity Units)",
        synonyms: ["turbidez"],
        relatedTerms: ["color", "sólidos suspendidos", "clarificación"]
    },
    
    "caudal": {
        term: "Caudal",
        category: "Hidráulica",
        definition: "Volumen de agua que pasa por una sección transversal en la unidad de tiempo.",
        application: "PTAP La Pola maneja 2,170 L/s de capacidad total de diseño",
        units: "L/s, m³/s, GPM",
        synonyms: ["flujo", "gasto"],
        relatedTerms: ["velocidad", "área", "continuidad"]
    },

    // Términos de Pretratamiento
    "desarenacion": {
        term: "Desarenación",
        category: "Pretratamiento",
        definition: "Proceso físico de remoción de partículas de arena y sólidos gruesos por sedimentación gravitacional.",
        application: "Primera etapa de tratamiento en PTAP La Pola, remueve >85% de sólidos >0.2 mm",
        units: "% de remoción",
        synonyms: ["desarenar", "remoción de arenas"],
        relatedTerms: ["sedimentación", "velocidad de caída", "tiempo de retención"]
    },

    // Términos de Coagulación-Floculación
    "coagulacion": {
        term: "Coagulación",
        category: "Tratamiento Químico",
        definition: "Proceso de desestabilización de partículas coloidales mediante la adición de coagulantes químicos para facilitar su posterior aglomeración.",
        application: "En PTAP La Pola se usa Mackenfloc (15-40 mg/L) con mezcla rápida 1-3 segundos",
        units: "mg/L",
        synonyms: ["coagular"],
        relatedTerms: ["floculación", "sulfato de aluminio", "pH", "alcalinidad"]
    },
    
    "floculacion": {
        term: "Floculación",
        category: "Tratamiento Químico",
        definition: "Proceso de aglomeración de partículas desestabilizadas en la coagulación para formar flóculos de mayor tamaño y peso.",
        application: "TRH de 20-30 minutos en PTAP La Pola con floculadores mecánicos y hidráulicos",
        units: "s⁻¹ (gradiente de velocidad)",
        synonyms: ["flocular"],
        relatedTerms: ["coagulación", "gradiente", "tiempo de retención", "polímeros"]
    },
    
    "mackenfloc": {
        term: "Mackenfloc",
        category: "Químicos", 
        definition: "Coagulante y clarificante químico líquido desarrollado por Quinsa para tratamiento de aguas potables y residuales.",
        application: "Coagulante principal en PTAP La Pola, dosis 15-40 mg/L, vertido por goteo al resalto hidráulico",
        units: "mg/L",
        synonyms: ["coagulante Quinsa"],
        relatedTerms: ["coagulación", "pH", "turbiedad", "resalto hidráulico"]
    },
    
    "sulfato de aluminio": {
        term: "Sulfato de Aluminio",
        category: "Químicos",
        definition: "Coagulante químico (Al₂(SO₄)₃·18H₂O) que desestabiliza partículas coloidales mediante neutralización de cargas.",
        application: "Coagulante tradicional, sustituido por Mackenfloc en PTAP La Pola",
        units: "mg/L",
        synonyms: ["alúmbre", "Al₂(SO₄)₃"],
        relatedTerms: ["coagulación", "pH", "alcalinidad", "polímeros"]
    },

    // Términos de Sedimentación
    "sedimentacion": {
        term: "Sedimentación",
        category: "Separación Física",
        definition: "Proceso de separación por gravedad donde los flóculos formados se depositan en el fondo del tanque por su mayor densidad.",
        application: "PTAP La Pola modernizada con módulos hexagonales de polipropileno alta densidad",
        units: "m/día (velocidad superficial)",
        synonyms: ["clarificación", "decantación"],
        relatedTerms: ["floculación", "paneles colmena", "velocidad superficial", "tiempo de retención"]
    },
    
    "paneles colmena": {
        term: "Paneles Tipo Colmena",
        category: "Tecnología",
        definition: "Módulos inclinados con configuración hexagonal que aumentan el área superficial específica en sedimentadores de alta eficiencia.",
        application: "Tecnología implementada en PTAP La Pola 2023, inversión $1,385 millones",
        units: "m²/m³ (área específica)",
        synonyms: ["láminas inclinadas", "módulos hexagonales"],
        relatedTerms: ["sedimentación", "velocidad superficial", "eficiencia"]
    },

    // Términos de Filtración
    "filtracion": {
        term: "Filtración",
        category: "Separación Física",
        definition: "Proceso de separación de partículas suspendidas mediante el paso del agua a través de un medio poroso granular.",
        application: "PTAP La Pola usa filtros multimedia: antracita (60cm), arena (40cm), grava (40cm)",
        units: "m³/m²/día (velocidad de filtración)",
        synonyms: ["filtrar"],
        relatedTerms: ["antracita", "arena", "grava", "retrolavado", "turbiedad efluente"]
    },
    
    "antracita": {
        term: "Antracita",
        category: "Medios Filtrantes",
        definition: "Carbón mineral de alta calidad usado como medio filtrante superior en filtros multimedia por su baja densidad y alta porosidad.",
        application: "Capa superior (60 cm) en filtros PTAP La Pola, mejora remoción de turbiedad",
        units: "cm (espesor de capa)",
        synonyms: ["carbón antracita"],
        relatedTerms: ["filtración", "arena", "grava", "medio multimedia"]
    },
    
    "retrolavado": {
        term: "Retrolavado",
        category: "Operación",
        definition: "Proceso de limpieza de filtros mediante inversión del flujo de agua para remover partículas acumuladas en el medio filtrante.",
        application: "Operación periódica en filtros PTAP La Pola cuando aumenta pérdida de carga",
        units: "m³/m²/min (velocidad de retrolavado)",
        synonyms: ["lavado ascendente", "backwash"],
        relatedTerms: ["filtración", "pérdida de carga", "medio filtrante"]
    },

    // Términos de Desinfección
    "desinfeccion": {
        term: "Desinfección",
        category: "Tratamiento Químico",
        definition: "Proceso de inactivación o destrucción de microorganismos patógenos para garantizar la seguridad microbiológica del agua.",
        application: "Etapa final en PTAP La Pola usando cloro gaseoso (0.8-2.0 mg/L)",
        units: "mg/L, log de remoción",
        synonyms: ["esterilización"],
        relatedTerms: ["cloro", "tiempo de contacto", "CT", "coliformes", "cloro residual"]
    },
    
    "cloro residual": {
        term: "Cloro Residual",
        category: "Control de Calidad",
        definition: "Cantidad de cloro libre disponible en el agua después del tiempo de contacto requerido para la desinfección.",
        application: "PTAP La Pola mantiene 0.3-0.8 mg/L en red de distribución",
        units: "mg/L",
        synonyms: ["cloro libre residual"],
        relatedTerms: ["desinfección", "cloro", "tiempo de contacto", "red de distribución"]
    },
    
    "tiempo de contacto": {
        term: "Tiempo de Contacto",
        category: "Desinfección",
        definition: "Tiempo que el desinfectante permanece en contacto con el agua para garantizar la inactivación de microorganismos.",
        application: "Mínimo 30 minutos en PTAP La Pola para cloro gaseoso",
        units: "minutos",
        synonyms: ["TC", "tiempo de contacto cloro"],
        relatedTerms: ["desinfección", "CT", "cloro residual"]
    },

    // Términos Hidráulicos
    "tiempo de retencion": {
        term: "Tiempo de Retención Hidráulica",
        category: "Hidráulica",
        definition: "Tiempo promedio que permanece el agua dentro de una unidad de tratamiento.",
        application: "TRH variable según proceso: coagulación (1 min), floculación (15-20 min), sedimentación (2-3 h)",
        units: "minutos, horas",
        synonyms: ["TRH", "tiempo de residencia"],
        relatedTerms: ["caudal", "volumen", "hidráulica"]
    },
    
    "velocidad superficial": {
        term: "Velocidad Superficial",
        category: "Hidráulica",
        definition: "Relación entre el caudal y el área superficial horizontal de un tanque de sedimentación.",
        application: "15-25 m/día en sedimentadores PTAP La Pola con paneles colmena",
        units: "m/día",
        synonyms: ["velocidad ascensional", "tasa superficial"],
        relatedTerms: ["sedimentación", "caudal", "área superficial"]
    },

    // Términos de Calidad
    "irca": {
        term: "IRCA",
        category: "Control de Calidad",
        definition: "Índice de Riesgo de la Calidad del Agua para consumo humano, establecido por la normatividad colombiana.",
        application: "PTAP La Pola mantiene IRCA declarado de 0.0% (sin riesgo)",
        units: "% (porcentaje de riesgo)",
        synonyms: ["Índice de Riesgo"],
        relatedTerms: ["calidad del agua", "resolución 2115", "vigilancia"]
    },
    
    "coliformes": {
        term: "Coliformes",
        category: "Microbiología",
        definition: "Grupo de bacterias indicadoras de contaminación fecal, utilizadas como parámetro de calidad microbiológica del agua.",
        application: "Objetivo: 0 UFC/100mL en agua tratada PTAP La Pola",
        units: "UFC/100mL",
        synonyms: ["coliformes totales", "E. coli"],
        relatedTerms: ["desinfección", "calidad microbiológica", "patógenos"]
    },

    // Términos de Distribución
    "distrito hidraulico": {
        term: "Distrito Hidráulico",
        category: "Distribución",
        definition: "Área geográfica delimitada del sistema de distribución con características hidráulicas homogéneas para control operativo.",
        application: "IBAL opera 10 distritos hidráulicos (DH1-DH10) atendiendo 179,547 suscriptores",
        units: "cantidad de suscriptores",
        synonyms: ["DH", "zona hidráulica"],
        relatedTerms: ["distribución", "suscriptores", "semaforización"]
    },
    
    "semaforizacion": {
        term: "Semaforización",
        category: "Operación",
        definition: "Sistema de control de suministro por sectores mediante apertura y cierre programado de válvulas según demanda y disponibilidad.",
        application: "Sistema implementado por IBAL para distribución equitativa en los 10 distritos",
        units: "horas de suministro",
        synonyms: ["control sectorial", "racionamiento"],
        relatedTerms: ["distrito hidráulico", "válvulas", "distribución"]
    },

    // Términos de Almacenamiento
    "tanque de compensacion": {
        term: "Tanque de Compensación",
        category: "Almacenamiento",
        definition: "Estructura de almacenamiento que regula las variaciones entre producción y consumo, proporcionando reserva de emergencia.",
        application: "IBAL cuenta con 13 tanques, capacidad total 31,400 m³",
        units: "m³",
        synonyms: ["tanque regulador", "reservorio"],
        relatedTerms: ["almacenamiento", "capacidad", "reserva", "distribución"]
    },

    // Términos Técnicos Generales
    "macromedidor": {
        term: "Macromedidor",
        category: "Instrumentación",
        definition: "Equipo de medición de caudal de gran diámetro utilizado para control y monitoreo en sistemas de acueducto.",
        application: "6 macromedidores en sistema PTAP La Pola: captaciones, entradas y salidas",
        units: "L/s, m³/h",
        synonyms: ["medidor de caudal", "caudalímetro"],
        relatedTerms: ["caudal", "monitoreo", "control"]
    },
    
    "ph": {
        term: "pH",
        category: "Química del Agua",
        definition: "Medida de acidez o alcalinidad del agua, expresada en escala logarítmica de 0 a 14.",
        application: "Rango óptimo 6.5-8.5 en agua cruda, 6.5-8.0 en agua tratada PTAP La Pola",
        units: "unidades de pH",
        synonyms: ["potencial hidrógeno"],
        relatedTerms: ["alcalinidad", "acidez", "coagulación", "corrosión"]
    },
    
    "alcalinidad": {
        term: "Alcalinidad",
        category: "Química del Agua",
        definition: "Capacidad del agua para neutralizar ácidos, determinada por la concentración de bicarbonatos, carbonatos e hidróxidos.",
        application: "Parámetro importante para optimización de dosis de coagulante en PTAP La Pola",
        units: "mg/L CaCO₃",
        synonyms: ["capacidad buffer"],
        relatedTerms: ["pH", "dureza", "coagulación", "corrosión"]
    },

    // Normatividad
    "resolucion 0330": {
        term: "Resolución 0330 de 2017",
        category: "Control de Calidad",
        definition: "Normativa del Ministerio de Vivienda que establece el Reglamento Técnico para el Sector de Agua Potable y Saneamiento Básico (RAS).",
        application: "Marco normativo que rige el diseño y operación de PTAP La Pola",
        units: "N/A",
        synonyms: ["RAS 2017", "Reglamento Técnico RAS"],
        relatedTerms: ["decreto 1575", "resolucion 2115", "normatividad"]
    },

    "decreto 1575": {
        term: "Decreto 1575 de 2007",
        category: "Control de Calidad", 
        definition: "Decreto que establece el Sistema para la Protección y Control de la Calidad del Agua para Consumo Humano en Colombia.",
        application: "Sistema de vigilancia aplicado por IBAL para garantizar calidad del agua",
        units: "N/A",
        synonyms: ["Sistema de protección calidad agua"],
        relatedTerms: ["resolucion 2115", "irca", "vigilancia"]
    },

    "resolucion 2115": {
        term: "Resolución 2115 de 2007",
        category: "Control de Calidad",
        definition: "Resolución del Ministerio de Protección Social que señala características, instrumentos básicos y frecuencias del sistema de control y vigilancia para la calidad del agua para consumo humano.",
        application: "Parámetros de calidad aplicados en PTAP La Pola para cumplimiento IRCA",
        units: "N/A",
        synonyms: ["Estándares calidad agua"],
        relatedTerms: ["irca", "decreto 1575", "calidad del agua"]
    }
};

// Categorías para organización
const glossaryCategories = {
    "Captación": {
        color: "#1565C0",
        icon: "🏔️",
        description: "Términos relacionados con la captación de agua cruda"
    },
    "Pretratamiento": {
        color: "#F57C00", 
        icon: "🔄",
        description: "Procesos de pretratamiento y acondicionamiento"
    },
    "Tratamiento Químico": {
        color: "#7B1FA2",
        icon: "⚗️", 
        description: "Procesos químicos de coagulación y desinfección"
    },
    "Separación Física": {
        color: "#388E3C",
        icon: "🏗️",
        description: "Procesos físicos de separación"
    },
    "Tecnología": {
        color: "#D32F2F",
        icon: "🔧",
        description: "Tecnologías y equipos especializados"
    },
    "Hidráulica": {
        color: "#1976D2",
        icon: "💧",
        description: "Conceptos hidráulicos y de flujo"
    },
    "Calidad del Agua": {
        color: "#0288D1",
        icon: "🧪",
        description: "Parámetros de calidad y control"
    },
    "Control de Calidad": {
        color: "#00796B",
        icon: "✅",
        description: "Sistemas de control y monitoreo"
    },
    "Químicos": {
        color: "#C2185B",
        icon: "🧬",
        description: "Reactivos químicos utilizados"
    },
    "Medios Filtrantes": {
        color: "#5D4037",
        icon: "⚫",
        description: "Materiales para filtración"
    },
    "Operación": {
        color: "#FF6F00",
        icon: "⚙️",
        description: "Procedimientos operativos"
    },
    "Microbiología": {
        color: "#E65100",
        icon: "🦠",
        description: "Aspectos microbiológicos"
    },
    "Distribución": {
        color: "#2E7D32",
        icon: "🏘️",
        description: "Sistema de distribución"
    },
    "Almacenamiento": {
        color: "#1565C0",
        icon: "🏪",
        description: "Sistemas de almacenamiento"
    },
    "Instrumentación": {
        color: "#455A64",
        icon: "📊",
        description: "Equipos de medición y control"
    },
    "Química del Agua": {
        color: "#3F51B5",
        icon: "🔬",
        description: "Propiedades químicas del agua"
    },
    "Desinfección": {
        color: "#9C27B0",
        icon: "☢️",
        description: "Procesos de desinfección"
    }
};

// Función para búsqueda inteligente en el glosario
function searchGlossary(query) {
    const normalizedQuery = query.toLowerCase();
    const results = [];
    
    // Búsqueda exacta por término
    if (technicalGlossary[normalizedQuery]) {
        results.push(technicalGlossary[normalizedQuery]);
    }
    
    // Búsqueda por sinónimos
    Object.values(technicalGlossary).forEach(entry => {
        if (entry.synonyms && entry.synonyms.some(synonym => 
            synonym.toLowerCase().includes(normalizedQuery))) {
            if (!results.includes(entry)) {
                results.push(entry);
            }
        }
    });
    
    // Búsqueda parcial en definición
    Object.values(technicalGlossary).forEach(entry => {
        if (entry.definition.toLowerCase().includes(normalizedQuery) ||
            entry.term.toLowerCase().includes(normalizedQuery)) {
            if (!results.includes(entry)) {
                results.push(entry);
            }
        }
    });
    
    return results;
}

// Función para obtener términos por categoría
function getTermsByCategory(category) {
    return Object.values(technicalGlossary).filter(term => 
        term.category === category
    );
}

// Función para obtener términos relacionados
function getRelatedTerms(termKey) {
    const term = technicalGlossary[termKey];
    if (!term || !term.relatedTerms) return [];
    
    return term.relatedTerms.map(relatedKey => 
        technicalGlossary[relatedKey]
    ).filter(Boolean);
}

// Export para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        technicalGlossary, 
        glossaryCategories, 
        searchGlossary, 
        getTermsByCategory,
        getRelatedTerms 
    };
}