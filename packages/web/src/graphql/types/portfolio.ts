/** @format */

import { PortfolioStock } from './portfolio-stock';

export type PortfolioParticipation = 'viewOnly' | 'participate' | 'owner';

export interface Portfolio {
  id: string;
  name?: string;
  createdAt?: string;
  participation?: PortfolioParticipation;
  stocks?: PortfolioStock[];
}
