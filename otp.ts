// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import { createHashBasedToken } from "./hash_based.ts";
import { createMovingFactorFromNumber } from "./moving_factor.ts";
import { KeyHashAlgorithm } from "./crypto.ts";
import { createOneTimePasswordURI, URIOptions } from "./uri.ts";
import Key from "./key.ts";
import Token from "./token.ts";

export type OTPType = "hotp" | "totp";

export type OTPOptions = {
  timeStep: number;
};

export class OTP {
  static async withKey(
    key: string,
    type: OTPType = "totp",
    algorithm: KeyHashAlgorithm = "SHA-1",
    options?: OTPOptions,
  ) {
    return new OTP(
      await Key.fromString(key),
      type,
      algorithm,
      options,
    );
  }

  static async withRandomSecretKey(
    type: OTPType = "totp",
    algorithm: KeyHashAlgorithm = "SHA-1",
    options?: OTPOptions,
  ) {
    return new OTP(await Key.usingRandomCryptoKey(), type, algorithm, options);
  }

  /**
   * The `timeStep` defaults to 30 seconds.
   */
  private timeStep = 30;

  constructor(
    private key: Key,
    private type: OTPType = "totp",
    private algorithm: KeyHashAlgorithm = "SHA-1",
    options?: OTPOptions,
  ) {
    if (!options) options = createDefaultOptions();
    this.timeStep = options.timeStep;
  }

  keyToString(): Promise<string> {
    return this.key.toString();
  }

  async hashToken(movingFactor: ArrayBuffer) {
    return Token.fromUint8Array(
      await createHashBasedToken(this.key.cryptoKey, movingFactor),
    );
  }

  createTimeToken(offset = 0) {
    return this.hashToken(
      createMovingFactorFromNumber(this.getElapsedTimeSteps() - offset),
    );
  }

  async validateTimeToken(token: Token, skew = 2) {
    return (await Promise.all(
      Array.from(Array(skew)).map((offset) => this.createTimeToken(offset)),
    )).reduce(
      (validated, currentValue) =>
        this.compareTokens(token, currentValue) || validated,
      false,
    );
  }

  private compareTokens(a: Token, b: Token) {
    return a.compareWith(b);
  }

  private getElapsedTimeSteps() {
    return Date.now() / this.timeStep;
  }

  /**
   * Returns the token as a `otpauth` formatted Key URI.
   */
  async toURI(uriOptions: URIOptions): Promise<string> {
    return createOneTimePasswordURI(
      await this.keyToString(),
      this.type,
      this.algorithm,
      uriOptions,
    );
  }
}

export function createOptions(timeStep: number): OTPOptions {
  return {
    timeStep,
  };
}

export function createDefaultOptions(timeStep = 30): OTPOptions {
  return createOptions(timeStep);
}
