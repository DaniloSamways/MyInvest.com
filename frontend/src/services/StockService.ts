import { StockResponse } from "@/@types/stock";
import { StockIndicatorsService } from "./StockIndicatorsService";

class StockService {
  constructor(
    private stockIndicatorsService: StockIndicatorsService = new StockIndicatorsService()
  ) {}

  async getStockVariationIn12Months(code: string) {
    const response = await fetch(
      `https://investidor10.com.br/api/cotacoes/acao/chart/${code}/365/true/real`
    )
      .then(async (res) => {
        const response = await res.json();
        return response["real"];
      })
      .catch(() => null);

    if (!response) return null;

    const actualPrice = response[response.length - 1].price;
    const initialPrice = response[0].price;
    const variation = ((actualPrice - initialPrice) / initialPrice) * 100;

    return Number(variation.toFixed(2));
  }

  async getStockPrice(type: string, code: string) {
    const response = await fetch(
      `https://investidor10.com.br/api/cotacao/${type}/${code}`
    )
      .then(async (res) => {
        const response = await res.json();
        return response.price;
      })
      .catch(() => null);

    return response;
  }

  async getStockIndicators(code: string, years: number) {
    const response = await fetch(
      `https://investidor10.com.br/api/historico-indicadores/${code}/${years}`
    )
      .then(async (res) => {
        const response = await res.json();
        return response;
      })
      .catch(() => null);

    return response;
  }

  async getDividendHistory(code: string, years: number) {
    const request = await fetch(
      `https://investidor10.com.br/api/dividendos/chart/${code}/${
        years * 365
      }/ano/`
    )
      .then(async (res) => {
        const response = await res.json();
        return response;
      })
      .catch(() => null);

    return request;
  }

  async findStock(code: string): Promise<StockResponse | null> {
    const request = await fetch(
      `https://investidor10.com.br/api/searchquery/${code}`
    )
      .then(async (res) => {
        const response = await res.json();
        return response[0];
      })
      .catch(() => null);

    if (!request) return null;

    const [price, indicators, variationIn12Months, dividendHistory] =
      await Promise.all([
        this.getStockPrice(request.type, request.id),
        this.getStockIndicators(request.id, 5),
        this.getStockVariationIn12Months(request.name),
        this.getDividendHistory(request.name, 5),
      ]);

    if (!price || !indicators || !variationIn12Months) return null;

    indicators["HISTORICO DIVIDENDOS"] = dividendHistory;

    const response: StockResponse = {
      name: request.name,
      id: request.id,
      type: request.type,
      price,
      variationIn12Months,
      thumbnail: `https://investidor10.com.br/${request.thumbnail}`,
      company: {
        sector_id: request.company.sector_id,
        name: request.company.full_name,
        id: request.company.id,
        good_points: request.company.good_points,
        negative_points: request.company.negative_points,
      },
      indicators: this.formatIndicators({ indicators, actualPrice: price }),
    };

    return response;
  }

  formatIndicators({
    indicators,
    actualPrice,
  }: {
    indicators: any;
    actualPrice: number;
  }): StockResponse["indicators"] {
    // Dividend Yield
    const dy = indicators["DIVIDEND YIELD (DY)"]?.find(
      (d: { year: string; value: 16.08 }) => d.year == "Atual"
    )?.value;

    // Payout
    const payout = indicators["PAYOUT"];
    const payoutAverageIn5Years =
      this.stockIndicatorsService.payoutAverageInYears(payout, 5);

    // Dívida Líquida / EBITDA
    const debtOverEbitda = indicators["DÍVIDA LÍQUIDA / EBITDA"]?.find(
      (d: { year: string; value: number }) => d.year == "Atual"
    )?.value;

    // Valor Justo Bazin
    const bazinFairPrice = this.stockIndicatorsService.bazinFairPrice(
      indicators["HISTORICO DIVIDENDOS"]
    );

    // Potencial de rentabilidade
    const profitabilityPotential =
      this.stockIndicatorsService.profitabilityPotential({
        actualPrice,
        indicators: indicators["HISTORICO DIVIDENDOS"],
      });

    return {
      dy: dy && dy !== "-" && Number(dy?.toFixed(2) || "0"),
      payoutAverageIn5Years: Number(payoutAverageIn5Years.toFixed(2)),
      debtOverEbitda,
      bazinFairPrice,
      profitabilityPotential,
    };
  }
}

export const stockService = new StockService();
