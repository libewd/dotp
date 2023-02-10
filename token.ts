// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import { decode } from "./encoding.ts";

export type KeyURIOptions = {
  accountName?: string;
  issuer?: string;
  timeStep?: number;
  hideDigits?: boolean;
};

export default class Token {
  static fromUint8Array(
    value: Uint8Array,
    type?: string,
    algorithm?: string,
  ): Token {
    return new Token(decode(value), type, algorithm);
  }

  constructor(
    private token: string,
    private type = "totp",
    private algorithm = "SHA1",
  ) {
  }

  toString(): string {
    return this.token;
  }

  toKeyURI(secretKey: string, keyURIOptions?: KeyURIOptions) {
    const pathComponents: Array<string> = [];
    const searchParams = new URLSearchParams({
      secret: secretKey,
      algorithm: this.algorithm,
    });

    if (keyURIOptions) {
      const { accountName, issuer, timeStep, hideDigits = false } =
        keyURIOptions;

      if (issuer) {
        searchParams.set("issuer", issuer);
        pathComponents.push(issuer);
      }

      if (accountName) pathComponents.push(accountName);
      if (timeStep) searchParams.set("period", timeStep.toString());
      if (!hideDigits) {
        searchParams.set("digits", this.toString().length.toString());
      }
    }

    const path = pathComponents.join(":");
    const url = new URL(
      `/${path}?${searchParams.toString()}`,
      `otpauth://${this.type}`,
    );

    return url.toString();
  }
}
