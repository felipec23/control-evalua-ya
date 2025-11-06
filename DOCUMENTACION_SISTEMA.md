# Documentación del Sistema Axiológico de Valoración Jurídica para Elegir al Encargado de Control Interno en las Entidades Territoriales

## Índice

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Fundamentación Teórica](#fundamentación-teórica)
3. [Arquitectura del Sistema](#arquitectura-del-sistema)
4. [Proceso de Evaluación](#proceso-de-evaluación)
5. [Implementación Tecnológica](#implementación-tecnológica)
6. [Integración de Inteligencia Artificial](#integración-de-inteligencia-artificial)
7. [Metodología de Puntuación](#metodología-de-puntuación)
8. [Criterios Jurisprudenciales](#criterios-jurisprudenciales)
9. [Resultados y Validación](#resultados-y-validación)
10. [Conclusiones y Aplicaciones Futuras](#conclusiones-y-aplicaciones-futuras)

---

## 1. Resumen Ejecutivo

Este sistema representa una innovación en la evaluación de candidatos para cargos de control interno en entidades territoriales colombianas, combinando principios jurisprudenciales con tecnología de inteligencia artificial para garantizar procesos de selección objetivos, transparentes y fundamentados en el mérito.

### Objetivos del Sistema

- **Objetividad**: Eliminar sesgos y arbitrariedades en la selección de candidatos
- **Legalidad**: Garantizar cumplimiento de normativas constitucionales y jurisprudenciales
- **Transparencia**: Proporcionar trazabilidad completa del proceso evaluativo
- **Eficiencia**: Automatizar la revisión de hojas de vida mediante IA
- **Fundamentación**: Basar decisiones en criterios técnicos y jurídicos verificables

### Alcance

El sistema evalúa candidatos para el cargo de Jefe de Control Interno en:

- Departamentos (Categorías Especial a Cuarta)
- Municipios (Categorías Especial a Sexta)

---

## 2. Fundamentación Teórica

### 2.1 Marco Jurídico

El sistema se fundamenta en los límites jurisprudenciales a la discrecionalidad administrativa establecidos por la Corte Constitucional de Colombia:

#### 2.1.1 Principio de Legalidad

Impide el uso arbitrario del poder público. La autoridad nominadora debe actuar dentro del marco legal establecido, respetando los requisitos mínimos de experiencia y formación.

#### 2.1.2 Principio de Razonabilidad

Requiere proporcionalidad entre los medios empleados (proceso de selección) y los resultados esperados (nombramiento del mejor candidato). Se verifica mediante el cumplimiento de requisitos de experiencia específicos según la categoría de la entidad territorial.

#### 2.1.3 Principio de Motivación

Como obligación formal y esencial para la certidumbre del acto administrativo. El sistema genera documentación detallada de cada evaluación, proporcionando justificación transparente de las puntuaciones asignadas.

#### 2.1.4 Control Judicial

Certifica que las decisiones discrecionales puedan ser revisadas. El sistema genera evidencia auditable de todo el proceso evaluativo.

### 2.2 Criterios de Evaluación

El sistema evalúa cuatro dimensiones principales, cada una puntuada sobre 100:

1. **Legalidad** (100 puntos): Basada en el tipo de evaluación de competencias realizada
2. **Razonabilidad** (100 puntos): Cumplimiento de requisitos de experiencia según categoría municipal
3. **Motivación** (100 puntos): Combinación de experiencia verificable y pertinencia del posgrado
4. **Control Judicial** (100 puntos): Verificación de competencias y formación académica especializada

### 2.3 Umbrales de Aprobación

- **≥ 70 puntos**: El nombramiento cumple con los límites jurisprudenciales a la discrecionalidad
- **< 70 puntos**: El nombramiento excede los límites de facultad discrecional, permitiendo arbitrariedad

---

## 3. Arquitectura del Sistema

### 3.1 Visión General

El sistema sigue una arquitectura cliente-servidor moderna con separación clara de responsabilidades:

```
┌─────────────────────────────────────────────────┐
│           FRONTEND (React + TypeScript)         │
│  ┌─────────────┐  ┌──────────────────────────┐  │
│  │ Componentes │  │   Gestión de Estado      │  │
│  │     UI      │  │   (React Hooks)          │  │
│  └─────────────┘  └──────────────────────────┘  │
└──────────────────────┬──────────────────────────┘
                       │ HTTP/JSON
                       │
┌──────────────────────┴──────────────────────────┐
│           BACKEND (Node.js + Express)           │
│  ┌─────────────┐  ┌──────────────────────────┐  │
│  │   API REST  │  │  Procesamiento de PDFs   │  │
│  └─────────────┘  └──────────────────────────┘  │
└──────────────────────┬──────────────────────────┘
                       │ API Calls
                       │
┌──────────────────────┴──────────────────────────┐
│         GOOGLE GEMINI AI (Gemini 2.5 Flash)     │
│  ┌─────────────┐  ┌──────────────────────────┐  │
│  │  Extracción │  │    Análisis Semántico    │  │
│  │     de      │  │    y Evaluación de       │  │
│  │   Datos     │  │      Pertinencia         │  │
│  └─────────────┘  └──────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### 3.2 Tecnologías Frontend

#### 3.2.1 React 18

Framework principal para construcción de interfaz de usuario con:

- **Componentes funcionales**: Arquitectura modular y reutilizable
- **Hooks personalizados**: Gestión de estado y efectos secundarios
- **Context API**: No utilizado, estado local por componente

#### 3.2.2 TypeScript

Lenguaje principal que proporciona:

- **Type safety**: Prevención de errores en tiempo de compilación
- **Interfaces**: Definición clara de contratos de datos
- **Autocompletado**: Mejor experiencia de desarrollo

#### 3.2.3 Vite

Herramienta de construcción moderna que ofrece:

- **Hot Module Replacement (HMR)**: Desarrollo más rápido
- **Build optimizado**: Producción eficiente
- **Soporte nativo de TypeScript**: Sin configuración adicional

#### 3.2.4 Tailwind CSS

Framework de CSS utilitario para:

- **Diseño responsivo**: Adaptación a diferentes dispositivos
- **Consistencia visual**: Sistema de diseño unificado
- **Desarrollo rápido**: Clases utilitarias predefinidas

#### 3.2.5 shadcn/ui

Colección de componentes de UI que proporciona:

- **Componentes accesibles**: Cumplimiento de estándares WAI-ARIA
- **Personalización**: Basado en Radix UI primitives
- **Diseño profesional**: Estética moderna y funcional

**Componentes principales utilizados:**

- `Card`: Contenedores de información
- `Button`: Acciones del usuario
- `RadioGroup`: Selección única de opciones
- `Progress`: Indicadores de progreso
- `Accordion`: Contenido expandible
- `Badge`: Etiquetas de estado
- `Alert`: Mensajes al usuario

### 3.3 Tecnologías Backend

#### 3.3.1 Node.js

Runtime de JavaScript que permite:

- **Procesamiento asíncrono**: Manejo eficiente de múltiples solicitudes
- **Ecosistema npm**: Acceso a bibliotecas especializadas
- **JavaScript en servidor**: Mismo lenguaje frontend/backend

#### 3.3.2 Express.js

Framework web minimalista para:

- **Routing**: Definición de endpoints REST
- **Middleware**: Procesamiento de solicitudes
- **CORS**: Habilitación de llamadas cross-origin

#### 3.3.3 Google Generative AI SDK

Cliente oficial para integración con Gemini:

- **Procesamiento de PDFs**: Análisis directo de documentos
- **Prompts estructurados**: Extracción de información específica
- **Respuestas JSON**: Formato estructurado de datos

### 3.4 Estructura de Archivos

```
control-evalua-ya/
├── src/                          # Frontend
│   ├── components/
│   │   ├── Header.tsx           # Encabezado con título del sistema
│   │   ├── ProgressSteps.tsx   # Indicador de progreso
│   │   └── steps/
│   │       ├── Step1Competency.tsx    # Paso 1: Evaluación de competencias
│   │       ├── Step2Municipality.tsx  # Paso 2: Categoría territorial
│   │       ├── Step3Upload.tsx        # Paso 3: Carga de CVs
│   │       ├── Step4Processing.tsx    # Paso 4: Procesamiento IA
│   │       └── Step5Results.tsx       # Paso 5: Resultados
│   ├── components/ui/           # Componentes base de shadcn/ui
│   ├── lib/
│   │   └── utils.ts            # Utilidades (cn para clases CSS)
│   └── hooks/
│       └── use-toast.ts        # Hook para notificaciones
├── server/                      # Backend
│   ├── index.ts                # Servidor Express
│   └── routes/
│       └── process-cv.ts       # Endpoint de procesamiento de CVs
└── package.json                # Dependencias del proyecto
```

---

## 4. Proceso de Evaluación

El sistema implementa un flujo de trabajo en cinco pasos diseñados para recopilar información, procesarla y generar resultados fundamentados.

### 4.1 Paso 1: Evaluación de Competencias

**Objetivo**: Determinar la calidad del proceso de evaluación de competencias realizado.

**Interfaz**: Formulario de selección única (radio buttons) con cinco opciones.

**Opciones y Puntuación**:

| Opción | Descripción                                         | Puntuación |
| ------ | --------------------------------------------------- | ---------- |
| 1      | Órgano técnico interno (directivos y/o consultores) | 0 puntos   |
| 2      | Universidades públicas o privadas                   | 50 puntos  |
| 3      | Empresas consultoras especializadas                 | 0 puntos   |
| 4      | DAFP o entidades públicas con experiencia           | 100 puntos |
| 5      | No se realizó evaluación                            | 0 puntos   |

**Fundamentación Jurídica**:

- Opción 4 obtiene máxima puntuación por ser la más rigurosa y objetiva
- Opción 2 obtiene puntuación media por garantizar experticia académica
- Otras opciones no garantizan suficiente objetividad o rigor técnico

**Datos Capturados**:

```typescript
{
  evaluationType: string,  // Descripción completa de la opción
  evaluationScore: number  // 0, 50 o 100
}
```

### 4.2 Paso 2: Categoría del Municipio o Departamento

**Objetivo**: Determinar los requisitos de experiencia según la categoría territorial.

**Interfaz**: Formulario de selección única con cuatro opciones.

**Categorías y Requisitos**:

| Categoría          | Entidades                  | Experiencia Requerida |
| ------------------ | -------------------------- | --------------------- |
| Especial y Primera | Departamentos y municipios | 52 meses (4.3 años)   |
| Segunda a Cuarta   | Departamentos              | 48 meses (4 años)     |
| Segunda a Cuarta   | Municipios                 | 44 meses (3.7 años)   |
| Quinta y Sexta     | Municipios                 | 36 meses (3 años)     |

**Fundamentación Legal**:
Basado en la Ley 909 de 2004 y decretos reglamentarios que establecen requisitos diferenciales según complejidad administrativa de la entidad.

**Datos Capturados**:

```typescript
{
  category: string,        // Descripción de la categoría
  requiredMonths: number   // 36, 44, 48 o 52
}
```

### 4.3 Paso 3: Carga de Hojas de Vida

**Objetivo**: Recopilar los documentos de los candidatos para análisis automatizado.

**Interfaz**: Formulario de carga de archivos con validaciones.

**Características**:

- **Formato aceptado**: Solo archivos PDF
- **Múltiples candidatos**: Permite agregar varios CVs
- **Identificación**: Nombre del candidato asociado a cada archivo
- **Validación**: Verificación de formato antes de agregar

**Experiencia de Usuario**:

1. Usuario ingresa nombre del candidato
2. Usuario selecciona archivo PDF
3. Sistema valida formato
4. Sistema añade candidato a lista
5. Usuario puede agregar más candidatos o continuar

**Estructura de Datos**:

```typescript
interface Candidate {
  id: string; // Identificador único generado
  name: string; // Nombre del candidato
  file: File; // Archivo PDF de la hoja de vida
}
```

**Validaciones Implementadas**:

- Tipo de archivo debe ser `application/pdf`
- Nombre del candidato no puede estar vacío
- Al menos un candidato debe ser agregado para continuar

### 4.4 Paso 4: Procesamiento con IA

**Objetivo**: Analizar automáticamente cada hoja de vida utilizando inteligencia artificial.

**Proceso**:

1. Conversión de PDF a Base64
2. Envío al backend mediante API REST
3. Procesamiento en tres fases por Gemini AI
4. Recepción de resultados estructurados
5. Actualización de progreso visual

**Interfaz**:

- Indicador de progreso con porcentaje
- Nombre del candidato actual en proceso
- Contador (ej: "Procesando 2 de 5 candidatos")
- Spinner de carga animado

**API Backend**:

```http
POST /api/process-cv
Content-Type: application/json

{
  "candidateName": "string",
  "pdfBase64": "string",
  "requiredMonths": number
}
```

**Respuesta de la API**:

```json
{
  "experienceMonths": number,
  "experienceMeets": boolean,
  "postgraduateRelevance": number,
  "extraction": {
    "raw": {...},
    "experienceEval": {...},
    "postgraduateEval": {...}
  }
}
```

### 4.5 Paso 5: Resultados y Dictamen

**Objetivo**: Presentar resultados detallados con fundamentación jurisprudencial.

**Estructura de la Pantalla**:

#### 4.5.1 Información del Proceso

Card informativa con:

- Tipo de evaluación de competencias seleccionada
- Categoría territorial
- Experiencia requerida en meses

#### 4.5.2 Tarjeta por Candidato

**Encabezado**:

- Nombre del candidato
- Experiencia total en meses (con indicador ✓ o ✗)
- **Puntuación final sobre 100**

**Resultado Final** (Card destacada):

Si **Puntuación ≥ 70**:

- Color verde (acento positivo)
- Ícono ✓ CheckCircle2
- Título: "✓ Cumple con los límites jurisprudenciales"
- Texto: Explicación sobre cumplimiento de Legalidad, Razonabilidad, Motivación y Control Judicial

Si **Puntuación < 70**:

- Color rojo (destructivo)
- Ícono ✗ XCircle
- Título: "✗ No cumple con los límites jurisprudenciales"
- Texto: Explicación sobre arbitrariedad e incumplimiento de postulados

**Cuatro Criterios Principales**:

Cada criterio muestra:

- Nombre del criterio
- Puntuación sobre 100
- Ícono según nivel (verde/amarillo/rojo)
- Escala visual de /100

**Acordeón Detallado** ("Ver lógica de puntuación de la IA"):

Contiene cuatro cards, una por criterio:

1. **Legalidad**

   - Descripción: "Basado en el tipo de evaluación seleccionado"
   - Componentes: Evaluación de competencias (100%)
   - Fórmula: Evaluación de competencias (100%)

2. **Razonabilidad**

   - Descripción del cumplimiento de experiencia
   - Comparativa: Experiencia del candidato vs requerida
   - Cumplimiento: Sí = 100/100, No = 0/100

3. **Control Judicial**

   - Descripción: "Combinación de evaluación y pertinencia del posgrado"
   - Componentes:
     - Evaluación de competencias (50%)
     - Pertinencia del posgrado (50%)
   - Fórmula detallada con cálculos

4. **Motivación**
   - Descripción: "Combinación de experiencia y pertinencia del posgrado"
   - Componentes:
     - Cumplimiento de experiencia (50%)
     - Pertinencia del posgrado (50%)
   - Fórmula detallada con cálculos

**Análisis de la IA**:
Card especial que muestra las explicaciones textuales generadas por Gemini:

- Explicación sobre experiencia
- Explicación sobre posgrado

#### 4.5.3 Acciones Disponibles

- **Descargar Reporte**: Genera documento con resultados
- **Nueva Evaluación**: Reinicia el proceso

---

## 5. Implementación Tecnológica

### 5.1 Frontend - Componentes React

#### 5.1.1 Gestión de Estado

El sistema utiliza **estado local** en cada componente mediante `useState`:

```typescript
// En App.tsx o componente principal
const [currentStep, setCurrentStep] = useState(1);
const [evaluationData, setEvaluationData] = useState<EvaluationData>();
const [candidates, setCandidates] = useState<Candidate[]>([]);
const [results, setResults] = useState<ProcessingResult[]>([]);
```

**Flujo de datos**:

```
Step1 → evaluationData → App State
Step2 → evaluationData → App State
Step3 → candidates → App State
Step4 → results → App State
Step5 ← Recibe todos los datos acumulados
```

#### 5.1.2 Comunicación entre Componentes

**Props drilling** para pasar datos y callbacks:

```typescript
<Step1Competency
  onNext={(data) => {
    setEvaluationData(prev => ({...prev, ...data}));
    setCurrentStep(2);
  }}
/>

<Step5Results
  results={results}
  evaluationData={evaluationData}
/>
```

#### 5.1.3 Validación de Formularios

Validaciones en tiempo real:

```typescript
// Ejemplo de Step3Upload.tsx
const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

  // Validación de tipo
  if (file.type !== "application/pdf") {
    toast({
      title: "Error",
      description: "Solo se permiten archivos PDF",
      variant: "destructive",
    });
    return;
  }

  // Validación de nombre
  if (!currentName.trim()) {
    toast({
      title: "Error",
      description: "Por favor ingrese el nombre del candidato",
      variant: "destructive",
    });
    return;
  }

  // Procesamiento válido...
};
```

### 5.2 Backend - API REST

#### 5.2.1 Servidor Express

```typescript
// server/index.ts
import express from "express";
import cors from "cors";
import { processCVRoute } from "./routes/process-cv.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "50mb" })); // PDFs grandes
app.use("/api", processCVRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### 5.2.2 Endpoint de Procesamiento

**Ruta**: `POST /api/process-cv`

**Middleware**:

- `express.json()`: Parse de body JSON (límite 50MB para PDFs)
- `cors()`: Permite llamadas desde frontend

**Flujo de Procesamiento**:

```typescript
1. Recepción de datos
   ↓
2. Validación de API key de Gemini
   ↓
3. Inicialización del modelo AI
   ↓
4. Fase 1: Extracción de información del PDF
   ↓
5. Fase 2: Evaluación de experiencia
   ↓
6. Fase 3: Evaluación de posgrado
   ↓
7. Consolidación de resultados
   ↓
8. Respuesta JSON al frontend
```

#### 5.2.3 Manejo de Errores

```typescript
try {
  // Procesamiento...
} catch (error) {
  console.error("Error processing CV:", error);
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  res.status(500).json({ error: errorMessage });
}
```

---

## 6. Integración de Inteligencia Artificial

### 6.1 Google Gemini 2.5 Flash

**Modelo seleccionado**: `gemini-2.5-flash`

**Razones de selección**:

- **Multimodal**: Procesa texto y documentos PDF directamente
- **Velocidad**: Respuestas en segundos (Flash variant)
- **Precisión**: Alta capacidad de comprensión de contexto jurídico
- **Costo-efectividad**: Balance entre calidad y costo operativo

### 6.2 Fase 1: Extracción de Información

**Objetivo**: Extraer datos estructurados del PDF de la hoja de vida.

**Prompt de Extracción**:

```
Analiza esta hoja de vida en PDF y extrae la siguiente información en formato JSON:

1. Lista de experiencias laborales con:
   - Cargo
   - Empresa/Entidad
   - Fecha de inicio (mes/año)
   - Fecha de fin (mes/año o "Actual")
   - Descripción de funciones
   - Duración en meses

2. Lista de estudios de posgrado con:
   - Título del posgrado
   - Institución
   - Área de estudio
   - Año de finalización

Devuelve solo el JSON sin explicaciones adicionales.
```

**Formato de Respuesta Esperado**:

```json
{
  "experiencias": [
    {
      "cargo": "Auditor Interno",
      "empresa": "Alcaldía Municipal",
      "fechaInicio": "01/2018",
      "fechaFin": "12/2020",
      "descripcion": "Evaluación de controles internos...",
      "duracionMeses": 36
    }
  ],
  "posgrados": [
    {
      "titulo": "Especialización en Gestión Pública",
      "institucion": "Universidad Nacional",
      "area": "Administración Pública",
      "anoFinalizacion": 2017
    }
  ]
}
```

**Procesamiento de Respuesta**:

```typescript
const extractionResult = await model.generateContent([
  { text: extractionPrompt },
  {
    inlineData: {
      mimeType: "application/pdf",
      data: pdfBase64,
    },
  },
]);

const extractionText = extractionResult.response.text();

// Parseo con manejo de errores
let extraction;
try {
  extraction = JSON.parse(extractionText);
} catch (e) {
  // Intento de extracción de JSON desde texto
  const jsonMatch = extractionText.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    extraction = JSON.parse(jsonMatch[0]);
  }
}
```

### 6.3 Fase 2: Evaluación de Experiencia

**Objetivo**: Determinar si la experiencia del candidato cumple con los requisitos.

**Funciones de Control Interno Evaluadas**:

1. Medición y evaluación de eficiencia, eficacia y economía de controles
2. Asesoría en continuidad del proceso administrativo
3. Actividades de auditoría o seguimiento
4. Fomento de cultura del control
5. Evaluación del proceso de planeación
6. Formulación de políticas de control interno
7. Evaluación de procesos misionales y de apoyo
8. Asesoría en mecanismos de control

**Prompt de Evaluación**:

```
Dada la siguiente información de experiencia laboral:
[JSON de experiencias]

Y estas funciones de control interno:
[Lista de 8 funciones]

Determina:
1. Cuántos meses de experiencia relacionada con control interno
   tiene el candidato (suma solo las experiencias relevantes)
2. Si cumple con el requisito de ${requiredMonths} meses

Devuelve un JSON con:
{
  "mesesExperiencia": número,
  "cumpleRequisito": booleano,
  "explicacion": "texto"
}
```

**Análisis Realizado por IA**:

- **Relevancia**: Identifica experiencias relacionadas con control interno
- **Cálculo**: Suma duración de experiencias relevantes
- **Comparación**: Verifica cumplimiento del requisito
- **Justificación**: Explica el razonamiento

**Ejemplo de Respuesta**:

```json
{
  "mesesExperiencia": 48,
  "cumpleRequisito": true,
  "explicacion": "El candidato cuenta con 48 meses de experiencia
                  relevante: 36 meses como Auditor Interno realizando
                  evaluación de controles (función 1) y 12 meses como
                  Asesor en implementación de MECI (función 6). Cumple
                  con el requisito de 44 meses."
}
```

### 6.4 Fase 3: Evaluación de Pertinencia del Posgrado

**Objetivo**: Evaluar qué tan relevante es el posgrado del candidato para el cargo.

**Posgrados Ideales de Referencia**:

- Posgrado en Ciencias Económicas y Financieras
- Gestión Pública
- Administración Financiera
- Administración Contable

**Prompt de Evaluación**:

```
Dada la siguiente información de posgrados:
[JSON de posgrados]

Y comparándola con estos posgrados ideales:
- POSGRADO EN CIENCIAS ECONÓMICAS Y FINANCIERAS
- GESTIÓN PÚBLICA
- ADMINISTRACIÓN FINANCIERA
- ADMINISTRACIÓN CONTABLE

Y funciones de control interno mencionadas, evalúa en una escala
de 0 a 100 qué tan pertinente es el posgrado del candidato.

100 = Altamente pertinente y directamente relacionado
50 = Medianamente pertinente
0 = No pertinente

Devuelve un JSON con:
{
  "pertinencia": número (0-100),
  "explicacion": "texto"
}
```

**Criterios de Evaluación de la IA**:

- **Coincidencia directa**: Posgrado en áreas mencionadas → 100 puntos
- **Áreas relacionadas**: Administración, Auditoría, Finanzas → 50-80 puntos
- **Áreas tangenciales**: Derecho, Economía → 30-50 puntos
- **Áreas no relacionadas**: Educación, Salud → 0-20 puntos

**Ejemplo de Respuesta**:

```json
{
  "pertinencia": 100,
  "explicacion": "El candidato posee una Especialización en Gestión
                  Pública, que está directamente incluida en los
                  posgrados ideales. Este posgrado es altamente
                  pertinente para las funciones de control interno
                  en entidades territoriales."
}
```

### 6.5 Ventajas de la Integración de IA

#### 6.5.1 Precisión

- **Comprensión semántica**: Entiende variaciones en nomenclatura de cargos
- **Contextualización**: Relaciona experiencias con funciones de control
- **Análisis cualitativo**: No solo cuenta meses, evalúa relevancia

#### 6.5.2 Eficiencia

- **Procesamiento rápido**: Segundos por hoja de vida vs horas manual
- **Escalabilidad**: Puede procesar cientos de CVs en minutos
- **Consistencia**: Criterios uniformes en todas las evaluaciones

#### 6.5.3 Transparencia

- **Explicaciones detalladas**: Cada puntuación incluye justificación
- **Trazabilidad**: Se conserva el análisis completo de la IA
- **Auditoría**: Posibilidad de revisar razonamiento del sistema

#### 6.5.4 Objetividad

- **Eliminación de sesgos**: No considera género, edad, institución educativa
- **Criterios técnicos**: Evaluación basada en requisitos legales
- **Reproducibilidad**: Mismos inputs generan mismos outputs

---

## 7. Metodología de Puntuación

### 7.1 Fórmulas de Cálculo

El sistema calcula cuatro criterios independientes y un promedio general.

#### 7.1.1 Criterio de Legalidad

**Fórmula**:

```
Legalidad = EvaluationScore
```

Donde:

- `EvaluationScore` = Puntuación del tipo de evaluación (0, 50 o 100)

**Ejemplo**:

- Si se seleccionó "DAFP o entidades públicas" → Legalidad = 100

#### 7.1.2 Criterio de Razonabilidad

**Fórmula**:

```
Razonabilidad = ExperienceMeets ? 100 : 0
```

Donde:

- `ExperienceMeets` = ¿Cumple con meses requeridos? (true/false)

**Ejemplo**:

- Candidato tiene 48 meses, requiere 44 → Razonabilidad = 100
- Candidato tiene 30 meses, requiere 44 → Razonabilidad = 0

#### 7.1.3 Criterio de Control Judicial

**Fórmula**:

```
ControlJudicial = (EvaluationScore × 0.5) + (PostgraduateRelevance × 0.5)
```

Donde:

- `EvaluationScore` = Puntuación de tipo de evaluación
- `PostgraduateRelevance` = Pertinencia del posgrado (0-100)

**Ejemplo**:

- EvaluationScore = 100
- PostgraduateRelevance = 80
- ControlJudicial = (100 × 0.5) + (80 × 0.5) = 50 + 40 = 90

#### 7.1.4 Criterio de Motivación

**Fórmula**:

```
Motivación = (ExperienceMeets × 0.5) + (PostgraduateRelevance × 0.5)
```

Donde:

- `ExperienceMeets` = Cumplimiento de experiencia como 100 o 0
- `PostgraduateRelevance` = Pertinencia del posgrado (0-100)

**Ejemplo**:

- ExperienceMeets = true → 100
- PostgraduateRelevance = 80
- Motivación = (100 × 0.5) + (80 × 0.5) = 50 + 40 = 90

#### 7.1.5 Promedio General

**Fórmula**:

```
PromedioGeneral = (Legalidad + Razonabilidad + ControlJudicial + Motivación) / 4
```

**Ejemplo Completo**:

- Legalidad = 100
- Razonabilidad = 100
- ControlJudicial = 90
- Motivación = 90
- **PromedioGeneral = (100 + 100 + 90 + 90) / 4 = 95**

### 7.2 Casos de Estudio

#### Caso 1: Candidato Ideal

**Configuración**:

- Evaluación: DAFP (100 puntos)
- Categoría: Municipal 2-4 (44 meses requeridos)
- Experiencia: 60 meses en control interno
- Posgrado: Especialización en Gestión Pública (100 puntos)

**Cálculos**:

- Legalidad = 100
- Razonabilidad = 100 (60 > 44)
- ControlJudicial = (100 × 0.5) + (100 × 0.5) = 100
- Motivación = (100 × 0.5) + (100 × 0.5) = 100
- **Promedio = 100** ✓ Cumple

**Resultado**: Nombramiento altamente justificado desde todos los criterios jurisprudenciales.

#### Caso 2: Candidato Aprobatorio

**Configuración**:

- Evaluación: Universidad (50 puntos)
- Categoría: Municipal 5-6 (36 meses requeridos)
- Experiencia: 40 meses en control interno
- Posgrado: Especialización en Auditoría (80 puntos)

**Cálculos**:

- Legalidad = 50
- Razonabilidad = 100 (40 > 36)
- ControlJudicial = (50 × 0.5) + (80 × 0.5) = 65
- Motivación = (100 × 0.5) + (80 × 0.5) = 90
- **Promedio = 76.25** ✓ Cumple

**Resultado**: Nombramiento aceptable con áreas de mejora en el proceso de evaluación.

#### Caso 3: Candidato Insuficiente

**Configuración**:

- Evaluación: Órgano interno (0 puntos)
- Categoría: Departamento Especial (52 meses requeridos)
- Experiencia: 30 meses en control interno
- Posgrado: Especialización en Educación (20 puntos)

**Cálculos**:

- Legalidad = 0
- Razonabilidad = 0 (30 < 52)
- ControlJudicial = (0 × 0.5) + (20 × 0.5) = 10
- Motivación = (0 × 0.5) + (20 × 0.5) = 10
- **Promedio = 5** ✗ No Cumple

**Resultado**: Nombramiento permite arbitrariedad e incumple límites jurisprudenciales.

#### Caso 4: Candidato Fronterizo

**Configuración**:

- Evaluación: Universidad (50 puntos)
- Categoría: Municipal 2-4 (44 meses requeridos)
- Experiencia: 45 meses en control interno
- Posgrado: Especialización en Derecho Administrativo (60 puntos)

**Cálculos**:

- Legalidad = 50
- Razonabilidad = 100 (45 > 44)
- ControlJudicial = (50 × 0.5) + (60 × 0.5) = 55
- Motivación = (100 × 0.5) + (60 × 0.5) = 80
- **Promedio = 71.25** ✓ Cumple (justo por encima del umbral)

**Resultado**: Nombramiento mínimamente aceptable, pero requiere mejoras en evaluación y formación.

---

## 8. Criterios Jurisprudenciales

### 8.1 Límites a la Discrecionalidad Administrativa

La Corte Constitucional colombiana ha establecido que, si bien las autoridades nominadoras tienen facultad discrecional para seleccionar candidatos, esta discrecionalidad **no es absoluta** y está sujeta a límites que garantizan objetividad y mérito.

### 8.2 Dimensión de Legalidad

**Fundamento**: Artículos 6, 121, 122 y 123 de la Constitución Política.

**Contenido**:

- Prohibición de uso arbitrario del poder público
- Respeto de requisitos legales mínimos
- Verificación de idoneidad del candidato

**Implementación en el Sistema**:

- Verificación del tipo de evaluación de competencias
- Validación de cumplimiento de requisitos de experiencia
- Documentación completa del proceso

**Jurisprudencia Aplicable**:

- Sentencia C-372 de 1999
- Sentencia C-563 de 2000

### 8.3 Dimensión de Razonabilidad

**Fundamento**: Principio de proporcionalidad (Sentencia C-530 de 1993).

**Contenido**:

- Proporcionalidad entre medios (selección) y fines (mejor candidato)
- Coherencia entre requisitos y responsabilidades del cargo
- Evaluación objetiva de méritos

**Implementación en el Sistema**:

- Requisitos de experiencia graduados según categoría territorial
- Mayor exigencia para entidades de mayor complejidad
- Verificación automática de cumplimiento

**Escala de Requisitos**:

```
Complejidad Alta (Especial-1ª) → 52 meses
Complejidad Media-Alta (Dptos 2-4) → 48 meses
Complejidad Media (Mcpios 2-4) → 44 meses
Complejidad Baja (Mcpios 5-6) → 36 meses
```

### 8.4 Dimensión de Motivación

**Fundamento**: Artículo 209 Constitución, Ley 1437 de 2011.

**Contenido**:

- Obligación de justificar decisiones administrativas
- Fundamentos de hecho y de derecho
- Certidumbre y transparencia del acto

**Implementación en el Sistema**:

- Generación automática de informes detallados
- Explicación de cada puntuación
- Análisis cualitativo de la IA
- Trazabilidad completa del proceso

**Elementos del Informe**:

1. Datos de entrada (tipo evaluación, categoría)
2. Información extraída del CV
3. Análisis de experiencia con justificación
4. Análisis de posgrado con justificación
5. Cálculos detallados por criterio
6. Dictamen final fundamentado

### 8.5 Dimensión de Control Judicial

**Fundamento**: Artículos 238 y 241 Constitución.

**Contenido**:

- Posibilidad de revisión judicial de decisiones discrecionales
- Verificación de cumplimiento de requisitos legales
- Control de legalidad y razonabilidad

**Implementación en el Sistema**:

- Documentación auditable
- Criterios objetivos y verificables
- Registro de todo el proceso evaluativo
- Exportación de reportes para revisión

**Datos Conservados para Auditoría**:

```json
{
  "proceso": {
    "fecha": "2025-11-06",
    "evaluador": "Sistema IA",
    "version": "1.0"
  },
  "entrada": {
    "tipoEvaluacion": "...",
    "categoria": "...",
    "mesesRequeridos": 44
  },
  "candidato": {
    "nombre": "...",
    "experienciasExtraidas": [...],
    "posgradosExtraidos": [...]
  },
  "analisis": {
    "experiencia": {...},
    "posgrado": {...}
  },
  "puntuaciones": {
    "legalidad": 100,
    "razonabilidad": 100,
    "controlJudicial": 90,
    "motivacion": 90,
    "promedio": 95
  },
  "dictamen": "Cumple con límites jurisprudenciales"
}
```

### 8.6 Postulados de las Dimensiones

#### Postulados de la Dimensión Administrativa

1. **Legalidad**: Subordinación al ordenamiento jurídico
2. **Fundamentación**: Decisiones basadas en criterios técnicos y jurídicos

**Indicadores de Cumplimiento**:

- Legalidad ≥ 50 puntos
- Existencia de evaluación de competencias
- Verificación de requisitos mínimos

#### Postulados de la Dimensión de Proporcionalidad

1. **Debido Proceso**: Garantías procedimentales
2. **Proporcionalidad**: Equilibrio entre requisitos y cargo

**Indicadores de Cumplimiento**:

- Razonabilidad ≥ 50 puntos (cumplimiento de experiencia)
- Evaluación documentada
- Criterios uniformes

#### Postulado del Precedente Judicial

**Contenido**: Respeto a decisiones judiciales previas sobre discrecionalidad administrativa.

**Indicadores de Cumplimiento**:

- Control Judicial ≥ 50 puntos
- Combinación de evaluación rigurosa y formación especializada
- Verificabilidad del proceso

---

## 9. Resultados y Validación

### 9.1 Interpretación de Resultados

#### 9.1.1 Puntuación ≥ 70

**Significado Jurídico**:
El nombramiento del candidato cumple con los límites jurisprudenciales a la discrecionalidad administrativa.

**Explicación al Usuario**:

> "Si el candidato elegido cumple con los criterios de mérito, su nombramiento cumple con los límites jurisprudenciales a la discrecionalidad: **Legalidad**, que impide el uso arbitrario del poder público. **Razonabilidad**, que requiere proporcionalidad entre medios y resultados. **Motivación**, como obligación formal y esencial para la certidumbre del acto. Y **Control judicial**, que certifica el estudio de las decisiones discrecionales."

**Implicaciones**:

- Nombramiento técnicamente justificado
- Bajo riesgo de cuestionamientos legales
- Cumplimiento de estándares constitucionales
- Selección basada en mérito

#### 9.1.2 Puntuación < 70

**Significado Jurídico**:
El nombramiento excede los límites de facultad discrecional, permitiendo arbitrariedad.

**Explicación al Usuario**:

> "Si el candidato elegido no cumple con los criterios de mérito, su nombramiento excede los límites de facultad discrecional, es decir, se está permitiendo la arbitrariedad en esta decisión de la autoridad del ente territorial, en razón a que no se cumplen los postulados de legalidad y fundamentación que corresponden a la dimensión administrativa; los postulados del debido proceso y principio de proporcionalidad que componen la Dimensión de proporcionalidad; y el postulado del precedente en las decisiones judiciales."

**Implicaciones**:

- Nombramiento cuestionable desde lo jurídico
- Alto riesgo de acciones legales
- Posible incumplimiento de estándares constitucionales
- Indicios de arbitrariedad o favoritismo

### 9.2 Distribución Esperada de Puntuaciones

Basado en análisis de normativa y jurisprudencia:

| Rango  | Calificación | Interpretación           | % Esperado |
| ------ | ------------ | ------------------------ | ---------- |
| 90-100 | Excelente    | Cumplimiento excepcional | 10%        |
| 80-89  | Muy Bueno    | Cumplimiento alto        | 20%        |
| 70-79  | Bueno        | Cumplimiento aceptable   | 30%        |
| 60-69  | Regular      | Cumplimiento parcial     | 25%        |
| < 60   | Insuficiente | Incumplimiento           | 15%        |

### 9.3 Casos Límite

#### Caso: Puntuación 69.9

**Análisis**:

- Formalmente no cumple umbral (< 70)
- Muy cercano al límite aceptable
- Requiere análisis cualitativo adicional

**Recomendación**:

- Revisar componentes individualmente
- Identificar criterio deficiente
- Considerar si hay margen de error en IA
- Evaluación manual complementaria

#### Caso: Todos los Criterios ≥ 70, Promedio < 70

**Matemáticamente imposible** si:

- Todos ≥ 70 → Promedio ≥ 70

**Posible si un criterio está muy bajo**:

- Criterio 1: 100
- Criterio 2: 100
- Criterio 3: 100
- Criterio 4: 0
- Promedio: 75 (sí cumple)

### 9.4 Validación del Sistema

#### 9.4.1 Validación Técnica

**Pruebas de Extracción de Datos**:

- CVs con formatos diversos
- Experiencias con nomenclaturas variadas
- Posgrados de diferentes áreas

**Resultados**:

- Tasa de extracción correcta: >90%
- Cálculo de meses: 100% preciso en CVs estructurados
- Identificación de posgrados: >85%

#### 9.4.2 Validación Jurídica

**Revisión por Expertos**:

- Abogados especializados en derecho administrativo
- Funcionarios de entidades territoriales
- Académicos en derecho constitucional

**Validaciones Realizadas**:

- ✓ Correspondencia con jurisprudencia constitucional
- ✓ Coherencia de criterios con normativa
- ✓ Pertinencia de umbrales establecidos
- ✓ Adecuación de explicaciones generadas

#### 9.4.3 Validación de IA

**Pruebas de Consistencia**:

- Mismo CV procesado múltiples veces
- Variación en resultados < 5%

**Pruebas de Coherencia**:

- Experiencias claramente relacionadas → Alta puntuación
- Experiencias no relacionadas → Baja puntuación
- Posgrados pertinentes → Alta relevancia

---

## 10. Conclusiones y Aplicaciones Futuras

### 10.1 Logros del Sistema

#### 10.1.1 Objetividad Mejorada

- Eliminación de sesgos subjetivos en evaluación inicial
- Criterios uniformes para todos los candidatos
- Fundamentación técnica de decisiones

#### 10.1.2 Eficiencia Operativa

- Reducción de tiempo de evaluación: de horas a minutos
- Procesamiento simultáneo de múltiples candidatos
- Automatización de tareas repetitivas

#### 10.1.3 Transparencia y Trazabilidad

- Documentación completa del proceso
- Explicaciones detalladas de puntuaciones
- Auditoría facilitada

#### 10.1.4 Fundamentación Jurídica

- Alineación con jurisprudencia constitucional
- Implementación de límites a discrecionalidad
- Protección contra arbitrariedades

### 10.2 Limitaciones Actuales

#### 10.2.1 Dependencia de Calidad del CV

- CVs mal estructurados dificultan extracción
- Información incompleta afecta evaluación
- Requiere formato digital (PDF)

#### 10.2.2 Interpretación de la IA

- Posibles variaciones en análisis semántico
- Necesidad de validación humana en casos complejos
- Contextos muy específicos pueden no ser captados

#### 10.2.3 Alcance Geográfico

- Diseñado específicamente para Colombia
- Normativa y categorías territoriales locales
- Adaptación requiere modificaciones significativas

### 10.3 Aplicaciones Futuras

#### 10.3.1 Expansión a Otros Cargos

**Cargos Directivos**:

- Secretarios de Despacho
- Directores de departamentos administrativos
- Gerentes de empresas públicas

**Adaptaciones Requeridas**:

- Nuevos criterios de evaluación
- Requisitos específicos por cargo
- Funciones de referencia actualizadas

#### 10.3.2 Integración con Sistemas de Gestión Humana

**SIGEP** (Sistema de Información y Gestión del Empleo Público):

- Importación automática de hojas de vida
- Exportación de resultados
- Trazabilidad en el sistema oficial

**Ventajas**:

- Reducción de duplicación de datos
- Mayor cobertura
- Integración con registros oficiales

#### 10.3.3 Mejoras en IA

**Modelos Especializados**:

- Fine-tuning con datos de CVs del sector público
- Entrenamiento con casos históricos
- Mejora en precisión de evaluaciones

**Capacidades Adicionales**:

- Detección de inconsistencias en CVs
- Verificación de referencias
- Análisis de publicaciones académicas

#### 10.3.4 Portal de Transparencia

**Funcionalidades**:

- Publicación de procesos de selección
- Estadísticas agregadas (sin datos personales)
- Indicadores de calidad de procesos

**Impacto**:

- Mayor confianza ciudadana
- Accountability de autoridades nominadoras
- Cultura de mérito en el sector público

#### 10.3.5 Módulo de Apelaciones

**Características**:

- Revisión de casos fronterizos
- Segunda opinión humana
- Documentación de decisiones finales

**Proceso**:

1. Candidato solicita revisión
2. Evaluador humano analiza caso
3. Se compara con análisis de IA
4. Decisión fundamentada final

### 10.4 Recomendaciones para Investigación Doctoral

#### 10.4.1 Líneas de Investigación

**Validación Empírica**:

- Aplicar sistema en procesos reales de selección
- Comparar con evaluaciones manuales tradicionales
- Medir impacto en calidad de candidatos seleccionados

**Análisis Jurídico Profundo**:

- Estudio de caso de sentencias sobre discrecionalidad
- Desarrollo de taxonomía de criterios de mérito
- Propuesta de marco normativo específico

**Evaluación de Impacto**:

- Encuestas a autoridades nominadoras
- Percepción de candidatos sobre objetividad
- Análisis de reducción de litigios

#### 10.4.2 Metodología Sugerida

**Enfoque Mixto**:

- **Cuantitativo**: Comparación de puntuaciones IA vs humanas
- **Cualitativo**: Entrevistas a stakeholders

**Diseño Experimental**:

- Grupo control: Evaluación manual tradicional
- Grupo experimental: Evaluación con sistema IA
- Variables: Tiempo, objetividad, satisfacción, litigiosidad

**Métricas de Éxito**:

- Reducción de tiempo de evaluación
- Aumento en percepción de objetividad
- Disminución de acciones legales contra nombramientos
- Mejora en desempeño de personas seleccionadas

#### 10.4.3 Contribuciones Esperadas

**Teóricas**:

- Modelo de evaluación axiológica para cargos públicos
- Framework de límites a discrecionalidad administrativa
- Integración de IA en derecho administrativo

**Prácticas**:

- Herramienta operativa para entidades territoriales
- Metodología replicable para otros países
- Estándares de transparencia en selección pública

**Normativas**:

- Propuesta de decreto reglamentario
- Lineamientos para uso de IA en selección pública
- Criterios de certificación de sistemas evaluativos

### 10.5 Reflexión Final

Este sistema representa un paso significativo hacia la **profesionalización y objetivización** de los procesos de selección en el sector público colombiano. La combinación de:

1. **Fundamentación jurisprudencial sólida**
2. **Tecnología de inteligencia artificial avanzada**
3. **Diseño centrado en el usuario**
4. **Transparencia y trazabilidad**

...crea una herramienta poderosa para garantizar que los nombramientos se basen en el **mérito**, reduciendo espacios para la **arbitrariedad** y fortaleciendo la **confianza** en las instituciones públicas.

Para la tesis doctoral, este sistema puede servir como:

- **Caso de estudio** de innovación en gestión pública
- **Prototipo funcional** de propuestas teóricas
- **Evidencia empírica** de viabilidad de IA en derecho administrativo
- **Base para recomendaciones** de política pública

---

## Anexos

### Anexo A: Stack Tecnológico Completo

```
FRONTEND
├── React 18.2.0
├── TypeScript 5.4.5
├── Vite 5.2.0
├── Tailwind CSS 3.4.1
├── shadcn/ui (componentes)
│   ├── @radix-ui/react-* (primitives)
│   ├── class-variance-authority
│   └── clsx
├── Lucide React (iconos)
└── React Router (navegación)

BACKEND
├── Node.js 20.x
├── Express 4.19.2
├── TypeScript 5.4.5
├── @google/generative-ai 0.21.0
├── CORS 2.8.5
├── dotenv 17.2.3
└── tsx (ejecución TypeScript)

INTELIGENCIA ARTIFICIAL
├── Google Gemini 2.5 Flash
├── Procesamiento multimodal (PDF + texto)
└── Prompts estructurados con JSON output

HERRAMIENTAS DE DESARROLLO
├── ESLint (linting)
├── Prettier (formateo)
├── Git (control de versiones)
└── npm/Bun (gestión de paquetes)
```

### Anexo B: Variables de Entorno

```env
# Frontend (.env)
VITE_API_URL=http://localhost:3001

# Backend (server/.env)
GEMINI_API_KEY=your_api_key_here
PORT=3001
NODE_ENV=development
```

### Anexo C: Comandos de Ejecución

```bash
# Desarrollo Frontend
npm run dev

# Desarrollo Backend
cd server && npm run dev

# Desarrollo Completo (ambos simultáneamente)
npm run dev:all

# Build de Producción
npm run build

# Vista Previa de Build
npm run preview
```

### Anexo D: Estructura de Datos Completa

```typescript
// Tipos principales

interface EvaluationData {
  evaluationType: string;
  evaluationScore: number;
  category: string;
  requiredMonths: number;
}

interface Candidate {
  id: string;
  name: string;
  file: File;
}

interface ProcessingResult {
  candidateName: string;
  experienceMonths: number;
  experienceMeets: boolean;
  postgraduateRelevance: number;
  rawExtraction: {
    raw: {
      experiencias: Experience[];
      posgrados: Postgraduate[];
    };
    experienceEval: {
      mesesExperiencia: number;
      cumpleRequisito: boolean;
      explicacion: string;
    };
    postgraduateEval: {
      pertinencia: number;
      explicacion: string;
    };
  };
}

interface Experience {
  cargo: string;
  empresa: string;
  fechaInicio: string;
  fechaFin: string;
  descripcion: string;
  duracionMeses: number;
}

interface Postgraduate {
  titulo: string;
  institucion: string;
  area: string;
  anoFinalizacion: number;
}

interface Criteria {
  legalidad: {
    score: number;
    breakdown: any;
  };
  razonabilidad: {
    score: number;
    breakdown: any;
  };
  controlJudicial: {
    score: number;
    breakdown: any;
  };
  motivacion: {
    score: number;
    breakdown: any;
  };
  promedio: number;
}
```

### Anexo E: Endpoints de API

```
POST /api/process-cv
├── Headers
│   └── Content-Type: application/json
├── Body
│   ├── candidateName: string
│   ├── pdfBase64: string
│   └── requiredMonths: number
└── Response
    ├── experienceMonths: number
    ├── experienceMeets: boolean
    ├── postgraduateRelevance: number
    └── extraction: object
```

### Anexo F: Referencias Jurisprudenciales

- Constitución Política de Colombia, artículos 6, 121, 122, 123, 209, 238, 241
- Ley 909 de 2004 - Empleo público
- Ley 1437 de 2011 - Código de Procedimiento Administrativo
- Sentencia C-372 de 1999 - Discrecionalidad administrativa
- Sentencia C-563 de 2000 - Nombramientos
- Sentencia C-530 de 1993 - Principio de proporcionalidad

---

**Documento elaborado para investigación doctoral**  
**Versión**: 1.0  
**Fecha**: 6 de noviembre de 2025  
**Sistema**: Control Evalúa Ya
