"use client";

import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function AlertRecommendation() {
  return (
    <Alert variant={"waning"}>
      <TriangleAlert className="h-4 w-4" />
      {/* <AlertTitle>Heads up!</AlertTitle> */}
      <AlertDescription className="text-center">
        Esta não é uma recomendação de investimento, apenas informamos os
        indicadores do ativo.
      </AlertDescription>
    </Alert>
  );
}
