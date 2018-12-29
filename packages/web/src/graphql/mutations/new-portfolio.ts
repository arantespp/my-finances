/** @format */

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { Portfolio } from '../types';

export const NEW_PORTFOLIO_MUTATION = gql`
  mutation newPortfolio($userId: ID!, $portfolioName: String!) {
    newPortfolio(userId: $userId, portfolioName: $portfolioName) {
      id
      name
      createdAt
      participation
    }
  }
`;

export interface NewPortfolioMutationResponse {
  newPortfolio: Portfolio;
}

export interface NewPortfolioMutationVariables {
  userId: string;
  portfolioName: string;
}

export class NewPortfolioMutation extends Mutation<NewPortfolioMutationResponse, NewPortfolioMutationVariables> {}
