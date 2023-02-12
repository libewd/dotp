// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import { createHashBasedToken } from "./hash_based.ts";
import { assertEquals } from "./deps.ts";
import { createCryptoKeyFromString } from "./crypto.ts";
import { createMovingFactorFromBigInt } from "./moving_factor.ts";
import { decode } from "./encoding.ts";

Deno.test("createHashToken", async (t) => {
  const secretKey = await createCryptoKeyFromString("12345678901234567890");

  const testCases: Array<[bigint, string]> = [
    [0n, "755224"],
    [1n, "287082"],
    [2n, "359152"],
    [3n, "969429"],
    [4n, "338314"],
    [5n, "254676"],
    [6n, "287922"],
    [7n, "162583"],
    [8n, "399871"],
    [9n, "520489"],
  ];

  await Promise.all(testCases.map(([count, expectedToken]) =>
    t.step({
      name: `count: ${count}, token: ${expectedToken}`,
      fn: async () => {
        const movingFactor = createMovingFactorFromBigInt(count);
        const token = decode(
          await createHashBasedToken(secretKey, movingFactor),
        );

        assertEquals(
          token,
          expectedToken,
        );
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    })
  ));
});
