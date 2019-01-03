/** @format */

import { PortfolioStockType } from '../enums';

export interface PortfolioStock {
  id: string;
  index: string;
  ticker?: string;
  date?: string;
  type?: PortfolioStockType;
  value?: number;
  quantity?: number;
  mostRecentPrice?: number;
}
