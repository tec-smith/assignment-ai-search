import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { getVerificationTokenByEmail } from '../data/verification-token';

/**
 * Generates a unique verification token.
 *
 * @param email The email address of the user.
 * @returns A unique verification token.
 */
export const generateVerificationToken = async (email: string) => {

  // Generate a unique token.
  const token = uuidv4();

  // The generated token will expire in an hour.
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  // Check for associated email and token pair.
  const existingToken = await getVerificationTokenByEmail(email);

  // Remove existing token from the database.
  if (existingToken) {
    await db.verificationToken.delete({ where: { id: existingToken.id } });
  }

  // Add the generated token to the database.
  const verificationToken = await db.verificationToken.create({
    data: { email, token, expires },
  });
  return verificationToken;
}

/***
  @COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
