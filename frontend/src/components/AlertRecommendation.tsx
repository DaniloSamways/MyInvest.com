"use client";

import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export function AlertRecommendation() {
  return (
    <Alert variant={"waning"}>
      <TriangleAlert className="h-4 w-4" />
      <AlertDescription className="text-center ml-1">
        Esta não é uma recomendação de investimento, apenas informamos os
        indicadores do ativo.
      </AlertDescription>
    </Alert>
  );
}
