import { StockResponse } from "@/@types/stock";
import { StatisticCard } from "../Cards/StatisticCard";
import { formatBRL } from "@/utils/formatBRL";

export function StockIndicators({
  stock: { indicators, price },
}: {
  stock: StockResponse;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-2xl">Estatísticas do Ativo</h2>
      {!!indicators.dy &&
        indicators.dy < 15 &&
        (indicators.dy > 4 ? (
          <StatisticCard variant="good">
            Dividend Yield acima de <b>4%</b>
          </StatisticCard>
        ) : (
          <StatisticCard variant="bad">
            Dividend Yield abaixo de <b>4%</b>
          </StatisticCard>
        ))}

      {!!indicators.dy && indicators.dy > 15 && (
        <StatisticCard variant="bad">
          Dividend Yield acima de <b>15%</b>, talvez a empresa não pague
          dividendos recorrentes
        </StatisticCard>
      )}

      {!!indicators.payoutAverageIn5Years &&
        (indicators.payoutAverageIn5Years > 40 ? (
          <StatisticCard variant="good">
            Média de Payout acima de <b>40%</b> nos últimos 5 anos
          </StatisticCard>
        ) : (
          <StatisticCard variant="bad">
            Média de Payout abaixo de <b>40%</b> nos últimos 5 anos
          </StatisticCard>
        ))}

      {!!indicators.debtOverEbitda &&
        (indicators.debtOverEbitda < 3 ? (
          <StatisticCard variant="good">
            Dívida Líquida / EBITDA abaixo de 3, indica que a empresa conseguirá
            pagar suas dívidas
          </StatisticCard>
        ) : (
          <StatisticCard variant="bad">
            Dívida Líquida / EBITDA acima de 3, indica que a empresa terá
            dificuldades para pagar suas dívidas
          </StatisticCard>
        ))}

      {!!indicators.bazinFairPrice &&
        (indicators.bazinFairPrice > price ? (
          <StatisticCard variant="good">
            Ativo negociado a um preço menor do que o preço justo de{" "}
            <b>{formatBRL(indicators.bazinFairPrice)}</b> segundo a fórmula de
            Bazin
          </StatisticCard>
        ) : (
          <StatisticCard variant="bad">
            Ativo negociado a um preço maior do que o preço justo de{" "}
            <b>{formatBRL(indicators.bazinFairPrice)}</b> segundo a fórmula de
            Bazin
          </StatisticCard>
        ))}

      {!!indicators.profitabilityPotential &&
        (indicators.profitabilityPotential > 0 ? (
          <StatisticCard variant="good">
            Potencial de rentabilidade de{" "}
            <b>{indicators.profitabilityPotential}%</b> em relação ao preço
            justo
          </StatisticCard>
        ) : (
          <StatisticCard variant="bad">
            Potencial de rentabilidade de{" "}
            <b>{indicators.profitabilityPotential}%</b> em relação ao preço
            justo
          </StatisticCard>
        ))}

      {/* <StatisticCard variant="bad">Péssimo P/VP</StatisticCard> */}
    </div>
  );
}
