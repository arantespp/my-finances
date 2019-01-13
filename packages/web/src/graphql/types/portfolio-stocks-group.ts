/** @format */

import { PortfolioStock } from './portfolio-stock';

export interface PortfolioStocksGroup {
  id: string;
  name?: string;
  stocks: PortfolioStock[];
}
