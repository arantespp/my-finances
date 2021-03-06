/** @format */

import { PortfolioStocksGroup } from './portfolio-stocks-group';

export type PortfolioParticipation = 'viewOnly' | 'participate' | 'owner';

export interface Portfolio {
  id: string;
  name?: string;
  createdAt?: string;
  participation?: PortfolioParticipation;
  stocksGroups?: PortfolioStocksGroup[];
}
