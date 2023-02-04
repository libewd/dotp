// Copyright 2023 the libewd authors. All rights reserved. MIT license.

/**
 * encoding.ts
 */

// Looks like we just need a single instance of both the encoder and the decoder.
const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * Encode a `string` value into an `Uint8Array`.
 * @param value
 * @returns
 */
export function encode(value: string) {
  return encoder.encode(value);
}

/**
 * Decodes an `Uint8Array` into a string. Uses UTF-8.
 * @param value
 * @returns
 */
export function decode(value: Uint8Array) {
  return decoder.decode(value);
}
