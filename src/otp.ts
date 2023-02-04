// Copyright 2023 the libewd authors. All rights reserved. MIT license.

/**
 * otp.ts
 */

import { timingSafeEqual } from "./deps.ts";
import { decode } from "./encoding.ts";
import { createHashToken } from "./hash.ts";
import { createMovingFactorFromNumber } from "./moving_factor.ts";
import { createDefaultOptions, Options } from "./options.ts";
import {
  createRandomSecretKey,
  createSecretKeyFromString,
  exportSecretKey,
} from "./secret_key.ts";

export class OTP {
  static async withSecretKey(secretKey: string, options?: Options) {
    return new OTP(await createSecretKeyFromString(secretKey), options);
  }

  static async withRandomSecretKey(options?: Options) {
    return new OTP(await createRandomSecretKey(), options);
  }

  private timeStep = 30;

  constructor(private secretKey: CryptoKey, options?: Options) {
    if (!options) options = createDefaultOptions();
    this.timeStep = options.timeStep;
  }

  get keyAsString() {
    return exportSecretKey(this.secretKey).then((value) =>
      decode(new Uint8Array(value))
    );
  }

  async hashToken(movingFactor: ArrayBuffer) {
    return await createHashToken(this.secretKey, movingFactor);
  }

  createTimeToken(offset = 0) {
    return this.hashToken(
      createMovingFactorFromNumber(this.getElapsedTimeSteps() - offset),
    );
  }

  async validateTimeToken(token: ArrayBuffer, skew = 2) {
    return (await Promise.all(
      Array.from(Array(skew)).map((offset) => this.createTimeToken(offset)),
    )).reduce(
      (validated, currentValue) =>
        this.compareTokens(token, currentValue) || validated,
      false,
    );
  }

  private compareTokens(a: ArrayBuffer, b: ArrayBuffer) {
    return timingSafeEqual(a, b);
  }

  private getElapsedTimeSteps() {
    return Date.now() / this.timeStep;
  }
}
