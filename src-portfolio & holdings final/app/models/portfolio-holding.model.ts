import { Portfolio } from './portfolio.model';

export interface PortfolioHolding {
  id: number;
  portfolio: Portfolio | null; 
  quantity: number;
  price: number;
  value: number;
  equityCategory: string;
  security: {
    id: number;
    name: string;
    assetClass: string;
    subAssetClass: string;
  };
}
