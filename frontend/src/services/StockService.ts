import { StockResponse } from "@/@types/stock";

class StockService {
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

    const [price, indicators, variationIn12Months] = await Promise.all([
      this.getStockPrice(request.type, request.id),
      this.getStockIndicators(request.id, 1),
      this.getStockVariationIn12Months(request.name),
    ]);

    if (!price || !indicators || !variationIn12Months) return null;

    const response: StockResponse = {
      name: request.name,
      id: request.id,
      type: request.type,
      price: price,
      variationIn12Months,
      company: {
        sector_id: request.company.sector_id,
        name: request.company.full_name,
        id: request.company.id,
        good_points: request.company.good_points,
        negative_points: request.company.negative_points,
      },
      indicators: {},
    };

    return response;
  }
}

export const stockService = new StockService();
