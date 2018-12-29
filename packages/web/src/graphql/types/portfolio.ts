/** @format */

export type PortfolioParticipation = 'viewOnly' | 'participate' | 'owner';

export interface Portfolio {
  id?: string;
  name?: string;
  createdAt?: string;
  participation?: PortfolioParticipation;
}
