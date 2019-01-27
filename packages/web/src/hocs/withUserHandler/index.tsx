/** @format */

import * as React from 'react';

import { Auth } from 'aws-amplify';
import gql from 'graphql-tag';

import Loading from '@components/Loading';

import client from '@graphql/client';
import { User } from '@graphql/types';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

type IncomingProps = any;

export interface InjectedWithUserHandlerProps {}

interface State {
  loading: boolean;
  user: User | null;
}

const USER_QUERY = gql`
  query userQuery($userId: ID!) {
    user(userId: $userId) {
      id
      email
      firstName
      lastName
    }
  }
`;

const REGISTER_USER_MUTATION = gql`
  mutation registerUser($userId: ID!, $input: UserInput) {
    registerUser(userId: $userId, input: $input) {
      id
      email
      firstName
      lastName
    }
  }
`;

const withUserHandler = <P extends InjectedWithUserHandlerProps>(Component: React.ComponentType<P>) =>
  class WithUserHandler extends React.Component<Subtract<P, InjectedWithUserHandlerProps> & IncomingProps, State> {
    state = {
      loading: true,
      user: null,
    };

    async componentDidMount() {
      const userId = await this.getUserIdFromCognito();
      let user = await this.getUser(userId);
      if (!!!user) {
        user = await this.registerUser();
      }
      this.setState({ loading: false, user });
      const a = await Auth.currentAuthenticatedUser({ bypassCache: false });
      console.log(a);
    }

    render() {
      const { ...props } = this.props as IncomingProps;
      const { loading } = this.state;
      return loading ? <Loading /> : <Component {...props} userHandler={{ ...this.injectedWithUserHandler() }} />;
    }

    private getUser = async (userId: string): Promise<User | null> => {
      const { user } = this.state;

      if (!!user) {
        return user;
      }

      const { data } = await client.query({
        query: USER_QUERY,
        variables: { userId },
      });

      return data.user;
    };

    private getUserEmailFromCognito = async (): Promise<string> => {
      const { attributes, email } = await Auth.currentAuthenticatedUser({ bypassCache: false });
      return attributes ? attributes.email : email;
    };

    private getUserIdFromCognito = async (): Promise<string> => {
      const { id } = await Auth.currentAuthenticatedUser({ bypassCache: false });
      const email = await this.getUserEmailFromCognito();
      const cid = email || id;
      return cid;
    };

    private injectedWithUserHandler = (): InjectedWithUserHandlerProps => ({});

    private getUserInfoFromCognito = async (): Promise<{
      email?: string;
      firstName?: string;
      lastName?: string;
    }> => {
      const { name } = await Auth.currentAuthenticatedUser({ bypassCache: false });
      const splitted = (name as string).split(' ');
      const firstName = splitted[0];
      const lastName = splitted[splitted.length - 1];
      const email = await this.getUserEmailFromCognito();
      return { email, firstName, lastName };
    };

    private registerUser = async (): Promise<null> => {
      const { data } = await client.mutate({
        mutation: REGISTER_USER_MUTATION,
        variables: {
          userId: await this.getUserIdFromCognito(),
          input: await this.getUserInfoFromCognito(),
        },
      });
      return data!.registerUser;
    };
  };

export { withUserHandler };
