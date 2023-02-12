// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import { createHashBasedToken } from "./hash_based.ts";
import { createMovingFactorFromNumber } from "./moving_factor.ts";

/**
 * Create a time-based token given a `secretKey` and an `offset`.
 */
export function createTimeBasedToken(
  secretKey: CryptoKey,
  offset = 0,
): Promise<Uint8Array> {
  return createHashBasedToken(
    secretKey,
    createMovingFactorFromNumber(getElapsedTimeSteps() - offset),
  );
}

/**
 * Given a `timeStep` in seconds, returns the number of steps since the first UNIX epoch.
 */
function getElapsedTimeSteps(timeStep = 30): number {
  return Math.floor(Date.now() / timeStep);
}
