/** @format */

export const decode = (data: string): string => Buffer.from(data, 'base64').toString('ascii');
