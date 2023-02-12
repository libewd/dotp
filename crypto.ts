// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import { encode } from "./encoding.ts";
import { OTPSecretKeyError } from "./error.ts";

/**
 * The supported key hash algorithms.
 */
export type KeyHashAlgorithm = "SHA-1";

/**
 * This function wraps the WebCrypto API to generate a key useful for signing
 * HMAC SHA-1 mesages.
 */
export function createRandomCryptoKey(
  hash: KeyHashAlgorithm = "SHA-1",
) {
  return crypto.subtle
    .generateKey(
      {
        name: "HMAC",
        hash,
      },
      true,
      ["sign"],
    );
}

/**
 * Encode a string `value` into an `Uint8Array`.
 */
export function createCryptoKeyFromString(
  value: string,
) {
  const cryptoKeyFromString = encode(value);
  return createCryptoKey(
    cryptoKeyFromString,
  );
}

/**
 * Create a secret key from a `Uint8Array`.
 */
export function createCryptoKey(
  keyBuffer: Uint8Array,
) {
  if (
    keyBuffer.length <
      20
  ) {
    throw new OTPSecretKeyError(
      "Secret key must be at least 20 bytes",
    );
  }

  return importCryptoKey(
    keyBuffer,
  );
}

/**
 * We use the WebCrypto API to "import" a key.
 * This creates a `CryptoKey` that we can use with the rest of the API.
 */
function importCryptoKey(
  value: Uint8Array,
  hash: KeyHashAlgorithm = "SHA-1",
) {
  return crypto.subtle
    .importKey(
      "raw",
      value,
      {
        name: "HMAC",
        hash,
      },
      true,
      [
        "sign",
      ],
    );
}

/**
 * At times, we may have to show the actual secret key used to sign our
 * authenticated message.
 */
export async function exportCryptoKey(
  key: CryptoKey,
) {
  return new Uint8Array(
    await crypto
      .subtle
      .exportKey(
        "raw",
        key,
      ),
  );
}
