// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import { Buffer } from "./buffer.ts";

/**
 * @param value
 * @returns
 */
export function createMovingFactorFromNumber(value: number) {
  return createMovingFactorFromBigInt(BigInt(value.toFixed()));
}

/**
 * @param value
 * @returns
 */
export function createMovingFactorFromBigInt(value: bigint) {
  return Buffer.fromBigInt(value).arrayBuffer;
}
