import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Upload, X, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Candidate {
  id: string;
  name: string;
  file: File;
}

interface Step3UploadProps {
  onNext: (candidates: Candidate[]) => void;
  onBack: () => void;
}

export const Step3Upload = ({ onNext, onBack }: Step3UploadProps) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentName, setCurrentName] = useState("");
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast({
        title: "Error",
        description: "Solo se permiten archivos PDF",
        variant: "destructive",
      });
      return;
    }

    if (!currentName.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingrese el nombre del candidato",
        variant: "destructive",
      });
      return;
    }

    const newCandidate: Candidate = {
      id: Math.random().toString(36).substring(7),
      name: currentName.trim(),
      file,
    };

    setCandidates([...candidates, newCandidate]);
    setCurrentName("");
    e.target.value = "";
    
    toast({
      title: "Éxito",
      description: `Hoja de vida de ${newCandidate.name} añadida`,
    });
  };

  const removeCandidate = (id: string) => {
    setCandidates(candidates.filter((c) => c.id !== id));
  };

  const handleNext = () => {
    if (candidates.length === 0) {
      toast({
        title: "Error",
        description: "Debe cargar al menos una hoja de vida",
        variant: "destructive",
      });
      return;
    }
    onNext(candidates);
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Cargar Hojas de Vida
          </h2>
          <p className="text-muted-foreground">
            Agregue las hojas de vida de los candidatos en formato PDF.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="candidateName">Nombre del Candidato</Label>
            <Input
              id="candidateName"
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvFile">Hoja de Vida (PDF)</Label>
            <div className="flex gap-2">
              <Input
                id="cvFile"
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="flex-1"
              />
              <Button type="button" variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {candidates.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-foreground">
              Candidatos cargados ({candidates.length})
            </h3>
            <div className="space-y-2">
              {candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{candidate.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {candidate.file.name}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCandidate(candidate.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button onClick={onBack} variant="outline" size="lg" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Atrás
          </Button>
          <Button
            onClick={handleNext}
            disabled={candidates.length === 0}
            size="lg"
            className="gap-2"
          >
            Evaluar Candidatos
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};