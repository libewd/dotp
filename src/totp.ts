// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import { createHashToken } from "./hash.ts";
import { createMovingFactorFromNumber } from "./moving_factor.ts";

/**
 * totp.ts
 */

/**
 * @param secretKey
 * @param offset
 * @returns
 */
export function createTimeToken(
  secretKey: CryptoKey,
  offset = 0,
): Promise<Uint8Array> {
  return createHashToken(
    secretKey,
    createMovingFactorFromNumber(getElapsedTimeSteps() - offset),
  );
}

/**
 * @param timeStep
 * @returns
 */
function getElapsedTimeSteps(timeStep = 30): number {
  return Math.floor(Date.now() / timeStep);
}
