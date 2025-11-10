import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface Step2MunicipalityProps {
  onNext: (data: { category: string; requiredMonths: number }) => void;
  onBack: () => void;
}

const municipalityCategories = [
  {
    id: "especial",
    label: "Departamentos y municipios de Categoría especial y primera",
    months: 52,
  },
  {
    id: "segunda-cuarta-dept",
    label: "Departamentos de Categoría segunda, tercera y cuarta",
    months: 48,
  },
  {
    id: "segunda-cuarta-mun",
    label: "Municipios de Categoría segunda, tercera y cuarta",
    months: 44,
  },
  {
    id: "quinta-sexta",
    label: "Municipios de Categorías quinta y sexta",
    months: 36,
  },
];

export const Step2Municipality = ({
  onNext,
  onBack,
}: Step2MunicipalityProps) => {
  const [selected, setSelected] = useState<string>("");

  const handleNext = () => {
    const selectedCategory = municipalityCategories.find(
      (cat) => cat.id === selected
    );
    if (selectedCategory) {
      onNext({
        category: selectedCategory.label,
        requiredMonths: selectedCategory.months,
      });
    }
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Categoría del Municipio o Departamento
          </h2>
          <p className="text-muted-foreground">
            Seleccione la categoría de la entidad territorial para determinar
            los requisitos de experiencia.
          </p>
        </div>

        <RadioGroup value={selected} onValueChange={setSelected}>
          <div className="space-y-3">
            {municipalityCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-start space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer"
                onClick={() => setSelected(category.id)}
              >
                <RadioGroupItem value={category.id} id={category.id} />
                <Label
                  htmlFor={category.id}
                  className="flex-1 cursor-pointer text-sm leading-relaxed"
                >
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>

        <div className="flex justify-between pt-4">
          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Atrás
          </Button>
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
