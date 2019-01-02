/** @format */

import { Auth } from 'aws-amplify';

export async function userId(): Promise<string> {
  const {
    attributes: { sub },
  } = await Auth.currentAuthenticatedUser();
  return sub;
}
