export interface StockResponse {
  name: string;
  id: string;
  type: string;
  price: number;
  company: {
    name: string;
    id: string;
    sector_id: string;
    good_points: string;
    negative_points: string;
  };
  indicators: {};
}
