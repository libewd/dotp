// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import { encode } from "./encoding.ts";
import { OTPSecretKeyError } from "./error.ts";

/**
 * secret_key.ts
 */

/** */
export function createRandomSecretKey() {
  return crypto.subtle.generateKey(
    { name: "HMAC", hash: "sha-1" },
    true,
    ["sign"],
  );
}

/**
 * Encode a string `value` into an `Uint8Array`.
 *
 * @throws {OTPSecretKeyError} Secret key must be at least 20 bytes.
 */
export function createSecretKeyFromString(value: string) {
  const secretKeyFromString = encode(value);
  return createSecretKey(secretKeyFromString);
}

export function createSecretKey(value: Uint8Array) {
  if (value.length < 20) {
    throw new OTPSecretKeyError("Secret key must be at least 20 bytes");
  }

  return importSecretKey(value);
}

export function importSecretKey(value: Uint8Array) {
  return crypto.subtle.importKey(
    "raw",
    value,
    { name: "HMAC", hash: "sha-1" },
    true,
    [
      "sign",
    ],
  );
}

export function exportSecretKey(key: CryptoKey) {
  return crypto.subtle.exportKey("raw", key);
}
