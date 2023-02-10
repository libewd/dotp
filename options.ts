// Copyright 2023 the libewd authors. All rights reserved. MIT license.

export type Options = {
  timeStep: number;
};

export function createOptions(timeStep: number): Options {
  return {
    timeStep,
  };
}

export function createDefaultOptions(timeStep = 30): Options {
  return createOptions(timeStep);
}
