// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import { encode } from "./encoding.ts";
import { OTPSecretKeyError } from "./error.ts";

/**
 * secret_key.ts
 */

/**
 * This function wraps the WebCrypto API to generate a key useful for signing HMAC SHA-1 mesages.
 * @returns
 */
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

/**
 * Create a secret key from a `Uint8Array`.
 * @param value
 * @returns
 */
export function createSecretKey(value: Uint8Array) {
  if (value.length < 20) {
    throw new OTPSecretKeyError("Secret key must be at least 20 bytes");
  }

  return importSecretKey(value);
}

/**
 * We use the WebCrypto API to "import" a key. This creates a `CryptoKey` that we can use with the rest of the API.
 * @param value
 * @returns
 */
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

/**
 * At times, we may have to show the actual secret key used to sign our authenticated message.
 * @param key
 * @returns
 */
export function exportSecretKey(key: CryptoKey) {
  return crypto.subtle.exportKey("raw", key);
}
