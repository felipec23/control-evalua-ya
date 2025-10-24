import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

export const Step5Results = ({ results, evaluationData }: Step5ResultsProps) => {
  const calculateCriteria = (result: ProcessingResult) => {
    const legalidad = evaluationData.evaluationScore;
    const razonabilidad = result.experienceMeets ? 100 : 0;
    const controlJudicial =
      evaluationData.evaluationScore * 0.5 +
      result.postgraduateRelevance * 0.5;
    const motivacion =
      (result.experienceMeets ? 100 : 0) * 0.5 +
      result.postgraduateRelevance * 0.5;

    return {
      legalidad,
      razonabilidad,
      controlJudicial,
      motivacion,
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
            <span className="text-muted-foreground">Experiencia requerida:</span>
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
                        Promedio General
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Legalidad</p>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-2xl font-bold",
                            getScoreColor(criteria.legalidad)
                          )}
                        >
                          {criteria.legalidad}
                        </span>
                        <span className={getScoreColor(criteria.legalidad)}>
                          {getScoreIcon(criteria.legalidad)}
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
                            getScoreColor(criteria.razonabilidad)
                          )}
                        >
                          {criteria.razonabilidad}
                        </span>
                        <span className={getScoreColor(criteria.razonabilidad)}>
                          {getScoreIcon(criteria.razonabilidad)}
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
                            getScoreColor(criteria.controlJudicial)
                          )}
                        >
                          {criteria.controlJudicial.toFixed(1)}
                        </span>
                        <span className={getScoreColor(criteria.controlJudicial)}>
                          {getScoreIcon(criteria.controlJudicial)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Motivación</p>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-2xl font-bold",
                            getScoreColor(criteria.motivacion)
                          )}
                        >
                          {criteria.motivacion.toFixed(1)}
                        </span>
                        <span className={getScoreColor(criteria.motivacion)}>
                          {getScoreIcon(criteria.motivacion)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-medium text-primary flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Ver detalles de la extracción
                      </summary>
                      <div className="mt-3 p-4 bg-muted rounded-lg">
                        <pre className="text-xs overflow-auto">
                          {JSON.stringify(result.rawExtraction, null, 2)}
                        </pre>
                      </div>
                    </details>
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