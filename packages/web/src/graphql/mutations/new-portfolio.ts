/** @format */

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const NEW_PORTFOLIO_MUTATION = gql`
  mutation newPortfolio($userId: ID!, $portfolioName: String!) {
    newPortfolio(userId: $userId, portfolioName: $portfolioName)
  }
`;

export interface NewPortfolioMutationResponse {
  newPortfolio: string;
}

export interface NewPortfolioMutationVariables {
  userId: string;
  portfolioName: string;
}

export class NewPortfolioMutation extends Mutation<NewPortfolioMutationResponse, NewPortfolioMutationVariables> {}
