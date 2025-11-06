import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  FileText,
  ChevronDown,
  Calculator,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface ProcessingResult {
  candidateName: string;
  experienceMonths: number;
  experienceMeets: boolean;
  postgraduateRelevance: number;
  rawExtraction: any;
}

interface EvaluationData {
  evaluationType: string;
  evaluationScore: number;
  category: string;
  requiredMonths: number;
}

interface Step5ResultsProps {
  results: ProcessingResult[];
  evaluationData: EvaluationData;
}

export const Step5Results = ({
  results,
  evaluationData,
}: Step5ResultsProps) => {
  const calculateCriteria = (result: ProcessingResult) => {
    const legalidad = evaluationData.evaluationScore;
    const razonabilidad = result.experienceMeets ? 100 : 0;
    const controlJudicial =
      evaluationData.evaluationScore * 0.5 + result.postgraduateRelevance * 0.5;
    const motivacion =
      (result.experienceMeets ? 100 : 0) * 0.5 +
      result.postgraduateRelevance * 0.5;

    return {
      legalidad: {
        score: legalidad,
        breakdown: {
          evaluationScore: evaluationData.evaluationScore,
          description: "Basado en el tipo de evaluación seleccionado",
        },
      },
      razonabilidad: {
        score: razonabilidad,
        breakdown: {
          experienceMeets: result.experienceMeets,
          experienceMonths: result.experienceMonths,
          requiredMonths: evaluationData.requiredMonths,
          description: result.experienceMeets
            ? `El candidato cumple con los ${evaluationData.requiredMonths} meses requeridos (tiene ${result.experienceMonths} meses)`
            : `El candidato NO cumple con los ${evaluationData.requiredMonths} meses requeridos (tiene ${result.experienceMonths} meses)`,
        },
      },
      controlJudicial: {
        score: controlJudicial,
        breakdown: {
          evaluationComponent: evaluationData.evaluationScore * 0.5,
          postgraduateComponent: result.postgraduateRelevance * 0.5,
          formula: `(${evaluationData.evaluationScore} × 50%) + (${result.postgraduateRelevance} × 50%)`,
          description:
            "Combinación de tipo de evaluación y pertinencia del posgrado",
        },
      },
      motivacion: {
        score: motivacion,
        breakdown: {
          experienceComponent: (result.experienceMeets ? 100 : 0) * 0.5,
          postgraduateComponent: result.postgraduateRelevance * 0.5,
          formula: `(${result.experienceMeets ? 100 : 0} × 50%) + (${
            result.postgraduateRelevance
          } × 50%)`,
          description:
            "Combinación de cumplimiento de experiencia y pertinencia del posgrado",
        },
      },
      promedio: (legalidad + razonabilidad + controlJudicial + motivacion) / 4,
    };
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-accent";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 75) return <CheckCircle2 className="h-5 w-5" />;
    if (score >= 50) return <AlertCircle className="h-5 w-5" />;
    return <XCircle className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-card bg-muted/50">
        <h3 className="text-lg font-semibold mb-4">Información del Proceso</h3>
        <div className="grid gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tipo de evaluación:</span>
            <span className="font-medium text-right max-w-md">
              {evaluationData.evaluationType}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Categoría:</span>
            <span className="font-medium">{evaluationData.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Experiencia requerida:
            </span>
            <span className="font-medium">
              {evaluationData.requiredMonths} meses
            </span>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Resultados de la Evaluación
        </h2>
        <div className="space-y-4">
          {results.map((result, index) => {
            const criteria = calculateCriteria(result);
            return (
              <Card key={index} className="p-6 shadow-card">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {result.candidateName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Experiencia: {result.experienceMonths} meses
                        {result.experienceMeets ? " ✓" : " ✗"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary">
                        {criteria.promedio.toFixed(1)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Puntuación sobre 100
                      </p>
                    </div>
                  </div>

                  {/* Resultado Final */}
                  <Card
                    className={cn(
                      "p-4 border-2",
                      criteria.promedio >= 70
                        ? "bg-accent/10 border-accent"
                        : "bg-destructive/10 border-destructive"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {criteria.promedio >= 70 ? (
                        <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                      )}
                      <div className="space-y-2">
                        <h4 className="font-bold text-lg">
                          {criteria.promedio >= 70
                            ? "✓ Cumple con los límites jurisprudenciales"
                            : "✗ No cumple con los límites jurisprudenciales"}
                        </h4>
                        <p className="text-sm leading-relaxed">
                          {criteria.promedio >= 70 ? (
                            <>
                              Si el candidato elegido cumple con los criterios
                              de mérito, su nombramiento cumple con los límites
                              jurisprudenciales a la discrecionalidad:{" "}
                              <strong>Legalidad</strong>, que impide el uso
                              arbitrario del poder público.{" "}
                              <strong>Razonabilidad</strong>, que requiere
                              proporcionalidad entre medios y resultados.{" "}
                              <strong>Motivación</strong>, como obligación
                              formal y esencial para la certidumbre del acto. Y{" "}
                              <strong>Control judicial</strong>, que certifica
                              el estudio de las decisiones discrecionales.
                            </>
                          ) : (
                            <>
                              Si el candidato elegido no cumple con los
                              criterios de mérito, su nombramiento excede los
                              límites de facultad discrecional, es decir, se
                              está permitiendo la arbitrariedad en esta decisión
                              de la autoridad del ente territorial, en razón a
                              que no se cumplen los postulados de legalidad y
                              fundamentación que corresponden a la dimensión
                              administrativa; los postulados del debido proceso
                              y principio de proporcionalidad que componen la
                              Dimensión de proporcionalidad; y el postulado del
                              precedente en las decisiones judiciales.
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </Card>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Legalidad</p>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-2xl font-bold",
                            getScoreColor(criteria.legalidad.score)
                          )}
                        >
                          {criteria.legalidad.score}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /100
                        </span>
                        <span
                          className={getScoreColor(criteria.legalidad.score)}
                        >
                          {getScoreIcon(criteria.legalidad.score)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Razonabilidad
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-2xl font-bold",
                            getScoreColor(criteria.razonabilidad.score)
                          )}
                        >
                          {criteria.razonabilidad.score}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /100
                        </span>
                        <span
                          className={getScoreColor(
                            criteria.razonabilidad.score
                          )}
                        >
                          {getScoreIcon(criteria.razonabilidad.score)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Control Judicial
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-2xl font-bold",
                            getScoreColor(criteria.controlJudicial.score)
                          )}
                        >
                          {criteria.controlJudicial.score.toFixed(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /100
                        </span>
                        <span
                          className={getScoreColor(
                            criteria.controlJudicial.score
                          )}
                        >
                          {getScoreIcon(criteria.controlJudicial.score)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Motivación
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-2xl font-bold",
                            getScoreColor(criteria.motivacion.score)
                          )}
                        >
                          {criteria.motivacion.score.toFixed(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /100
                        </span>
                        <span
                          className={getScoreColor(criteria.motivacion.score)}
                        >
                          {getScoreIcon(criteria.motivacion.score)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI Scoring Logic Breakdown */}
                  <div className="pt-4 border-t border-border">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem
                        value="scoring-logic"
                        className="border-none"
                      >
                        <AccordionTrigger className="text-sm font-medium text-primary hover:no-underline py-2">
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4" />
                            Ver lógica de puntuación de la IA
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            {/* Legalidad Breakdown */}
                            <Card className="p-4 bg-muted/30">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Calculator className="h-4 w-4 text-primary" />
                                  <h4 className="font-semibold">Legalidad</h4>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "font-bold",
                                    getScoreColor(criteria.legalidad.score)
                                  )}
                                >
                                  {criteria.legalidad.score}/100
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {criteria.legalidad.breakdown.description}
                              </p>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between p-2 bg-background/50 rounded text-xs">
                                  <span className="text-muted-foreground">
                                    Evaluación de competencias:
                                  </span>
                                  <span className="font-mono font-semibold">
                                    {
                                      criteria.legalidad.breakdown
                                        .evaluationScore
                                    }
                                    /100 (100%)
                                  </span>
                                </div>
                                <div className="mt-2 pt-2 border-t border-border/50">
                                  <p className="text-xs text-muted-foreground">
                                    <strong>Fórmula:</strong> Evaluación de
                                    competencias (100%)
                                  </p>
                                </div>
                              </div>
                            </Card>

                            {/* Razonabilidad Breakdown */}
                            <Card className="p-4 bg-muted/30">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Calculator className="h-4 w-4 text-primary" />
                                  <h4 className="font-semibold">
                                    Razonabilidad
                                  </h4>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "font-bold",
                                    getScoreColor(criteria.razonabilidad.score)
                                  )}
                                >
                                  {criteria.razonabilidad.score}/100
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {criteria.razonabilidad.breakdown.description}
                              </p>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between p-2 bg-background/50 rounded text-xs">
                                  <span className="text-muted-foreground">
                                    Cumplimiento de experiencia:
                                  </span>
                                  <span className="font-mono font-semibold">
                                    {criteria.razonabilidad.score}/100 (100%)
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                                  <div className="flex flex-col gap-1 p-2 bg-background/30 rounded">
                                    <span className="text-muted-foreground">
                                      Experiencia del candidato:
                                    </span>
                                    <span className="font-mono font-semibold">
                                      {
                                        criteria.razonabilidad.breakdown
                                          .experienceMonths
                                      }{" "}
                                      meses
                                    </span>
                                  </div>
                                  <div className="flex flex-col gap-1 p-2 bg-background/30 rounded">
                                    <span className="text-muted-foreground">
                                      Requerido:
                                    </span>
                                    <span className="font-mono font-semibold">
                                      {
                                        criteria.razonabilidad.breakdown
                                          .requiredMonths
                                      }{" "}
                                      meses
                                    </span>
                                  </div>
                                </div>
                                <div className="mt-2 pt-2 border-t border-border/50">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">
                                      Cumple requisito:
                                    </span>
                                    {criteria.razonabilidad.breakdown
                                      .experienceMeets ? (
                                      <Badge
                                        variant="default"
                                        className="bg-accent"
                                      >
                                        Sí = 100/100
                                      </Badge>
                                    ) : (
                                      <Badge variant="destructive">
                                        No = 0/100
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-2">
                                    <strong>Fórmula:</strong> Cumplimiento de
                                    tiempo de experiencia (100%)
                                  </p>
                                </div>
                              </div>
                            </Card>

                            {/* Control Judicial Breakdown */}
                            <Card className="p-4 bg-muted/30">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Calculator className="h-4 w-4 text-primary" />
                                  <h4 className="font-semibold">
                                    Control Judicial
                                  </h4>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "font-bold",
                                    getScoreColor(
                                      criteria.controlJudicial.score
                                    )
                                  )}
                                >
                                  {criteria.controlJudicial.score.toFixed(1)}
                                  /100
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {criteria.controlJudicial.breakdown.description}
                              </p>
                              <div className="space-y-2 text-xs">
                                <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                                  <span className="text-muted-foreground">
                                    Evaluación de competencias (50%):
                                  </span>
                                  <span className="font-mono font-semibold">
                                    {evaluationData.evaluationScore}/100 →{" "}
                                    {criteria.controlJudicial.breakdown.evaluationComponent.toFixed(
                                      1
                                    )}
                                    /50
                                  </span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                                  <span className="text-muted-foreground">
                                    Pertinencia del posgrado (50%):
                                  </span>
                                  <span className="font-mono font-semibold">
                                    {result.postgraduateRelevance}/100 →{" "}
                                    {criteria.controlJudicial.breakdown.postgraduateComponent.toFixed(
                                      1
                                    )}
                                    /50
                                  </span>
                                </div>
                                <div className="mt-2 pt-2 border-t border-border/50">
                                  <p className="text-muted-foreground mb-1">
                                    <strong>Fórmula:</strong>
                                  </p>
                                  <p className="font-mono text-xs p-2 bg-background rounded">
                                    ({evaluationData.evaluationScore} × 50%) + (
                                    {result.postgraduateRelevance} × 50%) ={" "}
                                    {criteria.controlJudicial.score.toFixed(1)}
                                    /100
                                  </p>
                                </div>
                              </div>
                            </Card>

                            {/* Motivación Breakdown */}
                            <Card className="p-4 bg-muted/30">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Calculator className="h-4 w-4 text-primary" />
                                  <h4 className="font-semibold">Motivación</h4>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "font-bold",
                                    getScoreColor(criteria.motivacion.score)
                                  )}
                                >
                                  {criteria.motivacion.score.toFixed(1)}/100
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {criteria.motivacion.breakdown.description}
                              </p>
                              <div className="space-y-2 text-xs">
                                <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                                  <span className="text-muted-foreground">
                                    Cumplimiento de experiencia (50%):
                                  </span>
                                  <span className="font-mono font-semibold">
                                    {result.experienceMeets ? 100 : 0}/100 →{" "}
                                    {criteria.motivacion.breakdown.experienceComponent.toFixed(
                                      1
                                    )}
                                    /50
                                  </span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                                  <span className="text-muted-foreground">
                                    Pertinencia del posgrado (50%):
                                  </span>
                                  <span className="font-mono font-semibold">
                                    {result.postgraduateRelevance}/100 →{" "}
                                    {criteria.motivacion.breakdown.postgraduateComponent.toFixed(
                                      1
                                    )}
                                    /50
                                  </span>
                                </div>
                                <div className="mt-2 pt-2 border-t border-border/50">
                                  <p className="text-muted-foreground mb-1">
                                    <strong>Fórmula:</strong>
                                  </p>
                                  <p className="font-mono text-xs p-2 bg-background rounded">
                                    ({result.experienceMeets ? 100 : 0} × 50%) +
                                    ({result.postgraduateRelevance} × 50%) ={" "}
                                    {criteria.motivacion.score.toFixed(1)}/100
                                  </p>
                                </div>
                              </div>
                            </Card>

                            {/* AI Analysis from extraction */}
                            <Card className="p-4 bg-primary/5 border-primary/20">
                              <div className="flex items-center gap-2 mb-3">
                                <Brain className="h-5 w-5 text-primary" />
                                <h4 className="font-semibold text-primary">
                                  Análisis de la IA
                                </h4>
                              </div>
                              <div className="space-y-3 text-sm">
                                {result.rawExtraction?.experienceEval
                                  ?.explicacion && (
                                  <div>
                                    <p className="font-medium text-muted-foreground mb-1">
                                      Experiencia:
                                    </p>
                                    <p className="text-foreground">
                                      {
                                        result.rawExtraction.experienceEval
                                          .explicacion
                                      }
                                    </p>
                                  </div>
                                )}
                                {result.rawExtraction?.postgraduateEval
                                  ?.explicacion && (
                                  <div>
                                    <p className="font-medium text-muted-foreground mb-1">
                                      Posgrado:
                                    </p>
                                    <p className="text-foreground">
                                      {
                                        result.rawExtraction.postgraduateEval
                                          .explicacion
                                      }
                                    </p>
                                  </div>
                                )}
                              </div>
                            </Card>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" size="lg" className="gap-2">
          <Download className="h-4 w-4" />
          Descargar Reporte
        </Button>
        <Button
          size="lg"
          onClick={() => window.location.reload()}
          className="gap-2"
        >
          Nueva Evaluación
        </Button>
      </div>
    </div>
  );
};
