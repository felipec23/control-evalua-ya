import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface Step1CompetencyProps {
  onNext: (data: { evaluationType: string; evaluationScore: number }) => void;
}

const evaluationOptions = [
  {
    id: "1",
    label:
      "Un órgano técnico designado por la entidad para el efecto y conformado por los directivos de la entidad nominadora y/o consultores externos.",
    score: 0,
  },
  {
    id: "2",
    label: "Universidades públicas o privadas.",
    score: 50,
  },
  {
    id: "3",
    label:
      "Empresas consultoras externas especializadas en selección de personal.",
    score: 0,
  },
  {
    id: "4",
    label:
      "A través de contratos o convenios interadministrativos celebrados con el Departamento Administrativo de la Función Pública o con entidades de la administración pública con experiencia en selección de personal.",
    score: 100,
  },
  {
    id: "5",
    label: "No se realizó evaluación de competencias",
    score: 0,
  },
];

export const Step1Competency = ({ onNext }: Step1CompetencyProps) => {
  const [selected, setSelected] = useState<string>("");

  const handleNext = () => {
    const selectedOption = evaluationOptions.find((opt) => opt.id === selected);
    if (selectedOption) {
      onNext({
        evaluationType: selectedOption.label,
        evaluationScore: selectedOption.score,
      });
    }
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Evaluación de Competencias
          </h2>
          <p className="text-muted-foreground">
            Seleccione quién realizó la evaluación de competencias para este
            proceso de selección.
          </p>
        </div>

        <RadioGroup value={selected} onValueChange={setSelected}>
          <div className="space-y-3">
            {evaluationOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-start space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer"
                onClick={() => setSelected(option.id)}
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <Label
                  htmlFor={option.id}
                  className="flex-1 cursor-pointer text-sm leading-relaxed"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleNext}
            disabled={!selected}
            size="lg"
            className="gap-2"
          >
            Continuar
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
