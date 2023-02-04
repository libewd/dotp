// Copyright 2023 the libewd authors. All rights reserved. MIT license.

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function encode(value: string) {
  return encoder.encode(value);
}

export function decode(value: Uint8Array) {
  return decoder.decode(value);
}
