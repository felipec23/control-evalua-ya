import { Shield } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-gradient-institutional text-primary-foreground shadow-elevated">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Sistema de Evaluación de Candidatos</h1>
            <p className="text-sm opacity-90">Control Interno Municipal</p>
          </div>
        </div>
      </div>
    </header>
  );
};