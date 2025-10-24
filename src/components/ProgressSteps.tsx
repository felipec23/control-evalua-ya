import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  name: string;
  description: string;
}

interface ProgressStepsProps {
  currentStep: number;
  steps: Step[];
}

export const ProgressSteps = ({ currentStep, steps }: ProgressStepsProps) => {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => (
          <li key={step.id} className={cn("flex-1", index !== 0 && "ml-4")}>
            <div className="flex items-center">
              {index !== 0 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 transition-colors",
                    currentStep > index ? "bg-primary" : "bg-border"
                  )}
                />
              )}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                    currentStep > index + 1
                      ? "bg-primary border-primary text-primary-foreground"
                      : currentStep === index + 1
                      ? "border-primary text-primary bg-card"
                      : "border-border text-muted-foreground bg-card"
                  )}
                >
                  {currentStep > index + 1 ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      "text-sm font-medium transition-colors",
                      currentStep >= index + 1
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.name}
                  </p>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};