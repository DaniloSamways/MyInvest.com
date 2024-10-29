export class StockIndicatorsService {
  payoutAverageInYears(indicators: any, years: number) {
    const lastYears = [];
    // pega o ano atual e os anos anteriores
    const currentYear = new Date().getFullYear();
    for (let i = 1; i <= years; i++) {
      lastYears.push(currentYear - i);
    }

    const payoutAverage =
      lastYears.reduce((acc, year) => {
        const payout = indicators.find(
          (p: { year: number; value: number }) => p.year == year
        );
        if (!payout) return acc;
        return acc + payout.value;
      }, 0) / years;

    return payoutAverage;
  }

  bazinFairPrice(indicators: any): number {
    const actualYear = new Date().getFullYear();
    const lastYear = actualYear - 1;

    const lastDividend =
      indicators.find(
        (d: { created_at: number; price: number }) => d.created_at == lastYear
      )?.price ?? 0;

    return parseFloat((lastDividend / 0.06).toFixed(2));
  }

  profitabilityPotential({
    actualPrice,
    indicators,
  }: {
    actualPrice: number;
    indicators: any;
  }): number {
    const fairPrice = this.bazinFairPrice(indicators);
    const profitabilityPotential =
      ((fairPrice - actualPrice) / actualPrice) * 100;

    return parseFloat(profitabilityPotential.toFixed(2));
  }
}
