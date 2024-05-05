import { db } from '../lib/db';

/**
 * Get the verification token for a given email address.
 *
 * @param email The email address to search for.
 * @returns The verification token, or null if not found.
 */
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({ where: { email } });
    return verificationToken;
  } catch {
    return null;
  };
};

/**
 * Get the verification token for a given token string.
 *
 * @param token The token string to search for.
 * @returns The verification token, or null if not found.
 */
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({ where: { token } });
    return verificationToken;
  } catch {
    return null;
  };
};

/***
  @COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
