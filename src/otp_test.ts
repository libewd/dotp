// Copyright 2023 the libewd authors. All rights reserved. MIT license.

/**
 * otp_test.ts
 */

import { OTPSecretKeyError } from "./error.ts";
import { OTP } from "./otp.ts";
import { assert, assertEquals, assertRejects } from "./deps.ts";

Deno.test("withSecretKey", async (t) => {
  const shortSecretKey = "Hello World";

  await t.step({
    name: `throws: OTPSecretKeyError, secretKey: ${shortSecretKey}`,
    fn: async () => {
      await assertRejects(
        () => {
          return OTP.withSecretKeyString(shortSecretKey);
        },
        OTPSecretKeyError,
        "Secret key must be at least 20 bytes",
      );
    },
    sanitizeOps: false,
    sanitizeResources: false,
    sanitizeExit: false,
  });

  const testCases = [
    "12345678901234567890", // 20 bytes
    "12345678901234567890123456789012345678901234567890123456789012345", // 65 bytes: error
  ];

  await Promise.all(testCases.map(async (secretKey) => {
    await t.step({
      name: `secretKey: ${secretKey}`,
      fn: async () => {
        await OTP.withSecretKeyString(secretKey);
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    });
  }));
});

Deno.test("withRandomSecretKey", async () => {
  const otp = await OTP.withRandomSecretKey();
  assert(await otp.keyAsString);
});

Deno.test("getTimeToken", async (t) => {
  const otp = await OTP.withRandomSecretKey();

  await t.step({
    name: "defaults",
    fn: async () => {
      const timeToken = await otp.createTimeToken();
      assertEquals(timeToken.length, 6);
    },
    sanitizeOps: false,
    sanitizeResources: false,
    sanitizeExit: false,
  });

  const testCases = [1, 2, 3, 4];

  await Promise.all(testCases.map(async (value) => {
    await t.step({
      name: `skew: ${value}`,
      fn: async () => {
        const timeToken = await otp.createTimeToken(value);
        assertEquals(timeToken.length, 6);
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    });
  }));
});

Deno.test("validateTimeToken", async (t) => {
  const otp = await OTP.withRandomSecretKey();
  const testCases = [1, 2, 3, 4];

  await Promise.all(testCases.map(async (value) => {
    await t.step({
      name: `skew: ${value}`,
      fn: async () => {
        const timeToken = await otp.createTimeToken();
        await otp.validateTimeToken(timeToken);
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    });
  }));
});
