/** @format */

import { PortfolioStock } from './portfolio-stock';

export interface PortfolioStocksGroups {
  id: string;
  name?: string;
  stocks: PortfolioStock[];
}
