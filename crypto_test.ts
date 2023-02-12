// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import { createRandomCryptoKey } from "./crypto.ts";

Deno.test("createRandomCryptoKey", async () => {
  await createRandomCryptoKey();
});
