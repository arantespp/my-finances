/** @format */

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { PortfolioInput } from '../inputs';
import { Portfolio } from '../types';

export const NEW_PORTFOLIO_MUTATION = gql`
  mutation newPortfolio($userId: ID!, $input: PortfolioInput!) {
    newPortfolio(userId: $userId, input: $input) {
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
  input: PortfolioInput;
}

export class NewPortfolioMutation extends Mutation<NewPortfolioMutationResponse, NewPortfolioMutationVariables> {}
