import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { candidateName, pdfBase64, requiredMonths } = await req.json();
    console.log(`Processing CV for: ${candidateName}`);

    // Step 1: Extract information from CV
    // Using PDF format with Gemini Flash which supports document processing
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

    const extractionResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: extractionPrompt },
                {
                  type: "image_url",
                  image_url: { url: `data:application/pdf;base64,${pdfBase64}` },
                },
              ],
            },
          ],
        }),
      }
    );

    const extractionData = await extractionResponse.json();
    console.log("Extraction response:", extractionData);
    
    // Check for errors in the AI response
    if (extractionData.error || !extractionData.choices || extractionData.choices.length === 0) {
      const errorMsg = extractionData.error?.message || "No response from AI model";
      console.error("AI extraction error:", errorMsg);
      throw new Error(`Failed to extract CV data: ${errorMsg}`);
    }
    
    const extractedText = extractionData.choices[0].message.content;
    let extraction;
    try {
      extraction = JSON.parse(extractedText);
    } catch (e) {
      // If not valid JSON, try to extract JSON from the text
      const jsonMatch = extractedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        extraction = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse extraction result");
      }
    }

    // Step 2: Evaluate experience compliance
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

    const experienceResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro",
          messages: [
            { role: "user", content: experienceEvalPrompt },
          ],
        }),
      }
    );

    const experienceData = await experienceResponse.json();
    
    // Check for errors in the AI response
    if (experienceData.error || !experienceData.choices || experienceData.choices.length === 0) {
      const errorMsg = experienceData.error?.message || "No response from AI model";
      console.error("AI experience evaluation error:", errorMsg);
      throw new Error(`Failed to evaluate experience: ${errorMsg}`);
    }
    
    const experienceText = experienceData.choices[0].message.content;
    let experienceEval;
    try {
      experienceEval = JSON.parse(experienceText);
    } catch (e) {
      const jsonMatch = experienceText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        experienceEval = JSON.parse(jsonMatch[0]);
      } else {
        experienceEval = { mesesExperiencia: 0, cumpleRequisito: false, explicacion: "Error en evaluación" };
      }
    }

    // Step 3: Evaluate postgraduate relevance
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

    const postgraduateResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro",
          messages: [
            { role: "user", content: postgraduateEvalPrompt },
          ],
        }),
      }
    );

    const postgraduateData = await postgraduateResponse.json();
    
    // Check for errors in the AI response
    if (postgraduateData.error || !postgraduateData.choices || postgraduateData.choices.length === 0) {
      const errorMsg = postgraduateData.error?.message || "No response from AI model";
      console.error("AI postgraduate evaluation error:", errorMsg);
      throw new Error(`Failed to evaluate postgraduate: ${errorMsg}`);
    }
    
    const postgraduateText = postgraduateData.choices[0].message.content;
    let postgraduateEval;
    try {
      postgraduateEval = JSON.parse(postgraduateText);
    } catch (e) {
      const jsonMatch = postgraduateText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        postgraduateEval = JSON.parse(jsonMatch[0]);
      } else {
        postgraduateEval = { pertinencia: 0, explicacion: "Error en evaluación" };
      }
    }

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

    console.log("Final result:", result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing CV:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});