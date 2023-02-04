// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import { Buffer } from "./buffer.ts";

export function createMovingFactorFromNumber(value: number) {
  return createMovingFactorFromBigInt(BigInt(value.toFixed()));
}

export function createMovingFactorFromBigInt(value: bigint) {
  return Buffer.fromBigInt(value).arrayBuffer;
}
