import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

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
  rawExtraction: any;
}

interface Step4ProcessingProps {
  candidates: Candidate[];
  requiredMonths: number;
  onComplete: (results: ProcessingResult[]) => void;
}

export const Step4Processing = ({
  candidates,
  requiredMonths,
  onComplete,
}: Step4ProcessingProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<ProcessingResult[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    processNextCandidate();
  }, [currentIndex]);

  const processNextCandidate = async () => {
    if (currentIndex >= candidates.length) {
      onComplete(results);
      return;
    }

    const candidate = candidates[currentIndex];

    try {
      // Convert PDF to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;

        // Call API to process CV
        const response = await fetch(`${API_URL}/api/process-cv`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            candidateName: candidate.name,
            pdfBase64: base64.split(",")[1],
            requiredMonths,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          console.error("Error processing CV:", error);
          toast({
            title: "Error",
            description: `Error procesando HV de ${candidate.name}: ${
              error.error || "Unknown error"
            }`,
            variant: "destructive",
          });
          return;
        }

        const data = await response.json();

        const newResult: ProcessingResult = {
          candidateName: candidate.name,
          experienceMonths: data.experienceMonths,
          experienceMeets: data.experienceMeets,
          postgraduateRelevance: data.postgraduateRelevance,
          rawExtraction: data.extraction,
        };

        setResults((prev) => [...prev, newResult]);
        setCurrentIndex((prev) => prev + 1);
      };

      reader.readAsDataURL(candidate.file);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: `Error procesando HV de ${candidate.name}`,
        variant: "destructive",
      });
    }
  };

  const progress = (currentIndex / candidates.length) * 100;

  return (
    <Card className="p-8 shadow-card">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Procesando Hojas de Vida
          </h2>
          <p className="text-muted-foreground">
            El sistema está analizando las hojas de vida con inteligencia
            artificial. Por favor espere...
          </p>
        </div>

        <div className="space-y-4">
          <Progress value={progress} className="h-3" />
          <p className="text-center text-sm text-muted-foreground">
            Procesando candidato {currentIndex + 1} de {candidates.length}
          </p>
        </div>

        <div className="space-y-3 mt-8">
          {candidates.map((candidate, index) => (
            <div
              key={candidate.id}
              className="flex items-center gap-3 p-3 bg-muted rounded-lg"
            >
              {index < currentIndex ? (
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
              ) : index === currentIndex ? (
                <Loader2 className="h-5 w-5 text-primary animate-spin flex-shrink-0" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-border flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-medium text-sm">{candidate.name}</p>
                <p className="text-xs text-muted-foreground">
                  {index < currentIndex
                    ? "Completado"
                    : index === currentIndex
                    ? "Procesando..."
                    : "En espera"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
