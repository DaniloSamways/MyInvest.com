import { StatisticCard } from "../Cards/StatisticCard";

export function StockIndicators() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-2xl">Estatísticas do Ativo</h2>
      <StatisticCard variant="bad">Péssimo P/VP</StatisticCard>
      <StatisticCard variant="good">Excelente Dividend Yield</StatisticCard>
    </div>
  );
}
