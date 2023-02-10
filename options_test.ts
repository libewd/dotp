// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import { assertEquals } from "./deps.ts";
import { createDefaultOptions, createOptions } from "./options.ts";

Deno.test("createOptions", () => {
  const defaultOptions = createOptions(15);
  assertEquals(defaultOptions.timeStep, 15);
});

Deno.test("createDefaultOptions", () => {
  const defaultOptions = createDefaultOptions();
  assertEquals(defaultOptions.timeStep, 30);
});
