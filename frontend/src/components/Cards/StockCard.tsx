import { StockResponse } from "@/@types/stock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { CircleHelp } from "lucide-react";

interface StockCardProps {
  info: StockResponse;
}

const variationComponent = (variation: number) => {
  const variationFormatted = variation.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (variation >= 0) {
    return (
      <p className="text-green-500 flex items-center gap-1">
        <CircleHelp className="h-4 w-4 text-zinc-600" />+{variationFormatted}%
        <span className="text-zinc-500 text-xs"> (12 meses)</span>
      </p>
    );
  } else {
    return (
      <p className="text-red-500">
        <CircleHelp className="h-4 w-4 text-zinc-600" />+{variationFormatted}%
        {variationFormatted}%
        <span className="text-zinc-500 text-xs"> (12 meses)</span>
      </p>
    );
  }
};

export function StockCard({ info }: StockCardProps) {
  return (
    <div className="border rounded px-4 py-4 grid grid-cols-2 gap-10 mx-auto w-full">
      <div>
        <h1 className="font-bold text-xl">{info.name}</h1>
        <p className="text-gray-500">{info.company.name}</p>
      </div>
      <div className="flex flex-col items-end">
        <h1 className="font-bold text-xl">R$ {info.price.toLocaleString()}</h1>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              {variationComponent(info.variationIn12Months)}
            </TooltipTrigger>
            <TooltipContent className="max-w-52 bg-zinc-800 p-2 rounded bg-opacity-90">
              <p className="font-extralight text-center">
                Variação do preço do ativo com base nos últimos 12 meses.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
