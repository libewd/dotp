// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import { OTPSecretKeyError } from "./error.ts";
import { createDefaultOptions, createOptions, OTP } from "./otp.ts";
import { assert, assertEquals, assertRejects } from "./deps.ts";

Deno.test("withSecretKey", async (t) => {
  const shortKey = "Hello World";

  await t.step({
    name: `throws: OTPSecretKeyError, secretKey: ${shortKey}`,
    fn: async () => {
      await assertRejects(
        () => {
          return OTP.withKey(shortKey);
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

  await Promise.all(testCases.map(async (key) => {
    await t.step({
      name: `key: ${key}`,
      fn: async () => {
        await OTP.withKey(key);
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    });
  }));
});

Deno.test("withRandomSecretKey", async () => {
  const otp = await OTP.withRandomSecretKey();
  assert(await otp.keyToString());
});

Deno.test("getTimeToken", async (t) => {
  const otp = await OTP.withRandomSecretKey();

  await t.step({
    name: "defaults",
    fn: async () => {
      const timeToken = await otp.createTimeToken();
      assertEquals(timeToken.toString().length, 6);
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
        assertEquals(timeToken.toString().length, 6);
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

Deno.test("toURI", async () => {
  const otp = await OTP.withKey("ExampleKeyValueMustBeLong");
  assertEquals(
    await otp.toURI({
      issuer: "Example",
      accountName: "totp@example.com",
    }),
    "otpauth://totp/Example:totp@example.com?secret=IV4GC3LQNRSUWZLZKZQWY5LFJV2XG5CCMVGG63TH&algorithm=SHA-1&issuer=Example",
  );
});

Deno.test("createOptions", () => {
  const options = createOptions(15);
  assertEquals(options.timeStep, 15);
});

Deno.test("createDefaultOptions", () => {
  const defaultOptions = createDefaultOptions();
  assertEquals(defaultOptions.timeStep, 30);
});
