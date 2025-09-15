# 🏭 PTAP La Pola - Visualización Interactiva

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile--First-blue)](https://www.w3.org/TR/mobile-bp/)

> **Exploración interactiva del proceso de tratamiento de agua potable en la Planta La Pola (IBAL) - Ibagué, Colombia**

Una aplicación web educativa que visualiza de manera interactiva todos los procesos de la Planta de Tratamiento de Agua Potable La Pola, operada por IBAL (Empresa Ibaguereña de Acueducto y Alcantarillado). Desarrollada como proyecto académico para el curso de Procesos 2 en Ingeniería Ambiental.

## 📸 Vista Previa

![PTAP La Pola Preview](assets/images/preview.jpg)

## ✨ Características Principales

### 🎯 **Interactividad Completa**
- **Mapa geográfico interactivo** de fuentes de captación (Río Combeima, Q. Cay, Q. Chembe)
- **Animaciones educativas** para cada proceso de tratamiento
- **Sistema de seguimiento** de progreso de exploración
- **Modales informativos** con especificaciones técnicas detalladas

### 📊 **Información Técnica Precisa**
- Datos basados en documentación oficial IBAL
- Parámetros operativos en tiempo real
- Eficiencias de remoción específicas
- Inversiones de modernización ($2,119M)
- Normatividad colombiana aplicable

### 🎨 **Diseño Moderno**
- **Responsive design** optimizado para todos los dispositivos
- **Animaciones fluidas** y efectos visuales atractivos
- **Gradientes y sombras** profesionales
- **Tipografía moderna** (Inter font family)
- **Modo oscuro** automático según preferencias del sistema

### 🔧 **Funcionalidades Avanzadas**
- **Tooltips informativos** en tiempo real
- **Sistema de ayuda** integrado
- **Indicadores de progreso** visuales
- **Carga optimizada** con pantalla de bienvenida
- **Accesibilidad completa** (WCAG 2.1)

## 🚀 Demo en Vivo

[**🌐 Ver Demo**](https://tu-username.github.io/ptap-la-pola-interactive/)

## 📁 Estructura del Proyecto

```
ptap-la-pola-interactive/
│
├── 📄 index.html                 # Página principal
├── 📖 README.md                  # Documentación principal
├── 📜 LICENSE                    # Licencia MIT
├── 🚫 .gitignore                # Archivos ignorados por Git
│
├── 🎨 css/                      # Estilos CSS modulares
│   ├── main.css                 # Estilos principales y variables
│   ├── components.css           # Componentes UI
│   ├── animations.css           # Animaciones y efectos
│   └── responsive.css           # Diseño responsivo
│
├── ⚡ js/                       # JavaScript modular
│   ├── data/
│   │   └── processData.js       # Datos de procesos
│   ├── components/
│   │   ├── modal.js            # Sistema de modales
│   │   ├── tooltip.js          # Tooltips interactivos
│   │   └── progress.js         # Seguimiento de progreso
│   ├── utils/
│   │   └── helpers.js          # Funciones auxiliares
│   ├── animations/
│   │   └── processAnimations.js # Animaciones de procesos
│   └── main.js                 # Controlador principal
│
├── 🖼️ assets/                   # Recursos multimedia
│   ├── images/                 # Imágenes y iconos
│   │   ├── ibal-logo.png       # Logo IBAL
│   │   ├── favicon.ico         # Favicon
│   │   └── preview.jpg         # Imagen de vista previa
│   └── docs/                   # Documentación adicional
│       └── technical-specs.pdf  # Especificaciones técnicas
│
└── 📚 docs/                     # Documentación del proyecto
    ├── INSTALLATION.md          # Guía de instalación
    ├── CONTRIBUTING.md          # Guía de contribución
    └── CHANGELOG.md             # Registro de cambios
```

## 🛠️ Instalación y Uso

### Prerrequisitos
- Navegador web moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Servidor web local (opcional, para desarrollo)

### 🚀 Instalación Rápida

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-username/ptap-la-pola-interactive.git
   cd ptap-la-pola-interactive
   ```

2. **Abre en navegador:**
   ```bash
   # Opción 1: Abrir directamente
   open index.html

   # Opción 2: Servidor local (Python)
   python -m http.server 8000
   # Luego visita: http://localhost:8000

   # Opción 3: Servidor local (Node.js)
   npx serve .
   ```

3. **¡Disfruta explorando!** 🎉

### 🔧 Para Desarrollo

```bash
# Instalar dependencias de desarrollo (opcional)
npm install -g live-server

# Servidor con recarga automática
live-server --port=3000
```

## 🎯 Cómo Usar la Aplicación

### 🖱️ **Navegación Básica**
1. **Haz clic** en cualquier proceso del flujo para ver detalles
2. **Pasa el mouse** sobre elementos para información rápida
3. **Explora el mapa** interactivo de fuentes de captación
4. **Observa las animaciones** de cada proceso

### 📊 **Sistema de Progreso**
- Sigue tu progreso en el **indicador superior derecho**
- Completa los **8 procesos** para dominar el sistema
- Los **círculos verdes** muestran procesos explorados

### ❓ **Sistema de Ayuda**
- Haz clic en el **botón de ayuda** (esquina inferior izquierda)
- Obtén información detallada sobre navegación y características

## 🏗️ Procesos de Tratamiento

| Proceso | Descripción | Parámetros Clave |
|---------|-------------|-------------------|
| **🏔️ Captación** | Río Combeima (1,500 L/s), Q. Cay (600 L/s), Q. Chembe (70 L/s) | 82% suministro, Turbiedad <12,000 NTU |
| **🔄 Desarenador** | Remoción de arenas y sólidos gruesos | Eficiencia >85%, Tiempo 2-5 min |
| **⚗️ Coagulación** | Sulfato de Aluminio + Polímeros | 15-40 mg/L, pH 6.0-7.5 |
| **🏗️ Sedimentación** | Paneles tipo colmena (Inversión $1,385M) | TRH 2-3h, Eficiencia >90% |
| **🏭 Filtración** | Multimedia: Antracita + Arena + Grava | <1.5 NTU, 120-200 m³/m²/día |
| **☢️ Desinfección** | Cloro gaseoso | 0.8-2.0 mg/L, TC 30 min |
| **🏪 Almacenamiento** | Tanques de compensación | 25,000 m³ total |
| **🏘️ Distribución** | 10 distritos hidráulicos | 180,000 suscriptores |

## 📊 Datos Técnicos Destacados

### 🎯 **Capacidades del Sistema**
- **Capacidad Total:** 1,700 L/s
- **Población Atendida:** 85% de Ibagué
- **IRCA Declarado:** 0.0%
- **Inversión Modernización:** $2,119 millones

### ⚡ **Eficiencias de Remoción**
- **Turbiedad:** >98%
- **Color:** >95%
- **Sólidos Suspendidos:** >90%
- **Coliformes:** 100%

### 🔬 **Parámetros de Calidad**
- **Turbiedad Final:** <1.0 NTU
- **Color:** <5 UPC
- **pH:** 6.5 - 8.0
- **Cloro Residual:** 0.3 - 0.8 mg/L

## 🧪 Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica y accesible
- **CSS3** - Estilos modernos con Grid y Flexbox
- **JavaScript ES6+** - Lógica interactiva modular
- **CSS Custom Properties** - Sistema de design tokens

### Características Técnicas
- **Mobile-First Design** - Optimizado para dispositivos móviles
- **CSS Grid & Flexbox** - Layouts flexibles y responsivos
- **CSS Animations** - Animaciones suaves y fluidas
- **Intersection Observer API** - Animaciones basadas en scroll
- **LocalStorage** - Persistencia de progreso del usuario

### Optimizaciones
- **Lazy Loading** - Carga optimizada de contenido
- **CSS Minification** - Archivos optimizados para producción
- **Image Optimization** - Imágenes WebP con fallback
- **Performance Monitoring** - Métricas de rendimiento

## 🤝 Contribuir al Proyecto

¡Las contribuciones son bienvenidas! Este es un proyecto educativo abierto a mejoras.

### 🌟 **Tipos de Contribuciones**
- 🐛 Reportar bugs o problemas
- 💡 Sugerir nuevas características
- 📖 Mejorar documentación
- 🎨 Mejorar diseño y UX
- ⚡ Optimizar rendimiento
- 🔧 Refactorizar código

### 📝 **Proceso de Contribución**

1. **Fork** el repositorio
2. **Crea** una rama para tu característica:
   ```bash
   git checkout -b feature/nueva-caracteristica
   ```
3. **Realiza** tus cambios siguiendo las convenciones:
   - Código limpio y comentado
   - Commits descriptivos
   - Tests cuando aplique
4. **Envía** un Pull Request con descripción detallada

### 📋 **Convenciones de Código**

```javascript
// JavaScript - Camel case
const processData = {};
function handleClick() {}

// CSS - Kebab case
.process-box {}
.modal-content {}

// Commits - Conventional Commits
feat: add new process animation
fix: resolve modal closing issue
docs: update installation guide
```

## 📚 Documentación Adicional

- [**📖 Guía de Instalación**](docs/INSTALLATION.md) - Instrucciones detalladas
- [**🤝 Guía de Contribución**](docs/CONTRIBUTING.md) - Cómo contribuir
- [**📝 Changelog**](docs/CHANGELOG.md) - Historial de cambios
- [**🔧 Especificaciones Técnicas**](assets/docs/technical-specs.pdf) - Documentación IBAL

## 📊 Métricas del Proyecto

![GitHub repo size](https://img.shields.io/github/repo-size/tu-username/ptap-la-pola-interactive)
![GitHub code size](https://img.shields.io/github/languages/code-size/tu-username/ptap-la-pola-interactive)
![GitHub last commit](https://img.shields.io/github/last-commit/tu-username/ptap-la-pola-interactive)

## 🎓 Contexto Académico

### **Universidad:** [Tu Universidad]
### **Programa:** Ingeniería Ambiental
### **Curso:** Procesos de Tratamiento de Aguas 2
### **Semestre:** 2024-2
### **Profesor:** [Nombre del Profesor]

### 🎯 **Objetivos de Aprendizaje**
- Comprender procesos de tratamiento de agua potable
- Analizar parámetros operativos y eficiencias
- Evaluar tecnologías de modernización
- Relacionar teoría con aplicación práctica

### 📋 **Metodología**
1. **Investigación** - Análisis de documentación técnica IBAL
2. **Desarrollo** - Implementación de visualización interactiva
3. **Validación** - Verificación con normatividad colombiana
4. **Presentación** - Demostración educativa interactiva

## 🏆 Reconocimientos

- **IBAL S.A. E.S.P.** - Por la documentación técnica oficial
- **Ministerio de Vivienda** - Normatividad RAS 2017
- **Comunidad Open Source** - Bibliotecas y herramientas utilizadas

## 📞 Contacto y Soporte

### 👨‍🎓 **Autor**
**Kevin Beltrán**
- 📧 Email: [kevin.beltran@universidad.edu](mailto:kevin.beltran@universidad.edu)
- 🐙 GitHub: [@kevin-beltran](https://github.com/kevin-beltran)
- 💼 LinkedIn: [Kevin Beltrán](https://linkedin.com/in/kevin-beltran)

### 🐛 **Reportar Problemas**
- [**Issues en GitHub**](https://github.com/tu-username/ptap-la-pola-interactive/issues)
- [**Discussions**](https://github.com/tu-username/ptap-la-pola-interactive/discussions)

### 💬 **Feedback y Sugerencias**
¡Tu opinión es valiosa! Comparte tus ideas para mejorar esta herramienta educativa.

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT** - ver el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License - Copyright (c) 2024 Kevin Beltrán

Se permite el uso, copia, modificación y distribución de este software
para cualquier propósito, incluyendo uso comercial, siempre que se
incluya el aviso de copyright y esta licencia.
```

## 🌟 ¿Te Gusta el Proyecto?

Si este proyecto te ha sido útil, considera:

- ⭐ **Darle una estrella** en GitHub
- 🍴 **Fork** para tus propios experimentos
- 🐛 **Reportar bugs** que encuentres
- 💡 **Sugerir mejoras** en las Issues
- 📢 **Compartir** con otros estudiantes

---

<div align="center">

**🚰 Hecho con 💙 para la educación en ingeniería ambiental**

*Contribuyendo al conocimiento sobre tratamiento de agua potable en Colombia*

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red)](https://github.com/tu-username/ptap-la-pola-interactive)
[![Built for Education](https://img.shields.io/badge/Built%20for-🎓%20Education-green)](https://github.com/tu-username/ptap-la-pola-interactive)

</div>