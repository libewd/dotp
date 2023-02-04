// Copyright 2023 the libewd authors. All rights reserved. MIT license.

/**
 * hash.ts
 */

import { encode } from "./encoding.ts";

/**
 * Create a token based on HOTP algorithm.
 * @param key
 * @param movingFactor
 * @returns
 */
export async function createHashToken(
  key: CryptoKey,
  movingFactor: ArrayBuffer,
) {
  const message = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, movingFactor),
  );

  const offset = message.at(19)! & 0xf;
  const truncated = (message[offset] & 0x7f) << 24 |
    (message[offset + 1] & 0xff) << 16 |
    (message[offset + 2] & 0xff) << 8 |
    (message[offset + 3] & 0xff);

  const token = truncated % Math.pow(10, 6);
  return encode(token.toString().padStart(6, "0"));
}
