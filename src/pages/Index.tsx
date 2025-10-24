import { useState } from "react";
import { Header } from "@/components/Header";
import { ProgressSteps } from "@/components/ProgressSteps";
import { Step1Competency } from "@/components/steps/Step1Competency";
import { Step2Municipality } from "@/components/steps/Step2Municipality";
import { Step3Upload } from "@/components/steps/Step3Upload";
import { Step4Processing } from "@/components/steps/Step4Processing";
import { Step5Results } from "@/components/steps/Step5Results";

const steps = [
  {
    id: 1,
    name: "Evaluación",
    description: "Tipo de evaluación",
  },
  {
    id: 2,
    name: "Categoría",
    description: "Municipio/Departamento",
  },
  {
    id: 3,
    name: "Hojas de Vida",
    description: "Cargar CVs",
  },
  {
    id: 4,
    name: "Procesamiento",
    description: "Análisis IA",
  },
  {
    id: 5,
    name: "Resultados",
    description: "Ver resultados",
  },
];

interface EvaluationData {
  evaluationType?: string;
  evaluationScore?: number;
  category?: string;
  requiredMonths?: number;
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
  rawExtraction: any;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [evaluationData, setEvaluationData] = useState<EvaluationData>({});
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [results, setResults] = useState<ProcessingResult[]>([]);

  const handleStep1Next = (data: {
    evaluationType: string;
    evaluationScore: number;
  }) => {
    setEvaluationData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleStep2Next = (data: { category: string; requiredMonths: number }) => {
    setEvaluationData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const handleStep3Next = (candidatesList: Candidate[]) => {
    setCandidates(candidatesList);
    setCurrentStep(4);
  };

  const handleProcessingComplete = (processingResults: ProcessingResult[]) => {
    setResults(processingResults);
    setCurrentStep(5);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <ProgressSteps currentStep={currentStep} steps={steps} />

        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && <Step1Competency onNext={handleStep1Next} />}
          
          {currentStep === 2 && (
            <Step2Municipality
              onNext={handleStep2Next}
              onBack={() => setCurrentStep(1)}
            />
          )}
          
          {currentStep === 3 && (
            <Step3Upload
              onNext={handleStep3Next}
              onBack={() => setCurrentStep(2)}
            />
          )}
          
          {currentStep === 4 && (
            <Step4Processing
              candidates={candidates}
              requiredMonths={evaluationData.requiredMonths || 0}
              onComplete={handleProcessingComplete}
            />
          )}
          
          {currentStep === 5 && (
            <Step5Results
              results={results}
              evaluationData={evaluationData as any}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;