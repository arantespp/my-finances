/** @format */

declare module 'aws-amplify-react' {
  export function withAuthenticator(
    App: React.ComponentClass,
    hide?: boolean,
    componentes?: any[],
    federated?: {},
    myTheme?: {},
  ): React.ComponentClass;
}
declare module '@aws-amplify/ui';

// Used by aws-appsync
declare module '@redux-offline/redux-offline/lib/types' {
  export type NetInfo = any;
  export type NetworkCallback = any;
}
