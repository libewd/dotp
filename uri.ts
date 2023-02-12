// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import { KeyHashAlgorithm } from "./crypto.ts";
import { OTPType } from "./otp.ts";

/**
 * These options lets you configure a `otpauth` formatted Key URI.
 */
export type URIOptions = {
  accountName?: string;
  issuer?: string;
  timeStep?: number;
  digits?: number;
};

export function createOneTimePasswordURI(
  secret: string,
  type: OTPType,
  algorithm: KeyHashAlgorithm,
  uriOptions?: URIOptions,
) {
  const pathComponents: Array<string> = [];
  const searchParams = new URLSearchParams({
    secret,
    algorithm,
  });

  if (uriOptions) {
    const { accountName, issuer, timeStep, digits } = uriOptions;

    if (issuer) {
      searchParams.set("issuer", issuer);
      pathComponents.push(issuer);
    }

    if (accountName) pathComponents.push(accountName);
    if (timeStep) searchParams.set("period", timeStep.toString());
    if (digits) searchParams.set("digits", digits.toString());
  }

  const path = pathComponents.join(":");
  const url = new URL(
    `/${path}?${searchParams.toString()}`,
    `otpauth://${type}`,
  );

  return url.toString();
}
