import { StockResponse } from "@/@types/stock";

interface StockCardProps {
  info: StockResponse;
}

export function StockCard({ info }: StockCardProps) {
  return (
    <div className="border rounded px-4 py-4 grid grid-cols-2 gap-10 mx-auto w-full">
      <div>
        <h1 className="font-bold text-xl">{info.name}</h1>
        <p className="text-gray-500">{info.company.name}</p>
      </div>
      <div className="flex flex-col items-end">
        <h1 className="font-bold text-xl">R$ {info.price.toLocaleString()}</h1>
        <p className="text-green-500">
          +0,00%
          <span className="text-zinc-500 text-xs"> (12 meses)</span>
        </p>
      </div>
    </div>
  );
}
