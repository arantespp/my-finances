/** @format */

import { PortfolioStockType } from '../enums';

export interface PortfolioStock {
  id: string;
  ticker?: string;
  date?: string;
  type?: PortfolioStockType;
  value?: number;
  quantity?: number;
}
