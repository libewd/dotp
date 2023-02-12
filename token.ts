// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import { decode } from "./encoding.ts";
import { timingSafeEqual } from "./deps.ts";

/**
 * The `Token` class represents a OTP token including some of the metadata about how the token was created. This is useful for informing consumers how to use the token itself.
 */
export default class Token {
  static fromUint8Array(
    value: Uint8Array,
  ): Token {
    return new Token(value);
  }

  constructor(
    public value: Uint8Array,
  ) {
  }

  compareWith(token: Token) {
    return timingSafeEqual(this.value, token.value);
  }

  /**
   * Get the token as a string.
   */
  toString(): string {
    return decode(this.value);
  }
}
