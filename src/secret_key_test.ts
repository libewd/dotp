// Copyright 2023 the libewd authors. All rights reserved. MIT license.

/**
 * key_test.ts
 */

import { createRandomSecretKey } from "./secret_key.ts";

Deno.test("createSecretKey", async () => {
  await createRandomSecretKey();
});
