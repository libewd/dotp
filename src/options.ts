export type Options = {
  timeStep: number;
};

export function createDefaultOptions(timeStep = 30): Options {
  return {
    timeStep,
  };
}
