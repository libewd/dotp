// Copyright 2023 the libewd authors. All rights reserved. MIT license.

// Looks like we just need a single instance of both the encoder and the decoder.
const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * Encode a `string` value into an `Uint8Array`.
 */
export function encode(value: string) {
  return encoder.encode(value);
}

/**
 * Decodes an `Uint8Array` into a string. Uses UTF-8.
 */
export function decode(value: Uint8Array) {
  return decoder.decode(value);
}
