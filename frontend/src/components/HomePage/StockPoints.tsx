import { StockPoint } from "../StockPoint";

export function StockPoints({
  goodPoints,
  negativePoints,
}: {
  goodPoints?: string[];
  negativePoints?: string[];
}) {
  if (!goodPoints?.length && !negativePoints?.length) return null;

  return (
    <div
      className={`grid ${
        goodPoints?.length && negativePoints?.length
          ? "sm:grid-cols-2"
          : "grid-cols-1"
      } gap-10`}
    >
      {goodPoints?.length && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl">Pontos positivos</h2>
          <ul className="flex flex-col gap-2 list-disc list-inside">
            {goodPoints?.map((point, idx) => (
              <StockPoint key={idx}>{point}</StockPoint>
            ))}
          </ul>
        </div>
      )}
      {negativePoints?.length && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl">Pontos negativos</h2>
          <ul className="flex flex-col gap-2 list-disc list-inside">
            {negativePoints?.map((point, idx) => (
              <StockPoint key={idx}>{point}</StockPoint>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
