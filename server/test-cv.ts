import { readFileSync, existsSync } from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";

// Load environment variables from .env file
config();

// Get API key from environment or command line
const apiKey = process.env.GEMINI_API_KEY || process.argv[3];

if (!apiKey) {
  console.error("❌ Error: GEMINI_API_KEY is required");
  console.log("Usage: npm run test:pdf <path-to-pdf> <api-key>");
  console.log("   or: GEMINI_API_KEY=xxx npm run test:pdf <path-to-pdf>");
  process.exit(1);
}

const pdfPath = process.argv[2];

if (!pdfPath) {
  console.error("❌ Error: PDF path is required");
  console.log("Usage: npm run test:pdf <path-to-pdf>");
  process.exit(1);
}

console.log("🔍 Testing CV Processing");
console.log("========================\n");
console.log(`📄 PDF: ${pdfPath}`);
console.log(`🔑 API Key: ${apiKey.substring(0, 10)}...`);
console.log("\n");

async function testCV() {
  try {
    // Read PDF file
    console.log("📖 Reading PDF file...");
    const pdfBuffer = readFileSync(pdfPath);
    const pdfBase64 = pdfBuffer.toString("base64");
    console.log(
      `✅ PDF loaded (${(pdfBase64.length / 1024).toFixed(2)} KB base64)\n`
    );

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Step 1: Extract information
    console.log("🤖 Step 1: Extracting information from CV...");
    const extractionPrompt = `Analiza esta hoja de vida en PDF y extrae la siguiente información en formato JSON:

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

Devuelve solo el JSON sin explicaciones adicionales. El formato debe ser:
{
  "experiencias": [{"cargo": "...", "empresa": "...", "fechaInicio": "MM/AAAA", "fechaFin": "MM/AAAA", "descripcion": "...", "duracionMeses": 0}],
  "posgrados": [{"titulo": "...", "institucion": "...", "area": "...", "anoFinalizacion": 0}]
}`;

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
    console.log("📋 Raw extraction response:");
    console.log(extractionText);
    console.log("\n");

    let extraction;
    try {
      extraction = JSON.parse(extractionText);
    } catch (e) {
      const jsonMatch = extractionText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        extraction = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse extraction result");
      }
    }

    console.log("✅ Extracted data:");
    console.log(JSON.stringify(extraction, null, 2));
    console.log("\n");

    // Step 2: Evaluate experience
    console.log("🤖 Step 2: Evaluating experience compliance...");
    const requiredMonths = 24;
    const experienceEvalPrompt = `Dada la siguiente información de experiencia laboral:

${JSON.stringify(extraction.experiencias || [], null, 2)}

Y estas funciones de control interno:
1. Medición y evaluación permanente de la eficiencia, eficacia y economía de los controles del Sistemas de Control Interno.
2. Asesoría en la continuidad del proceso administrativo, la revaluación de planes e introducción de correctivos necesarios para el cumplimiento de las metas u objetivos previstos.
3. Actividades de auditoría o seguimiento.
4. Actividades relacionadas con el fomento de la cultura del control.
5. Evaluación del proceso de planeación, en toda su extensión.
6. Formulación, evaluación e implementación de políticas de control interno.
7. Evaluación de los procesos misionales y de apoyo, adoptados y utilizados por la entidad.
8. Asesoría y acompañamiento a las dependencias en la definición y establecimiento de mecanismos de control.

Determina:
1. Cuántos meses de experiencia relacionada con control interno tiene el candidato (suma solo las experiencias relevantes)
2. Si cumple con el requisito de ${requiredMonths} meses

Devuelve un JSON con: { "mesesExperiencia": número, "cumpleRequisito": booleano, "explicacion": "texto" }`;

    const experienceResult = await model.generateContent(experienceEvalPrompt);
    const experienceText = experienceResult.response.text();

    let experienceEval;
    try {
      experienceEval = JSON.parse(experienceText);
    } catch (e) {
      const jsonMatch = experienceText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        experienceEval = JSON.parse(jsonMatch[0]);
      } else {
        experienceEval = {
          mesesExperiencia: 0,
          cumpleRequisito: false,
          explicacion: "Error en evaluación",
        };
      }
    }

    console.log("✅ Experience evaluation:");
    console.log(JSON.stringify(experienceEval, null, 2));
    console.log("\n");

    // Step 3: Evaluate postgraduate
    console.log("🤖 Step 3: Evaluating postgraduate relevance...");
    const postgraduateEvalPrompt = `Dada la siguiente información de posgrados:

${JSON.stringify(extraction.posgrados || [], null, 2)}

Y comparándola con estos posgrados ideales:
- POSGRADO EN CIENCIAS ECONÓMICAS Y FINANCIERAS
- GESTIÓN PÚBLICA
- ADMINISTRACIÓN FINANCIERA
- ADMINISTRACIÓN CONTABLE

Y funciones de control interno mencionadas anteriormente, evalúa en una escala de 0 a 100 qué tan pertinente es el posgrado del candidato.

100 = Altamente pertinente y directamente relacionado
50 = Medianamente pertinente
0 = No pertinente

Devuelve un JSON con: { "pertinencia": número (0-100), "explicacion": "texto" }`;

    const postgraduateResult = await model.generateContent(
      postgraduateEvalPrompt
    );
    const postgraduateText = postgraduateResult.response.text();

    let postgraduateEval;
    try {
      postgraduateEval = JSON.parse(postgraduateText);
    } catch (e) {
      const jsonMatch = postgraduateText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        postgraduateEval = JSON.parse(jsonMatch[0]);
      } else {
        postgraduateEval = {
          pertinencia: 0,
          explicacion: "Error en evaluación",
        };
      }
    }

    console.log("✅ Postgraduate evaluation:");
    console.log(JSON.stringify(postgraduateEval, null, 2));
    console.log("\n");

    // Final result
    console.log("🎉 FINAL RESULTS");
    console.log("================\n");
    const result = {
      experienceMonths: experienceEval.mesesExperiencia || 0,
      experienceMeets: experienceEval.cumpleRequisito || false,
      postgraduateRelevance: postgraduateEval.pertinencia || 0,
      extraction: {
        raw: extraction,
        experienceEval: experienceEval,
        postgraduateEval: postgraduateEval,
      },
    };

    console.log(JSON.stringify(result, null, 2));
    console.log("\n✅ Test completed successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

testCV();
