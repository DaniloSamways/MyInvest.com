export interface StockResponse {
  name: string;
  id: string;
  type: string;
  price: number;
  thumbnail: string;
  variationIn12Months: number;
  company: {
    name: string;
    id: string;
    sector_id: string;
    good_points: string;
    negative_points: string;
  };
  indicators: {
    dy: number;
    payoutAverageIn5Years: number;
    debtOverEbitda: number;
    bazinFairPrice: number;
    profitabilityPotential: number;
  };
}
