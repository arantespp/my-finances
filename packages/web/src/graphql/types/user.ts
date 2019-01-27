/** @format */

import { Portfolio } from './portfolio';

export interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  portfolios?: Portfolio[];
}
