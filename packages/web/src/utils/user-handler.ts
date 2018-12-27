/** @format */

import { Auth } from 'aws-amplify';

export async function userId(): Promise<string> {
  const { username } = await Auth.currentUserInfo();
  return username;
}
