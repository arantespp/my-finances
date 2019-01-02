/** @format */

import { PortfolioStockType } from '../enums';

export interface PortfolioStock {
  index: string;
  ticker?: string;
  date?: string;
  type?: PortfolioStockType;
  value?: number;
  quantity?: number;
}
