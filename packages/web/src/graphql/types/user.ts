/** @format */

import { Portfolio } from './portfolio';

export interface User {
  id: string;
  portfolios: Portfolio[];
}
