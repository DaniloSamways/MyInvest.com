import { Badge } from "../ui/badge";

export function StockSummary() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-center gap-2">
        <h2 className="font-bold text-2xl text-center">Resumo</h2>
        <Badge
          variant={"outline"}
          className="px-2 py-1 border-primary text-primary"
        >
          Ótimo investimento
        </Badge>
      </div>
      <p>
        Esse é um ótimo investimento para longo prazo, contando com boas
        rentabilidades a longo prazo.
      </p>
    </div>
  );
}
