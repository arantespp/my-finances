/** @format */

import { PortfolioStockType } from '../enums';

export interface PortfolioStockInput {
  ticker: string;
  date: string;
  type: PortfolioStockType;
  value: number;
  quantity: number;
}
