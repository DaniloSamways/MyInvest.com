import { ChartCandlestick } from "lucide-react";

export function StockNotFound() {
  return (
    <div className="flex items-center gap-4 justify-center mt-10 text-zinc-800">
      <ChartCandlestick className="h-24 w-24" />
      <h1 className="text-4xl font-bold">Ativo não encontrado</h1>
    </div>
  );
}
