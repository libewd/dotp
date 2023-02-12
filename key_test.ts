// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import Key from "./key.ts";
import { assertEquals, assertInstanceOf } from "./deps.ts";
import { createRandomCryptoKey } from "./crypto.ts";

Deno.test("fromUint8Array", async () => {
  const arrayBuffer = crypto.getRandomValues(new Uint8Array(20));
  const key = await Key.fromUint8Array(arrayBuffer);

  assertInstanceOf(key, Key);
});

Deno.test("fromCryptoKey", async () => {
  const randomCryptoKey = await createRandomCryptoKey();
  const key = await Key.fromCryptoKey(randomCryptoKey);
  assertInstanceOf(key, Key);
});

Deno.test("usingRandomCryptoKey", async () => {
  const key = await Key.usingRandomCryptoKey();
  assertInstanceOf(key, Key);
});

Deno.test("toString", async () => {
  const key = await Key.usingRandomCryptoKey();
  assertEquals((await key.toString()).length, 104);
});
