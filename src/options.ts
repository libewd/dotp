// Copyright 2023 the libewd authors. All rights reserved. MIT license.

/**
 * options.ts
 */

export type Options = {
  timeStep: number;
};

/**
 * Creates a options object for using the `OTP` class.
 * @param timeStep
 * @returns
 */
export function createOptions(timeStep: number): Options {
  return {
    timeStep,
  };
}

/**
 * Creates a default options object for using the `OTP` class.
 * @param timeStep
 * @returns
 */
export function createDefaultOptions(timeStep = 30): Options {
  return createOptions(timeStep);
}
