import { StockResponse } from "@/@types/stock";
import { StockIndicatorsService } from "./StockIndicatorsService";

class StockService {
  constructor(
    private stockIndicatorsService: StockIndicatorsService = new StockIndicatorsService()
  ) {}

  getStockVariationIn12Months(info: any) {
    return info.variation_twelve;
  }

  getStockPrice(info: any) {
    return info.variation_day?.last_quotation;
  }

  getBazinFairPrice(info: any) {
    return info.bazin as { price: string; upside: number };
  }

  getPayoutAverageIn5Years(info: any) {
    return info.company?.payout;
  }

  getDy(info: any) {
    return info.dy;
  }

  getDebtOverEbitda(info: any) {
    const debtOverEbitda =
      info.indicators_history?.["DÍVIDA LÍQUIDA / EBITDA"]?.["0"]?.value;
    return debtOverEbitda;
  }

  async findStock(code: string): Promise<StockResponse | null> {
    const stock = await fetch(
      `https://investidor10.com.br/api/searchquery/${code}`
    )
      .then(async (res) => {
        const response = await res.json();
        return response[0];
      })
      .catch(() => null);

    if (!stock) return null;

    const stockInfo = await fetch(
      `https://investidor10.com.br/api/rest/assets/tickers/${stock.name}`,
      {
        headers: {
          Authorization:
            "Bearer 1316506|UZCUJqp8nb182m295iF00DNrIWaHL1u4mPVeGWyJ",
        },
      }
    )
      .then(async (res) => {
        const response = await res.json();
        return response;
      })
      .catch(() => null);

    const bazin = this.getBazinFairPrice(stockInfo);

    const response: StockResponse = {
      name: stock.name,
      id: stock.id,
      type: stock.type,
      price: this.getStockPrice(stockInfo),
      variationIn12Months: this.getStockVariationIn12Months(stockInfo),
      thumbnail: `https://investidor10.com.br/${stock.thumbnail}`,
      company: {
        sector_id: stock.company.sector_id,
        name: stock.company.full_name,
        id: stock.company.id,
        good_points: stock.company.good_points,
        negative_points: stock.company.negative_points,
      },
      indicators: {
        bazinFairPrice: bazin.price ? Number(bazin.price) : undefined,
        profitabilityPotential:
          bazin.upside && parseFloat(bazin.upside.toFixed(2)),
        payoutAverageIn5Years: this.getPayoutAverageIn5Years(stockInfo),
        dy: this.getDy(stockInfo),
        debtOverEbitda: this.getDebtOverEbitda(stockInfo),
      },
    };

    return response;
  }
}

export const stockService = new StockService();
