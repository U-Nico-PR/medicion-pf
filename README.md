# Estimador de Puntos de Función (IFPUG)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)

Una herramienta web interactiva, ligera y profesional diseñada para calcular el tamaño funcional de proyectos de software utilizando el estándar internacional **IFPUG (International Function Point Users Group)**. Permite estimar los Puntos de Función (tanto ajustados como no ajustados), así como predecir métricas críticas del proyecto como el esfuerzo requerido, costos y necesidades de personal o tiempo.

---

## 🚀 Características Principales

El estimador se divide en tres fases lógicas basadas estrictamente en el manual de prácticas de medición de IFPUG:

1. **Gestión de Funciones de Datos y Transacciones:**
   - Registro dinámico de componentes especificando su Tipo de Función:
     - **Funciones de Datos:** ILF (*Archivo Lógico Interno*) y EIF (*Archivo de Interfaz Externa*).
     - **Funciones Transaccionales:** EI (*Entrada Externa*), EO (*Salida Externa*) y EQ (*Consulta Externa*).
   - Cálculo automático de la **Complejidad Técnica** (Baja, Media, Alta) y los **Puntos de Función No Ajustados (PFNA)** a partir de los valores ingresados de **RET/FTR** y **DET**.

2. **Evaluación de Características Generales del Sistema (GSC):**
   - Panel interactivo para calificar los 14 factores generales del sistema en una escala de 0 (Inexistente) a 5 (Esencial).
   - Cálculo del **Factor de Ajuste de Valor (VAF)** mediante la fórmula matemática estándar.

3. **Parámetros y Métricas de Gestión del Proyecto:**
   - Configuración de tasas de productividad (Horas/PF) y costo por hora laboral.
   - **Cálculo bidireccional inteligente:** Permite ingresar el tamaño del equipo para calcular la duración, o ingresar la duración esperada para calcular el personal necesario.
   - **Modal de Resultados Centralizado:** Vista limpia de las métricas finales (Esfuerzo total, costo económico estimado y Puntos de Función Ajustados - PFA).

---

## 🛠️ Tecnologías Utilizadas

El proyecto fue desarrollado siguiendo las mejores prácticas de la web moderna, sin dependencias externas ni frameworks pesados para garantizar un rendimiento óptimo:

- **HTML5:** Estructura semántica avanzada (`<header>`, `<main>`, `<aside>`, `<section>`).
- **CSS3:** Diseño responsivo (Layout basado en Grid y Flexbox) con uso de variables CSS para fácil mantenimiento de temas visuales.
- **JavaScript (ES6+):** Arquitectura modular (`type="module"`) para una separación limpia de responsabilidades y manipulación dinámica del DOM de manera reactiva.

---

## 📂 Estructura del Proyecto

```text
├── index.html          # Interfaz de usuario (Estructura y formularios)
├── styles.css          # Estilos visuales, layouts dinámicos y responsive design
└── app.js              # Lógica de cálculo IFPUG, manejo de eventos y modal